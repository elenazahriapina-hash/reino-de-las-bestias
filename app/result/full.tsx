// app/result/full.tsx

import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ru from "../../src/lang/ru";
import en from "../../src/lang/en";
import es from "../../src/lang/es";
import pt from "../../src/lang/pt";

import { styles } from "../../src/styles/startScreenStyles";
import { sendTestToBackend } from "../../src/api/backend";

type Lang = "ru" | "en" | "es" | "pt";

type FullResponse = {
    type: "full";
    result: {
        text: string;
    };
};

export default function FullResultScreen() {
    const { lang } = useLocalSearchParams<{ lang?: Lang }>();

    const translations = { ru, en, es, pt };
    const t = translations[lang ?? "ru"];

    const [loading, setLoading] = useState(true);
    const [text, setText] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadFullResult = async () => {
            try {
                setError(null);

                const name = (await AsyncStorage.getItem("userName")) ?? "";
                const gender = await AsyncStorage.getItem("gender");

                const animal = await AsyncStorage.getItem("result_animal");
                const element = await AsyncStorage.getItem("result_element");

                if (!animal || !element) {
                    throw new Error("No archetype data");
                }

                const keys = await AsyncStorage.getAllKeys();
                const answerKeys = keys.filter((k) => k.startsWith("answer_"));
                const pairs = await AsyncStorage.multiGet(answerKeys);

                const answers = pairs
                    .filter(([_, v]) => v !== null)
                    .map(([k, v]) => ({
                        questionId: Number(k.replace("answer_", "")),
                        answer: v ?? "",
                    }))
                    .sort((a, b) => a.questionId - b.questionId);

                const payload = {
                    name,
                    lang: (lang ?? "ru") as Lang,
                    gender,
                    animal,
                    element,
                    answers,
                };

                const response = await sendTestToBackend<FullResponse>(
                    "full",
                    payload
                );

                setText(response.result.text);

            } catch (e: any) {
                console.error("Ошибка получения full-результата", e);
                setError(t.fullError);
            } finally {
                setLoading(false);
            }
        };

        loadFullResult();
    }, [lang]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: "center" }]}>
                <ActivityIndicator size="large" color="#C89B3C" />
            </View>
        );
    }

    return (
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
                paddingHorizontal: 24,
                paddingTop: 32,
                paddingBottom: 64,
            }}
            showsVerticalScrollIndicator={false}
        >
            {error ? (
                <Text style={styles.quote}>{error}</Text>
            ) : (
                <Text
                    style={{
                        fontSize: 16,
                        lineHeight: 26,
                        color: "#1e1616ff",
                        textAlign: "left",
                    }}
                >
                    {text}
                </Text>
            )}
        </ScrollView>
    );
}

