import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { getAllTransactions, TransactionRow } from '../../database/schema/schema';
import { Modal, Portal } from 'react-native-paper';
type MonthYearPickerProps = {
  onDateChange?: (date: Date) => void;
  initialDate?: Date;
  minYear?: number;
  maxYear?: number;
  arrowColor?: string;
  textColor?: string;
  selectedItemColor?: string;
};

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  onDateChange,
  initialDate = new Date(),
  minYear = new Date().getFullYear() - 10,
  maxYear = new Date().getFullYear() + 10,
  arrowColor = '#333',
  textColor = '#333',
  selectedItemColor = '#e3f2fd',
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [showMonthPicker, setShowMonthPicker] = useState<boolean>(false);
  const [showYearPicker, setShowYearPicker] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [transactions, setTransactions] = useState<TransactionRow[]>([]);

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const fetchData = () => {
    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const period = `${year}-${month}`;
    const data = getAllTransactions(period);
    setTransactions(data);
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const months: string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const currentYear: number = currentDate.getFullYear();
  const years: number[] = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);

  const selectMonth = (monthIndex: number): void => {
    const newDate = new Date(currentDate);
    newDate.setMonth(monthIndex);
    updateDate(newDate);
    setShowMonthPicker(false);
  };

  const selectYear = (year: number): void => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    updateDate(newDate);
    setShowYearPicker(false);
  };

  const navigateMonth = (direction: 'prev' | 'next'): void => {
    const newDate = new Date(currentDate);
    newDate.setMonth(direction === 'prev' ? currentDate.getMonth() - 1 : currentDate.getMonth() + 1);
    updateDate(newDate);
  };

  const updateDate = (newDate: Date): void => {
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  return (
    <View style={styles.container}>
      {/* Main Picker View */}
      <View style={styles.pickerContainer}>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => navigateMonth('prev')}
        >
          <AntDesign name="left" size={20} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dateDisplay}
          onPress={() => setShowMonthPicker(true)}
        >
          <Text style={[styles.dateText, { color: textColor }]}>
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => navigateMonth('next')}
        >
          <AntDesign name="right" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Month Selection Modal */}
      {/* Month Selection Modal */}
      <Portal>
        <Modal visible={showMonthPicker} onDismiss={() => setShowMonthPicker(false)} contentContainerStyle={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Month</Text>
            <View style={styles.monthGrid}>
              {months.map((month, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.monthItem,
                    currentDate.getMonth() === index && { backgroundColor: selectedItemColor },
                  ]}
                  onPress={() => selectMonth(index)}
                >
                  <Text style={styles.itemText}>{month}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.yearSelectionButton}
                onPress={() => {
                  setShowMonthPicker(false);
                  setShowYearPicker(true);
                }}
              >
                <Text style={styles.yearButtonText}>Select Year</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowMonthPicker(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Portal>

      {/* Year Picker Modal */}
      <Portal>
        <Modal visible={showYearPicker} onDismiss={() => setShowYearPicker(false)} contentContainerStyle={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Year</Text>
            <FlatList
              data={years}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.yearItem,
                    currentDate.getFullYear() === item && { backgroundColor: selectedItemColor },
                  ]}
                  onPress={() => selectYear(item)}
                >
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.yearList}
              initialScrollIndex={years.indexOf(currentYear)}
              getItemLayout={(data, index) => ({
                length: 50,
                offset: 50 * index,
                index,
              })}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowYearPicker(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>

    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    height: "auto",
    width: '100%',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arrowButton: {
    paddingHorizontal: 15,
  },
  arrow: {
    fontSize: 24,
  },
  dateDisplay: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '400',
  },
  modalOverlay: {
    margin: 20, // or padding, so some of the background is clickable
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0)',
    width: '80%',
    maxHeight: '70%',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,

  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  monthItem: {
    width: '30%',
    padding: 12,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  yearItem: {
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  yearList: {
    paddingBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  yearSelectionButton: {
    padding: 10,
  },
  yearButtonText: {
    color: '#1976d2',
    fontSize: 16,
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    color: '#1976d2',
    fontSize: 16,
  },
});

export default MonthYearPicker;
