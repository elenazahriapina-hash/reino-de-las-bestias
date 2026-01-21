import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { styles as startScreenStyles } from "../src/styles/startScreenStyles";

export default function IntroScreen() {
    const router = useRouter();
    const { lang } = useLocalSearchParams<{ lang?: string }>();
    const currentLang = typeof lang === "string" ? lang : "ru";

    return (
        <View style={startScreenStyles.container}>
            <ScrollView contentContainerStyle={introStyles.scrollContent}>
                <Text style={startScreenStyles.title}>🧠 Битва зверей</Text>

                <Text style={introStyles.paragraph}>
                    Это короткое вступление поможет разобраться, как устроена игра и зачем
                    она тебе.
                </Text>
                <Text style={introStyles.paragraph}>
                    Ты увидишь набор утверждений и выберешь те, которые ближе всего к твоему
                    характеру и привычкам.
                </Text>

                <Text style={introStyles.paragraph}>Внутри тебя ждёт:</Text>
                <Text style={introStyles.bullet}>• 12 архетипов с уникальными чертами</Text>
                <Text style={introStyles.bullet}>• 24 коротких вопроса без «правильных» ответов</Text>
                <Text style={introStyles.bullet}>• Подробный результат с описанием и рекомендациями</Text>

                <View style={introStyles.buttonWrapper}>
                    <TouchableOpacity
                        style={startScreenStyles.button}
                        onPress={() => router.push({ pathname: "/name", params: { lang: currentLang } })}
                    >
                        <Text style={startScreenStyles.buttonText}>Начнём</Text>
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