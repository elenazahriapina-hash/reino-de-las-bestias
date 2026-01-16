import { View, Text, TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ru from "../../src/lang/ru";
import en from "../../src/lang/en";
import es from "../../src/lang/es";
import pt from "../../src/lang/pt";

import { styles } from "../../src/styles/startScreenStyles";
import { questions } from "../../src/data/questions";

type Lang = "ru" | "en" | "es" | "pt";

export default function QuestionScreen() {
    const router = useRouter();
    const { step, lang } = useLocalSearchParams<{
        step?: string;
        lang?: Lang;
    }>();

    const currentStep = Number(step ?? 1);
    const currentLang = (lang ?? "ru") as "ru" | "en" | "es" | "pt";
    const translations = { ru, en, es, pt };
    const t = translations[currentLang];
    const question = questions[currentStep - 1];

    const [answer, setAnswer] = useState<string>("");

    useEffect(() => {
        if (!question) {
            router.replace("/test/finish");
        }
    }, [question]);

    if (!question) {
        return null;
    }

    // ⏭ переход к следующему вопросу
    const goNext = async () => {
        if (!answer.trim()) return;

        // сохраняем ответ (пока просто по номеру вопроса)
        await AsyncStorage.setItem(`answer_${currentStep}`, answer);

        router.push({
            pathname: "/test/question",
            params: {
                step: currentStep + 1,
                lang: currentLang,
            },
        });
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
