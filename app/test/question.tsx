import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { useEffect, useState } from "react";
import {
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

import en from "../../src/lang/en";
import es from "../../src/lang/es";
import pt from "../../src/lang/pt";
import ru from "../../src/lang/ru";

import { IMAGES } from "../../src/assets/images";
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
    const [backgroundImage] = useState(() => {
        const images = [
            IMAGES.questions.wolf,
            IMAGES.questions.lion,
            IMAGES.questions.tiger,
            IMAGES.questions.lynx,
            IMAGES.questions.panther,
            IMAGES.questions.bear,
            IMAGES.questions.fox,
            IMAGES.questions.wolverine,
            IMAGES.questions.deer,
            IMAGES.questions.monkey,
            IMAGES.questions.rabbit,
            IMAGES.questions.buffalo,
            IMAGES.questions.ram,
            IMAGES.questions.capybara,
            IMAGES.questions.elephant,
            IMAGES.questions.horse,
            IMAGES.questions.eagle,
            IMAGES.questions.owl,
            IMAGES.questions.raven,
            IMAGES.questions.parrot,
            IMAGES.questions.snake,
            IMAGES.questions.crocodile,
            IMAGES.questions.turtle,
        ];
        return images[Math.floor(Math.random() * images.length)];
    });

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
        <ImageBackground source={backgroundImage} style={questionStyles.background} resizeMode="cover">
            <View style={questionStyles.overlay} />
            <KeyboardAvoidingView
                style={questionStyles.contentWrapper}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={[styles.container, questionStyles.contentContainer]}>
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
                                                    styles.answerButton,
                                                    answer === key && styles.answerButtonSelected,
                                                ]}
                                                onPress={() => setAnswer(key)}
                                            >
                                                <Text style={styles.answerButtonText}>
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
                                    placeholderTextColor="#7E8794"
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
                                style={[styles.button, !answer && styles.buttonDisabled]}
                                disabled={!answer}
                                onPress={goNext}
                            >
                                <Text style={styles.buttonText}>{t.next}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ImageBackground>
    );

}

const questionStyles = StyleSheet.create({
    background: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(11, 19, 32, 0.72)",
    },
    contentWrapper: {
        flex: 1,
    },
    contentContainer: {
        backgroundColor: "transparent",
    },
});
