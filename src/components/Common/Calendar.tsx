import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { AntDesign } from '@expo/vector-icons';

type MonthYearPickerProps = {
  onDateChange?: (date: Date) => void;
};

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date: Date) => {
    const updatedDate = new Date(date.getFullYear(), date.getMonth(), 1); // first day of month
    setSelectedDate(updatedDate);
    onDateChange?.(updatedDate);
    hideDatePicker();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(
      direction === 'prev' ? selectedDate.getMonth() - 1 : selectedDate.getMonth() + 1
    );
    setSelectedDate(newDate);
    onDateChange?.(newDate);
  };

  const formatMonthYear = (date: Date) =>
    date.toLocaleString('default', { month: 'short', year: 'numeric' }).toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <TouchableOpacity onPress={() => navigateMonth('prev')} style={styles.arrowButton}>
          <AntDesign name="left" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={showDatePicker} style={styles.dateDisplay}>
          <Text style={styles.dateText}>{formatMonthYear(selectedDate)}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateMonth('next')} style={styles.arrowButton}>
          <AntDesign name="right" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        display="inline"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={selectedDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowButton: {
    padding: 10,
  },
  dateDisplay: {
    paddingHorizontal: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

export default MonthYearPicker;
