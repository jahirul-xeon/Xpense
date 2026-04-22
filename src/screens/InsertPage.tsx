import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import InsertInput from '../components/ui/InsertInput';
import CustomKeyboard from '../components/ui/CustomKeyboard';

type TabView = 'Income' | 'Expense' | 'Transfer';

export default function InsertPage() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<TabView>('Income');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [activeField, setActiveField] = useState('Amount');
  const insets = useSafeAreaInsets();

  // Form State
  const [date, setDate] = useState('Sun, 22/03/2026');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [account, setAccount] = useState('');
  const [note, setNote] = useState('');
  const [fees, setFees] = useState('');
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [description, setDescription] = useState('');

  const getThemeColor = () => {
    switch (activeTab) {
      case 'Income': return '#2196F3';
      case 'Expense': return '#FF5252';
      case 'Transfer': return '#4A4A4A';
      default: return '#2196F3';
    }
  };

  const handleKeyPress = (key: string) => {
    if (activeField === 'Amount') {
      setAmount(prev => prev + key);
    } else if (activeField === 'Fees') {
      setFees(prev => prev + key);
    }
  };

  const handleDelete = () => {
    if (activeField === 'Amount') {
      setAmount(prev => prev.slice(0, -1));
    } else if (activeField === 'Fees') {
      setFees(prev => prev.slice(0, -1));
    }
  };

  const openKeyboard = (field: string) => {
    Keyboard.dismiss(); // Dismiss native keyboard if open
    setActiveField(field);
    setKeyboardVisible(true);
  };

  const handleNativeInputFocus = () => {
    setKeyboardVisible(false);
  };

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      {(['Income', 'Expense', 'Transfer'] as TabView[]).map(tab => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            activeTab === tab && { borderColor: getThemeColor() }
          ]}
          onPress={() => {
            setActiveTab(tab);
            setKeyboardVisible(false);
          }}
        >
          <Text style={[
            styles.tabText,
            activeTab === tab && { color: getThemeColor(), fontWeight: '600' }
          ]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={28} color="white" />
          <Text style={styles.headerText}>Trans.</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{activeTab}</Text>
        <TouchableOpacity style={styles.headerRight}>
          <Feather name="star" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <ScrollView style={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {renderTabs()}

          <InsertInput
            label="Date"
            value={date}
            onChangeText={setDate}
            rightIcon={
              <View style={{ alignItems: 'center' }}>
                <Feather name="refresh-ccw" size={16} color="#A0A0A0" />
                <Text style={{ fontSize: 8, color: '#A0A0A0', marginTop: 2 }}>Rep/Inst.</Text>
              </View>
            }
          />

          <InsertInput
            label="Amount"
            value={amount}
            placeholder=""
            focused={isKeyboardVisible && activeField === 'Amount'}
            onPress={() => openKeyboard('Amount')}
          />

          {(activeTab === 'Income' || activeTab === 'Expense') && (
            <>
              <InsertInput
                label="Category"
                value={category}
                onChangeText={setCategory}
                onPress={() => handleNativeInputFocus()}
              />
              <InsertInput
                label="Account"
                value={account}
                onChangeText={setAccount}
                onPress={() => handleNativeInputFocus()}
              />
            </>
          )}

          {activeTab === 'Transfer' && (
            <>
              <InsertInput
                label="Fees"
                value={fees}
                focused={isKeyboardVisible && activeField === 'Fees'}
                onPress={() => openKeyboard('Fees')}
                rightIcon={<Feather name="x" size={20} color="#A0A0A0" />}
              />
              <InsertInput
                label="From"
                value={fromAccount}
                onChangeText={setFromAccount}
                rightIcon={
                  <View style={{ flexDirection: 'column' }}>
                    <Feather name="arrow-up" size={14} color="#A0A0A0" style={{ marginBottom: -4 }} />
                    <Feather name="arrow-down" size={14} color="#A0A0A0" />
                  </View>
                }
                onPress={() => handleNativeInputFocus()}
              />
              <InsertInput
                label="To"
                value={toAccount}
                onChangeText={setToAccount}
                onPress={() => handleNativeInputFocus()}
              />
            </>
          )}

          <InsertInput
            label="Note"
            value={note}
            onChangeText={setNote}
            rightIcon={
              <View style={{ borderWidth: 1, borderColor: '#A0A0A0', paddingHorizontal: 4, borderRadius: 2 }}>
                <Feather name="alert-circle" size={16} color="#A0A0A0" />
              </View>
            }
            onPress={() => handleNativeInputFocus()}
          />
          <View style={styles.descriptionRow}>
            <InsertInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              rightIcon={<Feather name="camera" size={20} color="#A0A0A0" />}
              onPress={() => handleNativeInputFocus()}
            />
          </View>
          <View style={styles.actionRow}>
            <TouchableOpacity style={[styles.saveBtn, { backgroundColor: getThemeColor() }]}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.continueBtn}>
              <Text style={styles.continueBtnText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* {!isKeyboardVisible && (
          <KeyboardAvoidingView
            style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 24) }]}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <View style={styles.descriptionRow}>
              <InsertInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                rightIcon={<Feather name="camera" size={20} color="#A0A0A0" />}
                onPress={() => handleNativeInputFocus()}
              />
            </View>
            <View style={styles.actionRow}>
              <TouchableOpacity style={[styles.saveBtn, { backgroundColor: getThemeColor() }]}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.continueBtn}>
                <Text style={styles.continueBtnText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        )} */}

      </View>

      <CustomKeyboard
        isVisible={isKeyboardVisible}
        fieldName={activeField}
        onKeyPress={handleKeyPress}
        onDelete={handleDelete}
        onOk={() => setKeyboardVisible(false)}
        onClose={() => setKeyboardVisible(false)}
        okColor={getThemeColor()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#20B269', // Match the green header visually
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#20B269',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
    marginLeft: -8,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    width: 80,
    alignItems: 'flex-end',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  tabText: {
    color: '#8A8A8A',
    fontSize: 14,
  },
  bottomBar: {
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FAFAFA',
  },
  descriptionRow: {
    paddingBottom: 8,
  },
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  saveBtn: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 12,
  },
  saveBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  continueBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  continueBtnText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  }
});