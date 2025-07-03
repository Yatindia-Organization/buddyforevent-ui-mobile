
// // import React, { useEffect, useState } from 'react';
// // import {
// //     ScrollView,
// //     StyleSheet,
// //     Text,
// //     TouchableOpacity,
// //     View
// // } from 'react-native';
// // import { Chip } from 'react-native-paper';
// // import { useGlobalInfo } from '../../../../context/GlobalContext';
// // import { API_ROUTE } from '../../../../lib/config';

// // export default function Participants() {
// //     const context = useGlobalInfo();

// //     const [filter, setFilter] = useState('All');
// //     const [page, setPage] = useState(1);
// //     const [rowsPerPage, setRowsPerPage] = useState(10);
// //     const [participantData, setParticipantData] = useState([]);

// //     const [menuVisible, setMenuVisible] = useState(false);

// //     const getBoxStyle = (value) => {
// //         if (value === 'YES') return styles.yesBox;
// //         if (value === 'NO') return styles.noBox;
// //         return styles.maybeBox;
// //     };

// //     const isPresent = (entry, exit) => {
// //         return entry !== '00:00' && exit !== '00:00';
// //     };

// //     const filteredData = participantData.filter((row) => {
// //         if (filter === 'All') return true;
// //         if (filter === 'Present') return isPresent(row.entryTime, row.exitTime);
// //         if (filter === 'Not Present') return !isPresent(row.entryTime, row.exitTime);
// //         return true;
// //     });

// //     const totalPages = Math.ceil(filteredData.length / rowsPerPage);
// //     const paginatedData = filteredData.slice(
// //         (page - 1) * rowsPerPage,
// //         page * rowsPerPage
// //     );

// //     const handleRowsPerPageChange = (value) => {
// //         setRowsPerPage(value);
// //         setPage(1);
// //         setMenuVisible(false);
// //     };

// //     const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
// //     const handleNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));

// //     useEffect(() => {
// //         const fetchContent = async () => {
// //             try {
// //                 const response = await fetch(`${API_ROUTE}/api/v1/event/form-submission`);
// //                 const result = await response.json();
// //                 const filteredData = result.filter(
// //                     (item) => item?.eventId === '6647159f56a4bfcf3a4f21d3'
// //                 );
// //                 setParticipantData(filteredData);
// //             } catch (error) {
// //                 console.error('Failed to fetch the data ', error);
// //             }
// //         };

// //         fetchContent();
// //     }, []);

// //     const renderParticipant = ({ item }) => (
// //         <View style={styles.row}>
// //             <Text style={styles.cell}>{item.responses[0]?.value || 'N/A'}</Text>
// //             <Text style={styles.cell}>{item.entryTime || 'Not Entered'}</Text>
// //             <Text style={styles.cell}>{item.exitTime || 'Not Left'}</Text>
// //             <View style={[styles.cell, getBoxStyle(item.gift)]}>
// //                 <Text>{item.gift || 'NO'}</Text>
// //             </View>
// //             <View style={[styles.cell, getBoxStyle(item.food)]}>
// //                 <Text>{item.food || 'NO'}</Text>
// //             </View>
// //         </View>
// //     );

// //     return (
// //         <ScrollView style={styles.container}>
// //             <Text style={styles.subtitle}>Event Participant live data</Text>
// //             <Text style={styles.title}>Participant Overview</Text>

// //             <View style={styles.filterContainer}>
// //                 {['All', 'Present', 'Not Present'].map((option) => (
// //                     <Chip
// //                         key={option}
// //                         selected={filter === option}
// //                         onPress={() => setFilter(option)}
// //                         style={styles.chip}
// //                     >
// //                         {option}
// //                     </Chip>
// //                 ))}
// //             </View>

// //             <View style={styles.tableHeader}>
// //                 <Text style={styles.tableCellHeader}>Name</Text>
// //                 <Text style={styles.tableCellHeader}>Entry Time</Text>
// //                 <Text style={styles.tableCellHeader}>Exit Time</Text>
// //                 <Text style={styles.tableCellHeader}>Gift</Text>
// //                 <Text style={styles.tableCellHeader}>Food</Text>
// //             </View>

