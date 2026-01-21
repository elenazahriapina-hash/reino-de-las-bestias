import { type Href, useLocalSearchParams, useRouter } from "expo-router";
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
    const currentLang = (lang ?? "ru") as Lang;

    const translations = { ru, en, es, pt };
    const t = translations[currentLang];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t.paywallTitle}</Text>
            <Text style={styles.quote}>{t.getFull}</Text>

            <View style={styles.bottom}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        const href = {
                            pathname: "/paywall",
                            params: { lang: currentLang },
                        } as unknown as Href;
                        router.push(href);
                    }}
                >
                    <Text style={styles.buttonText}>{t.getFull}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}