import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import en from "../src/lang/en";
import es from "../src/lang/es";
import pt from "../src/lang/pt";
import ru from "../src/lang/ru";

import { styles } from "../src/styles/startScreenStyles";

type Lang = "ru" | "en" | "es" | "pt";

const COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000;

export default function CooldownScreen() {
    const router = useRouter();
    const { lang } = useLocalSearchParams<{ lang?: Lang }>();

    const translations = { ru, en, es, pt };
    const currentLang: Lang = (lang ?? "ru") as Lang;
    const t = translations[currentLang];

    const [remainingMs, setRemainingMs] = useState(0);

    useEffect(() => {
        const loadCooldown = async () => {
            const lastTestAtRaw = await AsyncStorage.getItem("lastTestAt");
            const lastTestAt = lastTestAtRaw ? Number(lastTestAtRaw) : NaN;
            if (!Number.isFinite(lastTestAt)) {
                setRemainingMs(0);
                return;
            }
            const elapsed = Date.now() - lastTestAt;
            setRemainingMs(Math.max(0, COOLDOWN_MS - elapsed));
        };

        loadCooldown();
    }, []);

    const { remainingDays, remainingHours } = useMemo(() => {
        const totalHours = Math.ceil(remainingMs / (60 * 60 * 1000));
        const days = Math.floor(totalHours / 24);
        const hours = totalHours % 24;
        return { remainingDays: days, remainingHours: hours };
    }, [remainingMs]);

    const shortResultHref = {
        pathname: "/result/short",
        params: { lang: currentLang },
    } as unknown as Href;

    const settingsHref = {
        pathname: "/settings",
        params: { lang: currentLang },
    } as unknown as Href;

    const mainHref = {
        pathname: "/",
        params: { lang: currentLang },
    } as unknown as Href;

    const handleGoToMain = async () => {
        await AsyncStorage.setItem("skipAutoHubOnce", "true");
        router.push(mainHref);
    };


    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <Text style={styles.title}>{t.cooldownTitle}</Text>
                <Text style={styles.body}>{t.cooldownBody}</Text>
                {remainingMs > 0 ? (
                    <Text style={styles.quote}>
                        {t.cooldownRemaining
                            .replace("{days}", String(remainingDays))
                            .replace("{hours}", String(remainingHours))}
                    </Text>
                ) : (
                    <Text style={styles.quote}>{t.cooldownReady}</Text>
                )}
            </View>

            <View style={styles.bottom}>
                <TouchableOpacity style={styles.button} onPress={() => router.push(shortResultHref)}>
                    <Text style={styles.buttonText}>{t.backToResult}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSecondary} onPress={() => router.push(settingsHref)}>
                    <Text style={styles.buttonText}>{t.settings}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonTertiary} onPress={handleGoToMain}>
                    <Text style={styles.buttonTertiaryText}>{t.goToMain}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}