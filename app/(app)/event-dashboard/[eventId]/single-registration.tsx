// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     StyleSheet,
//     KeyboardAvoidingView,
//     Platform,
//     SafeAreaView,
//     ScrollView,
// } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { MaterialIcons } from '@expo/vector-icons';
// import { Divider, Button } from 'react-native-paper';

// export default function SingleParticipation() {
//     const [form, setForm] = useState({
//         name: '',
//         email: '',
//         mobile: '',
//         tickets: '0',
//     });

//     const handleChange = (name: keyof typeof form, value: string) => {
//         setForm((prev) => ({ ...prev, [name]: value }));
//     };

//     const [open, setOpen] = useState(false);
//     const [ticketValue, setTicketValue] = useState(form.tickets);
//     const [ticketItems, setTicketItems] = useState(
//         Array.from({ length: 10 }, (_, i) => ({ label: `${i}`, value: `${i}` }))
//     );

//     useEffect(() => {
//         handleChange('tickets', ticketValue);
//     }, [ticketValue]);

//     return (
//         <SafeAreaView>
//             <KeyboardAvoidingView
//                 behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//                 style={styles.wrapper}
//             >
//                 <ScrollView
//                     style={styles.container}
//                     contentContainerStyle={styles.content}
//                     keyboardShouldPersistTaps="handled"
//                 >
//                     <Text style={styles.header}>Single Participant Registration</Text>
//                     <Text style={styles.subHeader}>
//                         Issue tickets to your Participants without asking them to register online.
//                     </Text>

//                     <View style={styles.card}>
//                         {/* Info */}
//                         <View style={styles.infoRow}>
//                             <Text style={styles.infoTitle}>Choose Your</Text>
//                             <View style={styles.infoRight}>
//                                 <View style={styles.infoItem}>
//                                     <MaterialIcons name="access-time" size={16} color="#555" />
//                                     <Text style={styles.infoText}>08:00 PM - 08:00 PM</Text>
//                                 </View>
//                                 <View style={styles.infoItem}>
//                                     <MaterialIcons name="event-note" size={16} color="red" />
//                                     <Text style={[styles.infoText, { color: 'red' }]}>
//                                         118 TICKET REMAINING
//                                     </Text>
//                                 </View>
//                             </View>
//                         </View>

//                         <Divider style={styles.divider} />

//                         {/* Ticket Dropdown */}
//                         <Text style={styles.label}>Select the number of tickets</Text>
//                         <DropDownPicker
//                             open={open}
//                             value={ticketValue}
//                             items={ticketItems}
//                             setOpen={setOpen}
//                             setValue={setTicketValue}
//                             setItems={setTicketItems}
//                             style={styles.dropdown}
//                             dropDownContainerStyle={styles.dropdownContainer}
//                             placeholder="Select tickets"
//                             listMode="MODAL" // ✅ avoids nested FlatList warning
//                         />

//                         {/* Buyer Info */}
//                         <Text style={styles.sectionHeader}>Buyer Details</Text>
//                         <View style={styles.inputGroup}>
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder="Name"
//                                 value={form.name}
//                                 onChangeText={(text) => handleChange('name', text)}
//                             />
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder="Email"
//                                 value={form.email}
//                                 keyboardType="email-address"
//                                 onChangeText={(text) => handleChange('email', text)}
//                             />
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder="Mobile number"
//                                 value={form.mobile}
//                                 keyboardType="phone-pad"
//                                 onChangeText={(text) => handleChange('mobile', text)}
//                             />
//                         </View>

//                         <Divider style={styles.divider} />

//                         <View style={styles.buttonRow}>
//                             <Button mode="outlined" onPress={() => console.log('Cancel')}>
//                                 Cancel
//                             </Button>
//                             <Button
//                                 mode="contained"
//                                 buttonColor="#4CAF50"
//                                 onPress={() => console.log('Proceed')}
//                             >
//                                 Proceed
//                             </Button>
//                         </View>
//                     </View>
//                 </ScrollView>
//             </KeyboardAvoidingView>
//         </SafeAreaView>
//     );
// }


