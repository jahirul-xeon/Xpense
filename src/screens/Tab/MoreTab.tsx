import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { demoProducts } from '../../constants/demoProduct'
import ProductCard from '../../components/ui/ProductCard'

export default function MoreTab() {
  return (
    <View style={{flex:1}}>
      <FlatList
        data={demoProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
        renderItem={({ item , index}) => (
          <ProductCard
            image={item.image}
            name={item.name}
            description={item.description}
            price={item.price}
            onAddToCart={() => console.log(`Added ${item.name}`)}
            index={index}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}