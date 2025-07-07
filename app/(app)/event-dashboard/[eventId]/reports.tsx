import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../../constants/Colors';
import { useGlobalInfo } from '../../../../context/GlobalContext';
import { API_ROUTE } from '../../../../lib/config';

export default function Report() {
    const { theme, event } = useGlobalInfo();
    const colors = Colors[theme];

    const [summary, setSummary] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [ticketMap, setTicketMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ visible: false, message: '', severity: 'success' });
    const [downloading, setDownloading] = useState(false);

    const eventId = event?._id || event;

    const showSnackbar = (msg, severity = 'success') =>
        setSnackbar({ visible: true, message: msg, severity });

    useEffect(() => {
        if (!eventId) return;
        setLoading(true);

        const sumP = fetch(`${API_ROUTE}/api/v1/event/report/event/${eventId}`)
            .then(r => r.json()).then(j => {
                if (!j.success) throw new Error(j.message || 'Failed loading summary');
                return j.data;
            });

        const subsP = fetch(
            `${API_ROUTE}/api/v1/event/participantSearch?eventId=${eventId}&page=1&limit=10000`
        ).then(r => r.json()).then(j => j.results || []);

        const ticketsP = fetch(`${API_ROUTE}/api/v1/event/tickets/event/${eventId}`)
            .then(r => r.json()).then(j => {
                if (!j.success) throw new Error(j.message || 'Failed loading tickets');
                return j.data;
            });

        Promise.all([sumP, subsP, ticketsP])
            .then(([sum, subs, tickets]) => {
                setSummary(sum);
                setSubmissions(subs);
                const m = {};
                tickets.forEach(t => {
                    m[t.userSubmissionId] = t.tierName.toUpperCase();
                });
                setTicketMap(m);
            })
            .catch(err => showSnackbar(err.message, 'error'))
            .finally(() => setLoading(false));
    }, [eventId]);

    if (!eventId) {
        return <Text style={{ color: colors.cancelButton, textAlign: 'center', marginTop: 40 }}>No event selected.</Text>;
    }

    const displayVal = val => {
        if (typeof val === 'boolean') return val ? 'YES' : 'NO';
        if (typeof val === 'string') return val.toUpperCase();
        if (Array.isArray(val))
            return val
                .map(d =>
                    new Date(d).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
                )
                .join(', ');
        if (val instanceof Date)
            return new Date(val)
                .toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
                .toUpperCase();
        if (val != null && typeof val !== 'object') return String(val).toUpperCase();
        return '';
    };

    const renderCell = val => {
        if (val && typeof val === 'object' && 'text' in val && 'hyperlink' in val) {
            return (
                <Text
                    style={{ color: colors.button, textDecorationLine: 'underline' }}
                    onPress={() => Alert.alert('Link', val.hyperlink)}
                >
                    {String(val.text).toUpperCase()}
                </Text>
            );
        }
        return displayVal(val);
    };

    // Expo FileSystem + Sharing for true Excel download
    const handleExcelDownload = async () => {
        try {
            setDownloading(true);
            const url = `${API_ROUTE}/api/v1/event/report/event/${eventId}/export`;
            const fileUri =
                FileSystem.cacheDirectory +
                `Event-Report-${eventId}-${Date.now()}.xlsx`;

            const res = await FileSystem.downloadAsync(url, fileUri, {
                headers: {
                    // if your API needs auth, put token here
                },
            });

            if (res && res.status === 200) {
                if (await Sharing.isAvailableAsync()) {
                    await Sharing.shareAsync(res.uri, {
                        mimeType:
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        dialogTitle: 'Share or Save Event Report',
                    });
                    showSnackbar('Excel file downloaded! You can now share or save it.', 'success');
                } else {
                    showSnackbar('File downloaded. Sharing is not available on this device.', 'info');
                }
            } else {
                showSnackbar('Download failed! Please try again.', 'error');
            }
        } catch (err) {
            showSnackbar('Download failed: ' + err.message, 'error');
        } finally {
            setDownloading(false);
        }
    };

    // Card grid layout calculation
    const { width: screenWidth } = Dimensions.get('window');
    const gridSpacing = 12;
    const numColumns = 3;
    const cardWidth = (screenWidth - (numColumns + 1) * gridSpacing - 32) / numColumns;

    const renderSummaryGrid = (metrics: Record<string, any>) => {
        const entries = Object.entries(metrics);
        const rows: [string, any][][] = [];
        const numColumns = 3;
        for (let i = 0; i < entries.length; i += numColumns) {
            const row = entries.slice(i, i + numColumns);
            rows.push(row);
        }

        return (
            <View style={styles.summaryGridWrap}>
                {rows.map((row, rowIdx) => {
                    const isLastRow = rowIdx === rows.length - 1;
                    const isFullRow = row.length === numColumns;
                    let cardStyle;
                    if (!isFullRow && isLastRow) {
                        // For last row: 2 items = 1/2 width, 1 item = full width
                        cardStyle = (idx: number) =>
                            row.length === 2
                                ? {
                                    width: "48%",
                                    marginRight: idx === 0 ? "4%" : 0, // gap between two cards
                                }
                                : {
                                    width: "100%",
                                };
                    } else {
                        // Normal row of 3 columns
                        cardStyle = (idx: number) => ({
                            width: cardWidth, // your existing 3-col width
                            marginRight: idx < numColumns - 1 ? gridSpacing : 0,
                        });
                    }
                    return (
                        <View style={styles.summaryGridRow} key={rowIdx}>
                            {row.map(([k, v], idx) => (
                                <View
                                    key={k}
                                    style={[
                                        styles.metricCard,
                                        { backgroundColor: colors.card },
                                        cardStyle(idx)
                                    ]}
                                >
                                    <Text style={[styles.metricLabel, { color: colors.secondaryText }]}>
                                        {k.replace(/([A-Z])/g, ' $1').toUpperCase()}
                                    </Text>
                                    <Text style={[styles.metricValue, { color: colors.button }]}>
                                        {v ?? '—'}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    );
                })}
            </View>
        );
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                <ScrollView style={{ backgroundColor: colors.background }}>
                    {loading && (
                        <View style={{ padding: 24, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator color={colors.button} size="large" />
                            <Text style={{ color: colors.text, marginTop: 12 }}>Loading...</Text>
                        </View>
                    )}

                    <View style={{ padding: 16 }}>
                        <Text style={[styles.title, { color: colors.button }]}>EVENT REPORT</Text>

                        {/* Download Button */}
                        <TouchableOpacity
                            style={[styles.downloadBtn, { backgroundColor: colors.button, opacity: downloading ? 0.7 : 1 }]}
                            onPress={handleExcelDownload}
                            disabled={downloading}
                        >
                            <Text style={{ color: colors.buttonText, fontWeight: 'bold', textAlign: 'center' }}>
                                {downloading ? 'DOWNLOADING...' : 'DOWNLOAD AS EXCEL'}
                            </Text>
                        </TouchableOpacity>

                        {/* Summary Metrics Grid */}
                        {summary && (
                            <View style={[styles.paper, { backgroundColor: 'transparent', elevation: 0 }]}>
                                <Text style={[styles.subtitle, { color: colors.text }]}>SUMMARY</Text>
                                {renderSummaryGrid(summary.metrics)}
                            </View>
                        )}

                        {/* Ticket Tiers */}
                        {summary?.ticketTiers?.length > 0 && (
                            <View style={[styles.paper, { backgroundColor: colors.card }]}>
                                <Text style={[styles.subtitle, { color: colors.text }]}>TICKET TIERS</Text>
                                <ScrollView horizontal style={{ marginBottom: 8 }}>
                                    <View>
                                        <View style={[styles.tableRow, styles.tableHeaderRow, { backgroundColor: colors.dropdownBackground }]}>
                                            <Text style={[styles.tableCell, styles.headerCell, { color: colors.text }]}>NAME</Text>
                                            <Text style={[styles.tableCell, styles.headerCell, { color: colors.text }]}>PRICE</Text>
                                            <Text style={[styles.tableCell, styles.headerCell, { color: colors.text }]}>CAPACITY</Text>
                                            <Text style={[styles.tableCell, styles.headerCell, { color: colors.text }]}>PERKS</Text>
                                        </View>
                                        {summary.ticketTiers.map((t, i) => (
                                            <View key={i} style={styles.tableRow}>
                                                <Text style={[styles.tableCell, { color: colors.text }]}>{t.name.toUpperCase()}</Text>
                                                <Text style={[styles.tableCell, { color: colors.text }]}>{t.price}</Text>
                                                <Text style={[styles.tableCell, { color: colors.text }]}>{t.capacity}</Text>
                                                <Text style={[styles.tableCell, { color: colors.secondaryText }]}>{t.perks.join(', ').toUpperCase()}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </ScrollView>
                            </View>
                        )}

                        {/* Submissions Table */}
                        {/* Submissions Table (rewritten) */}
                        <View style={{ marginBottom: 24, maxHeight: 350 }}>

                            {/* Table Header (sticky, not scrolling vertically) */}
                            <View style={[styles.tableRow, styles.tableHeaderRow, { backgroundColor: colors.dropdownBackground }]}>
                                <Text style={[styles.tableCell, styles.headerCell, { color: colors.text }]}>TIER</Text>
                                {summary?.formSchema.map(f => (
                                    <Text key={f.id} style={[styles.tableCell, styles.headerCell, { color: colors.text }]}>
                                        {f.label.toUpperCase()}
                                    </Text>
                                ))}
                                <Text style={[styles.tableCell, styles.headerCell, { color: colors.text }]}>VISITORS</Text>
                                <Text style={[styles.tableCell, styles.headerCell, { color: colors.text }]}>ENTRY TIMES</Text>
                                <Text style={[styles.tableCell, styles.headerCell, { color: colors.text }]}>EXIT TIMES</Text>
                                <Text style={[styles.tableCell, styles.headerCell, { color: colors.text }]}>FOOD</Text>
                                <Text style={[styles.tableCell, styles.headerCell, { color: colors.text }]}>FOOD TIMES</Text>
                                <Text style={[styles.tableCell, styles.headerCell, { color: colors.text }]}>GIFT</Text>
                                <Text style={[styles.tableCell, styles.headerCell, { color: colors.text }]}>GIFT TIMES</Text>
                                <Text style={[styles.tableCell, styles.headerCell, { color: colors.text }]}>SUBMITTED AT</Text>
                            </View>

                            {/* Table Body: scrollable vertically only */}
                            <ScrollView style={{ maxHeight: 300 }}>
                                {submissions.map(sub => (
                                    <View key={sub._id} style={styles.tableRow}>
                                        <Text style={[styles.tableCell, { color: colors.text }]}>{ticketMap[sub._id] || '—'}</Text>
                                        {summary.formSchema.map(fld => {
                                            const resp = sub.responses.find(r => r.fieldId === fld.id);
                                            return (
                                                <Text key={fld.id} style={[styles.tableCell, { color: colors.text }]}>
                                                    {renderCell(resp?.value)}
                                                </Text>
                                            );
                                        })}
                                        <Text style={[styles.tableCell, { color: colors.text }]}>{displayVal(sub.visitorCount)}</Text>
                                        <Text style={[styles.tableCell, { color: colors.secondaryText }]}>{renderCell(sub.entryTime)}</Text>
                                        <Text style={[styles.tableCell, { color: colors.secondaryText }]}>{renderCell(sub.exitTime)}</Text>
                                        <Text style={[styles.tableCell, { color: colors.button }]}>{displayVal(sub.food)}</Text>
                                        <Text style={[styles.tableCell, { color: colors.secondaryText }]}>{renderCell(sub.foodTime)}</Text>
                                        <Text style={[styles.tableCell, { color: colors.button }]}>{displayVal(sub.gift)}</Text>
                                        <Text style={[styles.tableCell, { color: colors.secondaryText }]}>{renderCell(sub.giftTime)}</Text>
                                        <Text style={[styles.tableCell, { color: colors.text }]}>{displayVal(sub.submittedAt)}</Text>
                                    </View>
                                ))}
                                {!loading && submissions.length === 0 && (
                                    <View style={styles.tableRow}>
                                        <Text style={[styles.tableCell, { color: colors.cancelButton, textAlign: 'center', flex: 1 }]}>
                                            NO SUBMISSIONS
                                        </Text>
                                    </View>
                                )}
                            </ScrollView>

                        </View>
                    </View>

                    {/* Snackbar */}
                    <Snackbar
                        visible={snackbar.visible}
                        onDismiss={() => setSnackbar((s) => ({ ...s, visible: false }))}
                        duration={3500}
                        style={{ backgroundColor: snackbar.severity === 'error' ? colors.cancelButton : colors.button }}
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
        paddingVertical: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 10,
    },
    downloadBtn: {
        alignSelf: 'flex-start',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginBottom: 18,
        marginTop: 4,
    },
    paper: {
        borderRadius: 10,
        marginBottom: 22,
        padding: 14,
        elevation: 1,
    },
    subtitle: {
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 10,
    },
    summaryGridWrap: {
        marginHorizontal: -6,
    },
    summaryGridRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    metricCard: {
        borderRadius: 9,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        marginLeft: 6,
        marginRight: 6,
        minHeight: 80,
    },
    metricLabel: {
        fontSize: 12,
        marginBottom: 5,
        textAlign: 'center',
    },
    metricValue: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#eee',
        minHeight: 36,
        paddingVertical: 5,
    },
    tableHeaderRow: {
        borderBottomWidth: 2,
    },
    headerCell: {
        fontWeight: 'bold',
        fontSize: 12,
        paddingVertical: 3,
    },
    tableCell: {
        fontSize: 11,
        paddingHorizontal: 6,
        flex: 1,
        flexWrap: 'wrap',
        minWidth: 70,
    },
});
