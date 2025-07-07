// // import * as DocumentPicker from 'expo-document-picker';
// // import * as FileSystem from 'expo-file-system';
// // import * as Sharing from 'expo-sharing';
// // import React, { useState } from 'react';
// // import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// // import * as XLSX from 'xlsx';
// // import { useGlobalInfo } from '../../../../context/GlobalContext';
// // import { API_ROUTE } from '../../../../lib/config/index';

// // export default function AddParticipants() {
// //     const context = useGlobalInfo();

// //     const [excelData, setExcelData] = useState([]);

// //     const columnName = {
// //         eventId: "475asdfasdfa46d1fa78sd7f",
// //         userId: "798465sdfa6sdf6as",
// //         fields: [
// //             { label: "Name" },
// //             { label: "Email" },
// //             { label: "City", options: ["Hyd", "Chennai", "Delhi"] },
// //             { label: "Gender", options: ["Male", "Female"] }
// //         ]
// //     };

// //     const showToast = (message) => {
// //         Alert.alert('Notification', message);
// //     };

// //     const handleFileUpload = async () => {
// //         try {
// //             const result = await DocumentPicker.getDocumentAsync({
// //                 type: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'],
// //             });

// //             if (result.type === 'cancel') return;

// //             const fileUri = result.uri;
// //             const fileName = result.name;
// //             if (!/\.(xls|xlsx)$/i.test(fileName)) {
// //                 showToast("Invalid file format. Please upload an Excel file (.xls or .xlsx)");
// //                 return;
// //             }

// //             const fileData = await FileSystem.readAsStringAsync(fileUri, {
// //                 encoding: FileSystem.EncodingType.Base64,
// //             });

// //             const binaryData = Buffer.from(fileData, 'base64');
// //             const workbook = XLSX.read(binaryData, { type: 'buffer' });
// //             const sheetName = workbook.SheetNames[0];
// //             const worksheet = workbook.Sheets[sheetName];
// //             const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

// //             const headers = rawData[0];
// //             const rows = rawData.slice(1);

// //             const requiredHeaders = columnName.fields.map(f => f.label);
// //             const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));

// //             if (missingHeaders.length > 0) {
// //                 showToast(`Missing required headers: ${missingHeaders.join(', ')}`);
// //                 return;
// //             }

// //             const jsonData = rows.map((row) =>
// //                 headers.reduce((acc, header, i) => {
// //                     acc[header] = row[i];
// //                     return acc;
// //                 }, {})
// //             );

// //             setExcelData(jsonData);

// //             const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

// //             const response = await fetch(
// //                 `${API_ROUTE}/api/v1/event/form-submission/event/${context?.eventId}/form/<formId>/upload-csv`,
// //                 {
// //                     method: 'POST',
// //                     headers: { 'Content-Type': 'text/csv' },
// //                     body: csvContent,
// //                 }
// //             );

// //             if (response.ok) {
// //                 showToast("File uploaded successfully!");
// //             } else {
// //                 showToast("Upload failed. Please try again.");
// //             }
// //         } catch (err) {
// //             console.error("Upload error:", err);
// //             showToast("Upload failed. Server error.");
// //         }
// //     };

// //     const handleDownloadTemplate = async () => {
// //         try {
// //             const headers = columnName.fields.map(f => f.label);
// //             const ws = XLSX.utils.aoa_to_sheet([headers]);
// //             const wb = XLSX.utils.book_new();
// //             XLSX.utils.book_append_sheet(wb, ws, "Template");

// //             const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });
// //             const fileUri = `${FileSystem.cacheDirectory}participants_template.xlsx`;

// //             await FileSystem.writeAsStringAsync(fileUri, wbout, {
// //                 encoding: FileSystem.EncodingType.Base64,
// //             });

// //             if (await Sharing.isAvailableAsync()) {
// //                 await Sharing.shareAsync(fileUri);
// //             } else {
// //                 showToast("Sharing not available on this device");
// //             }
// //         } catch (err) {
// //             console.error("Download error:", err);
// //             showToast("Download failed. Server error.");
// //         }
// //     };

// //     return (
// //         <ScrollView contentContainerStyle={styles.container} >
// //             <Text style={styles.title}> Bulk Registration </Text>

// //             < Text style={styles.description} >
// //                 Issue tickets to your Participants without asking them to register online.
// //             </Text>

