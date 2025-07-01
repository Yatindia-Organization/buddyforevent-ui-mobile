// import React, { useState } from 'react';
// import {
//     ScrollView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View
// } from 'react-native';
// import { Button, Chip, Dialog, Paragraph, Portal, RadioButton, Snackbar } from 'react-native-paper';

// export default function Email() {
//     const [activeTab, setActiveTab] = useState('email');
//     const [recipientType, setRecipientType] = useState('single');

//     const [singleTo, setSingleTo] = useState('');
//     const [multipleTo, setMultipleTo] = useState([]);
//     const [inputValue, setInputValue] = useState('');

//     const [subject, setSubject] = useState('');
//     const [message, setMessage] = useState('');
//     const [snackbar, setSnackbar] = useState({ visible: false, message: '', severity: 'success' });

//     const [dialogVisible, setDialogVisible] = useState(false);
//     const [pendingChange, setPendingChange] = useState({ type: '', value: '' });

//     const isValidEmail = (email) => {
//         const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return re.test(email);
//     };

//     const isValidPhoneNumber = (num) => /^\d{10}$/.test(num);

//     const hasInput = () =>
//         singleTo || multipleTo.length > 0 || subject || message;

//     const clearAll = () => {
//         setSingleTo('');
//         setMultipleTo([]);
//         setInputValue('');
//         setSubject('');
//         setMessage('');
//     };

//     const handleTabChange = (val) => {
//         if (val !== activeTab) {
//             if (hasInput()) {
//                 setPendingChange({ type: 'tab', value: val });
//                 setDialogVisible(true);
//             } else {
//                 setActiveTab(val);
//                 clearAll();
//             }
//         }
//     };

//     const handleRecipientTypeChange = (val) => {
//         if (val !== recipientType) {
//             if (hasInput()) {
//                 setPendingChange({ type: 'recipientType', value: val });
//                 setDialogVisible(true);
//             } else {
//                 setRecipientType(val);
//                 clearAll();
//             }
//         }
//     };

//     const confirmChange = () => {
//         const { type, value } = pendingChange;
//         if (type === 'tab') setActiveTab(value);
//         if (type === 'recipientType') setRecipientType(value);
//         clearAll();
//         setDialogVisible(false);
//     };

//     const handleAddRecipient = () => {
//         const cleaned = inputValue.trim();
//         if (!cleaned) return;

//         const isValid = activeTab === 'email'
//             ? isValidEmail(cleaned)
//             : isValidPhoneNumber(cleaned);

//         if (isValid && !multipleTo.includes(cleaned)) {
//             setMultipleTo([...multipleTo, cleaned]);
//             setInputValue('');
//         }
//     };

//     const removeRecipient = (index) => {
//         setMultipleTo(multipleTo.filter((_, i) => i !== index));
//     };

//     const isSendDisabled = () => {
//         if (message.trim() === '') return true;

//         if (activeTab === 'email') {
//             if (subject.trim() === '' || subject.length > 60) return true;
//             if (recipientType === 'single') {
//                 return !isValidEmail(singleTo.trim());
//             }
//             return multipleTo.length === 0 || !multipleTo.every(isValidEmail);
//         } else {
//             if (recipientType === 'single') {
//                 return !isValidPhoneNumber(singleTo.trim());
//             }
//             return multipleTo.length === 0 || !multipleTo.every(isValidPhoneNumber);
//         }
//     };

//     const handleSend = () => {
//         const recipients = recipientType === 'single' ? singleTo : multipleTo.join(', ');
//         setSnackbar({
//             visible: true,
//             message: `${activeTab === 'email' ? 'Email' : 'Message'} sent to ${recipientType === 'single' ? `"${singleTo}"` : `${multipleTo.length} recipients`}!`,
//             severity: 'success',
//         });
//         clearAll();
//     };

//     return (
//         <ScrollView style={styles.container}>
//             <Text style={styles.title}>Send Ticket Manually</Text>
//             <Text style={styles.subTitle}>
//                 Send an {activeTab === 'email' ? 'email' : 'SMS message'} to participants
//             </Text>

