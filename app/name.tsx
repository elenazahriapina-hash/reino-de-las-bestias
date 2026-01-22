import { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import en from "../src/lang/en";
import es from "../src/lang/es";
import pt from "../src/lang/pt";
import ru from "../src/lang/ru";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { type Href, useLocalSearchParams, useRouter } from "expo-router";
import { styles } from "../src/styles/startScreenStyles";

type Lang = "ru" | "en" | "es" | "pt";

export default function NameScreen() {
    const router = useRouter(); // ✅ внутри компонента
    const { lang } = useLocalSearchParams<{ lang?: Lang }>();
    const currentLang: Lang = (lang ?? "ru") as Lang;

    const translations = { ru, en, es, pt };
    const t = translations[currentLang];

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
                        <Text style={styles.subtitle}>{t.nameInfo}</Text>

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

                                const href = {
                                    pathname: "/test/question",
                                    params: { step: "1", lang: currentLang },
                                } as unknown as Href;

                                router.push(href);
                            }}
                        >
                            <Text style={styles.buttonText}>{t.ok}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
