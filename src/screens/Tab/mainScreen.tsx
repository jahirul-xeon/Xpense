import { View, Text, ScrollView, Image, Dimensions, FlatList, StyleProp, ViewStyle, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import SearchBar from '../../components/Common/SearchBar'
import { AntDesign, EvilIcons, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { green } from 'react-native-reanimated/lib/typescript/Colors';
import { useCart } from '../../Context/CartContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import UpperTab from '../../navigation/UpperTab';

export default function MainTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const { width, height } = Dimensions.get('window');

  const { addToCart } = useCart();
  const logoWidth = width * 0.115;
  const logoHeight = height * 0.062;

  type User = {
    id: string;
    name: string;
  };

  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
    }]

  const filteredUsers = useMemo(() => {

    let filtered = users;

    if (searchQuery) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery]);

  const bannerImages = [
    { uri: 'https://static.vecteezy.com/system/resources/previews/032/018/645/non_2x/red-caviar-with-seafood-parsley-and-lime-slices-photo.jpg' },
    { uri: 'https://static.vecteezy.com/system/resources/previews/013/757/778/non_2x/mexican-food-delicious-tacos-photo.jpg' },

  ];
  const tabOptions = ['Daily', 'Calendar', 'Monthly', 'Summary', 'Description'];
  const [activeTab, setActiveTab] = useState('Daily');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const animatedValues = useRef(
    tabOptions.map((_, index) => new Animated.Value(index === 0 ? 1 : 0.5))
  ).current;

  const animateTabs = (newIndex: number) => {
    animatedValues.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: index === newIndex ? 1 : 0.5,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
    setActiveTab(tabOptions[newIndex]);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{  backgroundColor: '#53B175', width: width }}>
        <SafeAreaView>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#53B175', margin: 10 }}>
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
          <View style={{ height: height/20, alignItems: 'center', justifyContent: 'center', width: width,paddingHorizontal:10}}>
            <Text style={{ fontSize: 14, color: 'white', }}>
              Jun 2025
            </Text>
          </View>
          <View style={{ height: height,}}>
            <UpperTab />
          </View>
        </SafeAreaView>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: 'white',
  },
  tabText: {
    fontSize: 14,
    color: 'white',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'semibold',
  },
  content: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  contentText: {
    fontSize: 18,
    color: '#333',
  },

});