//             {/* Tabs */}
//             <View style={styles.tabContainer}>
//                 <TouchableOpacity
//                     style={[styles.tab, activeTab === 'email' && styles.activeTab]}
//                     onPress={() => handleTabChange('email')}
//                 >
//                     <Text style={[styles.tabText, activeTab === 'email' && styles.activeTabText]}>Email</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={[styles.tab, activeTab === 'message' && styles.activeTab]}
//                     onPress={() => handleTabChange('message')}
//                 >
//                     <Text style={[styles.tabText, activeTab === 'message' && styles.activeTabText]}>Message</Text>
//                 </TouchableOpacity>
//             </View>

//             {/* Recipient Type */}
//             <View style={styles.radioContainer}>
//                 <RadioButton.Group
//                     onValueChange={handleRecipientTypeChange}
//                     value={recipientType}
//                 >
//                     <View style={styles.radioItem}>
//                         <RadioButton value="single" />
//                         <Text>Single</Text>
//                     </View>
//                     <View style={styles.radioItem}>
//                         <RadioButton value="multiple" />
//                         <Text>Multiple</Text>
//                     </View>
//                 </RadioButton.Group>
//             </View>

//             {/* Form */}
//             <View style={styles.formContainer}>
//                 {recipientType === 'single' ? (
//                     <TextInput
//                         style={styles.input}
//                         placeholder={`To (${activeTab === 'email' ? 'Email' : 'Phone Number'})`}
//                         value={singleTo}
//                         onChangeText={setSingleTo}
//                         keyboardType={activeTab === 'message' ? 'phone-pad' : 'email-address'}
//                     />
//                 ) : (
//                     <View style={styles.multiInputContainer}>
//                         <TextInput
//                             style={styles.input}
//                             placeholder={`Add ${activeTab === 'email' ? 'Email' : 'Phone'} and press +`}
//                             value={inputValue}
//                             onChangeText={setInputValue}
//                             keyboardType={activeTab === 'message' ? 'phone-pad' : 'email-address'}
//                         />
//                         <Button mode="outlined" onPress={handleAddRecipient} style={styles.addButton}>
//                             +
//                         </Button>
//                         <View style={styles.chipContainer}>
//                             {multipleTo.map((val, index) => {
//                                 const isInvalid = activeTab === 'email'
//                                     ? !isValidEmail(val)
//                                     : !isValidPhoneNumber(val);
//                                 return (
//                                     <Chip
//                                         key={index}
//                                         mode={isInvalid ? 'outlined' : 'flat'}
//                                         selectedColor={isInvalid ? 'red' : 'black'}
//                                         onClose={() => removeRecipient(index)}
//                                         style={{ margin: 4 }}
//                                     >
//                                         {val}
//                                     </Chip>
//                                 );
//                             })}
//                         </View>
//                     </View>
//                 )}

//                 {/* Subject */}
//                 {activeTab === 'email' && (
//                     <>
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Subject"
//                             value={subject}
//                             onChangeText={setSubject}
//                         />
//                         <Text style={styles.caption}>Subject should be maximum 60 characters</Text>
//                     </>
//                 )}

//                 {/* Message */}
//                 <TextInput
//                     style={[styles.input, styles.messageInput]}
//                     placeholder="Message"
//                     value={message}
//                     onChangeText={setMessage}
//                     multiline
//                     numberOfLines={4}
//                 />

//                 {/* Send Button */}
//                 <Button
//                     mode="contained"
//                     onPress={handleSend}
//                     disabled={isSendDisabled()}
//                     style={styles.sendButton}
//                 >
//                     Send
//                 </Button>
//             </View>

//             {/* Snackbar */}
//             <Snackbar
//                 visible={snackbar.visible}
//                 onDismiss={() => setSnackbar((prev) => ({ ...prev, visible: false }))}
//                 duration={4000}
//             >
//                 {snackbar.message}
//             </Snackbar>

