import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

import en from "../src/lang/en";
import es from "../src/lang/es";
import pt from "../src/lang/pt";
import ru from "../src/lang/ru";
import { styles } from "../src/styles/startScreenStyles";

type Lang = "ru" | "en" | "es" | "pt";

export default function PaywallScreen() {

    const { lang } = useLocalSearchParams<{ lang?: Lang }>();
    const translations = { ru, en, es, pt };
    const currentLang: Lang = (lang ?? "ru") as Lang;
    const t = translations[currentLang];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t.paywallTitle}</Text>
            <Text style={styles.quote}>{t.paywallSubtitle}</Text>
        </View>
    );
}
