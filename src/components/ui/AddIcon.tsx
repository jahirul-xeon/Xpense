import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default function AddIcon() {
    return (
        <TouchableOpacity style={styles.fab} activeOpacity={0.9}>
            <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    fab: {
        backgroundColor: "#53B175",
        padding: height * 0.01,
        borderRadius: width * 0.125,
        alignItems: 'center',
        justifyContent: 'center',
        height: width * 0.13,
        width: width * 0.13,
        position: "absolute",
        right: width * 0.03,
        bottom: height * 0.03,
        elevation: 5, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    }
});
