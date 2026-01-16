import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0E1116",
        paddingHorizontal: 24,
    },

    center: {
        flex: 1,
        justifyContent: "center",
    },

    title: {
        fontSize: 30,
        color: "#E6E6E6",
        fontWeight: "600",
        marginBottom: 32,
        textAlign: "center",
    },

    quote: {
        fontSize: 16,
        color: "#C89B3C",
        lineHeight: 24,
        textAlign: "center",
    },

    bottom: {
        marginBottom: 60,
        alignItems: "center",
    },

    button: {
        backgroundColor: "#2A2F36",
        borderRadius: 28,
        paddingVertical: 14,
        paddingHorizontal: 64,
        marginBottom: 20,
    },

    buttonText: {
        color: "#E6E6E6",
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: 1,
    },

    subtitle: {
        fontSize: 12,
        color: "#777",
        textAlign: "center",
    },

    langRow: {
        marginTop: 60,
        flexDirection: "row",
        justifyContent: "center",
        gap: 16,
    },

    langBtn: {
        color: "#777",
        fontSize: 14,
        letterSpacing: 1,
    },

    langActive: {
        color: "#C89B3C",
        fontWeight: "600",
    },

    langWrapper: {
        position: "absolute",
        top: 60,
        right: 24,
        zIndex: 10,
    },

    langCurrent: {
        color: "#C89B3C",
        fontSize: 14,
        letterSpacing: 1,
    },

    langMenu: {
        marginTop: 8,
        backgroundColor: "#1A1E24",
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },

    langItem: {
        color: "#E6E6E6",
        fontSize: 14,
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
        backgroundColor: "#1A1E24",
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        color: "#E6E6E6",          // ✅ чтобы текст был виден
        fontSize: 16,
        marginTop: 16,
    },

    textarea: {
        width: "100%",
        minHeight: 120,
        backgroundColor: "#1A1E24",
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingTop: 12,
        paddingBottom: 12,
        color: "#E6E6E6",          // ✅ чтобы текст был виден   
        fontSize: 16,
        marginTop: 16,
        textAlignVertical: "top",  // ✅ Android (не мешает iOS)  
    },

});