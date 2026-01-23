import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";


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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t.paywallTitle}</Text>
            <Text style={styles.quote}>{t.paywallSubtitle}</Text>
            {__DEV__ ? (
                <TouchableOpacity
                    style={styles.buttonTertiary}
                    onPress={() => {
                        const href = {
                            pathname: "/result/full",
                            params: { lang: currentLang },
                        } as unknown as Href;
                        router.push(href);
                    }}
                    accessibilityLabel="Dev: Open full result"
                >
                    <Text style={styles.buttonTertiaryText}>Dev: Open full result</Text>
                </TouchableOpacity>
            ) : null}
        </View>
    );
}
