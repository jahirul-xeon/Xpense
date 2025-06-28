import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  View,
  ViewStyle,
  ImageStyle,
  StyleProp,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width: screenWidth } = Dimensions.get('window');

type BannerSliderProps = {
  images: any[];
  height?: number;
  borderRadius?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showGap?: boolean;
  imageStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  loop?: boolean;
};

const BannerSlider: React.FC<BannerSliderProps> = ({
  images,
  height = 200,
  borderRadius = 10,
  autoPlay = true,
  autoPlayInterval = 3000,
  showGap = true,
  imageStyle,
  containerStyle,
  loop = true,
}) => {
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});

  const handleLoadStart = (index: number) => {
    setLoadingStates((prev) => ({ ...prev, [index]: true }));
  };

  const handleLoadEnd = (index: number) => {
    setLoadingStates((prev) => ({ ...prev, [index]: false }));
  };

  return (
    <View style={[{ width: screenWidth, alignItems: 'center' }, containerStyle]}>
      <Carousel
        loop={loop}
        autoPlay={autoPlay}
        autoPlayInterval={autoPlayInterval}
        width={screenWidth}
        height={height}
        data={images}
        scrollAnimationDuration={1000}
        style={{ flexGrow: 0 }}
        renderItem={({ item, index }) => (
          <View style={styles.imageContainer}>
            {loadingStates[index] && (
              <ActivityIndicator style={styles.loader} size="large" color="#888" />
            )}
            <Image
              source={item}
              onLoadStart={() => handleLoadStart(index)}
              onLoadEnd={() => handleLoadEnd(index)}
              style={[
                {
                  width: screenWidth - (showGap ? 40 : 0),
                  height,
                  borderRadius,
                  alignSelf: 'center',
                },
                imageStyle,
              ]}
              resizeMode="cover"
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    zIndex: 1,
  },
});

export default BannerSlider;
