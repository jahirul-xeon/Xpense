import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

interface InsertInputProps {
  label?: string;
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  rightIcon?: React.ReactNode;
  focused?: boolean;
  editable?: boolean;
  keyboardType?: any;
}

export default function InsertInput({
  label,
  value,
  placeholder,
  onChangeText,
  onPress,
  rightIcon,
  focused,
  editable = true,
  keyboardType
}: InsertInputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity 
        activeOpacity={1} 
        onPress={onPress} 
        style={[styles.inputContainer, focused && styles.focusedInput, onPress && { minHeight: 40 }]}
      >
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#A0A0A0"
          onChangeText={onChangeText}
          editable={editable && !onPress}
          pointerEvents={onPress ? 'none' : 'auto'}
          keyboardType={keyboardType}
        />
        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  label: {
    width: '25%',
    minWidth: 80,
    fontSize: 16,
    color: '#8A8A8A', // muted gray for label
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    paddingBottom: 4,
  },
  focusedInput: {
    borderBottomColor: '#2196F3',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    padding: 0,
  },
  iconContainer: {
    marginLeft: 8,
  }
});
