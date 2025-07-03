import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Text, TextInput } from 'react-native-paper';
import { Colors } from '../../constants/Colors';
import { useGlobalInfo } from '../../context/GlobalContext';
import { API_ROUTE } from '../../lib/config';

export default function Profile() {
    const { user, token, changeUser, changeUserId, changeUserType, theme } = useGlobalInfo();
    const colors = Colors[theme];
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone_number: '',
        company_name: '',
        company_gst_number: '',
    });
    const [loading, setLoading] = useState(false);

    // Prefill form when user is available/changes
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                password: '',
                phone_number: user.phone_number?.toString() || '',
                company_name: user.company_name || '',
                company_gst_number: user.company_gst_number || '',
            });
        }
    }, [user]);

    const handleChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        if (!formData.name.trim() || !formData.email.trim()) {
            Alert.alert('Validation Error', 'Name and email are required.');
            return;
        }
        const userId = user?._id;
        if (!userId) {
            Alert.alert('Error', 'No user found.');
            return;
        }
        let payload = { ...formData };
        if (!payload.password) delete payload.password;

        setLoading(true);
        try {
            const res = await fetch(`${API_ROUTE}/api/v1/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            const result = await res.json();
            if (result.success) {
                changeUser?.(result.data);
                changeUserId?.(result.data._id);
                changeUserType?.(result.data.user_type);
                setFormData(f => ({ ...f, password: '' }));
                Alert.alert('Success', 'Profile updated successfully');
            } else {
                Alert.alert('Error', result.message || 'Update failed');
            }
        } catch (err) {
            Alert.alert('Error', 'Something went wrong');
        }
        setLoading(false);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1, backgroundColor: colors.background }}
        >
            <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
                <View style={[styles.card, { backgroundColor: colors.card }]}>
                    <View style={styles.header}>
                        <Avatar.Text
                            size={80}
                            label={formData.name?.slice(0, 1).toUpperCase() || 'U'}
                            style={{ backgroundColor: colors.button }}
                            color={colors.buttonText}
                        />
                        <Text style={[styles.name, { color: colors.text }]}>
                            {formData.name || 'User'}
                        </Text>
                        <Text style={[styles.designation, { color: colors.secondaryText }]}>
                            Edit your profile details
                        </Text>
                    </View>

                    <View style={styles.formContainer}>
                        <TextInput
                            label="Name"
                            value={formData.name}
                            onChangeText={text => handleChange('name', text)}
                            style={styles.input}
                            mode="outlined"
                            autoCapitalize="words"
                            theme={{
                                colors: {
                                    primary: colors.button,
                                    text: colors.text,
                                    background: colors.card,
                                    placeholder: colors.secondaryText,
                                },
                            }}
                        />
                        <TextInput
                            label="Email"
                            value={formData.email}
                            onChangeText={text => handleChange('email', text)}
                            style={styles.input}
                            mode="outlined"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            theme={{
                                colors: {
                                    primary: colors.button,
                                    text: colors.text,
                                    background: colors.card,
                                    placeholder: colors.secondaryText,
                                },
                            }}
                        />
                        <TextInput
                            label="Phone Number"
                            value={formData.phone_number}
                            onChangeText={text => handleChange('phone_number', text)}
                            style={styles.input}
                            mode="outlined"
                            keyboardType="phone-pad"
                            theme={{
                                colors: {
                                    primary: colors.button,
                                    text: colors.text,
                                    background: colors.card,
                                    placeholder: colors.secondaryText,
                                },
                            }}
                        />
                        <TextInput
                            label="Password"
                            value={formData.password}
                            onChangeText={text => handleChange('password', text)}
                            style={styles.input}
                            mode="outlined"
                            secureTextEntry
                            placeholder="Change Password"
                            theme={{
                                colors: {
                                    primary: colors.button,
                                    text: colors.text,
                                    background: colors.card,
                                    placeholder: colors.secondaryText,
                                },
                            }}
                        />
                        <TextInput
                            label="Company Name"
                            value={formData.company_name}
                            onChangeText={text => handleChange('company_name', text)}
                            style={styles.input}
                            mode="outlined"
                            theme={{
                                colors: {
                                    primary: colors.button,
                                    text: colors.text,
                                    background: colors.card,
                                    placeholder: colors.secondaryText,
                                },
                            }}
                        />
                        <TextInput
                            label="Company GST Number"
                            value={formData.company_gst_number}
                            onChangeText={text => handleChange('company_gst_number', text)}
                            style={styles.input}
                            mode="outlined"
                            theme={{
                                colors: {
                                    primary: colors.button,
                                    text: colors.text,
                                    background: colors.card,
                                    placeholder: colors.secondaryText,
                                },
                            }}
                        />
                        <Button
                            mode="contained"
                            onPress={handleSave}
                            loading={loading}
                            style={[styles.saveButton, { backgroundColor: colors.button }]}
                            contentStyle={{ paddingVertical: 10 }}
                            labelStyle={{ fontSize: 16, fontWeight: 'bold', color: colors.buttonText }}
                        >
                            Save Changes
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 18,
        flexGrow: 1,
        justifyContent: 'center',
    },
    card: {
        padding: 22,
        borderRadius: 14,
        maxWidth: 540,
        alignSelf: 'center',
        width: '100%',
        elevation: 2,
        marginTop: 34,
        marginBottom: 34,
    },
    header: {
        alignItems: 'center',
        marginBottom: 16,
    },
    name: {
        fontSize: 22,
        fontWeight: '600',
        marginTop: 12,
    },
    designation: {
        fontSize: 15,
        marginTop: 2,
    },
    formContainer: {
        marginTop: 18,
    },
    input: {
        marginBottom: 14,
        backgroundColor: 'transparent',
    },
    saveButton: {
        marginTop: 14,
        borderRadius: 7,
    },
});