// const styles = StyleSheet.create({
//     wrapper: {
//         // flex: 1
//     },
//     container: {
//         backgroundColor: '#f9f9f9',
//     },
//     content: {
//         padding: 16,
//         paddingBottom: 32,
//     },
//     header: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#9A93B3',
//         marginBottom: 8,
//     },
//     subHeader: {
//         fontSize: 14,
//         color: '#333',
//         marginBottom: 16,
//     },
//     card: {
//         backgroundColor: '#fff',
//         borderRadius: 8,
//         padding: 16,
//         elevation: 3,
//     },
//     infoRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 12,
//     },
//     infoTitle: {
//         fontSize: 16,
//         fontWeight: '600',
//     },
//     infoRight: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 8,
//     },
//     infoItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginLeft: 8,
//     },
//     infoText: {
//         fontSize: 12,
//         color: '#555',
//         marginLeft: 4,
//     },
//     divider: {
//         marginVertical: 12,
//     },
//     label: {
//         fontSize: 14,
//         color: '#555',
//         marginBottom: 6,
//     },
//     dropdown: {
//         borderColor: '#ccc',
//         height: 44,
//         marginBottom: 16,
//         backgroundColor: '#fff',
//     },
//     dropdownContainer: {
//         borderColor: '#ccc',
//     },
//     sectionHeader: {
//         fontSize: 16,
//         fontWeight: '600',
//         marginBottom: 8,
//         marginTop: 8,
//     },
//     inputGroup: {
//         marginBottom: 16,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 4,
//         paddingHorizontal: 10,
//         paddingVertical: 10,
//         marginBottom: 12,
//         backgroundColor: '#fff',
//     },
//     buttonRow: {
//         flexDirection: 'row',
//         justifyContent: 'flex-end',
//         gap: 8,
//     },
// });




// import { MaterialIcons } from '@expo/vector-icons';
// import React, { useEffect, useState } from 'react';
// import {
//     KeyboardAvoidingView,
//     Platform,
//     SafeAreaView,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TextInput,
//     View,
// } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { Button, Divider } from 'react-native-paper';
// import { Colors } from '../../../../constants/Colors';
// import { useGlobalInfo } from '../../../../context/GlobalContext';

// export default function SingleParticipation() {
//     const [form, setForm] = useState({
//         name: '',
//         email: '',
//         mobile: '',
//         tickets: '0',
//     });

//     const { theme } = useGlobalInfo();
//     const colors = Colors[theme];

//     const handleChange = (name, value) => {
//         setForm((prev) => ({ ...prev, [name]: value }));
//     };

//     const [open, setOpen] = useState(false);
//     const [ticketValue, setTicketValue] = useState(form.tickets);
//     const [ticketItems, setTicketItems] = useState(
//         Array.from({ length: 10 }, (_, i) => ({ label: `${i}`, value: `${i}` }))
//     );

//     useEffect(() => {
//         handleChange('tickets', ticketValue);
//     }, [ticketValue]);

//     return (
//         <SafeAreaView style={{ backgroundColor: colors.background }}>
//             <KeyboardAvoidingView
//                 behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//                 style={styles.wrapper}
//             >
//                 <ScrollView
//                     style={[styles.container, { backgroundColor: colors.background }]}
//                     contentContainerStyle={styles.content}
//                     keyboardShouldPersistTaps="handled"
//                 >
//                     <Text style={[styles.header, { color: colors.button }]}>
//                         Single Participant Registration
//                     </Text>
//                     <Text style={[styles.subHeader, { color: colors.secondaryText }]}>
//                         Issue tickets to your Participants without asking them to register online.
//                     </Text>

//                     <View style={[styles.card, { backgroundColor: colors.card }]}>
//                         {/* Info */}
//                         <View style={styles.infoRow}>
//                             <Text style={[styles.infoTitle, { color: colors.text }]}>Choose Your</Text>
//                             <View style={styles.infoRight}>
//                                 <View style={styles.infoItem}>
//                                     <MaterialIcons name="access-time" size={16} color={colors.secondaryText} />
//                                     <Text style={[styles.infoText, { color: colors.secondaryText }]}>
//                                         08:00 PM - 08:00 PM
//                                     </Text>
//                                 </View>
//                                 <View style={styles.infoItem}>
//                                     <MaterialIcons name="event-note" size={16} color={colors.cancelButton} />
//                                     <Text style={[styles.infoText, { color: colors.cancelButton, fontWeight: 'bold' }]}>
//                                         118 TICKET REMAINING
//                                     </Text>
//                                 </View>
//                             </View>
//                         </View>

//                         <Divider style={styles.divider} />

