import { View, Text, TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import ru from "../src/lang/ru";
import en from "../src/lang/en";
import es from "../src/lang/es";
import pt from "../src/lang/pt";

import { useLocalSearchParams, useRouter } from "expo-router";
import { styles } from "../src/styles/startScreenStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Lang = "ru" | "en" | "es" | "pt";

export default function NameScreen() {
    const router = useRouter(); // ✅ внутри компонента
    const { lang } = useLocalSearchParams<{ lang?: Lang }>();

    const translations = { ru, en, es, pt };
    const t = translations[lang ?? "ru"];

    const [name, setName] = useState("");

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Text style={styles.title}>{t.nameTitle}</Text>
                        <Text style={styles.subtitle}>{t.nameHint}</Text>

                        <TextInput
                            style={styles.input}
                            placeholder={t.namePlaceholder}
                            placeholderTextColor="#999"
                            value={name}
                            onChangeText={setName}
                            returnKeyType="done"
                            onSubmitEditing={Keyboard.dismiss}   // ✅ “Готово” закроет клавиатуру
                        />
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={[styles.button, !name && styles.buttonDisabled]}
                            disabled={!name}
                            onPress={async () => {
                                await AsyncStorage.setItem("userName", name.trim());
                                router.push({
                                    pathname: "/test/question",
                                    params: { step: "1", lang: lang ?? "ru" }, // ✅ step лучше строкой
                                });
                            }}
                        >
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
