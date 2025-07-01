// import { useRoute } from '@react-navigation/native';
// import React, { useEffect, useState } from 'react';
// import {
//     Image,
//     Modal,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View
// } from 'react-native';
// import { Button, Card, Snackbar } from 'react-native-paper';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// import { Colors } from "../../../../constants/Colors";
// import { useGlobalInfo } from '../../../../context/GlobalContext';
// import { API_ROUTE } from '../../../../lib/config';

// export default function Event() {
//     const context = useGlobalInfo();
//     const { theme } = context;
//     const route = useRoute();
//     const params: any = route.params || "";
//     const id: string = params?.eventId
//     const userId = context?.userId;

//     const [event, setEvent] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [poll, setPoll] = useState({ question: '', options: [''] });
//     const [imageSize, setImageSize] = useState('medium');
//     const [snackbar, setSnackbar] = useState({
//         visible: false,
//         message: '',
//         severity: 'success',
//     });

//     useEffect(() => {
//         const fetchEvent = async () => {
//             try {
//                 const res = await fetch(`${API_ROUTE}/api/v1/event/eventid/${id}`);
//                 if (!res.ok) throw new Error('Event not found');
//                 const data = await res.json();
//                 setEvent(data?.data);
//             } catch (err) {
//                 console.error(err);
//                 setEvent(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchEvent();
//     }, [id]);

//     const showSnackbar = (message, severity = 'success') => {
//         setSnackbar({
//             visible: true,
//             message,
//             severity,
//         });
//     };

//     const handlePollChange = (index, value) => {
//         const newOptions = [...poll.options];
//         newOptions[index] = value;
//         setPoll({ ...poll, options: newOptions });
//     };

//     const addPollOption = () => {
//         setPoll({ ...poll, options: [...poll.options, ''] });
//     };

//     const handlePollSubmit = async () => {
//         const validOptions = poll.options.filter(opt => opt.trim() !== '');
//         if (!poll.question.trim()) {
//             showSnackbar('Poll question cannot be empty', 'error');
//             return;
//         }
//         if (validOptions.length < 2) {
//             showSnackbar('Please add at least two poll options.', 'error');
//             return;
//         }

//         try {
//             const payload = {
//                 event: id,
//                 question: poll.question.trim(),
//                 options: validOptions,
//                 userId,
//             };
//             const res = await fetch(`${API_ROUTE}/api/v1/event/poll`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(payload),
//             });

//             if (res.ok) {
//                 showSnackbar('Poll created successfully!', 'success');
//                 setModalOpen(false);
//                 setPoll({ question: '', options: [''] });
//             } else {
//                 throw new Error('Failed to create poll');
//             }
//         } catch (err) {
//             showSnackbar(err.message, 'error');
//         }
//     };

//     const getImageHeight = () => {
//         switch (imageSize) {
//             case 'small': return 150;
//             case 'large': return 350;
//             default: return 250;
//         }
//     };

//     const colors = Colors[theme];

//     if (loading) {
//         return (
//             <View style={[styles.loaderContainer, { backgroundColor: colors.background }]}>
//                 <Text style={{ color: colors.text }}>Loading...</Text>
//             </View>
//         );
//     }

//     if (!event) {
//         return (
//             <View style={[styles.centeredContainer, { backgroundColor: colors.background }]}>
//                 <Text style={[styles.notFoundTitle, { color: colors.text }]}>Event Not Found</Text>
//                 <Text style={[styles.notFoundText, { color: colors.secondaryText }]}>
//                     The event you're looking for doesn't exist or has been removed.
//                 </Text>
//             </View>
//         );
//     }

//     return (
//         <SafeAreaProvider>
//             <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
//                 <ScrollView>

//                     <Text style={styles.header}>{event?.name || "Event Dashboard"}</Text>
//                     <View style={styles.statusRow}>
//                         <Button mode="contained" style={{ backgroundColor: '#419B01' }}>PUBLISHED</Button>
//                         <Button mode="contained" style={{ backgroundColor: '#2C96FF' }}>PAUSE EVENT</Button>
//                         <Button mode="contained" style={{ backgroundColor: '#2C96FF' }}>CANCEL EVENT</Button>
//                     </View>

