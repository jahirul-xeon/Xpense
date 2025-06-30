import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import IncomeExpenseCard from '../../components/ui/TotalSummary';
import StickySectionList from '../../components/ui/ListOfExpenseIncome';
import { getDb } from '../../database/schema/schema';

type TransactionRow = {
  id: number;
  period: string;
  account: string;
  category: string;
  subcategory: string;
  note: string;
  bdt: number;
  type: 'Income' | 'Expense';
  description: string;
  amount: number;
  currency: string;
};

type Section = {
  date: string;
  day: string;
  income: number;
  expense: number;
  items: {
    AccountType: string;
    amount: number;
    isIncome: boolean;
    Category: string;
    note: string;
  }[];
};

export default function Daily() {
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    loadTransactionsGroupedByDate();
  }, []);

  const loadTransactionsGroupedByDate = async () => {
    try {
      const db = getDb();
      const rawRows = await db.getAllAsync(
        `SELECT * FROM transactions ORDER BY period DESC`
      ) as TransactionRow[];

      const grouped: { [date: string]: Section } = {};

      for (const row of rawRows) {
        const date = row.period;
        const isIncome = row.type === 'Income';
        const amount = row.amount;

        if (!grouped[date]) {
          const day = new Date(date).toLocaleDateString('en-US', {
            weekday: 'short',
          });

          grouped[date] = {
            date,
            day,
            income: 0,
            expense: 0,
            items: [],
          };
        }

        grouped[date].items.push({
          AccountType: row.account,
          amount,
          isIncome,
          Category: row.category || 'Unknown',
          note: row.note
        });

        if (isIncome) {
          grouped[date].income += amount;
        } else {
          grouped[date].expense += amount;
        }
      }

      const resultSections = Object.values(grouped);
      setSections(resultSections);
    } catch (error) {
      console.error('Failed to load transactions:', error);
    }
  };

  const totalIncome = sections.reduce((sum, s) => sum + s.income, 0);
  const totalExpense = sections.reduce((sum, s) => sum + s.expense, 0);

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: 200 }}>
      <StickySectionList
        sections={sections}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        renderTopSummary={() => (
          <IncomeExpenseCard income={totalIncome} expense={totalExpense} />
        )}
      />
    </View>
  );
}
