import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0B1320",
        paddingHorizontal: 24,
    },
    screen: {
        flex: 1,
        backgroundColor: "#0B1320",
    },
    containerAlt: {
        flex: 1,
        backgroundColor: "#0D1624",
        paddingHorizontal: 24,
    },

    center: {
        flex: 1,
        justifyContent: "center",
    },

    title: {
        fontSize: 30,
        color: "#F0F2F4",
        fontFamily: "Manrope-SemiBold",
        lineHeight: 40,
        marginBottom: 32,
        textAlign: "center",
        maxWidth: 520,
        alignSelf: "center",
    },

    quote: {
        fontSize: 16,
        color: "#E4E7EB",
        fontFamily: "Manrope-Regular",
        lineHeight: 26,
        textAlign: "center",
        maxWidth: 520,
        alignSelf: "center",
    },

    body: {
        fontSize: 16,
        color: "#E4E7EB",
        fontFamily: "Manrope-Regular",
        lineHeight: 26,
        textAlign: "center",
        maxWidth: 520,
        alignSelf: "center",
    },

    bottom: {
        marginBottom: 60,
        alignItems: "center",
    },

    button: {
        backgroundColor: "#113b75",
        borderRadius: 20,
        minHeight: 52,
        paddingVertical: 14,
        paddingHorizontal: 48,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
    },

    buttonText: {
        color: "#F5F8FF",
        fontSize: 16,
        fontFamily: "Manrope-SemiBold",
        lineHeight: 22,
        letterSpacing: 0.2,
    },

    buttonSecondary: {
        backgroundColor: "#131C2E",
        borderRadius: 20,
        minHeight: 52,
        paddingVertical: 14,
        paddingHorizontal: 48,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#26344A",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonSecondaryText: {
        color: "#E4E7EB",
        fontSize: 16,
        fontFamily: "Manrope-SemiBold",
        lineHeight: 22,
    },
    buttonTertiary: {
        paddingVertical: 8,
        alignItems: "center",
    },
    buttonTertiaryText: {
        color: "#9AA6B2",
        fontSize: 14,
        fontFamily: "Manrope-SemiBold",
        lineHeight: 20,
        letterSpacing: 0.5,
    },
    microcopy: {
        fontSize: 12,
        color: "#7E8794",
        fontFamily: "Manrope-Regular",
        lineHeight: 18,
        textAlign: "center",
        marginBottom: 20,
    },

    subtitle: {
        fontSize: 12,
        color: "#7E8794",
        fontFamily: "Manrope-Regular",
        lineHeight: 18,
        textAlign: "center",
    },

    langRow: {
        marginTop: 60,
        flexDirection: "row",
        justifyContent: "center",
        gap: 16,
    },

    langBtn: {
        color: "#7E8794",
        fontSize: 14,
        fontFamily: "Manrope-Medium",
        lineHeight: 20,
        letterSpacing: 1,
    },

    langActive: {
        color: "#3A7BD5",
        fontFamily: "Manrope-SemiBold",
    },

    langWrapper: {
        position: "absolute",
        top: 60,
        right: 24,
        zIndex: 10,
    },

    langCurrent: {
        color: "#A3AAB5",
        fontSize: 14,
        fontFamily: "Manrope-Medium",
        lineHeight: 20,
        letterSpacing: 1,
    },

    langMenu: {
        marginTop: 8,
        backgroundColor: "#131C2E",
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },

    langItem: {
        color: "#E4E7EB",
        fontSize: 14,
        fontFamily: "Manrope-Medium",
        lineHeight: 20,
        paddingVertical: 6,
    },

    buttonDisabled: {
        opacity: 0.4,
    },

    content: {
        flex: 1,
        justifyContent: "center",
    },

    footer: {
        marginTop: "auto",
        paddingBottom: 24,
    },


    input: {
        width: "100%",
        backgroundColor: "#131C2E",
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        color: "#E4E7EB",         // ✅ чтобы текст был виден
        fontSize: 16,
        fontFamily: "Manrope-Regular",
        lineHeight: 22,
        marginTop: 16,
    },

    textarea: {
        width: "100%",
        minHeight: 120,
        backgroundColor: "#131C2E",
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingTop: 12,
        paddingBottom: 12,
        color: "#E4E7EB",           // ✅ чтобы текст был виден   
        fontSize: 16,
        fontFamily: "Manrope-Regular",
        lineHeight: 26,
        marginTop: 16,
        textAlignVertical: "top",  // ✅ Android (не мешает iOS)  
    },
    answerButton: {
        backgroundColor: "#131C2E",
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#26344A",
        marginBottom: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    answerButtonSelected: {
        backgroundColor: "#1A2C4A",
        borderColor: "#3A7BD5",
    },
    answerButtonText: {
        color: "#E4E7EB",
        fontSize: 16,
        fontFamily: "Manrope-Medium",
        lineHeight: 22,
        textAlign: "center",
    },

    surface: {
        backgroundColor: "#131C2E",
        borderRadius: 20,
        padding: 20,
    },

});