//                     <Card style={[styles.card, { backgroundColor: colors.card }]}>
//                         <Image
//                             source={{ uri: event?.cover_image }}
//                             style={[styles.coverImage, { height: getImageHeight() }]}
//                             resizeMode="cover"
//                         />
//                         <Text style={[styles.note, { color: "#C11215" }]}>Please enter a picture of size 1280 x 720 px</Text>

//                         {/* Action Buttons */}
//                         <View style={styles.actionRow}>
//                             {['Edit Event', 'Preview'].map((label, index) => (
//                                 <TouchableOpacity key={index} style={styles.actionItem}>
//                                     <Image source={{ uri: '/svg/edit.svg' }} style={styles.icon} />
//                                     <Text style={[styles.actionText, { color: colors.button }]}>{label}</Text>
//                                 </TouchableOpacity>
//                             ))}
//                         </View>

//                         {/* URLs */}
//                         {['Shareable Link URL', 'Live Count URL', 'Event Feedback URL', 'Live Poll URL'].map((label, idx) => (
//                             <View key={idx} style={styles.urlRow}>
//                                 <Text style={[styles.urlLabel, { color: colors.text }]}>{label}</Text>
//                                 <Text style={[styles.urlValue, { color: colors.button }]} numberOfLines={1}>https://in.explara.com/e/abc-event-oejqyfepdf92ob5</Text>
//                             </View>
//                         ))}
//                     </Card>

//                     {/* RIGHT */}
//                     <Card style={[styles.card, { backgroundColor: colors.card }]}>
//                         {/* Status Buttons */}


//                         {/* Logo */}
//                         <View style={styles.logoRow}>
//                             <Text style={[styles.logoText, { color: colors.button }]}>EVENT LOGO</Text>
//                             <Image source={{ uri: event?.logo_image }} style={styles.logoImage} />
//                         </View>

//                         {/* Description & Stats */}
//                         <Text style={[styles.sectionTitle, { color: colors.button }]}>EVENT DESCRIPTION</Text>
//                         <Text style={{ color: colors.text }}>{event.description}</Text>

//                         <Text style={[styles.sectionTitle, { color: colors.button }]}>SALES OVERVIEW</Text>
//                         <View style={styles.salesRow}>
//                             {['REGISTERED', 'GUEST REGISTERED', 'VIEWS'].map((label, idx) => (
//                                 <View key={idx} style={styles.salesItem}>
//                                     <Text style={[styles.salesValue, { color: colors.button }]}>23</Text>
//                                     <Text style={{ color: colors.secondaryText }}>{label}</Text>
//                                 </View>
//                             ))}
//                         </View>

//                         <Text style={[styles.sectionTitle, { color: colors.button }]}>EVENT OVERVIEW</Text>
//                         <View style={styles.overviewRow}>
//                             <Text style={{ color: colors.text }}>📍 CHENNAI</Text>
//                         </View>
//                         <View style={styles.overviewRow}>
//                             <Text style={{ color: colors.text }}>📅 {event.start_date}</Text>
//                         </View>
//                         <View style={styles.overviewRow}>
//                             <Text style={{ color: colors.text }}>⏰ {event.start_time}</Text>
//                         </View>
//                     </Card>

