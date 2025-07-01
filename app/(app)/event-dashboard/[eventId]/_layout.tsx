import { Slot, usePathname, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../../constants/Colors";
import { useGlobalInfo } from "../../../../context/GlobalContext";

export default function EventLayout() {
    const { event, theme } = useGlobalInfo();
    const router = useRouter();
    const pathname = usePathname();

    const eventId = event;

    const dashboardTabs = [
        { name: "Event Dashboard", path: `/event-dashboard/${eventId}` },
        { name: "Participant Registration", path: `/event-dashboard/${eventId}/participant-registration` },
        { name: "Bulk Ticket", path: `/event-dashboard/${eventId}/bulk-ticket` },
        { name: "Single Registration", path: `/event-dashboard/${eventId}/single-registration` },
        { name: "View Participants", path: `/event-dashboard/${eventId}/view-participants` },
        { name: "Payment History", path: `/event-dashboard/${eventId}/payment-history` },
        { name: "Email/Message", path: `/event-dashboard/${eventId}/email-message` },
        { name: "Reports", path: `/event-dashboard/${eventId}/reports` },
    ];

    const colors = Colors[theme];
    const ROOT_PATH = `/event-dashboard/${eventId}`;
    const isTabActive = (tabPath: string) => {
        if (pathname === tabPath) return true;
        return tabPath !== ROOT_PATH && pathname.startsWith(`${tabPath}/`);
    };

    return (
        <View style={{}}>
            {/* Tab Links */}
            <ScrollView horizontal style={[styles.tabs, { backgroundColor: colors.card, borderColor: colors.overlay }]} showsHorizontalScrollIndicator={false}>
                {dashboardTabs.map((tab, index) => {
                    const isActive = isTabActive(tab.path);
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => router.push(tab.path)}
                            style={[
                                styles.tabItem,
                                isActive && { borderBottomColor: colors.button, borderBottomWidth: 2 }
                            ]}
                        >
                            <Text style={[
                                styles.tabText,
                                { color: isActive ? colors.button : colors.secondaryText, fontWeight: isActive ? "bold" : "normal" }
                            ]}>
                                {tab.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* Nested Slot */}
            <View style={{}}>
                <Slot />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: "row",
        borderBottomWidth: 1,
        paddingHorizontal: 10,
    },
    tabItem: {
        marginRight: 16,
        paddingVertical: 16,
    },
    tabText: {
        fontSize: 14,
    },
});
