import { Stack } from "expo-router";

export default function TestLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false, // убираем верхний header
            }}
        />
    );
}