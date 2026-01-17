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
import { styles } from "../../src/styles/startScreenStyles";
import { sendTestToBackend } from "../../src/api/backend";
import { getTranslations, type Lang } from "../../src/lang";
import { useResolvedLang } from "../../src/lang/useResolvedLang";
import { normalizeResultText } from "../../src/lang/resultText";

type FullResponse = {
    type: "full";
    result: {
        text: string;
    };
};

export default function FullResultScreen() {
    const { lang } = useLocalSearchParams<{ lang?: Lang }>();

    const resolvedLang = useResolvedLang(lang);
    const t = getTranslations(resolvedLang);

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
                    lang: resolvedLang,
                    gender,
                    animal,
                    element,
                    answers,
                };

                const response = await sendTestToBackend<FullResponse>(
                    "full",
                    payload
                );

                setText(normalizeResultText(response.result.text, resolvedLang));

            } catch (e: any) {
                console.error(t.fullError, e);
                setError(t.fullError);
            } finally {
                setLoading(false);
            }
        };

        loadFullResult();
    }, [resolvedLang, t.fullError]);

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