// app/result/full.tsx

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import en from "../../src/lang/en";
import es from "../../src/lang/es";
import pt from "../../src/lang/pt";
import ru from "../../src/lang/ru";

import { sendTestToBackend } from "../../src/api/backend";
import { styles } from "../../src/styles/startScreenStyles";

type Lang = "ru" | "en" | "es" | "pt";

type FullResponse = {
    type: "full";
    result: {
        text: string;
    };
};

export default function FullResultScreen() {
    const router = useRouter();
    const { lang } = useLocalSearchParams<{ lang?: Lang }>();

    const translations = { ru, en, es, pt };
    const currentLang: Lang = (lang ?? "ru") as Lang;
    const t = translations[currentLang];

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
                const runId = await AsyncStorage.getItem("runId");

                if (!animal || !element || !runId) {
                    setError(t.fullError);
                    setLoading(false);
                    return;
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
                    runId,
                    name,
                    lang: currentLang,
                    gender,
                    animal,
                    element,
                    answers,
                };

                console.log("runId present:", Boolean(runId));

                const response = await sendTestToBackend<FullResponse>(
                    "full",
                    payload
                );

                setText(response.result.text);
                await AsyncStorage.setItem(
                    "lastFullResult",
                    JSON.stringify(response.result)
                );

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

    const shortResultHref = {
        pathname: "/result/short",
        params: { lang: currentLang },
    } as unknown as Href;

    const mainHref = {
        pathname: "/",
        params: { lang: currentLang },
    } as unknown as Href;

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

            <View style={styles.bottom}>
                <TouchableOpacity
                    style={styles.buttonSecondary}
                    onPress={() => router.push(shortResultHref)}
                >
                    <Text style={styles.buttonText}>{t.backToResult}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonTertiary}
                    onPress={() => router.push(mainHref)}
                >
                    <Text style={styles.buttonTertiaryText}>{t.goToMain}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}