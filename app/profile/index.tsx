import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ru from "../../src/lang/ru";
import en from "../../src/lang/en";
import es from "../../src/lang/es";
import pt from "../../src/lang/pt";
import { styles as startScreenStyles } from "../../src/styles/startScreenStyles";

type Lang = "ru" | "en" | "es" | "pt";

const translations = { ru, en, es, pt };

export default function ProfileScreen() {
  const router = useRouter();
  const { lang } = useLocalSearchParams<{ lang?: string }>();
  const currentLang: Lang =
    lang === "ru" || lang === "en" || lang === "es" || lang === "pt" ? lang : "ru";
  const t = translations[currentLang];
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("userName").then((savedName) => {
      if (savedName) {
        setName(savedName);
      }
    });
  }, []);

  return (
    <View style={startScreenStyles.container}>
      <View style={startScreenStyles.center}>
        <Text style={startScreenStyles.title}>{t.profileTitle}</Text>
        {name ? (
          <Text style={startScreenStyles.subtitle}>
            {t.profileName}: {name}
          </Text>
        ) : null}
        <Text style={startScreenStyles.quote}>
          {t.profileSoon}
        </Text>
      </View>

      <View style={startScreenStyles.bottom}>
        <TouchableOpacity
          style={startScreenStyles.button}
          onPress={() => router.back()}
          accessibilityLabel={`${t.back} (${currentLang})`}
        >
          <Text style={startScreenStyles.buttonText}>{t.back}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}