// //             < Text style={styles.warning} >
// //                 Participants will receive email, SMS and WhatsApp notifications after registration.
// //             </Text>

// //             < View style={styles.card} >
// //                 <Text style={styles.note}>
// //                     NOTE: Please download and use the sample Excel file.
// //                 </Text>

// //                 < TouchableOpacity onPress={handleDownloadTemplate} style={styles.downloadButton} >
// //                     <Text style={styles.downloadText}>⬇️ Download sample Excel </Text>
// //                 </TouchableOpacity>

// //                 < Text style={styles.note} >
// //                     Fill the downloaded file and upload it with your participant data.
// //                 </Text>

// //                 < TouchableOpacity style={styles.uploadBox} onPress={handleFileUpload} >
// //                     <Text style={styles.uploadIcon}>📤</Text>
// //                     < Text style={styles.uploadText} > Tap here to upload your Excel file </Text>
// //                     < Text style={styles.uploadNote} > Max file size: 1 MB </Text>
// //                 </TouchableOpacity>
// //             </View>

// //             {
// //                 excelData.length > 0 && (
// //                     <View style={styles.previewBox}>
// //                         <Text style={styles.previewTitle}> Uploaded Preview: </Text>
// //                         < ScrollView style={styles.previewContent} >
// //                             <Text style={styles.jsonText}> {JSON.stringify(excelData, null, 2)} </Text>
// //                         </ScrollView>
// //                     </View>
// //                 )
// //             }
// //         </ScrollView>
// //     );


// // }

// // const styles = StyleSheet.create({
// //     container: {
// //         padding: 16,
// //     },
// //     title: {
// //         fontSize: 24,
// //         fontWeight: 'bold',
// //         color: '#5D5C8D',
// //         marginBottom: 8,
// //     },
// //     description: {
// //         marginBottom: 4,
// //     },
// //     warning: {
// //         color: 'red',
// //         marginBottom: 16,
// //     },
// //     card: {
// //         backgroundColor: '#fff',
// //         borderRadius: 8,
// //         marginBottom: 16,
// //         elevation: 2,
// //     },
// //     note: {
// //         marginBottom: 8,
// //         fontSize: 14,
// //     },
// //     downloadButton: {
// //         backgroundColor: '#eee',
// //         padding: 10,
// //         borderRadius: 4,
// //         marginBottom: 8,
// //     },
// //     downloadText: {
// //         color: '#007bff',
// //         textAlign: 'center',
// //     },
// //     uploadBox: {
// //         borderWidth: 2,
// //         borderColor: '#b3b3ff',
// //         borderStyle: 'dashed',
// //         borderRadius: 8,
// //         padding: 24,
// //         alignItems: 'center',
// //         backgroundColor: '#fafafa',
// //     },
// //     uploadIcon: {
// //         fontSize: 32,
// //         marginBottom: 8,
// //     },
// //     uploadText: {
// //         color: '#007bff',
// //         textDecorationLine: 'underline',
// //         marginBottom: 4,
// //     },
// //     uploadNote: {
// //         fontSize: 12,
// //         color: '#666',
// //     },
// //     previewBox: {
// //         marginTop: 16,
// //     },
// //     previewTitle: {
// //         fontSize: 18,
// //         marginBottom: 8,
// //     },
// //     previewContent: {
// //         maxHeight: 300,
// //         backgroundColor: '#f9f9f9',
// //         padding: 12,
// //         borderRadius: 4,
// //     },
// //     jsonText: {
// //         fontFamily: 'Courier',
// //         fontSize: 12,
// //     },
// // });




// import * as DocumentPicker from 'expo-document-picker';
// import * as FileSystem from 'expo-file-system';
// import * as Sharing from 'expo-sharing';
// import React, { useState } from 'react';
// import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import * as XLSX from 'xlsx';
// import { Colors } from '../../../../constants/Colors';
// import { useGlobalInfo } from '../../../../context/GlobalContext';
// import { API_ROUTE } from '../../../../lib/config/index';

// export default function AddParticipants() {
//     const context = useGlobalInfo();
//     const { theme } = context;
//     const colors = Colors[theme];

//     const [excelData, setExcelData] = useState([]);

