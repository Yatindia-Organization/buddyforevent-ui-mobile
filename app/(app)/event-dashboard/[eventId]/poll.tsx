import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { Colors } from '../../../../constants/Colors';
import { useGlobalInfo } from '../../../../context/GlobalContext';
import { API_ROUTE } from '../../../../lib/config';

export default function Poll() {
    const { theme, userId, event } = useGlobalInfo();
    const colors = Colors[theme];
    const eventId = event;
    const [poll, setPoll] = useState({ question: '', options: [''] });
    const [snackbar, setSnackbar] = useState({
        visible: false,
        message: '',
        severity: 'success',
    });

    const handlePollChange = (index, value) => {
        const newOptions = [...poll.options];
        newOptions[index] = value;
        setPoll({ ...poll, options: newOptions });
    };

    const addPollOption = () => {
        setPoll({ ...poll, options: [...poll.options, ''] });
    };

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({
            visible: true,
            message,
            severity,
        });
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
                event: eventId,
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
                setPoll({ question: '', options: [''] });
            } else {
                throw new Error('Failed to create poll');
            }
        } catch (err) {
            showSnackbar(err.message, 'error');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.root}>
            <View style={[styles.container, { backgroundColor: colors.card }]}>
                <Text style={[styles.title, { color: colors.text }]}>Create a Poll</Text>
                <TextInput
                    value={poll.question}
                    onChangeText={text => setPoll({ ...poll, question: text })}
                    placeholder="Enter your question"
                    placeholderTextColor={colors.secondaryText}
                    style={[
                        styles.input,
                        { backgroundColor: colors.dropdownBackground, borderColor: colors.secondaryText, color: colors.text }
                    ]}
                />
                {poll.options.map((option, idx) => (
                    <TextInput
                        key={idx}
                        value={option}
                        onChangeText={text => handlePollChange(idx, text)}
                        placeholder={`Option ${idx + 1}`}
                        placeholderTextColor={colors.secondaryText}
                        style={[
                            styles.input,
                            { backgroundColor: colors.dropdownBackground, borderColor: colors.secondaryText, color: colors.text }
                        ]}
                    />
                ))}
                <TouchableOpacity onPress={addPollOption}>
                    <Text style={[styles.addOption, { color: colors.button }]}>+ Add Option</Text>
                </TouchableOpacity>
                <View style={styles.buttonRow}>
                    <Button
                        mode="contained"
                        disabled={!poll.question.trim() || poll.options.filter(o => o.trim()).length < 2}
                        onPress={handlePollSubmit}
                        style={{ backgroundColor: colors.button, flex: 1, marginRight: 8 }}
                        textColor={colors.buttonText}
                    >
                        Submit
                    </Button>
                </View>
                <Snackbar
                    visible={snackbar.visible}
                    onDismiss={() => setSnackbar((prev) => ({ ...prev, visible: false }))}
                    duration={4000}
                    style={{ backgroundColor: snackbar.severity === "success" ? colors.button : "#e53935" }}
                >
                    <Text style={{ color: colors.buttonText }}>{snackbar.message}</Text>
                </Snackbar>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
    },
    container: {
        borderRadius: 8,
        padding: 20,
        elevation: 2,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 18,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
        marginBottom: 10,
    },
    addOption: {
        marginBottom: 14,
        fontWeight: 'bold',
        textAlign: 'right',
        fontSize: 15
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
});
