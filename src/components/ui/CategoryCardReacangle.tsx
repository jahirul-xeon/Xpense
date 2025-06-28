// components/CategoryCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

type CategoryCardProps = {
  index: number;
  title: string;
  subtitle?: string;
  image: string; // Use `ImageSourcePropType` if you're using static assets
  onPress?: () => void;
};

const backgroundColors = [
  'rgba(83, 177, 117, 0.2)',  // #53B175 with 20% opacity
  'rgba(248, 164, 76, 0.2)',  // #F8A44C
  'rgba(247, 165, 147, 0.2)', // #F7A593
  'rgba(211, 176, 224, 0.2)', // #D3B0E0
];

const borderColors = [
  '#53B175',
  '#F8A44C',
  '#F7A593',
  '#D3B0E0',
];

const CategoryCardReacangle: React.FC<CategoryCardProps> = ({ index, title, subtitle, image, onPress }) => {
  const bgColor = backgroundColors[index % backgroundColors.length];
  const borderColor = borderColors[index % borderColors.length];

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: bgColor, borderColor , flexDirection:"row"}]} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height:100,
    width:250,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap:30,
    margin: 8,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 8,
    borderRadius: 30,
    padding:10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
});

export default CategoryCardReacangle;
