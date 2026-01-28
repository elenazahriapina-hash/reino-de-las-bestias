// app/result/full.tsx

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { useCallback, useEffect, useState } from "react";
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
import type { AnimalCode, ElementRu, Gender } from "../../src/utils/animals";

type Lang = "ru" | "en" | "es" | "pt";

type FullResponse = {
    type: "full";
    result: {
        animal: AnimalCode;
        element: ElementRu;
        genderForm: Gender;
        text: string;
        runId?: string;
    };
};

export default function FullResultScreen() {
    const router = useRouter();
    const { lang } = useLocalSearchParams<{ lang?: Lang }>();

    const translations = { ru, en, es, pt };
    const currentLang: Lang = (lang ?? "ru") as Lang;
    const t = translations[currentLang];

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<FullResponse["result"] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [offlineNotice, setOfflineNotice] = useState(false);

    const loadFullResult = useCallback(async () => {
        setLoading(true);
        let cachedResult: FullResponse["result"] | null = null;
        try {
            setError(null);
            setOfflineNotice(false);

            const hasAccess = (await AsyncStorage.getItem("hasFullAccess")) === "true";
            if (!hasAccess) {
                router.replace({
                    pathname: "/paywall",
                    params: { lang: currentLang },
                } as unknown as Href);
                return;
            }

            const cached = await AsyncStorage.getItem("lastFullResult");
            if (cached) {
                try {
                    const parsedResult = JSON.parse(cached) as FullResponse["result"];
                    setResult(parsedResult);
                    cachedResult = parsedResult;
                    setLoading(false);
                } catch (parseError) {
                    console.warn("Failed to parse cached full result", parseError);
                }
            }
            const name = (await AsyncStorage.getItem("userName")) ?? "";
            const genderRaw = await AsyncStorage.getItem("gender");
            const gender: Gender =
                genderRaw === "female" || genderRaw === "male" ? genderRaw : "unspecified";

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
                lang: currentLang,
                gender,
                answers,
            };

            const response = await sendTestToBackend<FullResponse>(
                "full",
                payload
            );

            setResult(response.result);
            setOfflineNotice(false);
            await AsyncStorage.setItem(
                "lastFullResult",
                JSON.stringify(response.result)
            );
            await AsyncStorage.setItem(
                "lastFullResultAt",
                new Date().toISOString()
            );
        } catch (e: any) {
            console.error("Ошибка получения full-результата", e);
            if (cachedResult) {
                setOfflineNotice(true);
            } else {
                setError(t.fullOfflineTitle ?? t.fullError);
            }
        } finally {
            if (!cachedResult) {
                setLoading(false);
            }
        }
    }, [currentLang, router, t.fullError, t.fullOfflineTitle]);

    useEffect(() => {

        loadFullResult();
    }, [loadFullResult]);

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

    const handleGoToMain = async () => {
        await AsyncStorage.setItem("skipAutoHubOnce", "true");
        router.push(mainHref);
    };

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
                <>
                    <Text style={styles.quote}>{error}</Text>
                    <Text style={styles.microcopy}>{t.offlineHint}</Text>
                    <View style={styles.bottom}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={loadFullResult}
                        >
                            <Text style={styles.buttonText}>{t.retry}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSecondary}
                            onPress={() => router.push(shortResultHref)}
                        >
                            <Text style={styles.buttonText}>{t.backToResult}</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : result ? (
                <>
                    <Text
                        style={{
                            fontSize: 16,
                            lineHeight: 26,
                            color: "#1e1616ff",
                            textAlign: "left",
                        }}
                    >
                        {result.text}
                    </Text>
                    {offlineNotice ? (
                        <Text style={styles.microcopy}>{t.offlineHint}</Text>
                    ) : null}
                </>
            ) : (
                <Text style={styles.quote}>{t.fullError}</Text>
            )}

            {error ? null : (
                <View style={styles.bottom}>
                    <TouchableOpacity
                        style={styles.buttonSecondary}
                        onPress={() => router.push(shortResultHref)}
                    >
                        <Text style={styles.buttonText}>{t.backToResult}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonTertiary}
                        onPress={handleGoToMain}
                    >
                        <Text style={styles.buttonTertiaryText}>{t.goToMain}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
}