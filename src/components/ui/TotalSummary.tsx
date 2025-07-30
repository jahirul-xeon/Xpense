import React from 'react';
import { View, Text } from 'react-native';
import { numberCommaSeparated, toMoney } from '../../utils/utils';

interface IncomeExpenseCardProps {
  income: number;
  expense: number;
}

const IncomeExpenseCard: React.FC<IncomeExpenseCardProps> = ({ income, expense }) => {
  const netTotal = income - expense;

  return (
    <>
      <View style={{
        backgroundColor: '#fff',
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 30,
        alignItems: 'center',
      }}>

        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'black', fontWeight: 'normal', fontSize: 12 }}>Income</Text>
          <Text style={{ color: '#00b4e9', fontWeight: "500" }}>{toMoney(income, true)}</Text>
        </View>

        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'black', fontWeight: 'normal', fontSize: 12 }}>Exp.</Text>
          <Text style={{ color: '#f55959', fontWeight: "500" }}>{toMoney(expense, true)}</Text>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'normal', color: "black", fontSize: 12 }}>Net Total</Text>
          <Text style={{ fontWeight: '500', color: netTotal >= 0 ? 'black' : 'red' }}>
            {toMoney(netTotal, true)}
          </Text>
        </View>
      </View>
      <View style={{ width: "100%", height: 1, backgroundColor: "#ececec" }} />
    </>

  );
};

export default IncomeExpenseCard;
