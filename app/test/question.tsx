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
            require("../../assets/images/questions/wolf.png"),
            require("../../assets/images/questions/lion.png"),
            require("../../assets/images/questions/tiger.png"),
            require("../../assets/images/questions/lynx.png"),
            require("../../assets/images/questions/panther.png"),
            require("../../assets/images/questions/bear.png"),
            require("../../assets/images/questions/fox.png"),
            require("../../assets/images/questions/wolverine.png"),
            require("../../assets/images/questions/deer.png"),
            require("../../assets/images/questions/monkey.png"),
            require("../../assets/images/questions/rabbit.png"),
            require("../../assets/images/questions/buffalo.png"),
            require("../../assets/images/questions/ram.png"),
            require("../../assets/images/questions/capybara.png"),
            require("../../assets/images/questions/elephant.png"),
            require("../../assets/images/questions/horse.png"),
            require("../../assets/images/questions/eagle.png"),
            require("../../assets/images/questions/owl.png"),
            require("../../assets/images/questions/raven.png"),
            require("../../assets/images/questions/parrot.png"),
            require("../../assets/images/questions/snake.png"),
            require("../../assets/images/questions/crocodile.png"),
            require("../../assets/images/questions/turtle.png"),
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