// //             {paginatedData.map((item, index) => (
// //                 <TouchableOpacity key={index} style={styles.tableRow}>
// //                     <Text style={styles.tableCell}>{item.responses[0]?.value || 'N/A'}</Text>
// //                     <Text style={styles.tableCell}>{item.entryTime || 'Not Entered'}</Text>
// //                     <Text style={styles.tableCell}>{item.exitTime || 'Not Left'}</Text>
// //                     <Text style={[styles.tableCell, item.gift === 'YES' ? styles.yesBox : styles.noBox]}>
// //                         {item.gift || 'NO'}
// //                     </Text>
// //                     <Text style={[styles.tableCell, item.food === 'YES' ? styles.yesBox : styles.noBox]}>
// //                         {item.food || 'NO'}
// //                     </Text>
// //                 </TouchableOpacity>
// //             ))}

// //             <View style={styles.pagination}>
// //                 <TouchableOpacity
// //                     disabled={page === 0}
// //                     onPress={() => setPage((prev) => Math.max(prev - 1, 0))}
// //                 >
// //                     <Text style={styles.pageBtn}>Prev</Text>
// //                 </TouchableOpacity>
// //                 <Text style={styles.pageLabel}>Page {page + 1}</Text>
// //                 <TouchableOpacity
// //                     disabled={(page + 1) * rowsPerPage >= filteredData.length}
// //                     onPress={() => setPage((prev) => prev + 1)}
// //                 >
// //                     <Text style={styles.pageBtn}>Next</Text>
// //                 </TouchableOpacity>
// //             </View>
// //         </ScrollView>
// //     );
// // }

// // const styles = StyleSheet.create({
// //     container: {
// //         padding: 16,
// //         backgroundColor: '#fff',
// //     },
// //     subtitle: {
// //         color: 'gray',
// //         marginBottom: 4,
// //     },
// //     title: {
// //         fontWeight: 'bold',
// //         fontSize: 18,
// //         marginBottom: 8,
// //     },
// //     filterContainer: {
// //         flexDirection: 'row',
// //         marginBottom: 12,
// //     },
// //     chip: {
// //         marginRight: 8,
// //     },
// //     row: {
// //         flexDirection: 'row',
// //         borderBottomWidth: 1,
// //         borderColor: '#eee',
// //         paddingVertical: 4,
// //     },
// //     cell: {
// //         flex: 1,
// //         paddingHorizontal: 4,
// //         fontSize: 12,
// //     },
// //     headerCell: {
// //         fontWeight: 'bold',
// //     },
// //     maybeBox: {
// //         backgroundColor: '#fff5cc',
// //         alignItems: 'center',
// //         borderRadius: 4,
// //     },
// //     tableHeader: {
// //         flexDirection: 'row',
// //         backgroundColor: '#f2f2f2',
// //         paddingVertical: 8,
// //         borderBottomWidth: 1,
// //         borderColor: '#ddd',
// //     },
// //     tableRow: {
// //         flexDirection: 'row',
// //         paddingVertical: 8,
// //         borderBottomWidth: 1,
// //         borderColor: '#eee',
// //     },
// //     tableCellHeader: {
// //         flex: 1,
// //         fontWeight: 'bold',
// //         fontSize: 13,
// //         paddingHorizontal: 6,
// //     },
// //     tableCell: {
// //         flex: 1,
// //         fontSize: 13,
// //         paddingHorizontal: 6,
// //     },
// //     yesBox: {
// //         color: '#007B00',
// //     },
// //     noBox: {
// //         color: '#B00020',
// //     },
// //     pagination: {
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         alignItems: 'center',
// //         marginTop: 16,
// //     },
// //     pageBtn: {
// //         fontSize: 14,
// //         color: '#007BFF',
// //     },
// //     pageLabel: {
// //         fontSize: 14,
// //         fontWeight: 'bold',
// //     },

// // });



// import React, { useState } from 'react';
// import {
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View
// } from 'react-native';
// import { Chip } from 'react-native-paper';
// import { Colors } from '../../../../constants/Colors';
// import { useGlobalInfo } from '../../../../context/GlobalContext';