//             {/* Dialog */}
//             <Portal>
//                 <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
//                     <Dialog.Title>Unsaved Input Detected</Dialog.Title>
//                     <Dialog.Content>
//                         <Paragraph>
//                             Changing mode will clear all inputs. Are you sure you want to continue?
//                         </Paragraph>
//                     </Dialog.Content>
//                     <Dialog.Actions>
//                         <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
//                         <Button onPress={confirmChange} color="red">
//                             Yes, Clear
//                         </Button>
//                     </Dialog.Actions>
//                 </Dialog>
//             </Portal>
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         padding: 16,
//         backgroundColor: '#fff',
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: '700',
//         color: '#5D5C8D',
//         marginBottom: 8,
//     },
//     subTitle: {
//         fontSize: 14,
//         marginBottom: 16,
//     },
//     tabContainer: {
//         flexDirection: 'row',
//         marginBottom: 16,
//     },
//     tab: {
//         flex: 1,
//         paddingVertical: 8,
//         alignItems: 'center',
//         borderBottomWidth: 2,
//         borderBottomColor: '#ccc',
//     },
//     activeTab: {
//         borderBottomColor: '#4CAF50',
//     },
//     tabText: {
//         fontSize: 16,
//         color: '#555',
//     },
//     activeTabText: {
//         color: '#4CAF50',
//         fontWeight: 'bold',
//     },
//     radioContainer: {
//         flexDirection: 'row',
//         justifyContent: 'flex-end',
//         marginBottom: 16,
//     },
//     radioItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginLeft: 16,
//     },
//     formContainer: {
//         backgroundColor: '#f5f5f5',
//         padding: 16,
//         borderRadius: 8,
//     },
//     input: {
//         backgroundColor: '#fff',
//         padding: 10,
//         borderRadius: 4,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         marginBottom: 12,
//     },
//     caption: {
//         fontSize: 12,
//         color: 'gray',
//         marginBottom: 8,
//     },
//     messageInput: {
//         height: 100,
//         textAlignVertical: 'top',
//     },
//     sendButton: {
//         marginTop: 12,
//     },
//     multiInputContainer: {
//         marginBottom: 12,
//     },
//     addButton: {
//         alignSelf: 'flex-start',
//         marginVertical: 8,
//     },
//     chipContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//     },
// });



import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Button, Chip, Dialog, Paragraph, Portal, RadioButton, Snackbar } from 'react-native-paper';
import { Colors } from '../../../../constants/Colors';
import { useGlobalInfo } from '../../../../context/GlobalContext';

