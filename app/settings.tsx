import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { sendTestToBackend, type ShortResponse } from "../src/api/backend";
import en from "../src/lang/en";
import es from "../src/lang/es";
import pt from "../src/lang/pt";
import ru from "../src/lang/ru";
import { styles as startScreenStyles } from "../src/styles/startScreenStyles";
import {
    type AnimalCode,
    type ElementRu,
    type Gender,
} from "../src/utils/animals";

type Lang = "ru" | "en" | "es" | "pt";

type ShortResult = ShortResponse["result"];

type LockedArchetype = {
    animal: AnimalCode;
    element: ElementRu;
    genderForm: Gender;
};

const translations = { ru, en, es, pt };
const LANG_OPTIONS: Lang[] = ["ru", "en", "es", "pt"];

export default function SettingsScreen() {
    const router = useRouter();
    const { lang } = useLocalSearchParams<{ lang?: Lang }>();
    const [currentLang, setCurrentLang] = useState<Lang>("ru");
    const [nameInput, setNameInput] = useState("");
    const [isUpdatingShortResult, setIsUpdatingShortResult] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [authProvider, setAuthProvider] = useState<string | null>(null);
    const [authIdentifier, setAuthIdentifier] = useState<string | null>(null);

    const t = translations[currentLang];

    const shortResultHref = useMemo(
        () =>
            ({
                pathname: "/result/short",
                params: { lang: currentLang },
            }) as unknown as Href,
        [currentLang]
    );

    const mainHref = useMemo(
        () =>
            ({
                pathname: "/",
                params: { lang: currentLang },
            }) as unknown as Href,
        [currentLang]
    );

    const handleGoToMain = async () => {
        await AsyncStorage.setItem("skipAutoHubOnce", "true");
        router.push(mainHref);
    };

    const authInfo = useMemo(() => {
        if (!authProvider || !authIdentifier) {
            return null;
        }
        if (authProvider === "google") {
            return { label: "email:", value: authIdentifier };
        }
        if (authProvider === "telegram") {
            return { label: "Telegram:", value: authIdentifier };
        }
        return null;
    }, [authIdentifier, authProvider]);

    useEffect(() => {
        if (lang && LANG_OPTIONS.includes(lang)) {
            setCurrentLang(lang);
        }
    }, [lang]);

    useEffect(() => {
        const loadSettings = async () => {
            const [savedLang, savedName, savedProvider, savedIdentifier] = await AsyncStorage.multiGet([
                "lang",
                "userName",
                "authProvider",
                "authIdentifier",
            ]);

            const langValue = savedLang?.[1];
            if (langValue && LANG_OPTIONS.includes(langValue as Lang)) {
                setCurrentLang(langValue as Lang);
            }

            const nameValue = savedName?.[1];
            if (nameValue) {
                setNameInput(nameValue);
            }


            const providerValue = savedProvider?.[1];
            if (providerValue) {
                setAuthProvider(providerValue);
            }

            const identifierValue = savedIdentifier?.[1];
            if (identifierValue) {
                setAuthIdentifier(identifierValue);
            }
        };

        loadSettings();

    }, []);

    const handleSaveName = async () => {
        const trimmed = nameInput.trim();
        setUpdateError(null);
        setUpdateSuccess(false);

        if (trimmed.length === 0) {
            await AsyncStorage.removeItem("userName");
            setNameInput("");
        } else {
            await AsyncStorage.setItem("userName", trimmed);
            setNameInput(trimmed);
        }

        setIsUpdatingShortResult(true);

        try {
            const storedLang = await AsyncStorage.getItem("lang");
            const effectiveLang =
                storedLang && LANG_OPTIONS.includes(storedLang as Lang)
                    ? (storedLang as Lang)
                    : currentLang;

            const genderRaw = await AsyncStorage.getItem("gender");

            const gender: Gender =
                genderRaw === "female" || genderRaw === "male" ? genderRaw : "unspecified";
            const cachedShortRaw = await AsyncStorage.getItem("lastShortResult");
            if (!cachedShortRaw) {
                setUpdateError(t.noSavedResultToUpdate);
                return;
            }

            let lockedArchetype: LockedArchetype;
            try {
                const cachedShort = JSON.parse(cachedShortRaw) as ShortResult;
                lockedArchetype = {
                    animal: cachedShort.animal,
                    element: cachedShort.element,
                    genderForm: cachedShort.genderForm,
                };
            } catch (error) {
                console.warn("Failed to parse lastShortResult", error);
                setUpdateError(t.noSavedResultToUpdate);
                return;
            }

            const keys = await AsyncStorage.getAllKeys();
            const answerKeys = keys.filter((key) => key.startsWith("answer_"));
            const pairs = await AsyncStorage.multiGet(answerKeys);

            const answers = pairs
                .filter(([_, value]) => value !== null)
                .map(([key, value]) => ({
                    questionId: Number((key ?? "").replace("answer_", "")),
                    answer: value ?? "",
                }))
                .sort((a, b) => a.questionId - b.questionId);

            const payload = {
                name: trimmed,
                lang: effectiveLang,
                gender,
                answers,
                lockedAnimal: lockedArchetype.animal,
                lockedElement: lockedArchetype.element,
                lockedGenderForm: lockedArchetype.genderForm,
            };

            const response = await sendTestToBackend("short", payload);
            const nextShortResult = response.result;

            await AsyncStorage.multiSet([
                ["result_animal", nextShortResult.animal],
                ["result_element", nextShortResult.element],
                ["runId", nextShortResult.runId],
                ["shortResult", JSON.stringify(nextShortResult)],
                ["lastShortResult", JSON.stringify(nextShortResult)],
                ["lastShortResultAt", Date.now().toString()],
            ]);

            setUpdateSuccess(true);
        } catch (error) {
            console.error("Failed to update short result", error);
            setUpdateError(t.updateError);
        } finally {
            setIsUpdatingShortResult(false);
        }
    };

    const changeLang = async (nextLang: Lang) => {
        setCurrentLang(nextLang);
        await AsyncStorage.setItem("lang", nextLang);
    };

    const handleLogout = async () => {
        const keys = await AsyncStorage.getAllKeys();
        const answerKeys = keys.filter((key) => key.startsWith("answer_"));
        await AsyncStorage.multiSet([["isProfileActive", "false"]]);
        await AsyncStorage.multiRemove([
            "authProvider",
            "authIdentifier",
            "activeUserId",
            "guestShortResult",
            "guestShortResultAt",
            "guestName",
            ...answerKeys,
        ]);
        setAuthProvider(null);
        setAuthIdentifier(null);
        router.push(mainHref);
    };

    return (
        <View style={startScreenStyles.container}>
            <ScrollView
                contentContainerStyle={settingsStyles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={startScreenStyles.title}>{t.settingsTitle}</Text>

                <View style={settingsStyles.section}>
                    <Text style={settingsStyles.sectionTitle}>{t.language}</Text>
                    <View style={settingsStyles.languageRow}>
                        {LANG_OPTIONS.map((option) => {
                            const isActive = option === currentLang;
                            return (
                                <Pressable
                                    key={option}
                                    style={[
                                        settingsStyles.languageButton,
                                        isActive && settingsStyles.languageButtonActive,
                                    ]}
                                    onPress={() => changeLang(option)}
                                    accessibilityLabel={`${t.language} ${option.toUpperCase()}`}
                                >
                                    <Text
                                        style={[
                                            settingsStyles.languageText,
                                            isActive && settingsStyles.languageTextActive,
                                        ]}
                                    >
                                        {option.toUpperCase()}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>

                <View style={settingsStyles.section}>
                    <Text style={settingsStyles.sectionTitle}>{t.nicknameLabel}</Text>
                    <TextInput
                        style={startScreenStyles.input}
                        value={nameInput}
                        onChangeText={setNameInput}
                        placeholder={t.namePlaceholder}
                        placeholderTextColor="#7F8790"
                    />
                    {authInfo ? (
                        <View style={settingsStyles.authInfo}>
                            <Text style={settingsStyles.authLabel}>{authInfo.label}</Text>
                            <Text style={settingsStyles.authValue}>{authInfo.value}</Text>
                        </View>
                    ) : null}
                    <TouchableOpacity
                        style={[startScreenStyles.button, settingsStyles.saveButton]}
                        onPress={handleSaveName}
                    >
                        <Text style={startScreenStyles.buttonText}>{t.save}</Text>
                    </TouchableOpacity>
                    <View style={settingsStyles.updateStatus}>
                        {isUpdatingShortResult ? (
                            <View style={settingsStyles.updateRow}>
                                <ActivityIndicator size="small" color="#C89B3C" />
                                <Text style={settingsStyles.updateText}>{t.updating}</Text>
                            </View>
                        ) : updateError ? (
                            <Text style={settingsStyles.updateError}>{updateError}</Text>
                        ) : updateSuccess ? (
                            <Text style={settingsStyles.updateSuccess}>{t.updated}</Text>
                        ) : null}
                    </View>
                </View>

                <View style={settingsStyles.section}>
                    <TouchableOpacity
                        style={startScreenStyles.buttonSecondary}
                        onPress={handleLogout}
                    >
                        <Text style={startScreenStyles.buttonText}>{t.logoutProfile}</Text>
                    </TouchableOpacity>
                </View>

                <View style={settingsStyles.section}>
                    <TouchableOpacity
                        style={startScreenStyles.buttonSecondary}
                        onPress={() => router.push(shortResultHref)}
                    >
                        <Text style={startScreenStyles.buttonText}>{t.backToResult}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={startScreenStyles.buttonTertiary}
                        onPress={handleGoToMain}
                    >
                        <Text style={startScreenStyles.buttonTertiaryText}>{t.goToMain}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const settingsStyles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 48,
        paddingTop: 24,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        color: "#E6E6E6",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
    },
    languageRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    languageButton: {
        borderColor: "#2A2F36",
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    languageButtonActive: {
        borderColor: "#C89B3C",
    },
    languageText: {
        color: "#CFCFCF",
        fontSize: 14,
        letterSpacing: 1,
    },
    languageTextActive: {
        color: "#C89B3C",
        fontWeight: "600",
    },
    saveButton: {
        marginTop: 16,
    },
    authInfo: {
        marginTop: 12,
        paddingHorizontal: 4,
    },
    authLabel: {
        color: "#7F8790",
        fontSize: 13,
        textTransform: "none",
    },
    authValue: {
        color: "#CFCFCF",
        fontSize: 14,
        marginTop: 4,
    },
    updateStatus: {
        marginTop: 12,
        minHeight: 20,
    },
    updateRow: {
        alignItems: "center",
        flexDirection: "row",
        gap: 8,
    },
    updateText: {
        color: "#7F8790",
        fontSize: 13,
    },
    updateError: {
        color: "#C97B7B",
        fontSize: 13,
    },
    updateSuccess: {
        color: "#7FBF8E",
        fontSize: 13,
    },
});