import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { insertTransaction } from '../../API/Insert';

export default function Calendar() {
  const seed = async () => {
    await insertTransaction({
      period: '2025-06-28',
      account: '💵Cash',
      category: 'Salary',
      subcategory: 'Bonus',
      note: 'Monthly salary',
      bdt: 12000,
      type: 'Income',
      description: 'Salary for June',
      amount: 12000,
      currency: 'BDT',
    });

    await insertTransaction({
      period: '2025-06-22',
      account: 'bKash',
      category: '🍌Food',
      subcategory: 'Groceries',
      note: 'Bought vegetables',
      bdt: 1500,
      type: 'Expense',
      description: 'Weekly groceries',
      amount: 1500,
      currency: 'BDT',
    });
     await insertTransaction({
      period: '2025-06-21',
      account: 'bKash',
      category: '🍌Food',
      subcategory: 'Groceries',
      note: 'Bought vegetables',
      bdt: 1500,
      type: 'Expense',
      description: 'Weekly groceries',
      amount: 1500,
      currency: 'BDT',
    });

    console.log('Seed data inserted');
  };

  // Run seed on mount (optional)
  useEffect(() => {
    seed();
  }, []);

  return (
    <View>
      <TouchableOpacity onPress={seed}>
        <Text>Seed Data</Text>
      </TouchableOpacity>
    </View>
  )
}



