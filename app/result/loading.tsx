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
import type { AnimalCode, ElementRu, Gender } from "../../src/utils/animals";

type Lang = "ru" | "en" | "es" | "pt";

type ShortResult = {
    animal: AnimalCode;
    element: ElementRu;
    genderForm: Gender;
    text: string;
    runId: string;
};

type ShortResponse = {
    type: "short";
    result: ShortResult;
};

export default function ResultLoadingScreen() {
    const router = useRouter();
    const { lang } = useLocalSearchParams<{ lang?: Lang }>();

    const translations = { ru, en, es, pt };
    const resolvedLang = lang ?? "ru";
    const t = translations[resolvedLang];

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const runLoading = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const name = (await AsyncStorage.getItem("userName")) ?? "";
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
                lang: resolvedLang,
                gender,
                answers,
            };

            const response = await sendTestToBackend<ShortResponse>("short", payload);
            const shortResult = response.result;

            await AsyncStorage.setItem("shortResult", JSON.stringify(shortResult));
            await AsyncStorage.setItem("result_animal", shortResult.animal);
            await AsyncStorage.setItem("result_element", shortResult.element);
            await AsyncStorage.setItem("runId", shortResult.runId);

            const nextHref: Href = {
                pathname: "/result/short",
                params: { lang: resolvedLang },
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
                    <TouchableOpacity style={styles.button} onPress={() => router.push(homeHref)}>
                        <Text style={styles.buttonText}>{t.backHome}</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    );
}