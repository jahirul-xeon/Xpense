import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import IncomeExpenseCard from '../../components/ui/TotalSummary'
import StickySectionList from '../../components/ui/ListOfExpenseIncome';

export default function Daily() {

  const sections: Section[] = [
    {
      date: '2025-06-29',
      day: 'Sunday',
      income: 1400,
      expense: 800,
      items: [
        { type: 'Salary', amount: 1000, isIncome: true },
        { type: 'Groceries', amount: 300, isIncome: false },
        { type: 'Gift', amount: 400, isIncome: true },
      ],
    },
     {
      date: '2025-06-29',
      day: 'Sunday',
      income: 1400,
      expense: 800,
      items: [
        { type: 'Salary', amount: 1000, isIncome: true },
        { type: 'Groceries', amount: 300, isIncome: false },
        { type: 'Gift', amount: 400, isIncome: true },
      ],
    },
     {
      date: '2025-06-29',
      day: 'Sunday',
      income: 1400,
      expense: 800,
      items: [
        { type: 'Salary', amount: 1000, isIncome: true },
        { type: 'Groceries', amount: 300, isIncome: false },
        { type: 'Gift', amount: 400, isIncome: true },
      ],
    },
     {
      date: '2025-06-29',
      day: 'Sunday',
      income: 1400,
      expense: 800,
      items: [
        { type: 'Salary', amount: 1000, isIncome: true },
        { type: 'Groceries', amount: 300, isIncome: false },
        { type: 'Gift', amount: 400, isIncome: true },
      ],
    },
     {
      date: '2025-06-29',
      day: 'Sunday',
      income: 1400,
      expense: 800,
      items: [
        { type: 'Salary', amount: 1000, isIncome: true },
        { type: 'Groceries', amount: 300, isIncome: false },
        { type: 'Gift', amount: 400, isIncome: true },
      ],
    },

     {
      date: '2025-06-29',
      day: 'Sunday',
      income: 1400,
      expense: 800,
      items: [
        { type: 'Salary', amount: 1000, isIncome: true },
        { type: 'Groceries', amount: 300, isIncome: false },
        { type: 'Gift', amount: 400, isIncome: true },
      ],
    },
     {
      date: '2025-06-29',
      day: 'Sunday',
      income: 1400,
      expense: 800,
      items: [
        { type: 'Salary', amount: 1000, isIncome: true },
        { type: 'Groceries', amount: 300, isIncome: false },
        { type: 'Gift', amount: 400, isIncome: true },
      ],
    },

     {
      date: '2025-06-29',
      day: 'Sunday',
      income: 1400,
      expense: 800,
      items: [
        { type: 'Salary', amount: 1000, isIncome: true },
        { type: 'Groceries', amount: 300, isIncome: false },
        { type: 'Gift', amount: 400, isIncome: true },
      ],
    }, {
      date: '2025-06-29',
      day: 'Sunday',
      income: 1400,
      expense: 800,
      items: [
        { type: 'Salary', amount: 1000, isIncome: true },
        { type: 'Groceries', amount: 300, isIncome: false },
        { type: 'Gift', amount: 400, isIncome: true },
      ],
    },
     {
      date: '2025-06-29',
      day: 'Sunday',
      income: 1400,
      expense: 800,
      items: [
        { type: 'Salary', amount: 1000, isIncome: true },
        { type: 'Groceries', amount: 300, isIncome: false },
        { type: 'Gift', amount: 400, isIncome: true },
      ],
    },
     {
      date: '2025-06-29',
      day: 'Sunday',
      income: 1400,
      expense: 800,
      items: [
        { type: 'Salary', amount: 1000, isIncome: true },
        { type: 'Groceries', amount: 300, isIncome: false },
        { type: 'Gift', amount: 400, isIncome: true },
      ],
    },
    {
      date: '2025-06-28',
      day: 'Saturday',
      income: 1000,
      expense: 400,
      items: [
        { type: 'Cashback', amount: 200, isIncome: true },
        { type: 'Transport', amount: 200, isIncome: false },
        { type: 'Online Sales', amount: 800, isIncome: true },
      ],
    },
  ];
  const totalIncome = sections.reduce((sum, s) => sum + s.income, 0);
  const totalExpense = sections.reduce((sum, s) => sum + s.expense, 0);
  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingBottom: 200 }}>
      {/* <View>
        <IncomeExpenseCard income={1400} expense={800} />
        <View style={{ width: "100%", height: 1, backgroundColor: "#ececec" }} />
      </View> */}
      <StickySectionList
        sections={sections}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        renderTopSummary={() => <IncomeExpenseCard income={totalIncome} expense={totalExpense} />}
      />
    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: 150,
  },
  header: {
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    zIndex: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});
