import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import en from "../src/lang/en";
import es from "../src/lang/es";
import pt from "../src/lang/pt";
import ru from "../src/lang/ru";
import { styles } from "../src/styles/startScreenStyles";

type Lang = "ru" | "en" | "es" | "pt";

export default function PaywallScreen() {

    const router = useRouter();
    const { lang } = useLocalSearchParams<{ lang?: Lang }>();
    const translations = { ru, en, es, pt };
    const currentLang: Lang = (lang ?? "ru") as Lang;
    const t = translations[currentLang];
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const checkProfile = async () => {
            const profileActive = (await AsyncStorage.getItem("isProfileActive")) === "true";
            if (!profileActive) {
                router.replace({
                    pathname: "/result/guest-short",
                    params: { lang: currentLang },
                } as unknown as Href);
                return;
            }
            setReady(true);
        };

        checkProfile();
    }, [currentLang, router]);

    if (!ready) {
        return (
            <View style={[styles.containerAlt, { justifyContent: "center" }]}>
                <ActivityIndicator size="large" color="#3A7BD5" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <Text style={styles.title}>{t.paywallTitle}</Text>
                <Text style={styles.body}>{t.paywallBody}</Text>
            </View>

            <View style={styles.bottom}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        await AsyncStorage.setItem("hasFullAccess", "true");
                        const href = {
                            pathname: "/paywall/success",
                            params: { lang: currentLang },
                        } as unknown as Href;
                        router.push(href);
                    }}
                >
                    <Text style={styles.buttonText}>{t.getDetailedDescription}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonSecondary}
                    onPress={() => {
                        const href = {
                            pathname: "/result/short",
                            params: { lang: currentLang },
                        } as unknown as Href;
                        router.push(href);
                    }}
                >
                    <Text style={styles.buttonSecondaryText}>{t.later}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonTertiary}
                    onPress={async () => {
                        await AsyncStorage.setItem("skipAutoHubOnce", "true");
                        const href = {
                            pathname: "/",
                            params: { lang: currentLang },
                        } as unknown as Href;
                        router.push(href);
                    }}
                >
                    <Text style={styles.buttonTertiaryText}>{t.goToMain}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
