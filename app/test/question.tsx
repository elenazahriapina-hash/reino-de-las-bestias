import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

import en from "../../src/lang/en";
import es from "../../src/lang/es";
import pt from "../../src/lang/pt";
import ru from "../../src/lang/ru";

import { questions } from "../../src/data/questions";
import { styles } from "../../src/styles/startScreenStyles";

type Lang = "ru" | "en" | "es" | "pt";

export default function QuestionScreen() {
    const router = useRouter();
    const { step, lang } = useLocalSearchParams<{
        step?: string;
        lang?: Lang;
    }>();

    const currentStep = Number(step ?? 1);
    const currentLang: Lang = (lang ?? "ru") as Lang;
    const translations = { ru, en, es, pt };
    const t = translations[currentLang];
    const question = questions[currentStep - 1];

    const [answer, setAnswer] = useState<string>("");

    useEffect(() => {
        if (!question) {
            const href = {
                pathname: "/test/finish",
                params: { lang: currentLang },
            } as unknown as Href;
            router.replace(href);
        }
    }, [currentLang, question, router]);

    if (!question) {
        return null;
    }

    // ⏭ переход к следующему вопросу
    const goNext = async () => {
        if (!answer.trim()) return;

        // сохраняем ответ (пока просто по номеру вопроса)
        await AsyncStorage.setItem(`answer_${currentStep}`, answer);

        const href = {
            pathname: "/test/question",
            params: {
                step: String(currentStep + 1),
                lang: currentLang,
            },
        } as unknown as Href;
        router.push(href);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>

                    {/* 🔹 ЦЕНТР ЭКРАНА */}
                    <View style={styles.center}>

                        {/* Номер вопроса */}
                        <Text style={styles.subtitle}> {t.questionWord}  {currentStep}</Text>

                        {/* Текст вопроса */}
                        <Text style={styles.title}>
                            {question.text[currentLang]}
                        </Text>

                        {/* Варианты ответа на выбор */}
                        {question.type === "choice" && (
                            <View>
                                {Object.entries(question.options[currentLang]).map(
                                    ([key, value]) => (
                                        <TouchableOpacity
                                            key={key}
                                            style={[
                                                styles.button,
                                                answer === key && { backgroundColor: "#C89B3C" },
                                            ]}
                                            onPress={() => setAnswer(key)}
                                        >
                                            <Text style={styles.buttonText}>
                                                {key}: {value}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                )}
                            </View>
                        )}

                        {/* Открытые вопросы */}
                        {question.type === "open" && (
                            <TextInput
                                style={styles.textarea}
                                placeholder={question.placeholder[currentLang]}
                                placeholderTextColor="#999"
                                value={answer}
                                onChangeText={(text) => {
                                    if (question.inputType === "number") {
                                        setAnswer(text.replace(/[^0-9]/g, ""));
                                    } else {
                                        setAnswer(text);
                                    }
                                }}
                                keyboardType={question.inputType === "number" ? "numeric" : "default"}
                                multiline={question.inputType !== "number"}
                                returnKeyType="done"
                                onSubmitEditing={Keyboard.dismiss}
                            />
                        )}
                    </View>

                    {/* Кнопка далее */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={[styles.button, !answer && { opacity: 0.5 }]}
                            disabled={!answer}
                            onPress={goNext}
                        >
                            <Text style={styles.buttonText}>{t.next}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );

}