//                         {/* Ticket Dropdown */}
//                         <Text style={[styles.label, { color: colors.secondaryText }]}>
//                             Select the number of tickets
//                         </Text>
//                         <DropDownPicker
//                             open={open}
//                             value={ticketValue}
//                             items={ticketItems}
//                             setOpen={setOpen}
//                             setValue={setTicketValue}
//                             setItems={setTicketItems}
//                             style={[
//                                 styles.dropdown,
//                                 {
//                                     borderColor: colors.secondaryText,
//                                     backgroundColor: colors.dropdownBackground,
//                                     color: colors.text,
//                                 }
//                             ]}
//                             dropDownContainerStyle={[
//                                 styles.dropdownContainer,
//                                 { borderColor: colors.secondaryText, backgroundColor: colors.dropdownBackground }
//                             ]}
//                             placeholder="Select tickets"
//                             textStyle={{ color: colors.text }}
//                             listMode="MODAL"
//                         />

//                         {/* Buyer Info */}
//                         <Text style={[styles.sectionHeader, { color: colors.text }]}>Buyer Details</Text>
//                         <View style={styles.inputGroup}>
//                             <TextInput
//                                 style={[
//                                     styles.input,
//                                     {
//                                         borderColor: colors.secondaryText,
//                                         backgroundColor: colors.dropdownBackground,
//                                         color: colors.text,
//                                     }
//                                 ]}
//                                 placeholder="Name"
//                                 placeholderTextColor={colors.secondaryText}
//                                 value={form.name}
//                                 onChangeText={(text) => handleChange('name', text)}
//                             />
//                             <TextInput
//                                 style={[
//                                     styles.input,
//                                     {
//                                         borderColor: colors.secondaryText,
//                                         backgroundColor: colors.dropdownBackground,
//                                         color: colors.text,
//                                     }
//                                 ]}
//                                 placeholder="Email"
//                                 placeholderTextColor={colors.secondaryText}
//                                 value={form.email}
//                                 keyboardType="email-address"
//                                 onChangeText={(text) => handleChange('email', text)}
//                             />
//                             <TextInput
//                                 style={[
//                                     styles.input,
//                                     {
//                                         borderColor: colors.secondaryText,
//                                         backgroundColor: colors.dropdownBackground,
//                                         color: colors.text,
//                                     }
//                                 ]}
//                                 placeholder="Mobile number"
//                                 placeholderTextColor={colors.secondaryText}
//                                 value={form.mobile}
//                                 keyboardType="phone-pad"
//                                 onChangeText={(text) => handleChange('mobile', text)}
//                             />
//                         </View>

//                         <Divider style={styles.divider} />

//                         <View style={styles.buttonRow}>
//                             <Button
//                                 mode="outlined"
//                                 onPress={() => console.log('Cancel')}
//                                 textColor={colors.cancelButton}
//                                 style={{ borderColor: colors.cancelButton }}
//                             >
//                                 Cancel
//                             </Button>
//                             <Button
//                                 mode="contained"
//                                 buttonColor={colors.button}
//                                 textColor={colors.buttonText}
//                                 onPress={() => console.log('Proceed')}
//                             >
//                                 Proceed
//                             </Button>
//                         </View>
//                     </View>
//                 </ScrollView>
//             </KeyboardAvoidingView>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     wrapper: {},
//     container: {},
//     content: {
//         padding: 16,
//         paddingBottom: 32,
//     },
//     header: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 8,
//     },
//     subHeader: {
//         fontSize: 14,
//         marginBottom: 16,
//     },
//     card: {
//         borderRadius: 8,
//         padding: 16,
//         elevation: 3,
//     },
//     infoRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 12,
//     },
//     infoTitle: {
//         fontSize: 16,
//         fontWeight: '600',
//     },
//     infoRight: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 8,
//     },
//     infoItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginLeft: 8,
//     },
//     infoText: {
//         fontSize: 12,
//         marginLeft: 4,
//     },
//     divider: {
//         marginVertical: 12,
//     },
//     label: {
//         fontSize: 14,
//         marginBottom: 6,
//     },
//     dropdown: {
//         height: 44,
//         marginBottom: 16,
//     },
//     dropdownContainer: {},
//     sectionHeader: {
//         fontSize: 16,
//         fontWeight: '600',
//         marginBottom: 8,
//         marginTop: 8,
//     },
//     inputGroup: {
//         marginBottom: 16,
//     },
//     input: {
//         borderWidth: 1,
//         borderRadius: 4,
//         paddingHorizontal: 10,
//         paddingVertical: 10,
//         marginBottom: 12,
//     },
//     buttonRow: {
//         flexDirection: 'row',
//         justifyContent: 'flex-end',
//         gap: 8,
//     },
// });