// const DUMMY_PARTICIPANTS = [
//     {
//         responses: [{ value: 'John Doe' }],
//         entryTime: '08:00',
//         exitTime: '10:00',
//         gift: 'YES',
//         food: 'NO'
//     },
//     {
//         responses: [{ value: 'Jane Smith' }],
//         entryTime: '00:00',
//         exitTime: '00:00',
//         gift: 'NO',
//         food: 'NO'
//     },
//     {
//         responses: [{ value: 'Alice Blue' }],
//         entryTime: '09:00',
//         exitTime: '11:30',
//         gift: 'YES',
//         food: 'YES'
//     },
//     {
//         responses: [{ value: 'Bob Red' }],
//         entryTime: '08:45',
//         exitTime: '09:45',
//         gift: 'NO',
//         food: 'YES'
//     }
// ];

// export default function Participants() {
//     const context = useGlobalInfo();
//     const { theme } = context;
//     const colors = Colors[theme];

//     const [filter, setFilter] = useState('All');
//     const [page, setPage] = useState(1);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [participantData, setParticipantData] = useState(DUMMY_PARTICIPANTS);

//     // If you want to fetch from API instead, comment out the next useEffect and dummyData line!
//     // useEffect(() => {
//     //     const fetchContent = async () => {
//     //         try {
//     //             const response = await fetch(`${API_ROUTE}/api/v1/event/form-submission`);
//     //             const result = await response.json();
//     //             const filteredData = result.filter(
//     //                 (item) => item?.eventId === '6647159f56a4bfcf3a4f21d3'
//     //             );
//     //             setParticipantData(filteredData);
//     //         } catch (error) {
//     //             console.error('Failed to fetch the data ', error);
//     //         }
//     //     };
//     //     fetchContent();
//     // }, []);

//     const isPresent = (entry, exit) => {
//         return entry !== '00:00' && exit !== '00:00';
//     };

//     const filteredData = participantData.filter((row) => {
//         if (filter === 'All') return true;
//         if (filter === 'Present') return isPresent(row.entryTime, row.exitTime);
//         if (filter === 'Not Present') return !isPresent(row.entryTime, row.exitTime);
//         return true;
//     });

//     const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//     const paginatedData = filteredData.slice(
//         (page - 1) * rowsPerPage,
//         page * rowsPerPage
//     );

//     return (
//         <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
//             <Text style={[styles.subtitle, { color: colors.secondaryText }]}>Event Participant live data</Text>
//             <Text style={[styles.title, { color: colors.button }]}>Participant Overview</Text>

//             <View style={styles.filterContainer}>
//                 {['All', 'Present', 'Not Present'].map((option) => (
//                     <Chip
//                         key={option}
//                         selected={filter === option}
//                         onPress={() => setFilter(option)}
//                         style={[
//                             styles.chip,
//                             filter === option && { backgroundColor: colors.button }
//                         ]}
//                         textStyle={{
//                             color: filter === option ? colors.buttonText : colors.text
//                         }}
//                     >
//                         {option}
//                     </Chip>
//                 ))}
//             </View>

//             <View style={[styles.tableHeader, { backgroundColor: colors.dropdownBackground, borderColor: colors.secondaryText }]}>
//                 <Text style={[styles.tableCellHeader, { color: colors.text }]}>Name</Text>
//                 <Text style={[styles.tableCellHeader, { color: colors.text }]}>Entry Time</Text>
//                 <Text style={[styles.tableCellHeader, { color: colors.text }]}>Exit Time</Text>
//                 <Text style={[styles.tableCellHeader, { color: colors.text }]}>Gift</Text>
//                 <Text style={[styles.tableCellHeader, { color: colors.text }]}>Food</Text>
//             </View>