export default function Email() {
    const { theme } = useGlobalInfo();
    const colors = Colors[theme];

    const [activeTab, setActiveTab] = useState('email');
    const [recipientType, setRecipientType] = useState('single');

    const [singleTo, setSingleTo] = useState('');
    const [multipleTo, setMultipleTo] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [snackbar, setSnackbar] = useState({ visible: false, message: '', severity: 'success' });

    const [dialogVisible, setDialogVisible] = useState(false);
    const [pendingChange, setPendingChange] = useState({ type: '', value: '' });

    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const isValidPhoneNumber = (num) => /^\d{10}$/.test(num);

    const hasInput = () =>
        singleTo || multipleTo.length > 0 || subject || message;

    const clearAll = () => {
        setSingleTo('');
        setMultipleTo([]);
        setInputValue('');
        setSubject('');
        setMessage('');
    };

    const handleTabChange = (val) => {
        if (val !== activeTab) {
            if (hasInput()) {
                setPendingChange({ type: 'tab', value: val });
                setDialogVisible(true);
            } else {
                setActiveTab(val);
                clearAll();
            }
        }
    };

    const handleRecipientTypeChange = (val) => {
        if (val !== recipientType) {
            if (hasInput()) {
                setPendingChange({ type: 'recipientType', value: val });
                setDialogVisible(true);
            } else {
                setRecipientType(val);
                clearAll();
            }
        }
    };

    const confirmChange = () => {
        const { type, value } = pendingChange;
        if (type === 'tab') setActiveTab(value);
        if (type === 'recipientType') setRecipientType(value);
        clearAll();
        setDialogVisible(false);
    };

    const handleAddRecipient = () => {
        const cleaned = inputValue.trim();
        if (!cleaned) return;

        const isValid = activeTab === 'email'
            ? isValidEmail(cleaned)
            : isValidPhoneNumber(cleaned);

        if (isValid && !multipleTo.includes(cleaned)) {
            setMultipleTo([...multipleTo, cleaned]);
            setInputValue('');
        }
    };

    const removeRecipient = (index) => {
        setMultipleTo(multipleTo.filter((_, i) => i !== index));
    };

    const isSendDisabled = () => {
        if (message.trim() === '') return true;

        if (activeTab === 'email') {
            if (subject.trim() === '' || subject.length > 60) return true;
            if (recipientType === 'single') {
                return !isValidEmail(singleTo.trim());
            }
            return multipleTo.length === 0 || !multipleTo.every(isValidEmail);
        } else {
            if (recipientType === 'single') {
                return !isValidPhoneNumber(singleTo.trim());
            }
            return multipleTo.length === 0 || !multipleTo.every(isValidPhoneNumber);
        }
    };

    const handleSend = () => {
        const recipients = recipientType === 'single' ? singleTo : multipleTo.join(', ');
        setSnackbar({
            visible: true,
            message: `${activeTab === 'email' ? 'Email' : 'Message'} sent to ${recipientType === 'single' ? `"${singleTo}"` : `${multipleTo.length} recipients`}!`,
            severity: 'success',
        });
        clearAll();
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.button }]}>Send Ticket Manually</Text>
            <Text style={[styles.subTitle, { color: colors.secondaryText }]}>
                Send an {activeTab === 'email' ? 'email' : 'SMS message'} to participants
            </Text>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        { borderBottomColor: colors.dropdownBackground },
                        activeTab === 'email' && { borderBottomColor: colors.button }
                    ]}
                    onPress={() => handleTabChange('email')}
                >
                    <Text style={[
                        styles.tabText,
                        { color: colors.secondaryText },
                        activeTab === 'email' && { color: colors.button, fontWeight: 'bold' }
                    ]}>Email</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        { borderBottomColor: colors.dropdownBackground },
                        activeTab === 'message' && { borderBottomColor: colors.button }
                    ]}
                    onPress={() => handleTabChange('message')}
                >
                    <Text style={[
                        styles.tabText,
                        { color: colors.secondaryText },
                        activeTab === 'message' && { color: colors.button, fontWeight: 'bold' }
                    ]}>Message</Text>
                </TouchableOpacity>
            </View>

            {/* Recipient Type */}
            <View style={styles.radioContainer}>
                <RadioButton.Group
                    onValueChange={handleRecipientTypeChange}
                    value={recipientType}
                >
                    <View style={styles.radioItem}>
                        <RadioButton value="single" color={colors.button} uncheckedColor={colors.secondaryText} />
                        <Text style={{ color: colors.text }}>Single</Text>
                    </View>
                    <View style={styles.radioItem}>
                        <RadioButton value="multiple" color={colors.button} uncheckedColor={colors.secondaryText} />
                        <Text style={{ color: colors.text }}>Multiple</Text>
                    </View>
                </RadioButton.Group>
            </View>

            {/* Form */}
            <View style={[styles.formContainer, { backgroundColor: colors.card }]}>
                {recipientType === 'single' ? (
                    <TextInput
                        style={[
                            styles.input,
                            {
                                backgroundColor: colors.dropdownBackground,
                                borderColor: colors.secondaryText,
                                color: colors.text,
                            }
                        ]}
                        placeholder={`To (${activeTab === 'email' ? 'Email' : 'Phone Number'})`}
                        placeholderTextColor={colors.secondaryText}
                        value={singleTo}
                        onChangeText={setSingleTo}
                        keyboardType={activeTab === 'message' ? 'phone-pad' : 'email-address'}
                    />
                ) : (
                    <View style={styles.multiInputContainer}>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: colors.dropdownBackground,
                                    borderColor: colors.secondaryText,
                                    color: colors.text,
                                }
                            ]}
                            placeholder={`Add ${activeTab === 'email' ? 'Email' : 'Phone'} and press +`}
                            placeholderTextColor={colors.secondaryText}
                            value={inputValue}
                            onChangeText={setInputValue}
                            keyboardType={activeTab === 'message' ? 'phone-pad' : 'email-address'}
                        />
                        <Button mode="outlined" onPress={handleAddRecipient} style={styles.addButton} textColor={colors.button}>
                            +
                        </Button>
                        <View style={styles.chipContainer}>
                            {multipleTo.map((val, index) => {
                                const isInvalid = activeTab === 'email'
                                    ? !isValidEmail(val)
                                    : !isValidPhoneNumber(val);
                                return (
                                    <Chip
                                        key={index}
                                        mode={isInvalid ? 'outlined' : 'flat'}
                                        textStyle={{
                                            color: isInvalid ? colors.cancelButton : colors.text
                                        }}
                                        onClose={() => removeRecipient(index)}
                                        style={{
                                            margin: 4,
                                            borderColor: isInvalid ? colors.cancelButton : undefined,
                                        }}
                                    >
                                        {val}
                                    </Chip>
                                );
                            })}
                        </View>
                    </View>
                )}

                {/* Subject */}
                {activeTab === 'email' && (
                    <>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: colors.dropdownBackground,
                                    borderColor: colors.secondaryText,
                                    color: colors.text,
                                }
                            ]}
                            placeholder="Subject"
                            placeholderTextColor={colors.secondaryText}
                            value={subject}
                            onChangeText={setSubject}
                        />
                        <Text style={[styles.caption, { color: colors.secondaryText }]}>
                            Subject should be maximum 60 characters
                        </Text>
                    </>
                )}

                {/* Message */}
                <TextInput
                    style={[
                        styles.input,
                        styles.messageInput,
                        {
                            backgroundColor: colors.dropdownBackground,
                            borderColor: colors.secondaryText,
                            color: colors.text,
                        }
                    ]}
                    placeholder="Message"
                    placeholderTextColor={colors.secondaryText}
                    value={message}
                    onChangeText={setMessage}
                    multiline
                    numberOfLines={4}
                />

                {/* Send Button */}
                <Button
                    mode="contained"
                    onPress={handleSend}
                    disabled={isSendDisabled()}
                    style={[styles.sendButton, { backgroundColor: colors.button }]}
                    textColor={colors.buttonText}
                >
                    Send
                </Button>
            </View>

            {/* Snackbar */}
            <Snackbar
                visible={snackbar.visible}
                onDismiss={() => setSnackbar((prev) => ({ ...prev, visible: false }))}
                duration={4000}
                style={{ backgroundColor: colors.button }}
            >
                <Text style={{ color: colors.buttonText }}>{snackbar.message}</Text>
            </Snackbar>

            {/* Dialog */}
            <Portal>
                <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
                    <Dialog.Title>Unsaved Input Detected</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>
                            Changing mode will clear all inputs. Are you sure you want to continue?
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setDialogVisible(false)} textColor={colors.text}>Cancel</Button>
                        <Button onPress={confirmChange} textColor={colors.cancelButton}>
                            Yes, Clear
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 8,
    },
    subTitle: {
        fontSize: 14,
        marginBottom: 16,
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    tab: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderBottomWidth: 2,
    },
    tabText: {
        fontSize: 16,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 16,
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
    },
    formContainer: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
    },
    input: {
        padding: 10,
        borderRadius: 4,
        borderWidth: 1,
        marginBottom: 12,
    },
    caption: {
        fontSize: 12,
        marginBottom: 8,
    },
    messageInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    sendButton: {
        marginTop: 12,
    },
    multiInputContainer: {
        marginBottom: 12,
    },
    addButton: {
        alignSelf: 'flex-start',
        marginVertical: 8,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