//     const columnName = {
//         eventId: "475asdfasdfa46d1fa78sd7f",
//         userId: "798465sdfa6sdf6as",
//         fields: [
//             { label: "Name" },
//             { label: "Email" },
//             { label: "City", options: ["Hyd", "Chennai", "Delhi"] },
//             { label: "Gender", options: ["Male", "Female"] }
//         ]
//     };

//     const showToast = (message) => {
//         Alert.alert('Notification', message);
//     };

//     const handleFileUpload = async () => {
//         try {
//             const result = await DocumentPicker.getDocumentAsync({
//                 type: [
//                     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//                     'application/vnd.ms-excel'
//                 ],
//             });

//             if (result.type === 'cancel') return;

//             const fileUri = result.uri;
//             const fileName = result.name;
//             if (!/\.(xls|xlsx)$/i.test(fileName)) {
//                 showToast("Invalid file format. Please upload an Excel file (.xls or .xlsx)");
//                 return;
//             }

//             const fileData = await FileSystem.readAsStringAsync(fileUri, {
//                 encoding: FileSystem.EncodingType.Base64,
//             });

//             const binaryData = Buffer.from(fileData, 'base64');
//             const workbook = XLSX.read(binaryData, { type: 'buffer' });
//             const sheetName = workbook.SheetNames[0];
//             const worksheet = workbook.Sheets[sheetName];
//             const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//             const headers = rawData[0];
//             const rows = rawData.slice(1);

//             const requiredHeaders = columnName.fields.map(f => f.label);
//             const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));

//             if (missingHeaders.length > 0) {
//                 showToast(`Missing required headers: ${missingHeaders.join(', ')}`);
//                 return;
//             }

//             const jsonData = rows.map((row) =>
//                 headers.reduce((acc, header, i) => {
//                     acc[header] = row[i];
//                     return acc;
//                 }, {})
//             );

//             setExcelData(jsonData);

//             const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

//             const response = await fetch(
//                 `${API_ROUTE}/api/v1/event/form-submission/event/${context?.eventId}/form/<formId>/upload-csv`,
//                 {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'text/csv' },
//                     body: csvContent,
//                 }
//             );

//             if (response.ok) {
//                 showToast("File uploaded successfully!");
//             } else {
//                 showToast("Upload failed. Please try again.");
//             }
//         } catch (err) {
//             console.error("Upload error:", err);
//             showToast("Upload failed. Server error.");
//         }
//     };

//     const handleDownloadTemplate = async () => {
//         try {
//             const headers = columnName.fields.map(f => f.label);
//             const ws = XLSX.utils.aoa_to_sheet([headers]);
//             const wb = XLSX.utils.book_new();
//             XLSX.utils.book_append_sheet(wb, ws, "Template");

//             const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });
//             const fileUri = `${FileSystem.cacheDirectory}participants_template.xlsx`;

//             await FileSystem.writeAsStringAsync(fileUri, wbout, {
//                 encoding: FileSystem.EncodingType.Base64,
//             });

//             if (await Sharing.isAvailableAsync()) {
//                 await Sharing.shareAsync(fileUri);
//             } else {
//                 showToast("Sharing not available on this device");
//             }
//         } catch (err) {
//             console.error("Download error:", err);
//             showToast("Download failed. Server error.");
//         }
//     };

//     return (
//         <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
//             <Text style={[styles.title, { color: colors.button }]}>Bulk Registration</Text>
//             <Text style={[styles.description, { color: colors.text }]}>
//                 Issue tickets to your Participants without asking them to register online.
//             </Text>
//             <Text style={[styles.warning, { color: colors.cancelButton }]}>
//                 Participants will receive email, SMS and WhatsApp notifications after registration.
//             </Text>

//             <View style={[styles.card, { backgroundColor: colors.card }]}>
//                 <Text style={[styles.note, { color: colors.secondaryText }]}>
//                     NOTE: Please download and use the sample Excel file.
//                 </Text>

//                 <TouchableOpacity onPress={handleDownloadTemplate} style={[styles.downloadButton, { backgroundColor: colors.dropdownBackground }]}>
//                     <Text style={[styles.downloadText, { color: colors.button }]}>⬇️ Download sample Excel</Text>
//                 </TouchableOpacity>

//                 <Text style={[styles.note, { color: colors.secondaryText }]}>
//                     Fill the downloaded file and upload it with your participant data.
//                 </Text>