//             {paginatedData.map((item, index) => (
//                 <TouchableOpacity key={index} style={[styles.tableRow, { borderColor: colors.dropdownBackground }]}>
//                     <Text style={[styles.tableCell, { color: colors.text }]}>
//                         {item.responses[0]?.value || 'N/A'}
//                     </Text>
//                     <Text style={[styles.tableCell, { color: colors.secondaryText }]}>
//                         {item.entryTime || 'Not Entered'}
//                     </Text>
//                     <Text style={[styles.tableCell, { color: colors.secondaryText }]}>
//                         {item.exitTime || 'Not Left'}
//                     </Text>
//                     <Text style={[
//                         styles.tableCell,
//                         {
//                             color: item.gift === 'YES' ? colors.button : colors.cancelButton,
//                             fontWeight: 'bold'
//                         }
//                     ]}>
//                         {item.gift || 'NO'}
//                     </Text>
//                     <Text style={[
//                         styles.tableCell,
//                         {
//                             color: item.food === 'YES' ? colors.button : colors.cancelButton,
//                             fontWeight: 'bold'
//                         }
//                     ]}>
//                         {item.food || 'NO'}
//                     </Text>
//                 </TouchableOpacity>
//             ))}

//             <View style={styles.pagination}>
//                 <TouchableOpacity
//                     disabled={page === 1}
//                     onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
//                 >
//                     <Text style={[styles.pageBtn, { color: colors.button, opacity: page === 1 ? 0.5 : 1 }]}>Prev</Text>
//                 </TouchableOpacity>
//                 <Text style={[styles.pageLabel, { color: colors.text }]}>Page {page}</Text>
//                 <TouchableOpacity
//                     disabled={page * rowsPerPage >= filteredData.length}
//                     onPress={() => setPage((prev) => prev + 1)}
//                 >
//                     <Text
//                         style={[
//                             styles.pageBtn,
//                             {
//                                 color: colors.button,
//                                 opacity: page * rowsPerPage >= filteredData.length ? 0.5 : 1,
//                             },
//                         ]}
//                     >
//                         Next
//                     </Text>
//                 </TouchableOpacity>
//             </View>
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         padding: 16,
//     },
//     subtitle: {
//         marginBottom: 4,
//     },
//     title: {
//         fontWeight: 'bold',
//         fontSize: 18,
//         marginBottom: 8,
//     },
//     filterContainer: {
//         flexDirection: 'row',
//         marginBottom: 12,
//     },
//     chip: {
//         marginRight: 8,
//     },
//     tableHeader: {
//         flexDirection: 'row',
//         paddingVertical: 8,
//         borderBottomWidth: 1,
//     },
//     tableRow: {
//         flexDirection: 'row',
//         paddingVertical: 8,
//         borderBottomWidth: 1,
//     },
//     tableCellHeader: {
//         flex: 1,
//         fontWeight: 'bold',
//         fontSize: 13,
//         paddingHorizontal: 6,
//     },
//     tableCell: {
//         flex: 1,
//         fontSize: 13,
//         paddingHorizontal: 6,
//     },
//     pagination: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginTop: 16,
//     },
//     pageBtn: {
//         fontSize: 14,
//     },
//     pageLabel: {
//         fontSize: 14,
//         fontWeight: 'bold',
//     },
// });



import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Chip } from 'react-native-paper';
import { Colors } from '../../../../constants/Colors';
import { useGlobalInfo } from '../../../../context/GlobalContext';
import { API_ROUTE } from '../../../../lib/config';

