// src/api/backend.ts

import type { AnimalCode, ElementRu, Gender } from "../utils/animals";

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
};

export type ShortResult = {
    animal: AnimalCode;
    element: ElementRu;
    genderForm: Gender;
    text: string;
    runId: string;
};

export type ShortResponse = {
    type: "short";
    result: ShortResult;
};

export type FullResult = {
    animal: AnimalCode;
    element: ElementRu;
    genderForm: Gender;
    text: string;
    runId?: string;
};

export type FullResponse = {
    type: "full";
    result: FullResult;
};

export type ApiResponseMap = {
    short: ShortResponse;
    full: FullResponse;
};

export type TestPayload = ShortTestPayload | FullTestPayload;

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://192.168.0.14:8000";

export async function sendTestToBackend<K extends keyof ApiResponseMap>(
    endpoint: K,
    payload: TestPayload
): Promise<ApiResponseMap[K]> {
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
        const contentType = response.headers.get("content-type") ?? "";
        let errorBody: unknown = null;
        let errorBodyLog: string | null = null;

        if (contentType.includes("application/json")) {
            try {
                errorBody = await response.json();
                errorBodyLog = JSON.stringify(errorBody, null, 2);
            } catch (error) {
                console.error("Failed to parse error JSON", error);
            }
        } else {
            try {
                const text = await response.text();
                errorBody = text;
                errorBodyLog = text;
            } catch (error) {
                console.error("Failed to read error text", error);
            }
        }

        console.error("Backend error response", {
            status: response.status,
            body: errorBodyLog,
        });
        throw new Error(`HTTP ${response.status}`);
    }

    return (await response.json()) as ApiResponseMap[K];
}