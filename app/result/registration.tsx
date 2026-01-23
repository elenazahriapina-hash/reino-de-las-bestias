import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import en from "../../src/lang/en";
import es from "../../src/lang/es";
import pt from "../../src/lang/pt";
import ru from "../../src/lang/ru";

import { styles } from "../../src/styles/startScreenStyles";

type Lang = "ru" | "en" | "es" | "pt";

export default function RegistrationEntryScreen() {
    const router = useRouter();
    const { lang } = useLocalSearchParams<{ lang?: Lang }>();

    const translations = { ru, en, es, pt };
    const currentLang: Lang = (lang ?? "ru") as Lang;
    const t = translations[currentLang];

    const providerHref = {
        pathname: "/auth/providers",
        params: { lang: currentLang },
    } as unknown as Href;

    const loginHref = {
        pathname: "/auth/login",
        params: { lang: currentLang },
    } as unknown as Href;

    const homeHref = {
        pathname: "/",
        params: { lang: currentLang },
    } as unknown as Href;

    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <Text style={styles.title}>{t.registrationTitle}</Text>
                <Text style={styles.body}>{t.registrationBody}</Text>
            </View>

            <View style={styles.bottom}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push(providerHref)}
                >
                    <Text style={styles.buttonText}>{t.registrationPrimary}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonSecondary}
                    onPress={() => router.push(loginHref)}
                >
                    <Text style={styles.buttonText}>{t.registrationSecondary}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonTertiary}
                    onPress={() => router.push(homeHref)}
                >
                    <Text style={styles.buttonTertiaryText}>{t.registrationTertiary}</Text>
                </TouchableOpacity>
                <Text style={styles.microcopy}>{t.registrationMicrocopy}</Text>
            </View>
        </View>
    );
}