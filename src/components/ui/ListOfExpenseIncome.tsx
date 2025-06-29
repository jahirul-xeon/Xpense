import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface Item {
  type: string;
  amount: number;
  isIncome: boolean;
}

export interface Section {
  date: string;
  day: string;
  income: number;
  expense: number;
  items: Item[];
}

interface Props {
  sections: Section[];
  totalIncome?: number;
  totalExpense?: number;
  containerStyle?: StyleProp<ViewStyle>;
  renderTopSummary?: () => React.ReactNode;
}

const StickySectionList: React.FC<Props> = ({
  sections,
  totalIncome,
  totalExpense,
  containerStyle,
  renderTopSummary,
}) => {
  const content: React.ReactNode[] = [];
  const stickyHeaderIndices: number[] = [];

  let index = 0;
  sections.forEach((section) => {
    stickyHeaderIndices.push(index);
    content.push(
      <View key={`header-${index}`} style={styles.header}>
        <Text style={styles.headerDate}>
          {section.date} ({section.day})
        </Text>
        <Text style={styles.headerSummary}>
          Income: ₹{section.income} | Expense: ₹{section.expense}
        </Text>
      </View>
    );
    index++;

    section.items.forEach((item) => {
      content.push(
        <View key={`item-${index}`} style={styles.item}>
          <Text style={styles.itemText}>{item.type}</Text>
          <Text
            style={[
              styles.amountText,
              { color: item.isIncome ? 'green' : 'red' },
            ]}
          >
            {item.isIncome ? '+' : '-'}₹{item.amount}
          </Text>
        </View>
      );
      index++;
    });
  });

  return (
    <View style={[{ flex: 1, backgroundColor: 'white' }, containerStyle]}>
      {/* Top Summary (optional) */}
      {renderTopSummary ? (
        renderTopSummary()
      ) : totalIncome !== undefined && totalExpense !== undefined ? (
        <View style={styles.topSummary}>
          <Text style={styles.summaryText}>
            Total Income: ₹{totalIncome} | Total Expense: ₹{totalExpense}
          </Text>
        </View>
      ) : null}

      <ScrollView
        contentContainerStyle={styles.container}
        stickyHeaderIndices={stickyHeaderIndices}
      >
        {content}
      </ScrollView>
    </View>
  );
};

export default StickySectionList;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
  },
  topSummary: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ececec',
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '500',
  },
  header: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    zIndex: 10,
  },
  headerDate: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerSummary: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemText: {
    fontSize: 16,
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
