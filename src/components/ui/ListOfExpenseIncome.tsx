import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { toMoney } from '../../utils/utils';
const { width, height } = Dimensions.get('window');
interface Item {
  AccountType: string;
  Category: string;
  amount: number;
  isIncome: boolean;
  note : string;
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
  selectedMonth?: number;
  selectedYear?: number;
}


const StickySectionList: React.FC<Props> = ({
  sections,
  containerStyle,
  renderTopSummary,
}) => {
  const content: React.ReactNode[] = [];
  const stickyHeaderIndices: number[] = [];

  let index = 0;
  sections.forEach((section) => {
    stickyHeaderIndices.push(index);
    content.push(
      <TouchableOpacity
        key={`header-${index}`} // Better key handling
        style={[styles.header, {
        }]}
      >
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignContent: "center" }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, flex: 1 }}>
            <Text style={styles.headerDate}>
              {String(new Date(section.date).getDate()).padStart(2, '0')}
            </Text>
            <View style={{
              backgroundColor: section.day === "Fri"
                ? "#f55959"   // Friday color (red)
                : section.day === "Sat"
                  ? "#00b4e9"  // Saturday color (purple)
                  : "gray", // Default color (blue)
              borderRadius: 3,
              paddingHorizontal: 3,
              paddingVertical: 2,
            }}>
              <Text style={{ color: "white", fontSize: 9 }}>
                {section.day}
              </Text>
            </View>
          </View>
          <View style={{ flex: .7 }}>
            <Text style={{
              fontSize: 13,
              fontWeight: '500',
              color: '#00b4e9'
            }}>
              ৳{toMoney(section.income, true)}
            </Text>
          </View>
          <View style={{ flex: .7, justifyContent: "center", alignItems: "flex-end" }}>
            <Text style={{
              fontSize: 13,
              fontWeight: '500',
              color: '#f55959'
            }}>
              ৳{toMoney(section.expense, true)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
    index++;

    section.items.forEach((item) => {
      content.push(
        <TouchableOpacity key={`item-${index}`} style={styles.item}>
          <View style={{ flexDirection: "row", gap: 30, flex: 1 }}>
            <Text
              style={[styles.itemText,]}>
              {item.Category}
            </Text>
          <View style={{ flex:1,flexDirection:"column", justifyContent:"center", alignItems:"baseline"}}>
             <Text style={[styles.itemText,{fontSize:12}]}>{item.AccountType}</Text>
             <Text style={styles.itemText}>{item.note}</Text>
          </View>
          </View>
          <Text
            style={[
              styles.amountText,
              { color: item.isIncome ? '#00b4e9' : '#f55959' },
            ]}
          >৳{item.amount}</Text>
        </TouchableOpacity>
      );
      index++;
    });
  });

  return (
    <View style={[{ flex: 1, backgroundColor: 'white' }, containerStyle]}>
      {/* Top Summary (optional) */}
      {renderTopSummary ? (
        renderTopSummary()
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

  },
  headerDate: {
    fontSize: 16,
    fontWeight: '600',
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,

    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemText: {
    fontSize: 13,
    fontWeight: '500',
    justifyContent: "flex-start",
    color: "gray"
  },
  amountText: {
    fontSize: 13,
    fontWeight: '500',
  },
});
