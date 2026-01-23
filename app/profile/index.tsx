import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import en from "../../src/lang/en";
import es from "../../src/lang/es";
import pt from "../../src/lang/pt";
import ru from "../../src/lang/ru";
import { styles as startScreenStyles } from "../../src/styles/startScreenStyles";
import {
  getArchetypeImage,
  type AnimalCode,
  type ElementRu,
  type Gender,
} from "../../src/utils/animals";

type Lang = "ru" | "en" | "es" | "pt";

type ShortResult = {
  animal: AnimalCode;
  element: ElementRu;
  genderForm: Gender;
  text: string;
};

type FullResult = {
  text: string;
};


const translations = { ru, en, es, pt };
const LANG_OPTIONS: Lang[] = ["ru", "en", "es", "pt"];

export default function ProfileScreen() {
  const router = useRouter();
  const { lang } = useLocalSearchParams<{ lang?: Lang }>();
  const [currentLang, setCurrentLang] = useState<Lang>(
    (lang ?? "ru") as Lang
  );
  const [nameInput, setNameInput] = useState("");
  const [shortResult, setShortResult] = useState<ShortResult | null>(null);
  const [fullResult, setFullResult] = useState<FullResult | null>(null);
  const [hasFullAccess, setHasFullAccess] = useState(false);
  const [shortImage, setShortImage] = useState<any | null>(null);

  const t = translations[currentLang];

  const paywallHref = useMemo(
    () =>
      ({
        pathname: "/paywall",
        params: { lang: currentLang },
      }) as unknown as Href,
    [currentLang]
  );

  useEffect(() => {
    if (lang && LANG_OPTIONS.includes(lang)) {
      setCurrentLang(lang);
    }
  }, [lang]);

  useEffect(() => {
    const loadProfile = async () => {
      const [
        savedLang,
        savedName,
        savedShortResult,
        savedFullResult,
        savedHasFullAccess,
      ] = await AsyncStorage.multiGet([
        "lang",
        "userName",
        "lastShortResult",
        "lastFullResult",
        "hasFullAccess",
      ]);

      const langValue = savedLang?.[1];
      if (langValue && LANG_OPTIONS.includes(langValue as Lang)) {
        setCurrentLang(langValue as Lang);
      }

      const nameValue = savedName?.[1];
      if (nameValue) {
        setNameInput(nameValue);
      }

      const hasAccessValue = savedHasFullAccess?.[1];
      setHasFullAccess(hasAccessValue === "true");

      const shortValue = savedShortResult?.[1];
      if (shortValue) {
        try {
          const parsedShort = JSON.parse(shortValue) as ShortResult;
          setShortResult(parsedShort);
        } catch (error) {
          console.warn("Failed to parse lastShortResult", error);
        }
      }

      const fullValue = savedFullResult?.[1];
      if (fullValue) {
        try {
          const parsedFull = JSON.parse(fullValue) as FullResult;
          setFullResult(parsedFull);
        } catch (error) {
          console.warn("Failed to parse lastFullResult", error);
        }
      }
    };

    loadProfile();

  }, []);

  useEffect(() => {
    if (!shortResult) {
      setShortImage(null);
      return;
    }

    try {
      const image = getArchetypeImage({
        animal: shortResult.animal,
        element: shortResult.element,
        gender: shortResult.genderForm,
      });
      setShortImage(image);
    } catch (error) {
      console.warn("Failed to resolve archetype image", error);
      setShortImage(null);
    }
  }, [shortResult]);

  const handleSaveName = async () => {
    const trimmed = nameInput.trim();
    if (trimmed.length === 0) {
      await AsyncStorage.removeItem("userName");
      setNameInput("");
      return;
    }
    await AsyncStorage.setItem("userName", trimmed);
    setNameInput(trimmed);
  };

  const changeLang = async (nextLang: Lang) => {
    setCurrentLang(nextLang);
    await AsyncStorage.setItem("lang", nextLang);
  };

  return (
    <View style={startScreenStyles.container}>
      <ScrollView
        contentContainerStyle={profileStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={startScreenStyles.title}>{t.profileTitle}</Text>

        <View style={profileStyles.section}>
          <Text style={profileStyles.sectionTitle}>{t.language}</Text>
          <View style={profileStyles.languageRow}>
            {LANG_OPTIONS.map((option) => {
              const isActive = option === currentLang;
              return (
                <Pressable
                  key={option}
                  style={[
                    profileStyles.languageButton,
                    isActive && profileStyles.languageButtonActive,
                  ]}
                  onPress={() => changeLang(option)}
                  accessibilityLabel={`${t.language} ${option.toUpperCase()}`}
                >
                  <Text
                    style={[
                      profileStyles.languageText,
                      isActive && profileStyles.languageTextActive,
                    ]}
                  >
                    {option.toUpperCase()}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={profileStyles.section}>
          <Text style={profileStyles.sectionTitle}>{t.nicknameLabel}</Text>
          <TextInput
            style={startScreenStyles.input}
            value={nameInput}
            onChangeText={setNameInput}
            placeholder={t.namePlaceholder}
            placeholderTextColor="#7F8790"
          />
          <TouchableOpacity
            style={[startScreenStyles.button, profileStyles.saveButton]}
            onPress={handleSaveName}
          >
            <Text style={startScreenStyles.buttonText}>{t.save}</Text>
          </TouchableOpacity>
        </View>

        <View style={profileStyles.section}>
          <Text style={profileStyles.sectionTitle}>{t.yourResult}</Text>
          {shortResult ? (
            <View style={profileStyles.resultCard}>
              {shortImage ? (
                <Image source={shortImage} style={profileStyles.resultImage} />
              ) : null}
              <Text style={profileStyles.resultLabel}>{t.shortVersion}</Text>
              <Text style={profileStyles.resultText}>{shortResult.text}</Text>
            </View>
          ) : (
            <Text style={profileStyles.helperText}>{t.noSavedResult}</Text>
          )}

          {hasFullAccess ? (
            <View style={profileStyles.resultCard}>
              <Text style={profileStyles.resultLabel}>{t.fullVersion}</Text>
              {fullResult ? (
                <Text style={profileStyles.resultText}>{fullResult.text}</Text>
              ) : (
                <Text style={profileStyles.helperText}>{t.noSavedResult}</Text>
              )}
            </View>
          ) : (
            <TouchableOpacity
              style={[startScreenStyles.buttonSecondary, profileStyles.getFullButton]}
              onPress={() => router.push(paywallHref)}
              accessibilityLabel={t.getFull}
            >
              <Text style={startScreenStyles.buttonText}>{t.getFull}</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const profileStyles = StyleSheet.create({
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
  resultCard: {
    backgroundColor: "#1A1E24",
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
  },
  resultImage: {
    width: 140,
    height: 140,
    alignSelf: "center",
    marginBottom: 16,
  },
  resultLabel: {
    color: "#C89B3C",
    fontSize: 14,
    marginBottom: 8,
  },
  resultText: {
    color: "#E6E6E6",
    fontSize: 14,
    lineHeight: 22,
  },
  helperText: {
    color: "#7F8790",
    fontSize: 13,
    lineHeight: 20,
  },
  getFullButton: {
    marginTop: 16,
  },
});