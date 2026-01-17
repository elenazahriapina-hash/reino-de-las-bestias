import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../src/styles/startScreenStyles";
import { sendTestToBackend } from "../../src/api/backend";
import {
    getArchetypeImage,
    type AnimalCode,
    type ElementRu,
    type Gender,
} from "../../src/utils/animals";

import { getTranslations, type Lang } from "../../src/lang";
import { useResolvedLang } from "../../src/lang/useResolvedLang";
import { normalizeResultText } from "../../src/lang/resultText";

type ShortResult = {
    animal: AnimalCode;
    element: ElementRu;
    genderForm: Gender;
    text: string;
};

type ShortResponse = {
    type: "short";
    result: ShortResult;
};

export default function ShortResultScreen() {
    const router = useRouter();
    const { lang } = useLocalSearchParams<{ lang?: Lang }>();

    const resolvedLang = useResolvedLang(lang);
    const t = getTranslations(resolvedLang);

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<ShortResult | null>(null);
    const [image, setImage] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadResult = async () => {
            try {
                setError(null);

                const name = (await AsyncStorage.getItem("userName")) ?? "";
                const genderRaw = await AsyncStorage.getItem("gender");

                const gender: Gender =
                    genderRaw === "female" || genderRaw === "male" ? genderRaw : "unspecified";

                // собираем ответы
                const keys = await AsyncStorage.getAllKeys();
                const answerKeys = keys.filter((k) => k.startsWith("answer_"));
                const pairs = await AsyncStorage.multiGet(answerKeys);

                const answers = pairs
                    .filter(([_, v]) => v !== null)
                    .map(([k, v]) => ({
                        questionId: Number((k ?? "").replace("answer_", "")),
                        answer: v ?? "",
                    }))
                    .sort((a, b) => a.questionId - b.questionId);

                const payload = {
                    name,
                    lang: resolvedLang,
                    gender, // отправляем уже нормализованный gender
                    answers,
                };

                const response = await sendTestToBackend<ShortResponse>(
                    "short",
                    payload
                );
                const shortResult = response.result;

                // 🔑 СОХРАНЯЕМ ДЛЯ FULL
                await AsyncStorage.setItem("result_animal", shortResult.animal);
                await AsyncStorage.setItem("result_element", shortResult.element);

                setResult(shortResult);

                setImage(
                    getArchetypeImage({
                        animal: shortResult.animal,
                        element: shortResult.element,
                        gender: shortResult.genderForm,
                    })
                );


            } catch (e: any) {
                console.error(t.shortError, e);
                setError(t.shortError);
            } finally {
                setLoading(false);
            }
        };

        loadResult();
    }, [resolvedLang, t.shortError]);

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
                paddingHorizontal: 20,
                paddingBottom: 40,
                alignItems: "center",
            }}
            showsVerticalScrollIndicator={false}
        >
            {image && (
                <Image
                    source={image}
                    style={{
                        width: 260,
                        height: 260,
                        alignSelf: "center",
                        marginBottom: 24,
                    }}
                    resizeMode="contain"
                />
            )}

            {error ? (
                <Text style={styles.quote}>{error}</Text>
            ) : result ? (
                <Text style={styles.quote}>{normalizeResultText(result.text, resolvedLang)}</Text>
            ) : (
                <Text style={styles.quote}>{t.noResult}</Text>
            )}

            <View style={styles.bottom}>
                <TouchableOpacity style={styles.button} onPress={() => router.push({
                    pathname: "/result/full",
                    params: { lang: resolvedLang }
                } as any)}>
                    <Text style={styles.buttonText}>{t.getFull}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
