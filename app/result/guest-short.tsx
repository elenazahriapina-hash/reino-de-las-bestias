import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import en from "../../src/lang/en";
import es from "../../src/lang/es";
import pt from "../../src/lang/pt";
import ru from "../../src/lang/ru";

import { styles } from "../../src/styles/startScreenStyles";
import {
    getArchetypeImage,
    type AnimalCode,
    type ElementRu,
    type Gender,
} from "../../src/utils/animals";
import { buildShareMessage, formatArchetypeLine, shareResult } from "../../src/utils/share";

type Lang = "ru" | "en" | "es" | "pt";

type ShortResult = {
    animal: AnimalCode;
    element: ElementRu;
    genderForm: Gender;
    text: string;
    runId: string;
};

export default function GuestShortResultScreen() {
    const router = useRouter();
    const { lang } = useLocalSearchParams<{ lang?: Lang }>();

    const translations = { ru, en, es, pt };
    const currentLang: Lang = (lang ?? "ru") as Lang;
    const t = translations[currentLang];

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<ShortResult | null>(null);
    const [image, setImage] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadResult = async () => {
            try {
                setError(null);
                const profileActive = (await AsyncStorage.getItem("isProfileActive")) === "true";
                if (profileActive) {
                    router.replace({
                        pathname: "/result/short",
                        params: { lang: currentLang },
                    } as unknown as Href);
                    return;
                }

                const cached = await AsyncStorage.getItem("guestShortResult");
                if (cached) {
                    try {
                        const cachedResult = JSON.parse(cached) as ShortResult;
                        if (!cachedResult.runId) {
                            router.replace({
                                pathname: "/result/loading",
                                params: { lang: currentLang },
                            } as unknown as Href);
                            return;
                        }
                        setResult(cachedResult);
                        await AsyncStorage.setItem("runId", cachedResult.runId);
                        setImage(
                            getArchetypeImage({
                                animal: cachedResult.animal,
                                element: cachedResult.element,
                                gender: cachedResult.genderForm,
                            })
                        );
                    } catch (parseError) {
                        console.warn("Failed to parse cached guest short result", parseError);
                        setError(t.shortError);
                    }
                }
            } catch (e: any) {
                console.error(t.shortError, e);
                setError(t.shortError);
            } finally {
                setLoading(false);
            }
        };

        loadResult();
    }, [currentLang, router, t.shortError]);

    const appUrl = process.env.EXPO_PUBLIC_APP_URL?.trim();
    const shareMessage = result
        ? buildShareMessage({
            lang: currentLang,
            animalCode: result.animal,
            elementCode: result.element,
            genderForm: result.genderForm,
            appUrl,
        })
        : "";

    const handleShare = async () => {
        if (!result) return;
        try {
            await shareResult({ message: shareMessage, imageModule: image });
        } catch (shareError) {
            console.error(t.shareError, shareError);
        }
    };

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
                <>
                    <Text style={styles.subtitle}>
                        {formatArchetypeLine(
                            currentLang,
                            result.animal,
                            result.element,
                            result.genderForm
                        )}
                    </Text>
                    <Text style={styles.quote}>{result.text}</Text>
                </>
            ) : (
                <Text style={styles.quote}>{t.noResult}</Text>
            )}

            <View style={styles.bottom}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        const href = {
                            pathname: "/result/registration",
                            params: { lang: currentLang },
                        } as unknown as Href;
                        router.push(href);
                    }}
                >
                    <Text style={styles.buttonText}>{t.saveResult}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleShare}>
                    <Text style={styles.buttonText}>{t.share}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}