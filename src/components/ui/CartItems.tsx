import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useCart } from '../../Context/CartContext';
import { Ionicons } from '@expo/vector-icons';

const CartItems = () => {
    const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

    const renderItem = ({ item }: any) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
            <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>${parseFloat(item.price).toFixed(2)}</Text>
                <View style={styles.controls}>
                    <TouchableOpacity onPress={() => decreaseQty(item.id)} style={styles.qtyBtn}>
                        <Ionicons name="remove" size={18} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => increaseQty(item.id)} style={styles.qtyBtn}>
                        <Ionicons name="add" size={18} color="#489E67" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeBtn}>
                    <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (cart.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Your cart is empty.</Text>
            </View>
        );
    }

    return (
        <View style={{flex:1, }}>
            <FlatList
                data={cart}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.container}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    card: {
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    details: {
        marginLeft: 12,
        flex: 1,
        justifyContent: 'space-between',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    description: {
        color: '#777',
        fontSize: 12,
        marginVertical: 4,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#53B175',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    qtyBtn: {
        backgroundColor: '#53B175',
        borderRadius: 6,
        padding: 6,
        marginHorizontal: 8,
    },
    quantity: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    removeBtn: {
        marginTop: 8,
    },
    removeText: {
        color: '#F55',
        fontSize: 12,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: 'red',
    },
});

export default CartItems;
