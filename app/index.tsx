// MARKER: REAL ROOT reino-bestias 2026-01-21

import AsyncStorage from "@react-native-async-storage/async-storage";
import { type Href, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, TouchableOpacity, View, } from "react-native";

import en from "../src/lang/en";
import es from "../src/lang/es";
import pt from "../src/lang/pt";
import ru from "../src/lang/ru";

import { styles } from "../src/styles/startScreenStyles";

type Lang = "ru" | "en" | "es" | "pt";

const translations = { ru, en, es, pt };


export default function StartScreen() {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState<Lang>("ru");
  const [menuOpen, setMenuOpen] = useState(false);

  const t = translations[currentLang];

  useEffect(() => {
    const loadPreferences = async () => {
      const [savedLang, lastShortResult, isProfileActive] =
        await AsyncStorage.multiGet([
          "lang",
          "lastShortResult",
          "isProfileActive",
        ]);
      const langValue = savedLang?.[1];
      const resolvedLang: Lang =
        langValue === "ru" || langValue === "en" || langValue === "es" || langValue === "pt"
          ? langValue
          : "ru";

      setCurrentLang(resolvedLang);

      if (lastShortResult?.[1] && isProfileActive?.[1] === "true") {
        const shortResultHref = {
          pathname: "/result/short",
          params: { lang: resolvedLang },
        } as unknown as Href;
        router.replace(shortResultHref);
      }
    };

    loadPreferences();
  }, [router]);

  // 🔹 сохранение языка
  const changeLang = async (l: Lang) => {
    setCurrentLang(l);
    setMenuOpen(false);
    await AsyncStorage.setItem("lang", l);
  };

  const introHref = { pathname: "/intro", params: { lang: currentLang } } as unknown as Href;
  const providersHref = { pathname: "/auth/providers", params: { lang: currentLang } } as unknown as Href;
  const shortResultHref = { pathname: "/result/short", params: { lang: currentLang } } as unknown as Href;

  const handleProfileEnter = async () => {
    const isActive = await AsyncStorage.getItem("isProfileActive");
    if (isActive === "true") {
      router.push(shortResultHref);
      return;
    }
    router.push(providersHref);
  };

  return (
    <View style={styles.container}>
      {/* 🌍 язык справа сверху */}
      <View style={styles.langWrapper}>
        <Pressable onPress={() => setMenuOpen(!menuOpen)}>
          <Text style={styles.langCurrent}>{currentLang.toUpperCase()}</Text>
        </Pressable>

        {menuOpen && (
          <View style={styles.langMenu}>
            <Pressable onPress={() => changeLang("ru")}>
              <Text style={styles.langItem}>RU</Text>
            </Pressable>
            <Pressable onPress={() => changeLang("en")}>
              <Text style={styles.langItem}>EN</Text>
            </Pressable>
            <Pressable onPress={() => changeLang("es")}>
              <Text style={styles.langItem}>ES</Text>
            </Pressable>
            <Pressable onPress={() => changeLang("pt")}>
              <Text style={styles.langItem}>PT</Text>
            </Pressable>
          </View>
        )}
      </View>

      {/* центр */}
      <View style={styles.center}>
        <Text style={styles.title}>{t.title}</Text>
        <Text style={styles.quote}>{t.quote}</Text>
      </View>

      {/* низ */}
      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push(introHref);
          }}
        >
          <Text style={styles.buttonText}>{t.start}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleProfileEnter}
        >
          <Text style={styles.buttonText}>{t.goToProfile}</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>{t.disclaimer}</Text>
      </View>
    </View>
  );
}
