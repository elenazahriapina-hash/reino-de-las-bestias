import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import en from "../src/lang/en";
import es from "../src/lang/es";
import pt from "../src/lang/pt";
import ru from "../src/lang/ru";
import { styles as startScreenStyles } from "../src/styles/startScreenStyles";

type Lang = "ru" | "en" | "es" | "pt";

const translations = { ru, en, es, pt };

export default function IntroScreen() {
    const router = useRouter();
    const { lang } = useLocalSearchParams<{ lang?: Lang }>();
    const currentLang: Lang = (lang ?? "ru") as Lang;
    const t = translations[currentLang];

    return (
        <View style={startScreenStyles.container}>
            <ScrollView contentContainerStyle={introStyles.scrollContent}>
                <Text style={startScreenStyles.title}>{t.introTitle}</Text>

                <Text style={introStyles.paragraph}>{t.introP1}</Text>
                <Text style={introStyles.paragraph}>{t.introP2}</Text>

                <Text style={introStyles.paragraph}>{t.introP3}</Text>
                <Text style={introStyles.bullet}>{t.introB1}</Text>
                <Text style={introStyles.bullet}>{t.introB2}</Text>
                <Text style={introStyles.bullet}>{t.introB3}</Text>

                <View style={introStyles.buttonWrapper}>
                    <TouchableOpacity
                        style={startScreenStyles.button}
                        onPress={() => {
                            const href = {
                                pathname: "/name",
                                params: { lang: currentLang },
                            } as unknown as Href;
                            router.push(href);
                        }}
                    >
                        <Text style={startScreenStyles.buttonText}>{t.introCta}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const introStyles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        paddingTop: 120,
        paddingBottom: 60,
    },
    paragraph: {
        fontSize: 16,
        color: "#E6E6E6",
        lineHeight: 24,
        textAlign: "center",
        marginBottom: 12,
    },
    bullet: {
        fontSize: 16,
        color: "#C89B3C",
        lineHeight: 24,
        textAlign: "left",
        marginBottom: 8,
    },
    buttonWrapper: {
        marginTop: 32,
        alignItems: "center",
    },
});