//                 <TouchableOpacity
//                     style={[
//                         styles.uploadBox,
//                         {
//                             borderColor: colors.button,
//                             backgroundColor: colors.dropdownBackground
//                         }
//                     ]}
//                     onPress={handleFileUpload}
//                 >
//                     <Text style={[styles.uploadIcon, { color: colors.button }]}>📤</Text>
//                     <Text style={[styles.uploadText, { color: colors.button }]}>Tap here to upload your Excel file</Text>
//                     <Text style={[styles.uploadNote, { color: colors.secondaryText }]}>Max file size: 1 MB</Text>
//                 </TouchableOpacity>
//             </View>

//             {excelData.length > 0 && (
//                 <View style={styles.previewBox}>
//                     <Text style={[styles.previewTitle, { color: colors.text }]}>Uploaded Preview:</Text>
//                     <ScrollView style={[styles.previewContent, { backgroundColor: colors.dropdownBackground }]}>
//                         <Text style={[styles.jsonText, { color: colors.secondaryText }]}>
//                             {JSON.stringify(excelData, null, 2)}
//                         </Text>
//                     </ScrollView>
//                 </View>
//             )}
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         padding: 16,
//         // backgroundColor is theme-based
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 8,
//         // color is theme-based
//     },
//     description: {
//         marginBottom: 4,
//         // color is theme-based
//     },
//     warning: {
//         marginBottom: 16,
//         // color is theme-based
//     },
//     card: {
//         borderRadius: 8,
//         marginBottom: 16,
//         elevation: 2,
//         // backgroundColor is theme-based
//     },
//     note: {
//         marginBottom: 8,
//         fontSize: 14,
//         // color is theme-based
//     },
//     downloadButton: {
//         padding: 10,
//         borderRadius: 4,
//         marginBottom: 8,
//         // backgroundColor is theme-based
//     },
//     downloadText: {
//         textAlign: 'center',
//         // color is theme-based
//     },
//     uploadBox: {
//         borderWidth: 2,
//         borderStyle: 'dashed',
//         borderRadius: 8,
//         padding: 24,
//         alignItems: 'center',
//         // borderColor and backgroundColor are theme-based
//     },
//     uploadIcon: {
//         fontSize: 32,
//         marginBottom: 8,
//         // color is theme-based
//     },
//     uploadText: {
//         textDecorationLine: 'underline',
//         marginBottom: 4,
//         // color is theme-based
//     },
//     uploadNote: {
//         fontSize: 12,
//         // color is theme-based
//     },
//     previewBox: {
//         marginTop: 16,
//     },
//     previewTitle: {
//         fontSize: 18,
//         marginBottom: 8,
//         // color is theme-based
//     },
//     previewContent: {
//         maxHeight: 300,
//         padding: 12,
//         borderRadius: 4,
//         // backgroundColor is theme-based
//     },
//     jsonText: {
//         fontFamily: 'Courier',
//         fontSize: 12,
//         // color is theme-based
//     },
// });





import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as XLSX from 'xlsx';
import { Colors } from '../../../../constants/Colors';
import { useGlobalInfo } from '../../../../context/GlobalContext';
import { API_ROUTE } from '../../../../lib/config/index';