//                     {/* Poll Modal */}
//                     <Modal
//                         transparent
//                         visible={modalOpen}
//                         animationType="slide"
//                         onRequestClose={() => setModalOpen(false)}
//                     >
//                         <View style={[styles.modalOverlay, { backgroundColor: colors.overlay }]}>
//                             <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
//                                 <Text style={[styles.modalTitle, { color: colors.text }]}>Create a Poll</Text>
//                                 <TextInput
//                                     value={poll.question}
//                                     onChangeText={(text) => setPoll({ ...poll, question: text })}
//                                     placeholder="Enter your question"
//                                     placeholderTextColor={colors.secondaryText}
//                                     style={[styles.input, { backgroundColor: colors.dropdownBackground, borderColor: colors.secondaryText, color: colors.text }]}
//                                 />
//                                 {poll.options.map((option, idx) => (
//                                     <TextInput
//                                         key={idx}
//                                         value={option}
//                                         onChangeText={(text) => handlePollChange(idx, text)}
//                                         placeholder={`Option ${idx + 1}`}
//                                         placeholderTextColor={colors.secondaryText}
//                                         style={[styles.input, { backgroundColor: colors.dropdownBackground, borderColor: colors.secondaryText, color: colors.text }]}
//                                     />
//                                 ))}
//                                 <TouchableOpacity onPress={addPollOption}>
//                                     <Text style={[styles.addOption, { color: colors.button }]}>+ Add Option</Text>
//                                 </TouchableOpacity>
//                                 <View style={styles.modalButtonRow}>
//                                     <Button mode="outlined" onPress={() => setModalOpen(false)} textColor={colors.button}>Cancel</Button>
//                                     <Button
//                                         mode="contained"
//                                         disabled={!poll.question.trim() || poll.options.filter(o => o.trim()).length < 2}
//                                         onPress={handlePollSubmit}
//                                         style={{ backgroundColor: colors.button }}
//                                         textColor={colors.buttonText}
//                                     >
//                                         Submit
//                                     </Button>
//                                 </View>
//                             </View>
//                         </View>
//                     </Modal>

//                     {/* Snackbar */}
//                     <Snackbar
//                         visible={snackbar.visible}
//                         onDismiss={() => setSnackbar((prev) => ({ ...prev, visible: false }))}
//                         duration={4000}
//                         style={{ backgroundColor: snackbar.severity === "success" ? colors.button : "#e53935" }}
//                     >
//                         <Text style={{ color: colors.buttonText }}>{snackbar.message}</Text>
//                     </Snackbar>
//                 </ScrollView>
//             </SafeAreaView>
//         </SafeAreaProvider>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         minHeight: 740,
//         padding: 16,
//         paddingVertical: 20,
//     },
//     header: {
//         fontSize: 20,
//         fontWeight: "bold",
//         padding: 16,
//     },
//     loaderContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     centeredContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     notFoundTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
//     notFoundText: {
//         fontSize: 14,
//     },
//     card: {
//         padding: 16,
//         marginBottom: 16,
//         borderRadius: 8,
//     },
//     coverImage: {
//         width: '100%',
//         borderRadius: 8,
//         marginBottom: 8,
//     },
//     note: {
//         fontSize: 12,
//         textAlign: 'center',
//         marginBottom: 8,
//     },
//     actionRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         marginBottom: 12,
//     },
//     actionItem: {
//         alignItems: 'center',
//     },
//     icon: {
//         width: 24,
//         height: 24,
//     },
//     actionText: {
//         fontSize: 14,
//     },
//     linkRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         marginBottom: 16,
//     },
//     linkText: {
//         textDecorationLine: 'underline',
//         fontSize: 16,
//     },
//     urlRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         flexWrap: 'wrap',
//         marginBottom: 10,
//     },
//     urlLabel: {
//         fontWeight: '600',
//         width: '35%',
//     },
//     urlValue: {
//         flex: 1,
//         textDecorationLine: 'underline',
//     },
//     urlAction: {
//         marginLeft: 12,
//         fontWeight: '600',
//     },
//     statusRow: {
//         flexDirection: 'row',
//         fontSize: 10,
//         marginBottom: 16,
//     },
//     logoRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 16,
//     },
//     logoText: {
//         fontSize: 16,
//         fontWeight: '600',
//     },
//     logoImage: {
//         width: 80,
//         height: 40,
//         resizeMode: 'contain',
//     },
//     sectionTitle: {
//         fontSize: 14,
//         fontWeight: '600',
//         marginTop: 12,
//         marginBottom: 4,
//     },
//     salesRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         marginBottom: 16,
//     },
//     salesItem: {
//         alignItems: 'center',
//     },
//     salesValue: {
//         fontSize: 16,
//         fontWeight: '600',
//     },
//     overviewRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 4,
//     },
//     modalOverlay: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 16,
//     },
//     modalContainer: {
//         width: '100%',
//         maxWidth: 400,
//         borderRadius: 8,
//         padding: 16,
//     },
//     modalTitle: {
//         fontSize: 18,
//         fontWeight: '600',
//         marginBottom: 12,
//     },
//     input: {
//         borderWidth: 1,
//         borderRadius: 4,
//         padding: 8,
//         marginBottom: 8,
//     },
//     addOption: {
//         marginBottom: 8,
//     },
//     modalButtonRow: {
//         flexDirection: 'row',
//         justifyContent: 'flex-end',
//         gap: 8,
//     },
// });



