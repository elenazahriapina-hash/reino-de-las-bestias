import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { styles } from "../src/styles/startScreenStyles";
import { getTranslations, type Lang } from "../src/lang";
import { useResolvedLang } from "../src/lang/useResolvedLang";

export default function PaywallScreen() {
    const { lang } = useLocalSearchParams<{ lang?: Lang }>();
    const resolvedLang = useResolvedLang(lang);
    const t = getTranslations(resolvedLang);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t.paywallTitle}</Text>
            <Text style={styles.quote}>{t.paywallDescription}</Text>
        </View>
    );
}