import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Divider, Snackbar } from 'react-native-paper';
import { Colors } from '../../../../constants/Colors';
import { useGlobalInfo } from '../../../../context/GlobalContext';
import { API_ROUTE } from '../../../../lib/config';

export default function SingleParticipation() {
    const { event: eventId, theme } = useGlobalInfo();
    const navigation = useNavigation();
    const colors = Colors[theme];

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [schema, setSchema] = useState(null);
    const [ticketTiers, setTicketTiers] = useState([]);
    const [form, setForm] = useState({});
    const [openTier, setOpenTier] = useState(false);
    const [snackbar, setSnackbar] = useState({ visible: false, message: '', error: false });

    // Fetch schema & tiers
    useEffect(() => {
        if (!eventId) {
            setLoading(false);
            setSchema(null);
            setTicketTiers([]);
            return;
        }
        setLoading(true);
        Promise.all([
            fetch(`${API_ROUTE}/api/v1/event/registration-form/eventId/${eventId}`).then(r => r.json()),
            fetch(`${API_ROUTE}/api/v1/event/ticket-tiers/${eventId}`).then(r => r.json()),
        ])
            .then(([formsRes, tiersRes]) => {
                let forms = [];
                if (Array.isArray(formsRes)) {
                    forms = formsRes;
                } else if (formsRes && Array.isArray(formsRes.data?.forms)) {
                    forms = formsRes.data.forms;
                }
                if (!forms || !forms.length) {
                    setSchema(null);
                } else {
                    const formObj = forms[0];
                    setSchema(formObj);
                    // Build initial form state
                    const initial = { tierName: '', visitorCount: 0 };
                    (formObj.fields || []).forEach(f => {
                        initial[f.id] = f.type === 'Checkbox' ? false : '';
                    });
                    setForm(initial);
                }
                if (tiersRes.success && tiersRes.data && Array.isArray(tiersRes.data.ticket_tiers)) {
                    setTicketTiers(tiersRes.data.ticket_tiers);
                } else {
                    setTicketTiers([]);
                }
            })
            .catch((e) => {
                setSnackbar({
                    visible: true,
                    message: 'Failed to load form info',
                    error: true,
                });
                setSchema(undefined); // error
                setTicketTiers([]);
            })
            .finally(() => setLoading(false));
    }, [eventId]);

    // Input handling
    const handleChange = (id, value) => {
        setForm(prev => ({ ...prev, [id]: value }));
    };

    // Submit logic
    const handleSubmit = () => {
        if (!schema || !form.tierName) {
            setSnackbar({ visible: true, message: 'Please select a ticket tier', error: true });
            return;
        }
        setSubmitting(true);
        const responses = schema.fields.map(f => ({ fieldId: f.id, value: form[f.id] }));
        const visitorCount = Number(form.visitorCount) || 0;

        fetch(`${API_ROUTE}/api/v1/event/form-submission`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                eventId,
                formId: schema._id,
                responses,
                visitorCount,
                tierName: form.tierName,
            }),
        })
            .then(async res => {
                if (!res.ok) {
                    const errMsg = await res.text();
                    throw new Error(errMsg);
                }
                return res.json();
            })
            .then(data => {
                setSnackbar({ visible: true, message: 'Ticket successfully created!', error: false });
                setTimeout(() => {
                    setSubmitting(false);
                    navigation.navigate('QrScreen', { participantId: data._id });
                }, 1400);
            })
            .catch(err => {
                setSnackbar({ visible: true, message: `Failed: ${err.message}`, error: true });
                setSubmitting(false);
            });
    };

    // Rendering logic
    if (loading) {
        return (
            <View style={[{ padding: 32, alignItems: 'center' }, { color: colors.button }]}>
                <ActivityIndicator color={colors.button} />
            </View>
        );
    }

    // If schema === undefined → error (API/network), show nothing, only snackbar
    // If schema === null → API success but empty, show message and button
    if (schema === null) {
        return (
            <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, margin: 18 }}>No registration form found.</Text>
                <Button
                    mode="contained"
                    buttonColor={colors.button}
                    onPress={() => navigation.navigate('ParticipantRegistration')}
                >
                    Build a Registration Form
                </Button>
                <Snackbar
                    visible={snackbar.visible}
                    onDismiss={() => setSnackbar(s => ({ ...s, visible: false }))}
                    duration={2200}
                    style={{ backgroundColor: snackbar.error ? colors.cancelButton : colors.button }}
                >
                    {snackbar.message}
                </Snackbar>
            </SafeAreaView>
        );
    }

    // On network/API error (schema === undefined), only show snackbar (render blank)
    if (schema === undefined) {
        return (
            <>
                <Snackbar
                    visible={snackbar.visible}
                    onDismiss={() => setSnackbar(s => ({ ...s, visible: false }))}
                    duration={2200}
                    style={{ backgroundColor: snackbar.error ? colors.cancelButton : colors.button }}
                >
                    {snackbar.message}
                </Snackbar>
            </>
        );
    }

    if (submitting) {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
                <ActivityIndicator color={colors.button} size="large" />
                <Text style={{ color: colors.button, marginTop: 16 }}>Ticket successfully updated!</Text>
            </View>
        );
    }

    // Normal form view
    return (
        <SafeAreaView style={{ backgroundColor: colors.background }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.wrapper}
            >
                <ScrollView
                    style={[styles.container, { backgroundColor: colors.background }]}
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={[styles.header, { color: colors.button }]}>
                        {schema.title || 'Single Participant Registration'}
                    </Text>
                    <Text style={[styles.subHeader, { color: colors.secondaryText }]}>
                        {schema.description || 'Issue tickets to your Participants without asking them to register online.'}
                    </Text>
                    <View style={[styles.card, { backgroundColor: colors.card }]}>
                        {/* Info row */}
                        <View style={styles.infoRow}>
                            <Text style={[styles.infoTitle, { color: colors.text }]}>Choose Your</Text>
                            <View style={styles.infoRight}>
                                <View style={styles.infoItem}>
                                    <MaterialIcons name="access-time" size={16} color={colors.secondaryText} />
                                    <Text style={[styles.infoText, { color: colors.secondaryText }]}>
                                        08:00 PM - 08:00 PM
                                    </Text>
                                </View>
                                <View style={styles.infoItem}>
                                    <MaterialIcons name="event-note" size={16} color={colors.cancelButton} />
                                    <Text style={[styles.infoText, { color: colors.cancelButton, fontWeight: 'bold' }]}>
                                        {ticketTiers.length > 0
                                            ? `${ticketTiers.reduce((acc, t) => acc + (t.capacity || 0), 0)} TICKET REMAINING`
                                            : `TICKET REMAINING`}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <Divider style={styles.divider} />

                        {/* Ticket Tier Dropdown */}
                        <Text style={[styles.label, { color: colors.secondaryText }]}>Select Ticket Tier</Text>
                        <DropDownPicker
                            open={openTier}
                            value={form.tierName}
                            items={[
                                { label: 'Select tier', value: '' },
                                ...ticketTiers.map(t => ({
                                    label: `${t.name} — ₹${t.price} (${t.capacity} left)`,
                                    value: t.name,
                                })),
                            ]}
                            setOpen={setOpenTier}
                            setValue={val => handleChange('tierName', val())}
                            setItems={() => { }} // no dynamic set
                            style={[
                                styles.dropdown,
                                {
                                    borderColor: colors.secondaryText,
                                    backgroundColor: colors.dropdownBackground,
                                }
                            ]}
                            dropDownContainerStyle={[
                                styles.dropdownContainer,
                                { borderColor: colors.secondaryText, backgroundColor: colors.dropdownBackground }
                            ]}
                            placeholder="Select tier"
                            textStyle={{ color: colors.text }}
                            listMode="MODAL"
                        />

                        {/* Dynamic schema fields */}
                        {schema.fields.map(f => {
                            const val = form[f.id];
                            switch (f.type) {
                                case 'Input Field':
                                case 'Email':
                                    return (
                                        <TextInput
                                            key={f.id}
                                            style={[
                                                styles.input,
                                                {
                                                    borderColor: colors.secondaryText,
                                                    backgroundColor: colors.dropdownBackground,
                                                    color: colors.text,
                                                }
                                            ]}
                                            placeholder={f.label}
                                            placeholderTextColor={colors.secondaryText}
                                            keyboardType={f.type === 'Email' ? 'email-address' : 'default'}
                                            value={val}
                                            onChangeText={t => handleChange(f.id, t)}
                                        />
                                    );
                                case 'Textarea':
                                    return (
                                        <TextInput
                                            key={f.id}
                                            style={[
                                                styles.input,
                                                {
                                                    borderColor: colors.secondaryText,
                                                    backgroundColor: colors.dropdownBackground,
                                                    color: colors.text,
                                                    height: 80,
                                                    textAlignVertical: 'top'
                                                }
                                            ]}
                                            placeholder={f.label}
                                            placeholderTextColor={colors.secondaryText}
                                            multiline
                                            value={val}
                                            onChangeText={t => handleChange(f.id, t)}
                                        />
                                    );
                                case 'Number Field':
                                    return (
                                        <TextInput
                                            key={f.id}
                                            style={[
                                                styles.input,
                                                {
                                                    borderColor: colors.secondaryText,
                                                    backgroundColor: colors.dropdownBackground,
                                                    color: colors.text,
                                                }
                                            ]}
                                            placeholder={f.label}
                                            placeholderTextColor={colors.secondaryText}
                                            value={val?.toString()}
                                            keyboardType="number-pad"
                                            onChangeText={t => handleChange(f.id, t.replace(/[^0-9]/g, ''))}
                                        />
                                    );
                                case 'Select Menu':
                                    // For select inside dynamic fields, create a separate DropDownPicker per field
                                    return (
                                        <DropDownPicker
                                            key={f.id}
                                            open={openTier === f.id}
                                            value={val}
                                            items={f.options.map(opt => ({ label: opt, value: opt }))}
                                            setOpen={o => setOpenTier(o ? f.id : false)}
                                            setValue={v => handleChange(f.id, v())}
                                            setItems={() => { }}
                                            style={[
                                                styles.dropdown,
                                                {
                                                    borderColor: colors.secondaryText,
                                                    backgroundColor: colors.dropdownBackground,
                                                }
                                            ]}
                                            dropDownContainerStyle={[
                                                styles.dropdownContainer,
                                                { borderColor: colors.secondaryText, backgroundColor: colors.dropdownBackground }
                                            ]}
                                            placeholder={f.label}
                                            textStyle={{ color: colors.text }}
                                            listMode="MODAL"
                                        />
                                    );
                                case 'Checkbox':
                                    return (
                                        <View key={f.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                            <Switch
                                                value={!!val}
                                                onValueChange={v => handleChange(f.id, v)}
                                                trackColor={{ true: colors.button, false: colors.secondaryText }}
                                                thumbColor={!!val ? colors.button : colors.card}
                                            />
                                            <Text style={{ color: colors.text, marginLeft: 8 }}>{f.label}</Text>
                                        </View>
                                    );
                                default:
                                    return null;
                            }
                        })}

                        {/* Additional Visitors */}
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    borderColor: colors.secondaryText,
                                    backgroundColor: colors.dropdownBackground,
                                    color: colors.text,
                                }
                            ]}
                            placeholder="Additional Visitors"
                            placeholderTextColor={colors.secondaryText}
                            value={form.visitorCount?.toString()}
                            keyboardType="number-pad"
                            onChangeText={t => handleChange('visitorCount', t.replace(/[^0-9]/g, ''))}
                        />

                        <Text style={{ fontSize: 12, color: colors.secondaryText, marginBottom: 8 }}>
                            Enter extra guests (0 if none).
                        </Text>

                        <Divider style={styles.divider} />

                        <View style={styles.buttonRow}>
                            <Button
                                mode="outlined"
                                onPress={() => navigation.goBack()}
                                textColor={colors.cancelButton}
                                style={{ borderColor: colors.cancelButton }}
                            >
                                Cancel
                            </Button>
                            <Button
                                mode="contained"
                                buttonColor={colors.button}
                                textColor={colors.buttonText}
                                onPress={handleSubmit}
                            >
                                Proceed
                            </Button>
                        </View>
                    </View>
                </ScrollView>
                <Snackbar
                    visible={snackbar.visible}
                    onDismiss={() => setSnackbar(s => ({ ...s, visible: false }))}
                    duration={2200}
                    style={{ backgroundColor: snackbar.error ? colors.cancelButton : colors.button }}
                >
                    {snackbar.message}
                </Snackbar>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {},
    container: {},
    content: {
        padding: 16,
        paddingBottom: 32,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subHeader: {
        fontSize: 14,
        marginBottom: 16,
    },
    card: {
        borderRadius: 8,
        padding: 16,
        elevation: 3,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    infoRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    infoText: {
        fontSize: 12,
        marginLeft: 4,
    },
    divider: {
        marginVertical: 12,
    },
    label: {
        fontSize: 14,
        marginBottom: 6,
    },
    dropdown: {
        height: 44,
        marginBottom: 16,
    },
    dropdownContainer: {},
    sectionHeader: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 8,
    },
    inputGroup: {
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 12,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 8,
    },
});
