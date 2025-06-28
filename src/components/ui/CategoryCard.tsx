// components/CategoryCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

type CategoryCardProps = {
  index: number;
  title: string;
  subtitle?: string;
  image: string;
  onPress?: () => void;
};

const backgroundColors = [
  'rgba(83, 177, 117, 0.2)',
  'rgba(248, 164, 76, 0.2)',
  'rgba(247, 165, 147, 0.2)',
  'rgba(211, 176, 224, 0.2)',
];

const borderColors = [
  '#53B175',
  '#F8A44C',
  '#F7A593',
  '#D3B0E0',
];

const CategoryCard: React.FC<CategoryCardProps> = ({ index, title, subtitle, image, onPress }) => {
  const bgColor = backgroundColors[index % backgroundColors.length];
  const borderColor = borderColors[index % borderColors.length];

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: bgColor, borderColor }]} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 200,
    width: 180,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
    borderRadius: 30,
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

export default CategoryCard;
