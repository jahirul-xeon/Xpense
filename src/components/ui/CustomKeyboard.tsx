import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CustomKeyboardProps {
  fieldName?: string;
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  onOk: () => void;
  onClose: () => void;
  isVisible: boolean;
  okColor?: string;
}

const { width, height } = Dimensions.get('window');
const keyHeight = Math.min(height * 0.08, 64);

export default function CustomKeyboard({
  fieldName = "Amount",
  onKeyPress,
  onDelete,
  onOk,
  onClose,
  isVisible,
  okColor = "#FF5252"
}: CustomKeyboardProps) {
  const [currency, setCurrency] = useState('US$');
  const insets = useSafeAreaInsets();

  if (!isVisible) return null;

  const renderKey = (label: string, onPress: () => void, isWide?: boolean, bgColor?: string) => (
    <TouchableOpacity 
      style={[
        styles.key, 
        isWide && { flex: 2 },
        bgColor && { backgroundColor: bgColor },
        { height: keyHeight }
      ]}
      onPress={onPress}
    >
      <Text style={[styles.keyText, bgColor && { color: 'white' }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{fieldName}</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Feather name="globe" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={onClose}>
            <Feather name="x" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Currency Selector */}
      <View style={styles.currencyRow}>
        <TouchableOpacity 
          style={[styles.currencyTab, currency === '৳' ? styles.activeCurrency : null, { width: 60 }]} 
          onPress={() => setCurrency('৳')}
        >
          <Text style={[styles.currencyText, currency === '৳' && styles.activeCurrencyText]}>৳</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.currencyTab, currency === 'US$' ? styles.activeCurrency : null, { flex: 1 }]} 
          onPress={() => setCurrency('US$')}
        >
          <Text style={[styles.currencyText, currency === 'US$' && styles.activeCurrencyText]}>US$</Text>
        </TouchableOpacity>
      </View>

      {/* Numpad */}
      <View style={styles.pad}>
        <View style={styles.row}>
          {renderKey('+', () => onKeyPress('+'))}
          {renderKey('-', () => onKeyPress('-'))}
          {renderKey('×', () => onKeyPress('*'))}
          {renderKey('÷', () => onKeyPress('/'))}
        </View>
        <View style={styles.row}>
          {renderKey('7', () => onKeyPress('7'))}
          {renderKey('8', () => onKeyPress('8'))}
          {renderKey('9', () => onKeyPress('9'))}
          {renderKey('=', () => onKeyPress('='))}
        </View>
        <View style={styles.row}>
          {renderKey('4', () => onKeyPress('4'))}
          {renderKey('5', () => onKeyPress('5'))}
          {renderKey('6', () => onKeyPress('6'))}
          {renderKey('.', () => onKeyPress('.'))}
        </View>
        <View style={styles.row}>
          {renderKey('1', () => onKeyPress('1'))}
          {renderKey('2', () => onKeyPress('2'))}
          {renderKey('3', () => onKeyPress('3'))}
          <TouchableOpacity style={[styles.key, { borderRightWidth: 0 }]} onPress={onDelete}>
            <Ionicons name="backspace-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={[styles.row, { paddingBottom: insets.bottom }]}>
          <View style={[styles.key, { height: keyHeight }]} />
          {renderKey('0', () => onKeyPress('0'))}
          <View style={[styles.key, { height: keyHeight }]} />
          {renderKey('OK', onOk, false, okColor)}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    marginLeft: 24,
  },
  currencyRow: {
    flexDirection: 'row',
    backgroundColor: '#23233c', 
  },
  currencyTab: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCurrency: {
    backgroundColor: '#3b3b5c',
  },
  currencyText: {
    color: '#8a8a9e',
    fontSize: 16,
    fontWeight: '600',
  },
  activeCurrencyText: {
    color: 'white',
  },
  pad: {
    backgroundColor: '#F9F9F9',
  },
  row: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  key: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#F0F0F0',
    backgroundColor: 'white',
  },
  keyText: {
    fontSize: 22,
    color: '#333',
    fontWeight: '400',
  }
});
