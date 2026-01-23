import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import en from "../../src/lang/en";
import es from "../../src/lang/es";
import pt from "../../src/lang/pt";
import ru from "../../src/lang/ru";

import { styles } from "../../src/styles/startScreenStyles";

type Lang = "ru" | "en" | "es" | "pt";

export default function ProviderChoiceScreen() {
    const router = useRouter();
    const { lang } = useLocalSearchParams<{ lang?: Lang }>();

    const translations = { ru, en, es, pt };
    const currentLang: Lang = (lang ?? "ru") as Lang;
    const t = translations[currentLang];

    const successHref = {
        pathname: "/auth/success",
        params: { lang: currentLang },
    } as unknown as Href;

    const handleProviderSelect = async (provider: "google" | "telegram") => {
        await AsyncStorage.multiSet([
            ["isProfileActive", "true"],
            ["authProvider", provider],
        ]);
        router.push(successHref);
    };
    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleProviderSelect("google")}
                >
                    <Text style={styles.buttonText}>{t.providerGoogle}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleProviderSelect("telegram")}
                >
                    <Text style={styles.buttonText}>{t.providerTelegram}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}