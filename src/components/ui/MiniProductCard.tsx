import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';

type MiniProductCardProps = {
  image: string;
  name: string;
  layout?: 'square' | 'rectangle';
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  index?: number; // <-- added for color rotation
};

const cardColors = ['#53B175', '#F8A44C', '#F7A593', '#D3B0E0'];

const MiniProductCard: React.FC<MiniProductCardProps> = ({
  image,
  name,
  layout = 'square',
  onPress,
  containerStyle,
  index = 0,
}) => {
  const isSquare = layout === 'square';
  const backgroundColor = cardColors[index % cardColors.length];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.card,
        isSquare ? styles.square : styles.rectangle,
        { backgroundColor },
        containerStyle,
      ]}
    >
      <Image
        source={{ uri: image }}
        style={[styles.image, isSquare ? styles.imageSquare : styles.imageRect]}
        resizeMode="cover"
      />
      <Text style={styles.name} numberOfLines={2}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default MiniProductCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    padding: 20,
    alignItems: 'center',
  },
  square: {
    width: 140,
    height: 160,
    flexDirection: 'column',
  },
  rectangle: {
    width: 250,
    height: 100,
    flexDirection: 'row',
  },
  image: {
    borderRadius: 12,
    backgroundColor:"transfarent"
  },
  imageSquare: {
    width: '100%',
    height: 90,
    marginBottom: 8,
  },
  imageRect: {
    width: 80,
    height: 80,
    marginRight: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff', // white text for contrast
    textAlign: 'center',
    flexShrink: 1,
  },
});