export default function Participants() {
    const { event: eventId, theme } = useGlobalInfo();
    const colors = Colors[theme];

    const [formExists, setFormExists] = useState(null);
    const [schema, setSchema] = useState(null);

    const [participants, setParticipants] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);

    const [filter, setFilter] = useState('All');

    // 1. Check form existence & load schema
    useEffect(() => {
        if (!eventId) {
            setFormExists(false);
            return;
        }
        setFormExists(null);
        setSchema(null);

        fetch(`${API_ROUTE}/api/v1/event/registration-form/eventId/${eventId}`)
            .then(res => {
                if (res.status === 404) {
                    setFormExists(false);
                    return null;
                }
                return res.json();
            })
            .then(forms => {
                if (forms && Array.isArray(forms) && forms.length > 0) {
                    setSchema(forms[0]);
                    setFormExists(true);
                } else if (forms !== null) {
                    setFormExists(false);
                }
            })
            .catch(err => {
                setFormExists(false);
            });
    }, [eventId]);

    // 2. Fetch participants when form exists
    useEffect(() => {
        if (!eventId || !formExists) return;
        setLoading(true);

        const params = new URLSearchParams({
            eventId,
            page: page.toString(),
            limit: rowsPerPage.toString(),
        });
        if (searchText.trim()) params.set('q', searchText.trim());

        fetch(`${API_ROUTE}/api/v1/event/participantSearch?${params}`)
            .then(r => r.json())
            .then(data => {
                setParticipants(data.results || []);
                setTotalPages(data.totalPages || 1);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });
    }, [eventId, page, rowsPerPage, searchText, formExists]);

    // Filter: Present/Not present
    const isPresent = (row) =>
        row.entryTime?.length && row.exitTime?.length &&
        row.entryTime[0] !== '00:00' && row.exitTime[0] !== '00:00';

    const filtered = participants.filter(row => {
        if (filter === 'All') return true;
        if (filter === 'Present') return isPresent(row);
        if (filter === 'Not Present') return !isPresent(row);
        return true;
    });

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            {!eventId ? (
                <Text style={[styles.subtitle, { color: colors.cancelButton }]}>No event selected.</Text>
            ) : formExists === null ? (
                <View style={{ padding: 32, alignItems: 'center' }}>
                    <ActivityIndicator color={colors.button} />
                </View>
            ) : !formExists ? (
                <View style={{ alignItems: 'center', marginTop: 40 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>No registration form found</Text>
                    <Text style={{ color: colors.secondaryText }}>
                        Please create a registration form first before viewing participants.
                    </Text>
                </View>
            ) : !schema ? (
                <Text>Loading form schema…</Text>
            ) : (
                <>
                    <Text style={[styles.subtitle, { color: colors.secondaryText }]}>Event Participant live data</Text>
                    <Text style={[styles.title, { color: colors.button }]}>Participant Overview</Text>
                    {/* Search */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                        <TextInput
                            style={[
                                {
                                    flex: 1,
                                    borderWidth: 1,
                                    borderColor: colors.dropdownBackground,
                                    borderRadius: 6,
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    marginRight: 8,
                                    color: colors.text,
                                    backgroundColor: colors.card,
                                },
                            ]}
                            placeholder="Search"
                            placeholderTextColor={colors.secondaryText}
                            value={searchText}
                            onChangeText={setSearchText}
                            onSubmitEditing={() => setPage(1)}
                        />
                        <TouchableOpacity onPress={() => setPage(1)}>
                            <Text style={{ color: colors.button, fontWeight: 'bold' }}>Go</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Filter chips */}
                    <View style={styles.filterContainer}>
                        {['All', 'Present', 'Not Present'].map((option) => (
                            <Chip
                                key={option}
                                selected={filter === option}
                                onPress={() => setFilter(option)}
                                style={[
                                    styles.chip,
                                    filter === option && { backgroundColor: colors.button }
                                ]}
                                textStyle={{
                                    color: filter === option ? colors.buttonText : colors.text
                                }}
                            >
                                {option}
                            </Chip>
                        ))}
                    </View>

                    {/* Table header */}
                    <View style={[
                        styles.tableHeader,
                        { backgroundColor: colors.dropdownBackground, borderColor: colors.secondaryText }
                    ]}>
                        {schema.fields.map(f => (
                            <Text key={f.id} style={[styles.tableCellHeader, { color: colors.text }]}>
                                {f.label}
                            </Text>
                        ))}
                        <Text style={[styles.tableCellHeader, { color: colors.text }]}>Visitors</Text>
                        <Text style={[styles.tableCellHeader, { color: colors.text }]}>Entry Time</Text>
                        <Text style={[styles.tableCellHeader, { color: colors.text }]}>Exit Time</Text>
                        <Text style={[styles.tableCellHeader, { color: colors.text }]}>Gift</Text>
                        <Text style={[styles.tableCellHeader, { color: colors.text }]}>Food</Text>
                        {/* (QR code column skipped for mobile UI simplicity) */}
                    </View>

                    {loading ? (
                        <View style={{ padding: 32, alignItems: 'center' }}>
                            <ActivityIndicator color={colors.button} />
                        </View>
                    ) : (
                        filtered.map((row, idx) => (
                            <View key={row._id || idx} style={[
                                styles.tableRow,
                                { borderColor: colors.dropdownBackground }
                            ]}>
                                {schema.fields.map(f => {
                                    // logic as in renderValue
                                    const resp = row.responses?.find(r => r.fieldId === f.id);
                                    let val = resp?.value ?? '';
                                    if (typeof val === 'boolean') val = val ? 'YES' : 'NO';
                                    else if (val && typeof val === 'object') {
                                        const { text, hyperlink } = val;
                                        if (text && hyperlink) val = text;
                                        else val = JSON.stringify(val);
                                    }
                                    return (
                                        <Text key={f.id} style={[styles.tableCell, { color: colors.text }]}>
                                            {val}
                                        </Text>
                                    );
                                })}
                                <Text style={[styles.tableCell, { color: colors.text }]}>
                                    {row.visitorCount ?? 0}
                                </Text>
                                <Text style={[styles.tableCell, { color: colors.secondaryText }]}>
                                    {row.entryTime?.length
                                        ? new Date(row.entryTime[0]).toLocaleTimeString()
                                        : '—'}
                                </Text>
                                <Text style={[styles.tableCell, { color: colors.secondaryText }]}>
                                    {row.exitTime?.length
                                        ? new Date(row.exitTime[0]).toLocaleTimeString()
                                        : '—'}
                                </Text>
                                <Text style={[
                                    styles.tableCell,
                                    {
                                        color: row.gift == null
                                            ? colors.secondaryText
                                            : row.gift
                                                ? colors.button
                                                : colors.cancelButton,
                                        fontWeight: 'bold'
                                    }
                                ]}>
                                    {row.gift == null ? '—' : row.gift ? 'YES' : 'NO'}
                                </Text>
                                <Text style={[
                                    styles.tableCell,
                                    {
                                        color: row.food == null
                                            ? colors.secondaryText
                                            : row.food
                                                ? colors.button
                                                : colors.cancelButton,
                                        fontWeight: 'bold'
                                    }
                                ]}>
                                    {row.food == null ? '—' : row.food ? 'YES' : 'NO'}
                                </Text>
                            </View>
                        ))
                    )}

                    {/* Pagination */}
                    <View style={styles.pagination}>
                        <TouchableOpacity
                            disabled={page === 1}
                            onPress={() => setPage(prev => Math.max(prev - 1, 1))}
                        >
                            <Text style={[styles.pageBtn, { color: colors.button, opacity: page === 1 ? 0.5 : 1 }]}>Prev</Text>
                        </TouchableOpacity>
                        <Text style={[styles.pageLabel, { color: colors.text }]}>Page {page} of {totalPages}</Text>
                        <TouchableOpacity
                            disabled={page >= totalPages}
                            onPress={() => setPage(prev => Math.min(prev + 1, totalPages))}
                        >
                            <Text
                                style={[
                                    styles.pageBtn,
                                    {
                                        color: colors.button,
                                        opacity: page >= totalPages ? 0.5 : 1,
                                    },
                                ]}
                            >
                                Next
                            </Text>
                        </TouchableOpacity>
                        {/* Rows per page */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                            <Text style={{ color: colors.secondaryText }}>Rows:</Text>
                            {[10, 25, 50].map(n => (
                                <TouchableOpacity key={n} onPress={() => { setRowsPerPage(n); setPage(1); }}>
                                    <Text style={[
                                        { marginHorizontal: 4, color: n === rowsPerPage ? colors.button : colors.text }
                                    ]}>
                                        {n}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    subtitle: {
        marginBottom: 4,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
    },
    filterContainer: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    chip: {
        marginRight: 8,
    },
    tableHeader: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
    },
    tableCellHeader: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 13,
        paddingHorizontal: 6,
    },
    tableCell: {
        flex: 1,
        fontSize: 13,
        paddingHorizontal: 6,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        flexWrap: 'wrap'
    },
    pageBtn: {
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 2,
    },
    pageLabel: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});
