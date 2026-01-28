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

import { sendTestToBackend, type FullResponse } from "../../src/api/backend";
import { styles } from "../../src/styles/startScreenStyles";
import type { Gender } from "../../src/utils/animals";
import { sanitizeFullText } from "../../src/utils/text";

type Lang = "ru" | "en" | "es" | "pt";

type FullResult = FullResponse["result"];

export default function FullResultScreen() {
    const router = useRouter();
    const { lang } = useLocalSearchParams<{ lang?: Lang }>();

    const translations = { ru, en, es, pt };
    const currentLang: Lang = (lang ?? "ru") as Lang;
    const t = translations[currentLang];

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<FullResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [offlineNotice, setOfflineNotice] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const loadFullResult = useCallback(async () => {
        setLoading(true);
        setIsRefreshing(false);
        let cachedResult: FullResult | null = null;
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
                    const parsedResult = JSON.parse(cached) as FullResult;
                    setResult(parsedResult);
                    cachedResult = parsedResult;
                    setLoading(false);
                    setIsRefreshing(true);
                } catch (parseError) {
                    console.warn("Failed to parse cached full result", parseError);
                }
            }
            const runId = await AsyncStorage.getItem("runId");
            if (!runId) {
                router.replace({
                    pathname: "/result/short",
                    params: { lang: currentLang },
                } as unknown as Href);
                return;
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
                runId,
            };

            const response = await sendTestToBackend("full", payload);

            setResult(response.result);
            setIsRefreshing(false);
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
            setIsRefreshing(false);
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
            <View
                style={[
                    styles.container,
                    { justifyContent: "center", paddingHorizontal: 24 },
                ]}
            >
                <ActivityIndicator size="large" color="#3A7BD5" />
                <Text style={[styles.microcopy, { marginTop: 16, textAlign: "center" }]}>
                    {t.fullLoadingTitle}
                </Text>
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
            style={styles.screen}
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
                            <Text style={styles.buttonSecondaryText}>{t.backToResult}</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : result ? (
                <>
                    {isRefreshing ? (
                        <Text style={styles.microcopy}>
                            {t.fullUpdating ?? t.updating}
                        </Text>
                    ) : null}
                    <View style={[styles.surface, { marginTop: 12, marginBottom: 24 }]}>
                        <Text
                            style={{
                                fontSize: 16,
                                lineHeight: 26,
                                color: "#E4E7EB",
                                fontFamily: "Manrope-Regular",
                                textAlign: "left",
                            }}
                        >
                            {sanitizeFullText(result.text)}
                        </Text>
                    </View>
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
                        <Text style={styles.buttonSecondaryText}>{t.backToResult}</Text>
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