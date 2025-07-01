// import React, { useState } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import FormBuilder from '../../../../components/dynamic-form';
// import { Colors } from '../../../../constants/Colors';
// import { useGlobalInfo } from '../../../../context/GlobalContext';
// import TicketRegistrationForm from '../../../ticket-registration';

// const ParticipantRegistration: React.FC = () => {

//     const { theme } = useGlobalInfo();
//     const colors = Colors[theme]
//     const [formType, setFormType] = useState<'ticket' | 'user'>('ticket');


//     return (
//         <View style={[styles.container, { backgroundColor: colors.background }]}>
//             <View style={styles.headerContainer}>
//                 <View style={styles.headerTextContainer}>
//                     <Text style={[styles.headerTitle, { color: colors.text }]}>Event Registration</Text>
//                     <Text style={[styles.headerSubtitle,{color:colors.text}]}>
//                         You can create event registration forms and ticket registration counts here for your event.
//                     </Text>
//                 </View>

//                 {/* Toggle for registration type form */}
//                 <View style={[styles.toggleContainer]}>
//                     <TouchableOpacity
//                         style={[
//                             styles.toggleButton,
//                             formType === 'ticket' && styles.activeToggleButton
//                         ]}
//                         onPress={() => setFormType('ticket')}
//                     >
//                         <Text
//                             style={[
//                                 styles.toggleButtonText,
//                                 formType === 'ticket' && styles.activeToggleButtonText
//                             ]}
//                         >
//                             Ticket Registration
//                         </Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         style={[
//                             styles.toggleButton,
//                             formType === 'user' && styles.activeToggleButton
//                         ]}
//                         onPress={() => setFormType('user')}
//                     >
//                         <Text
//                             style={[
//                                 styles.toggleButtonText,
//                                 formType === 'user' && styles.activeToggleButtonText
//                             ]}
//                         >
//                             User Registration Form
//                         </Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>

//             {/* Content */}
//             <GestureHandlerRootView style={{ flex: 1 }}>
//                 <View style={styles.contentContainer}>
//                     {formType === 'ticket' ? (
//                         <TicketRegistrationForm />
//                     ) : (
//                         <FormBuilder />
//                     )}
//                 </View>
//             </GestureHandlerRootView>
//         </View>
//     );
// };

// export default ParticipantRegistration;

// const styles = StyleSheet.create({
//     container: {
//         padding: 16,
//     },
//     headerContainer: {
//         marginBottom: 16,
//     },
//     headerTextContainer: {
//         marginBottom: 12,
//     },
//     headerTitle: {
//         fontSize: 24,
//         fontWeight: '600',
//         marginBottom: 4,
//     },
//     headerSubtitle: {
//         fontSize: 14,
//         color: '#494949',
//     },
//     toggleContainer: {
//         flexDirection: 'row',
//         backgroundColor: '#f5f5f5',
//         borderRadius: 8,
//         overflow: 'hidden',
//     },
//     toggleButton: {
//         flex: 1,
//         paddingVertical: 10,
//         alignItems: 'center',
//     },
//     toggleButtonText: {
//         fontSize: 14,
//         fontWeight: '600',
//         color: '#666',
//     },
//     activeToggleButton: {
//         borderBottomWidth: 3,
//         borderColor: '#4CAF50',
//         backgroundColor: 'transparent',
//     },
//     activeToggleButtonText: {
//         color: '#4CAF50',
//         fontWeight: 'bold',
//     },
//     contentContainer: {
//         flex: 1,
//         backgroundColor: '#fff',
//         borderRadius: 8,
//         padding: 12,
//     },
// });



import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FormBuilder from '../../../../components/dynamic-form';
import { Colors } from '../../../../constants/Colors';
import { useGlobalInfo } from '../../../../context/GlobalContext';
import TicketRegistrationForm from '../../../ticket-registration';

const ParticipantRegistration: React.FC = () => {
    const { theme } = useGlobalInfo();
    const colors = Colors[theme];
    const [formType, setFormType] = useState<'ticket' | 'user'>('ticket');

    // Optionally, define an accent or highlight color (use button for now)
    const accentColor = colors.button;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.headerContainer}>
                <View style={styles.headerTextContainer}>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Event Registration</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.secondaryText }]}>
                        You can create event registration forms and ticket registration counts here for your event.
                    </Text>
                </View>

                {/* Toggle for registration type form */}
                <View style={[
                    styles.toggleContainer,
                    { backgroundColor: colors.dropdownBackground }
                ]}>
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            formType === 'ticket' && {
                                borderBottomWidth: 3,
                                borderColor: accentColor,
                                backgroundColor: 'transparent'
                            }
                        ]}
                        onPress={() => setFormType('ticket')}
                    >
                        <Text
                            style={[
                                styles.toggleButtonText,
                                { color: colors.secondaryText },
                                formType === 'ticket' && {
                                    color: accentColor,
                                    fontWeight: 'bold'
                                }
                            ]}
                        >
                            Ticket Registration
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            formType === 'user' && {
                                borderBottomWidth: 3,
                                borderColor: accentColor,
                                backgroundColor: 'transparent'
                            }
                        ]}
                        onPress={() => setFormType('user')}
                    >
                        <Text
                            style={[
                                styles.toggleButtonText,
                                { color: colors.secondaryText },
                                formType === 'user' && {
                                    color: accentColor,
                                    fontWeight: 'bold'
                                }
                            ]}
                        >
                            User Registration Form
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Content */}
            <GestureHandlerRootView>
                <View style={[styles.contentContainer]}>
                    {formType === 'ticket' ? (
                        <TicketRegistrationForm />
                    ) : (
                        <FormBuilder />
                    )}
                </View>
            </GestureHandlerRootView>
        </View>
    );
};

export default ParticipantRegistration;

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    headerContainer: {
        marginBottom: 16,
    },
    headerTextContainer: {
        marginBottom: 12,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
    },
    toggleContainer: {
        flexDirection: 'row',
        borderRadius: 8,
        overflow: 'hidden',
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
    },
    toggleButtonText: {
        fontSize: 14,
        fontWeight: '600',
    },
    contentContainer: {
        flex: 1,
        borderRadius: 8,
        padding: 12,
    },
});
