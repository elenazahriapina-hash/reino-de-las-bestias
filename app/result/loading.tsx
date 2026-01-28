import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Href } from "expo-router";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import en from "../../src/lang/en";
import es from "../../src/lang/es";
import pt from "../../src/lang/pt";
import ru from "../../src/lang/ru";

import { sendTestToBackend } from "../../src/api/backend";
import { styles } from "../../src/styles/startScreenStyles";
import type { Gender } from "../../src/utils/animals";

type Lang = "ru" | "en" | "es" | "pt";

export default function ResultLoadingScreen() {
    const router = useRouter();
    const { lang } = useLocalSearchParams<{ lang?: Lang }>();

    const translations = { ru, en, es, pt };
    const currentLang: Lang = (lang ?? "ru") as Lang;
    const t = translations[currentLang];

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const runLoading = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const profileActive = (await AsyncStorage.getItem("isProfileActive")) === "true";
            const nameKey = profileActive ? "userName" : "guestName";
            const name = (await AsyncStorage.getItem(nameKey)) ?? "";
            const genderRaw = await AsyncStorage.getItem("gender");

            const gender: Gender =
                genderRaw === "female" || genderRaw === "male" ? genderRaw : "unspecified";

            const answers = [];
            for (let i = 1; i <= 31; i++) {
                const value = await AsyncStorage.getItem(`answer_${i}`);
                if (value !== null) {
                    answers.push({
                        questionId: i,
                        answer: value,
                    });
                }
            }

            const payload = {
                name,
                lang: currentLang,
                gender,
                answers,
            };

            const response = await sendTestToBackend("short", payload);
            const shortResult = response.result;

            await AsyncStorage.multiSet([
                ["result_animal", shortResult.animal],
                ["result_element", shortResult.element],
                ["runId", shortResult.runId],
            ]);

            if (profileActive) {
                await AsyncStorage.multiSet([
                    ["lastShortResult", JSON.stringify(shortResult)],
                    ["lastShortResultAt", Date.now().toString()],
                    ["lastTestAt", Date.now().toString()],
                ]);
            } else {
                await AsyncStorage.multiSet([
                    ["guestShortResult", JSON.stringify(shortResult)],
                    ["guestShortResultAt", Date.now().toString()],
                ]);
            }

            const nextHref: Href = {
                pathname: profileActive ? "/result/short" : "/result/guest-short",
                params: { lang: currentLang },
            };
            router.push(nextHref);
        } catch (e: any) {
            console.error(t.serverError, e);
            setError(t.serverError);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        runLoading();
    }, []);

    const homeHref: Href = {
        pathname: "/",
        params: { lang: currentLang },
    };

    const handleGoHome = async () => {
        await AsyncStorage.setItem("skipAutoHubOnce", "true");
        router.push(homeHref);
    };

    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <Text style={styles.title}>{t.loadingTitle}</Text>
                <Text style={styles.quote}>{t.loadingText}</Text>

                {isLoading ? (
                    <ActivityIndicator
                        style={{ marginTop: 24 }}
                        size="large"
                        color="#C89B3C"
                    />
                ) : null}
            </View>

            {error ? (
                <View style={styles.bottom}>
                    <Text style={[styles.quote, { marginBottom: 20 }]}>{error}</Text>
                    <TouchableOpacity style={styles.button} onPress={runLoading}>
                        <Text style={styles.buttonText}>{t.retry}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleGoHome}>
                        <Text style={styles.buttonText}>{t.backHome}</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    );
}