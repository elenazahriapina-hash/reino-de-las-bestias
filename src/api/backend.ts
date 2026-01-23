// src/api/backend.ts

export type TestAnswer = {
    questionId: number;
    answer: string;
};

export type ShortTestPayload = {
    name: string;
    lang: "ru" | "en" | "es" | "pt";
    gender?: string | null;
    answers: TestAnswer[];
    lockedAnimal?: string;
    lockedElement?: string;
    lockedGenderForm?: string;
};

export type FullTestPayload = ShortTestPayload & {
    runId: string;
    animal: string;
    element: string;
};

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://192.168.0.18:8000";

export async function sendTestToBackend<T>(
    endpoint: "short",
    payload: ShortTestPayload
): Promise<T>;
export async function sendTestToBackend<T>(
    endpoint: "full",
    payload: FullTestPayload
): Promise<T>;

export async function sendTestToBackend<T>(
    endpoint: "short" | "full",
    payload: ShortTestPayload | FullTestPayload
): Promise<T> {
    let response: Response;
    const url = `${BASE_URL}/analyze/${endpoint}`;

    try {
        console.log("API URL:", url);
        response = await fetch(url, {
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