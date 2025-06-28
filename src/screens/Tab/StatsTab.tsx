import { View, Text, SafeAreaView, ScrollView, Image, Dimensions, FlatList, StyleProp, ViewStyle, ActivityIndicator } from 'react-native'
import React, { useMemo, useState } from 'react'
import SearchBar from '../../components/Common/SearchBar'
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { green } from 'react-native-reanimated/lib/typescript/Colors';
import BannerSlider from '../../components/ui/BannerSlider';
import ProductCard from '../../components/ui/ProductCard';
import { demoProducts } from '../../constants/demoProduct';
import ProductViewCard from '../../components/ui/MiniProductCard';
import { miniProductDemoData } from '../../constants/miniProductDemo';
import MiniProductCard from '../../components/ui/MiniProductCard';
import CategoryCard from '../../components/ui/CategoryCard';

export default function ExploreTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const { width, height } = Dimensions.get('window');
  const [loading, setLoading] = useState(false);

  const handleSearch = (text: string) => {
    setLoading(true);
    setSearchQuery(text);

    setTimeout(() => {
      setLoading(false);
    }, 300);
  };



  const logoWidth = width * 0.115;
  const logoHeight = height * 0.062;


  const filteredUsers = useMemo(() => {

    let filtered = miniProductDemoData;

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery]);

  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: "white", justifyContent: "flex-start" }}>
      <View style={{ width: "100%", height: "20%", alignItems: "center", justifyContent: 'center', marginTop: "10%", backgroundColor: "white" }}>
        <View style={{ flexDirection: "row", gap: 4, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Find Products</Text>
        </View>
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search Products.."
          style={{ backgroundColor: "#F2F3F2", width: "90%", marginTop: 20, marginBottom: 20, height: 60, borderRadius: 20, borderWidth: 0 }}
        />
      </View>
      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#53B175" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
            contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
            renderItem={({ item, index }) => (
              <CategoryCard
                image={item.image}
                title={item.name}
                index={index}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

    </View>
  )
}