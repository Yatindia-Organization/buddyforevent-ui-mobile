import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors } from "../constants/Colors";
import { useGlobalInfo } from "../context/GlobalContext";
import navItems from "../lib/config/navItems";

const TopNavBar = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const { userType, theme, setTheme, changeEvent } = useGlobalInfo();
    const router = useRouter();
    const items = navItems[userType] || [];
    const colors = Colors[theme];

    return (
        <View style={[styles.navbar, { backgroundColor: colors.card, borderBottomColor: colors.overlay }]}>
            {/* Left: Menu Button */}
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <Text style={[styles.menuIcon, { color: colors.button }]}>☰</Text>
            </TouchableOpacity>

            {/* Center: Title */}
            <Text style={[styles.title, { color: colors.text }]}>Buddy For Events</Text>

            {/* Right: Icons */}
            <View style={styles.rightIcons}>
                {/* Theme toggle */}
                <TouchableOpacity
                    onPress={() => setTheme(theme === "light" ? "dark" : "light")}
                    style={{ marginLeft: 10 }}
                >
                    <Text style={{ fontSize: 22 }}>
                        {theme === "light" ? "🌙" : "☀️"}
                    </Text>
                </TouchableOpacity>
                {/* Notification */}
                <TouchableOpacity onPress={() => { }}>
                    <Text style={[styles.icon, { color: colors.button }]}>🔔</Text>
                </TouchableOpacity>
                {/* Profile */}
                <TouchableOpacity onPress={() => { router.push("/profile") }}>
                    <Text style={[styles.icon, { color: colors.button }]}>👤</Text>
                </TouchableOpacity>
            </View>

            {/* Nav Items Modal */}
            <Modal transparent visible={menuVisible} animationType="slide">
                <TouchableOpacity
                    style={[styles.overlay, { backgroundColor: colors.overlay }]}
                    onPressOut={() => setMenuVisible(false)}
                >
                    <View style={[styles.menuContainer, { backgroundColor: colors.card }]}>
                        {items.map((item, idx) => (
                            <TouchableOpacity
                                key={idx}
                                style={styles.menuItem}
                                onPress={() => {
                                    setMenuVisible(false);
                                    changeEvent(null);
                                    router.push(item.path);
                                }}
                            >
                                <Image
                                    source={{ uri: item.icon.startsWith("http") ? item.icon : `https://your-cdn.com${item.icon}` }}
                                    style={[styles.iconImage, { tintColor: colors.button }]}
                                />
                                <Text style={[styles.menuText, { color: colors.text }]}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        height: 90,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 40,
        borderBottomWidth: 1,
    },
    menuIcon: {
        fontSize: 30,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        flex: 1,
        marginLeft: 16,
        textAlign: "center",
    },
    rightIcons: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    icon: {
        fontSize: 20,
        marginLeft: 12,
    },
    overlay: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-end",
    },
    menuContainer: {
        width: 240,
        padding: 16,
        paddingTop: 40,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    iconImage: {
        width: 20,
        height: 20,
        marginRight: 12,
        resizeMode: "contain",
    },
    menuText: {
        fontSize: 16,
    },
});

export default TopNavBar;
