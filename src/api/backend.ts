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

const API_BASE = "http://192.168.0.18:8000";

export async function sendTestToBackend<T>(
    endpoint: "short" | "full",
    payload: TestPayload
): Promise<T> {
    let response: Response;

    try {
        response = await fetch(`${API_BASE}/analyze/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
    } catch {
        throw new Error("networkError");
    }

    if (!response.ok) {
        try {
            const data = await response.json();
            const detail =
                typeof data?.detail === "string" ? data.detail : `HTTP ${response.status}`;
            throw new Error(detail);
        } catch {
            const text = await response.text().catch(() => "");
            throw new Error(text || `HTTP ${response.status}`);
        }
    }

    return (await response.json()) as T;
}
