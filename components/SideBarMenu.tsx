import { useRouter, useSegments } from "expo-router";
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

const SidebarMenu = () => {
    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const segments = useSegments();

    const currentPath = "/" + segments.join("/");

    const { isLoggedIn, userType, theme } = useGlobalInfo();

    // If user is not logged in, do not render the sidebar at all
    if (!isLoggedIn) {
        return null;
    }

    const items = userType ? navItems[userType] || [] : [];
    const colors = Colors[theme];

    return (
        <View>
            {/* Toggle Button */}
            <TouchableOpacity onPress={() => setVisible(true)} style={styles.menuButton}>
                <Text style={[styles.icon, { color: colors.button }]}>☰</Text>
            </TouchableOpacity>

            {/* Sidebar Menu */}
            <Modal
                transparent
                visible={visible}
                animationType="slide"
                onRequestClose={() => setVisible(false)}
            >
                <TouchableOpacity
                    style={[styles.overlay, { backgroundColor: colors.overlay }]}
                    activeOpacity={1}
                    onPressOut={() => setVisible(false)}
                >
                    <View style={[styles.menuContainer, { backgroundColor: colors.card, shadowColor: colors.text }]}>
                        {items.length === 0 ? (
                            <Text style={[styles.noItemsText, { color: colors.secondaryText }]}>
                                No navigation items available.
                            </Text>
                        ) : (
                            items.map((item, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    style={[
                                        styles.menuItem,
                                        currentPath.startsWith(item.path) && {
                                            backgroundColor: colors.dropdownBackground,
                                        }
                                    ]}
                                    onPress={() => {
                                        setVisible(false);
                                        router.push(item.path);
                                    }}
                                >
                                    <Image
                                        source={{ uri: item.icon }}
                                        style={[styles.iconImage, { tintColor: colors.button }]}
                                    />
                                    <Text style={[styles.menuText, { color: colors.text }]}>
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        )}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    menuButton: {
        position: "absolute",
        top: 22,
        right: 20,
        zIndex: 100,
    },
    icon: {
        fontSize: 24,
    },
    overlay: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-end",
    },
    menuContainer: {
        width: 240,
        padding: 16,
        paddingTop: 48,
        elevation: 4,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        // shadowColor set from theme
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
    },
    noItemsText: {
        fontSize: 16,
        textAlign: "center",
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        padding: 8,
        borderRadius: 6,
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

export default SidebarMenu;
