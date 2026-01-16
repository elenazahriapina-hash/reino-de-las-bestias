// src/api/backend.ts

export type TestAnswer = {
    questionId: number;
    answer: string;
};

export type TestPayload = {
    name: string;
    lang: "ru" | "en" | "es" | "pt";
    gender?: string | null;
    answers: TestAnswer[];
};

const API_URL = "http://192.168.0.14:8000/analyze";


export async function sendTestToBackend<T>(
    endpoint: "short" | "full",
    payload: TestPayload
): Promise<T> {
    let response: Response;

    try {
        response = await fetch(`${API_URL}/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
    } catch (e: any) {
        // сюда попадают проблемы сети / IP / порт / firewall
        throw new Error("networkError");
    }

    if (!response.ok) {
        // пытаемся достать detail от FastAPI: {"detail":"..."}
        try {
            const data = await response.json();
            const detail =
                typeof data?.detail === "string"
                    ? data.detail
                    : `HTTP ${response.status}`;
            throw new Error(detail);
        } catch {
            // если ответ не JSON
            const text = await response.text().catch(() => "");
            throw new Error(text || `HTTP ${response.status}`);
        }
    }

    return (await response.json()) as T;
}