import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Button, Menu, Snackbar } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from "../../../../constants/Colors";
import { useGlobalInfo } from '../../../../context/GlobalContext';
import { API_ROUTE } from '../../../../lib/config';

const { width } = Dimensions.get('window');
const MAX_EVENT_NAME_WIDTH = width - 130;

export default function Event() {
    const context = useGlobalInfo();
    const { theme } = context;
    const colors = Colors[theme];
    const route = useRoute();
    const params: any = route?.params || "";
    const id: string = params?.eventId;
    const userId = context?.userId;

    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [poll, setPoll] = useState({ question: '', options: [''] });
    const [snackbar, setSnackbar] = useState({
        visible: false,
        message: '',
        severity: 'success',
    });

    // Event Status Dropdown
    const [statusMenuVisible, setStatusMenuVisible] = useState(false);
    const [eventStatus, setEventStatus] = useState("PUBLISHED");

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await fetch(`${API_ROUTE}/api/v1/event/eventid/${id}`);
                if (!res.ok) throw new Error('Event not found');
                const data = await res.json();
                setEvent(data?.data);
            } catch (err) {
                setEvent(null);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({
            visible: true,
            message,
            severity,
        });
    };

    const handlePollChange = (index, value) => {
        const newOptions = [...poll.options];
        newOptions[index] = value;
        setPoll({ ...poll, options: newOptions });
    };

    const addPollOption = () => {
        setPoll({ ...poll, options: [...poll.options, ''] });
    };

    const handlePollSubmit = async () => {
        const validOptions = poll.options.filter(opt => opt.trim() !== '');
        if (!poll.question.trim()) {
            showSnackbar('Poll question cannot be empty', 'error');
            return;
        }
        if (validOptions.length < 2) {
            showSnackbar('Please add at least two poll options.', 'error');
            return;
        }
        try {
            const payload = {
                event: id,
                question: poll.question.trim(),
                options: validOptions,
                userId,
            };
            const res = await fetch(`${API_ROUTE}/api/v1/event/poll`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                showSnackbar('Poll created successfully!', 'success');
                setModalOpen(false);
                setPoll({ question: '', options: [''] });
            } else {
                throw new Error('Failed to create poll');
            }
        } catch (err) {
            showSnackbar(err.message, 'error');
        }
    };

    if (loading) {
        return (
            <View style={[styles.loaderContainer, { backgroundColor: colors.background }]}>
                <Text style={{ color: colors.text }}>Loading...</Text>
            </View>
        );
    }

    if (!event) {
        return (
            <View style={[styles.centeredContainer, { backgroundColor: colors.background }]}>
                <Text style={[styles.notFoundTitle, { color: colors.text }]}>Event Not Found</Text>
                <Text style={[styles.notFoundText, { color: colors.secondaryText }]}>
                    The event you're looking for doesn't exist or has been removed.
                </Text>
            </View>
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
                    {/* Event Name & Status Dropdown */}
                    <View style={styles.headerRow}>
                        <Text
                            style={[
                                styles.eventName,
                                { color: colors.button, maxWidth: MAX_EVENT_NAME_WIDTH }
                            ]}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {event?.name || "Event Dashboard"}
                        </Text>
                        <Menu
                            visible={statusMenuVisible}
                            onDismiss={() => setStatusMenuVisible(false)}
                            anchor={
                                <TouchableOpacity
                                    style={[
                                        styles.statusDropdown,
                                        {
                                            backgroundColor:
                                                eventStatus === "PUBLISHED"
                                                    ? "#419B01"
                                                    : eventStatus === "PAUSED"
                                                        ? "#FFA500"
                                                        : "#E53935"
                                        }
                                    ]}
                                    onPress={() => setStatusMenuVisible(true)}
                                >
                                    <Text style={styles.statusDropdownText}>{eventStatus}</Text>
                                </TouchableOpacity>
                            }
                        >
                            {["PUBLISHED", "PAUSED", "CANCELLED"].map((status) => (
                                <Menu.Item
                                    key={status}
                                    onPress={() => {
                                        setEventStatus(status);
                                        setStatusMenuVisible(false);
                                    }}
                                    title={status}
                                />
                            ))}
                        </Menu>
                    </View>

                    {/* Event Logo */}
                    <View style={styles.logoContainer}>
                        <Image
                            source={{ uri: event?.logo_image }}
                            style={styles.logoImage}
                        />
                    </View>

                    {/* Event Description */}
                    <Text style={[styles.sectionTitle, { color: colors.button }]}>EVENT DESCRIPTION</Text>
                    <Text style={{ color: colors.text, marginBottom: 20 }}>{event.description}</Text>

                    {/* Event Info */}
                    <Text style={[styles.sectionTitle, { color: colors.button }]}>EVENT OVERVIEW</Text>
                    <View style={styles.overviewRow}>
                        <Text style={{ color: colors.text }}>📍 {event.location || "Location not provided"}</Text>
                    </View>
                    <View style={styles.overviewRow}>
                        <Text style={{ color: colors.text }}>📅 {event.start_date}</Text>
                    </View>
                    <View style={styles.overviewRow}>
                        <Text style={{ color: colors.text }}>⏰ {event.start_time}</Text>
                    </View>

                    {/* Links (Shareable, Live, Feedback, Poll) */}
                    <Text style={[styles.sectionTitle, { color: colors.button }]}>IMPORTANT LINKS</Text>
                    {['Shareable Link URL', 'Live Count URL', 'Event Feedback URL', 'Live Poll URL'].map((label, idx) => (
                        <View key={idx} style={styles.urlRow}>
                            <Text style={[styles.urlLabel, { color: colors.text }]}>{label}</Text>
                            <Text style={[styles.urlValue, { color: colors.button }]} numberOfLines={1}>https://in.explara.com/e/abc-event-oejqyfepdf92ob5</Text>
                        </View>
                    ))}

                    {/* Action Buttons */}
                    <View style={styles.actionRow}>
                        {['Edit Event', 'Preview', 'Add Live Poll'].map((label, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.actionItem]}
                                onPress={label === "Add Live Poll" ? () => setModalOpen(true) : undefined}
                            >
                                {/* <Image source={{ uri: '/svg/edit.svg' }} style={styles.icon} /> */}
                                <Text style={[styles.actionText, { color: colors.button }]}>{label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Event Images Carousel */}
                    {event?.event_images && event.event_images.length > 0 && (
                        <>
                            <Text style={[styles.sectionTitle, { color: colors.button }]}>EVENT PHOTOS</Text>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.carouselContainer}
                            >
                                {event.event_images.map((img, idx) => (
                                    <Image
                                        key={idx}
                                        source={{ uri: img }}
                                        style={styles.carouselImage}
                                        resizeMode="cover"
                                    />
                                ))}
                            </ScrollView>
                        </>
                    )}

                    {/* SALES OVERVIEW */}
                    <Text style={[styles.sectionTitle, { color: colors.button }]}>SALES OVERVIEW</Text>
                    <View style={styles.salesRow}>
                        {['REGISTERED', 'GUEST REGISTERED', 'VIEWS'].map((label, idx) => (
                            <View key={idx} style={styles.salesItem}>
                                <Text style={[styles.salesValue, { color: colors.button }]}>23</Text>
                                <Text style={{ color: colors.secondaryText }}>{label}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Poll Modal */}
                    <Modal
                        transparent
                        visible={modalOpen}
                        animationType="slide"
                        onRequestClose={() => setModalOpen(false)}
                    >
                        <View style={[styles.modalOverlay, { backgroundColor: colors.overlay }]}>
                            <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
                                <Text style={[styles.modalTitle, { color: colors.text }]}>Create a Poll</Text>
                                <TextInput
                                    value={poll.question}
                                    onChangeText={(text) => setPoll({ ...poll, question: text })}
                                    placeholder="Enter your question"
                                    placeholderTextColor={colors.secondaryText}
                                    style={[styles.input, { backgroundColor: colors.dropdownBackground, borderColor: colors.secondaryText, color: colors.text }]}
                                />
                                {poll.options.map((option, idx) => (
                                    <TextInput
                                        key={idx}
                                        value={option}
                                        onChangeText={(text) => handlePollChange(idx, text)}
                                        placeholder={`Option ${idx + 1}`}
                                        placeholderTextColor={colors.secondaryText}
                                        style={[styles.input, { backgroundColor: colors.dropdownBackground, borderColor: colors.secondaryText, color: colors.text }]}
                                    />
                                ))}
                                <TouchableOpacity onPress={addPollOption}>
                                    <Text style={[styles.addOption, { color: colors.button }]}>+ Add Option</Text>
                                </TouchableOpacity>
                                <View style={styles.modalButtonRow}>
                                    <Button mode="outlined" onPress={() => setModalOpen(false)} textColor={colors.button}>Cancel</Button>
                                    <Button
                                        mode="contained"
                                        disabled={!poll.question.trim() || poll.options.filter(o => o.trim()).length < 2}
                                        onPress={handlePollSubmit}
                                        style={{ backgroundColor: colors.button }}
                                        textColor={colors.buttonText}
                                    >
                                        Submit
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Modal>



                    {/* Snackbar */}
                    <Snackbar
                        visible={snackbar.visible}
                        onDismiss={() => setSnackbar((prev) => ({ ...prev, visible: false }))}
                        duration={4000}
                        style={{ backgroundColor: snackbar.severity === "success" ? colors.button : "#e53935" }}
                    >
                        <Text style={{ color: colors.buttonText }}>{snackbar.message}</Text>
                    </Snackbar>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: 740,
        padding: 16,
        paddingVertical: 20,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notFoundTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    notFoundText: {
        fontSize: 14,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginBottom: 12,
    },
    eventName: {
        fontSize: 20,
        fontWeight: 'bold',
        flexShrink: 1,
    },
    statusDropdown: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 18,
        minWidth: 90,
        alignItems: "center",
        justifyContent: "center",
    },
    statusDropdownText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 13,
        textAlign: "center",
    },
    logoContainer: {
        alignItems: 'center',
        marginVertical: 16,
    },
    logoImage: {
        width: 76,
        height: 76,
        borderRadius: 38,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginTop: 14,
        marginBottom: 8,
    },
    overviewRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    urlRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    urlLabel: {
        fontWeight: '600',
        width: '35%',
    },
    urlValue: {
        flex: 1,
        textDecorationLine: 'underline',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 16,
        marginBottom: 12,
        gap: 18,
    },
    actionItem: {
        alignItems: 'center',
    },
    actionText: {
        fontSize: 15,
        fontWeight: "600"
    },
    salesRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
        marginTop: 6,
    },
    salesItem: {
        alignItems: 'center',
    },
    salesValue: {
        fontSize: 16,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    modalContainer: {
        width: '100%',
        maxWidth: 400,
        borderRadius: 8,
        padding: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
    },
    addOption: {
        marginBottom: 8,
        fontWeight: 'bold',
    },
    modalButtonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 8,
    },
    carouselContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    carouselImage: {
        width: 140,
        height: 90,
        borderRadius: 8,
        marginRight: 10,
    },
});
