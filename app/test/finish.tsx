import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import en from "../../src/lang/en";
import es from "../../src/lang/es";
import pt from "../../src/lang/pt";
import ru from "../../src/lang/ru";

import { styles } from "../../src/styles/startScreenStyles";

type Lang = "ru" | "en" | "es" | "pt";

export default function FinishScreen() {
    const router = useRouter();
    const { lang } = useLocalSearchParams<{ lang?: Lang }>();

    const translations = { ru, en, es, pt };
    const currentLang: Lang = (lang ?? "ru") as Lang;
    const t = translations[currentLang];

    const [name, setName] = useState<string>("");
    const [answers, setAnswers] = useState<Record<string, string>>({});


    useEffect(() => {
        const loadData = async () => {
            // имя
            const storedName = await AsyncStorage.getItem("userName");
            if (storedName) setName(storedName);

            // ответы
            const keys = await AsyncStorage.getAllKeys();
            const answerKeys = keys.filter(k => k.startsWith("answer_"));
            const pairs = await AsyncStorage.multiGet(answerKeys);

            const result: Record<string, string> = {};
            pairs.forEach(([key, value]) => {
                if (key && value) result[key] = value;
            });

            setAnswers(result);
            console.log("📦 Все ответы:", result);
        };

        loadData();
    }, []);

    const collectAnswers = async () => {
        const result = [];

        for (let i = 1; i <= 31; i++) {
            const value = await AsyncStorage.getItem(`answer_${i}`);
            if (value !== null) {
                result.push({
                    questionId: i,
                    answer: value,
                });
            }
        }

        return result;
    };


    return (
        <View style={styles.container}>
            {/* 🔹 ЦЕНТР ЭКРАНА */}
            <View style={styles.center}>
                <Text style={styles.title}>
                    {t.finishTitle}
                </Text>

                <Text style={styles.quote}>
                    {t.finishText}
                </Text>


                <View style={styles.bottom}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() =>
                            router.push({
                                pathname: "/result/loading",
                                params: { lang: currentLang },
                            } as unknown as Href)
                        }
                    >
                        <Text style={styles.buttonText}>{t.getResult}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
