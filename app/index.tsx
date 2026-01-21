import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
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
  const [lang, setLang] = useState<Lang>("ru");
  const [menuOpen, setMenuOpen] = useState(false);

  const t = translations[lang];

  // 🔹 загрузка сохранённого языка
  useEffect(() => {
    AsyncStorage.getItem("lang").then((saved) => {
      if (saved === "ru" || saved === "en" || saved === "es" || saved === "pt") {
        setLang(saved);
      }
    });
  }, []);

  // 🔹 сохранение языка
  const changeLang = async (l: Lang) => {
    setLang(l);
    setMenuOpen(false);
    await AsyncStorage.setItem("lang", l);
  };

  return (
    <View style={styles.container}>
      {/* 🌍 язык справа сверху */}
      <View style={styles.langWrapper}>
        <Pressable onPress={() => setMenuOpen(!menuOpen)}>
          <Text style={styles.langCurrent}>{lang.toUpperCase()}</Text>
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
          onPress={() => router.push(`/intro?lang=${lang}`)}
        >
          <Text style={styles.buttonText}>{t.start}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push(`/profile?lang=${lang}`)}
        >
          <Text style={styles.buttonText}>{t.profileEnter}</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>{t.disclaimer}</Text>
      </View>
    </View>
  );
}
