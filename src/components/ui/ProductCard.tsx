import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../Context/CartContext';
import Toast from 'react-native-toast-message';


const borderColors = [
  '#53B175',
  '#F8A44C',
  '#F7A593',
  '#D3B0E0',
];

type ProductCardProps = {
  id?: string;         // string and required
  image: string;
  name: string;
  description: string;
  price: string;
  index: number;      // also required for your color logic
  onAddToCart?: () => void;
};


const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  description,
  price,
  index,
  onAddToCart,
}) => {
  const { addToCart } = useCart();

  const borderColor = borderColors[index % borderColors.length];

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart();
    } else {
      if (!id || !name || !image || !description || !price) {
        return;
      }
      addToCart({ id, name, image, description, price });
      Toast.show({
        type: 'success',
        text1: `${name} added to cart`,
        visibilityTime: 1500,
        position: 'top',
      });
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: "#fff", borderColor, borderWidth: 1 }]}>
      <Image source={{ uri: image }} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>${price}</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: 170,
    borderRadius: 20,
    padding: 16,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  productImage: {
    width: '100%',
    height: 100,
    alignSelf: 'center',
    borderRadius: 20,
  },
  name: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#181725',
  },
  description: {
    fontSize: 14,
    color: '#7C7C7C',
    marginVertical: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
  },
  addButton: {
    backgroundColor: '#53B175',
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
