import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { styles as startScreenStyles } from "../../src/styles/startScreenStyles";

export default function ProfileScreen() {
    const router = useRouter();
    const { lang } = useLocalSearchParams<{ lang?: string }>();
    const currentLang = typeof lang === "string" ? lang : "ru";

    return (
        <View style={startScreenStyles.container}>
            <View style={startScreenStyles.center}>
                <Text style={startScreenStyles.title}>Профиль</Text>
                <Text style={startScreenStyles.quote}>
                    Скоро здесь будет вход через Telegram или Google.
                </Text>
            </View>

            <View style={startScreenStyles.bottom}>
                <TouchableOpacity
                    style={startScreenStyles.button}
                    onPress={() => router.back()}
                    accessibilityLabel={`Назад (${currentLang})`}
                >
                    <Text style={startScreenStyles.buttonText}>Назад</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}