import type { Href } from "expo-router";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import en from "../../src/lang/en";
import es from "../../src/lang/es";
import pt from "../../src/lang/pt";
import ru from "../../src/lang/ru";

import { styles } from "../../src/styles/startScreenStyles";

type Lang = "ru" | "en" | "es" | "pt";

export default function ResultLoadingFullScreen() {
    const router = useRouter();
    const { lang } = useLocalSearchParams<{ lang?: Lang }>();

    const translations = { ru, en, es, pt };
    const currentLang: Lang = (lang ?? "ru") as Lang;
    const t = translations[currentLang];

    const backHref: Href = {
        pathname: "/result/short",
        params: { lang: currentLang },
    };

    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <Text style={styles.title}>{t.loadingFullTitle}</Text>
                <Text style={styles.quote}>{t.loadingFullText}</Text>
                <ActivityIndicator
                    style={{ marginTop: 24 }}
                    size="large"
                    color="#C89B3C"
                />
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.button} onPress={() => router.push(backHref)}>
                    <Text style={styles.buttonText}>{t.cancel}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}