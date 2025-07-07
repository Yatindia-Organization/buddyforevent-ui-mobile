import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../../constants/Colors';
import { useGlobalInfo } from '../../../../context/GlobalContext';
import { API_ROUTE } from '../../../../lib/config';

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

export default function FeedbackAdmin() {
    const { theme, event } = useGlobalInfo();
    const colors = Colors[theme];
    const eventId = event;
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const fetchFeedbacks = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_ROUTE}/api/v1/event/feedback/event/${eventId}`);
            if (!res.ok) throw new Error('Failed to fetch feedbacks');
            const { data } = await res.json();
            setFeedbacks(data);
        } catch (err) {
            setFeedbacks([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
        const intervalId = setInterval(fetchFeedbacks, 10000); // auto-refresh every 10 seconds
        return () => clearInterval(intervalId);
    }, [eventId]);

    const startIdx = page * rowsPerPage;
    const pagedFeedbacks = feedbacks.slice(startIdx, startIdx + rowsPerPage);

    const handlePrev = () => setPage((p) => Math.max(p - 1, 0));
    const handleNext = () => setPage((p) => (startIdx + rowsPerPage < feedbacks.length ? p + 1 : p));
    const handleRowsPerPage = (n) => {
        setRowsPerPage(n);
        setPage(0);
    };

    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 }}>
                <ActivityIndicator color={colors.button} size="large" />
                <Text style={{ color: colors.text, marginTop: 16 }}>Loading feedback...</Text>
            </View>
        );
    }

    return (
        <View style={[styles.root, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>Event Feedback</Text>

            <View style={[styles.tableWrap, { backgroundColor: colors.card }]}>
                {/* Table Header */}
                <View style={styles.tableRowHeader}>
                    <Text style={[styles.tableHeaderCell, { color: colors.text }]}>User Name</Text>
                    <Text style={[styles.tableHeaderCell, { color: colors.text }]}>Rating</Text>
                    <Text style={[styles.tableHeaderCell, { color: colors.text }]}>Comment</Text>
                    <Text style={[styles.tableHeaderCell, { color: colors.text }]}>Submitted At</Text>
                </View>

                {/* Table Body */}
                {pagedFeedbacks.length === 0 ? (
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCell, { color: colors.cancelButton, textAlign: 'center', flex: 1 }]}>
                            No feedbacks found.
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={pagedFeedbacks}
                        keyExtractor={f => f._id}
                        renderItem={({ item }) => (
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, { color: colors.text }]} numberOfLines={1} ellipsizeMode="tail">
                                    {item.user?.name || '—'}
                                </Text>
                                <Text style={[styles.tableCell, { color: colors.button }]}>{item.rating}</Text>
                                <Text style={[styles.tableCell, { color: colors.secondaryText }]} numberOfLines={2} ellipsizeMode="tail">
                                    {item.comment}
                                </Text>
                                <Text style={[styles.tableCell, { color: colors.secondaryText }]}>
                                    {formatDate(item.createdAt)}
                                </Text>
                            </View>
                        )}
                    />
                )}

                {/* Pagination */}
                <View style={styles.paginationRow}>
                    <TouchableOpacity onPress={handlePrev} disabled={page === 0}>
                        <Text
                            style={[
                                styles.pageBtn,
                                {
                                    color: colors.buttonText,
                                    backgroundColor: colors.button,
                                    opacity: page === 0 ? 0.5 : 1
                                }
                            ]}
                        >
                            Prev
                        </Text>
                    </TouchableOpacity>
                    <Text style={[styles.pageLabel, { color: colors.text }]}>
                        Page {page + 1} of {Math.max(1, Math.ceil(feedbacks.length / rowsPerPage))}
                    </Text>
                    <TouchableOpacity onPress={handleNext} disabled={startIdx + rowsPerPage >= feedbacks.length}>
                        <Text
                            style={[
                                styles.pageBtn,
                                {
                                    color: colors.buttonText,
                                    backgroundColor: colors.button,
                                    opacity: startIdx + rowsPerPage >= feedbacks.length ? 0.5 : 1
                                }
                            ]}
                        >
                            Next
                        </Text>
                    </TouchableOpacity>

                    {/* Rows Per Page Selector */}
                    <View style={styles.rowsPerPageSelect}>
                        <Text style={{ color: colors.secondaryText, marginRight: 8 }}>Rows per page:</Text>
                        {ROWS_PER_PAGE_OPTIONS.map(opt => (
                            <TouchableOpacity
                                key={opt}
                                onPress={() => handleRowsPerPage(opt)}
                                style={[
                                    styles.rowsPerPageBtn,
                                    {
                                        backgroundColor: rowsPerPage === opt ? colors.button : colors.dropdownBackground,
                                    }
                                ]}
                            >
                                <Text style={{ color: rowsPerPage === opt ? colors.buttonText : colors.text, fontWeight: rowsPerPage === opt ? 'bold' : 'normal' }}>
                                    {opt}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );
}

// Helper for date formatting (yyyy-MM-dd HH:mm)
function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        minHeight: '100%',
        padding: 16,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 18,
    },
    tableWrap: {
        borderRadius: 12,
        elevation: 2,
        paddingVertical: 8,
        marginBottom: 32,
        paddingHorizontal: 0,
        minHeight: 240,
    },
    tableRowHeader: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        borderBottomWidth: 1.5,
        borderColor: '#e5e5e5',
        paddingBottom: 6,
        marginBottom: 5,
    },
    tableHeaderCell: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 13,
        paddingHorizontal: 6,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 9,
        borderBottomWidth: 1,
        borderColor: '#f0f0f0',
        backgroundColor: 'transparent'
    },
    tableCell: {
        flex: 1,
        fontSize: 12,
        paddingHorizontal: 6,
    },
    paginationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 8,
        paddingTop: 12,
        marginTop: 8,
    },
    pageBtn: {
        fontSize: 13,
        fontWeight: 'bold',
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderRadius: 6,
        overflow: 'hidden',
        marginHorizontal: 4,
        textAlign: 'center',
        minWidth: 54,
    },
    pageLabel: {
        fontSize: 13,
        marginHorizontal: 8,
        minWidth: 60,
        textAlign: 'center'
    },
    rowsPerPageSelect: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
        gap: 2,
    },
    rowsPerPageBtn: {
        borderRadius: 5,
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginRight: 3,
    },
});

