import { View, Text, ScrollView, Image, Dimensions, FlatList, StyleProp, ViewStyle, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import SearchBar from '../../components/Common/SearchBar'
import { AntDesign, EvilIcons, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { green } from 'react-native-reanimated/lib/typescript/Colors';
import { useCart } from '../../Context/CartContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import UpperTab from '../../navigation/UpperTab';
import MonthYearPicker from '../../components/Common/Calendar';
import AddIcon from '../../components/ui/AddIcon';


export default function MainTab() {
  const { width, height } = Dimensions.get('window');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ backgroundColor: '#53B175', width: width }}>
        <SafeAreaView>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#53B175', margin: 10 }}>
            <TouchableOpacity>
              <EvilIcons name="search" size={30} color="white" />
            </TouchableOpacity>
            <View>
              <Text style={{ fontSize: 18, color: 'white' }}  >
                Trans.
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 20 }}>
              <TouchableOpacity>
                <AntDesign name="staro" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="options-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <MonthYearPicker onDateChange={(date: any) => setSelectedDate(date)} />
          <View style={{ height: height, }}>
            <UpperTab selectedDate={selectedDate} />
          </View>
        </SafeAreaView>
      </View>
      <AddIcon />
    </View>
  )
}
const styles = StyleSheet.create({

});