import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../Context/CartContext';
import LottieView from 'lottie-react-native';

export default function CartScreen() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * (item.quantity || 1), 0);

  return (
    <View style={{ flex: 1, padding: 16, marginTop: "10%" }}>
      <Text style={styles.header}>My Cart</Text>
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <LottieView
            source={require('../../assets/cart-lottie.json')}
            autoPlay
            loop={true}
            style={{ width: 150, height: 150 }}
          />
          <Text style={styles.emptyText}>Your cart is empty🥹</Text>
        </View>
      ) : (<FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <View style={styles.qtyRow}>
                <TouchableOpacity onPress={() => decreaseQty(item.id)} style={styles.addButton}>
                  <Ionicons name="remove" size={24} color="gray" />
                </TouchableOpacity>
                <Text style={{ marginHorizontal: 8 }}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => increaseQty(item.id)} style={styles.addButton}>
                  <Ionicons name="add" size={20} color="#489E67" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <Ionicons name="close" size={20} color="#ccc" />
              </TouchableOpacity>
              <Text style={styles.price}>${(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}</Text>
            </View>
          </View>
        )}
      />
      )}
      {cart.length > 0 &&
        (<View style={styles.footer}>
          <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
          <TouchableOpacity style={styles.checkoutBtn}>
            <Text style={styles.checkoutText}>Go to Checkout</Text>
          </TouchableOpacity>
        </View>)}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, alignSelf: "center" },
  itemRow: { flexDirection: 'row', marginBottom: 16, alignItems: 'center' },
  image: { width: 60, height: 60, borderRadius: 10 },
  name: { fontWeight: 'bold' },
  desc: { color: '#666' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  price: { marginTop: 10, fontWeight: 'bold', fontSize: 16 },
  footer: { marginTop: 20 },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  checkoutBtn: {
    backgroundColor: '#53B175',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    fontStyle: 'italic',
  },
});