export default function AddParticipants() {
    const { event: eventId, theme } = useGlobalInfo();
    const colors = Colors[theme];
    const [formExists, setFormExists] = useState(null);
    const [excelData, setExcelData] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ visible: false, message: '', severity: 'info' });

    useEffect(() => {
        if (!eventId) {
            setFormExists(false);
            return;
        }
        setLoading(true);
        fetch(`${API_ROUTE}/api/v1/event/registration-form/eventId/${eventId}`)
            .then(res => {
                if (res.status === 404) setFormExists(false);
                else if (res.ok) setFormExists(true);
                else throw new Error('Unexpected response');
            })
            .catch(() => setFormExists(false))
            .finally(() => setLoading(false));
    }, [eventId]);

    const showToast = (message, severity = 'info') => {
        setSnackbar({ visible: true, message, severity });
    };

    const handleDownloadTemplate = async () => {
        try {
            setLoading(true);
            const url = `${API_ROUTE}/api/v1/event/bulkRegistration/export-template/${eventId}`;
            const fileUri = `${FileSystem.cacheDirectory}template_${eventId}.xlsx`;
            const res = await FileSystem.downloadAsync(url, fileUri);

            if (res.status === 200 && await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(res.uri);
            } else {
                showToast('Download complete. Sharing is not available on this device.', 'info');
            }
        } catch (err) {
            showToast('Error downloading template.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: [
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'application/vnd.ms-excel'
                ],
            });
            if (result.type === 'cancel') return;

            setLoading(true);

            const fileUri = result.uri;
            const fileName = result.name;
            setSelectedFile({ uri: fileUri, name: fileName });

            if (!/\.(xls|xlsx)$/i.test(fileName)) {
                showToast("Invalid file format. Please upload an Excel file (.xls or .xlsx)", "error");
                setLoading(false);
                return;
            }

            // Read file as base64, decode, parse with XLSX
            const fileData = await FileSystem.readAsStringAsync(fileUri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            const binaryData = Buffer.from(fileData, 'base64');
            const workbook = XLSX.read(binaryData, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const rawData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

            if (!rawData.length) {
                showToast("Excel file is empty or not formatted correctly.", "error");
                setLoading(false);
                return;
            }
            setExcelData(rawData);
            showToast("File loaded. Preview below.", "success");
        } catch (err) {
            showToast("Upload failed. Server error.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateTickets = async () => {
        if (!selectedFile || !excelData.length) return;
        setLoading(true);
        try {
            // Convert JSON back to xlsx to send as file (in-memory)
            const ws = XLSX.utils.json_to_sheet(excelData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });

            // Save temp file
            const uploadUri = `${FileSystem.cacheDirectory}upload_${Date.now()}.xlsx`;
            await FileSystem.writeAsStringAsync(uploadUri, wbout, { encoding: FileSystem.EncodingType.Base64 });

            // Prepare FormData for upload
            const fileInfo = await FileSystem.getInfoAsync(uploadUri);
            const formData = new FormData();
            formData.append('file', {
                uri: uploadUri,
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                name: selectedFile.name || 'participants.xlsx'
            });

            const res = await fetch(
                `${API_ROUTE}/api/v1/event/bulkRegistration/import-template/${eventId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formData,
                }
            );
            const result = await res.json();

            if (!res.ok) throw new Error(result?.error || "Failed to generate tickets");
            showToast(`Successfully generated ${result.count} tickets`, "success");
            setExcelData([]);
            setSelectedFile(null);
        } catch (err) {
            showToast(err.message, "error");
        } finally {
            setLoading(false);
        }
    };

    if (formExists === null || loading) {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
                <ActivityIndicator color={colors.button} size="large" />
                <Text style={{ marginTop: 18, color: colors.text, fontWeight: 'bold' }}>Loading...</Text>
            </View>
        );
    }

    if (!formExists) {
        return (
            <View style={[styles.noFormBox, { backgroundColor: colors.background }]}>
                <Text style={[styles.noFormTitle, { color: colors.button }]}>
                    No registration form found
                </Text>
                <Text style={[styles.noFormText, { color: colors.text }]}>
                    Please create a registration form first before adding participants.
                </Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.button }]}>Bulk Registration</Text>
            <Text style={[styles.description, { color: colors.text }]}>
                Issue tickets to your Participants without asking them to register online.
            </Text>
            <Text style={[styles.warning, { color: colors.cancelButton }]}>
                Participants will receive email, SMS and WhatsApp notifications after registration.
            </Text>

            <View style={[styles.card, { backgroundColor: colors.card }]}>
                <Text style={[styles.note, { color: colors.secondaryText }]}>
                    NOTE: Please download and use the sample Excel file.
                </Text>

                <TouchableOpacity onPress={handleDownloadTemplate} style={[styles.downloadButton, { backgroundColor: colors.dropdownBackground }]}>
                    <Text style={[styles.downloadText, { color: colors.button }]}>⬇️ Download sample Excel</Text>
                </TouchableOpacity>

                <Text style={[styles.note, { color: colors.cancelButton }]}>
                    Fill the downloaded file and upload it with your participant data.
                </Text>

                <TouchableOpacity
                    style={[
                        styles.uploadBox,
                        {
                            borderColor: colors.button,
                            backgroundColor: colors.dropdownBackground
                        }
                    ]}
                    onPress={handleFileUpload}
                >
                    <Text style={[styles.uploadIcon, { color: colors.button }]}>📤</Text>
                    <Text style={[styles.uploadText, { color: colors.button }]}>Tap here to upload your Excel file</Text>
                    <Text style={[styles.uploadNote, { color: colors.secondaryText }]}>Max file size: 1 MB</Text>
                </TouchableOpacity>
            </View>

            {excelData.length > 0 && (
                <View style={styles.previewBox}>
                    <Text style={[styles.previewTitle, { color: colors.text }]}>Uploaded Preview:</Text>
                    <ScrollView horizontal style={[styles.tablePreview, { backgroundColor: colors.dropdownBackground }]}>
                        <View>
                            {/* Table Head */}
                            <View style={styles.previewTableRow}>
                                {Object.keys(excelData[0]).map(key => (
                                    <Text key={key} style={[styles.previewTableCell, styles.previewTableHeader, { color: colors.button }]} numberOfLines={1} ellipsizeMode="tail">{key}</Text>
                                ))}
                            </View>
                            {/* Table Body */}
                            <ScrollView style={{ maxHeight: 220 }}>
                                {excelData.map((row, i) => (
                                    <View key={i} style={styles.previewTableRow}>
                                        {Object.values(row).map((val, j) => (
                                            <Text
                                                key={j}
                                                style={[styles.previewTableCell, { color: colors.text }]}
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                            >
                                                {val}
                                            </Text>
                                        ))}
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </ScrollView>
                    <TouchableOpacity
                        onPress={handleGenerateTickets}
                        disabled={loading}
                        style={[
                            styles.generateBtn,
                            { backgroundColor: colors.button, opacity: loading ? 0.7 : 1 }
                        ]}
                    >
                        {loading
                            ? <ActivityIndicator color={colors.buttonText} size="small" />
                            : <Text style={{ color: colors.buttonText, fontWeight: 'bold' }}>Generate Tickets</Text>
                        }
                    </TouchableOpacity>
                </View>
            )}

            {/* Snackbar/Toast */}
            {snackbar.visible && (
                <View style={[
                    styles.snackbar,
                    {
                        backgroundColor: snackbar.severity === "success"
                            ? colors.button
                            : snackbar.severity === "error"
                                ? colors.cancelButton
                                : colors.dropdownBackground
                    }
                ]}>
                    <Text style={{ color: colors.buttonText }}>{snackbar.message}</Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexGrow: 1
    },
    noFormBox: {
        justifyContent: "center",
        alignItems: "center",
        padding: 32,
    },
    noFormTitle: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10,
    },
    noFormText: {
        fontSize: 14,
        textAlign: "center",
        maxWidth: 300,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        marginBottom: 4,
        fontSize: 15,
    },
    warning: {
        marginBottom: 16,
        fontSize: 13,
        fontWeight: 'bold'
    },
    card: {
        borderRadius: 8,
        marginBottom: 16,
        elevation: 2,
        padding: 14,
    },
    note: {
        marginBottom: 8,
        fontSize: 14,
    },
    downloadButton: {
        padding: 10,
        borderRadius: 4,
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    downloadText: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    uploadBox: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderRadius: 8,
        padding: 24,
        alignItems: 'center',
        marginTop: 12,
    },
    uploadIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    uploadText: {
        textDecorationLine: 'underline',
        marginBottom: 4,
        fontSize: 15,
        fontWeight: 'bold'
    },
    uploadNote: {
        fontSize: 12,
    },
    previewBox: {
        marginTop: 18,
        paddingBottom: 16
    },
    previewTitle: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    tablePreview: {
        borderRadius: 6,
        minHeight: 60,
        padding: 10,
        marginBottom: 14,
        maxWidth: '100%',
    },
    previewTableRow: {
        flexDirection: 'row',
        minHeight: 32,
        alignItems: 'center'
    },
    previewTableHeader: {
        fontWeight: 'bold',
        fontSize: 13
    },
    previewTableCell: {
        fontSize: 13,
        paddingHorizontal: 12,
        paddingVertical: 4,
        minWidth: 80,
        maxWidth: 120,
    },
    generateBtn: {
        marginTop: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 46
    },
    snackbar: {
        position: "absolute",
        bottom: 28,
        left: 20,
        right: 20,
        borderRadius: 6,
        padding: 12,
        alignItems: 'center',
        elevation: 3,
        zIndex: 100,
    },
});
