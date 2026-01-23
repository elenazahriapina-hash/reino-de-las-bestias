import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import en from "../../src/lang/en";
import es from "../../src/lang/es";
import pt from "../../src/lang/pt";
import ru from "../../src/lang/ru";

import { styles } from "../../src/styles/startScreenStyles";

type Lang = "ru" | "en" | "es" | "pt";

export default function ProfileCreatedScreen() {
    const router = useRouter();
    const { lang } = useLocalSearchParams<{ lang?: Lang }>();

    const translations = { ru, en, es, pt };
    const currentLang: Lang = (lang ?? "ru") as Lang;
    const t = translations[currentLang];

    const profileHref = {
        pathname: "/profile",
        params: { lang: currentLang },
    } as unknown as Href;

    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <Text style={styles.title}>{t.successTitle}</Text>
                <Text style={styles.body}>{t.successBody}</Text>
            </View>

            <View style={styles.bottom}>
                <TouchableOpacity style={styles.button} onPress={() => router.push(profileHref)}>
                    <Text style={styles.buttonText}>{t.successCta}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}