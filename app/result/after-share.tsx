import type { Href } from "expo-router";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import en from "../../src/lang/en";
import es from "../../src/lang/es";
import pt from "../../src/lang/pt";
import ru from "../../src/lang/ru";

import { styles } from "../../src/styles/startScreenStyles";

type Lang = "ru" | "en" | "es" | "pt";

export default function AfterShareScreen() {
    const router = useRouter();
    const { lang } = useLocalSearchParams<{ lang?: Lang }>();

    const translations = { ru, en, es, pt };
    const resolvedLang = lang ?? "ru";
    const t = translations[resolvedLang];

    const paywallHref: Href = {
        pathname: "/paywall",
        params: { lang: resolvedLang },
    };

    const homeHref: Href = {
        pathname: "/",
    };

    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <Text style={styles.title}>{t.afterShareTitle}</Text>
                <Text style={styles.quote}>{t.afterShareText}</Text>
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.button} onPress={() => router.push(paywallHref)}>
                    <Text style={styles.buttonText}>{t.openFull}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => router.push(homeHref)}>
                    <Text style={styles.buttonText}>{t.later}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}