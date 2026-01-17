import { View, Text, TouchableOpacity, Pressable, } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getTranslations, isLang, type Lang } from "../src/lang";

import { styles } from "../src/styles/startScreenStyles";

export default function StartScreen() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("ru");
  const [menuOpen, setMenuOpen] = useState(false);

  const t = getTranslations(lang);

  // 🔹 загрузка сохранённого языка
  useEffect(() => {
    AsyncStorage.getItem("lang").then((saved) => {
      if (isLang(saved)) {
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
          onPress={() => router.push({ pathname: "/name", params: { lang } })}
        >
          <Text style={styles.buttonText}>{t.start}</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>{t.disclaimer}</Text>
      </View>
    </View>
  );
}
