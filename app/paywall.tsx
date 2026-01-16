import { View, Text } from "react-native";
import { styles } from "../src/styles/startScreenStyles";

export default function PaywallScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Полный разбор</Text>
            <Text style={styles.quote}>Экран оплаты (заглушка)</Text>
        </View>
    );
}
