import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Image, ActivityIndicator, Text } from 'react-native';
import * as SplashScreenAPI from 'expo-splash-screen';
import { ScreenName } from '../constants/screen.data';

export default function SplashScreen({ navigation }: any) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
            }),
        ]).start(async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            await SplashScreenAPI.hideAsync();
            navigation.replace(ScreenName.BOTTOM_TAB);
        });
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../assets/logo/logoX.png')}
                style={[
                    styles.logo,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
                resizeMode="contain"
            />
            <Text style={{ color: 'white', fontSize: 24 }}>Xpense</Text>
            <ActivityIndicator color={"white"} style={{alignSelf:"center", marginTop:10}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#55847A',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        backgroundColor: 'transparent',
    },
});
