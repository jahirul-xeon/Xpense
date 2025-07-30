import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Linking, Image, Platform } from 'react-native';
import React, { useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';

interface Company {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  totalEmployees: number;
  present: number;
  absent: number;
  isClosedToday: boolean;
}

export default function AttendancePointMap() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const { width, height } = Dimensions.get('window');

  const companies: Company[] = [
    {
      id: 'c1',
      name: 'Tech Innovators Ltd',
      latitude: 23.7529,
      longitude: 90.3907,
      totalEmployees: 50,
      present: 42,
      absent: 8,
      isClosedToday: false,
    },
    {
      id: 'c2',
      name: 'Dhaka Softwares',
      latitude: 23.7353,
      longitude: 90.3929,
      totalEmployees: 35,
      present: 30,
      absent: 5,
      isClosedToday: true,
    },
    {
      id: 'c3',
      name: 'NextGen Solutions',
      latitude: 23.7617,
      longitude: 90.3730,
      totalEmployees: 60,
      present: 55,
      absent: 5,
      isClosedToday: false,
    },
    {
      id: 'c4',
      name: 'Urban DataWorks',
      latitude: 23.7512,
      longitude: 90.4035,
      totalEmployees: 28,
      present: 25,
      absent: 3,
      isClosedToday: false,
    },
    {
      id: 'c5',
      name: 'CodeCraft Limited',
      latitude: 23.7495,
      longitude: 90.3852,
      totalEmployees: 40,
      present: 0,
      absent: 0,
      isClosedToday: true,
    },
    {
      id: 'c6',
      name: 'Skyline AI Systems',
      latitude: 23.7450,
      longitude: 90.3950,
      totalEmployees: 65,
      present: 60,
      absent: 5,
      isClosedToday: false,
    },
    {
      id: 'c7',
      name: 'Binary Bridge',
      latitude: 23.7408,
      longitude: 90.4101,
      totalEmployees: 20,
      present: 18,
      absent: 2,
      isClosedToday: false,
    },
    {
      id: 'c8',
      name: 'Pixel Dynamics',
      latitude: 23.7433,
      longitude: 90.3874,
      totalEmployees: 45,
      present: 44,
      absent: 1,
      isClosedToday: false,
    },
    {
      id: 'c9',
      name: 'LogicWave Ltd',
      latitude: 23.7601,
      longitude: 90.3999,
      totalEmployees: 38,
      present: 32,
      absent: 6,
      isClosedToday: false,
    },
    {
      id: 'c10',
      name: 'Quantum Core Solutions',
      latitude: 23.7544,
      longitude: 90.3777,
      totalEmployees: 70,
      present: 0,
      absent: 0,
      isClosedToday: true,
    },
  ];
  const handleMarkerPress = (company: Company) => {
    setSelectedCompany(company);
    Animated.spring(slideAnim, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };

  const closeDetail = () => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 0,
    }).start(() => setSelectedCompany(null));
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const openDirections = (company: Company) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${company.latitude},${company.longitude}`;
    Linking.openURL(url).catch(err => console.error("Failed to open directions:", err));
  };

  const getMarkerDetails = (company: Company) => {
    if (company.isClosedToday) {
      return {
        color: 'red',
        icon: 'block',
        text: 'Closed'
      };
    }

    const percentage = (company.present / company.totalEmployees) * 100;

    if (percentage >= 90) return {
      color: '#4CAF50',
      icon: 'check',
      text: 'Excellent'
    };
    if (percentage >= 75) return {
      color: '#2196F3',
      icon: 'thumb-up',
      text: 'Good'
    };
    if (percentage >= 50) return {
      color: '#FFC107',
      icon: 'warning',
      text: 'Average'
    };
    return {
      color: '#F44336',
      icon: 'error',
      text: 'Poor'
    };
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 23.75,
          longitude: 90.39,
          latitudeDelta: 0.05, 
          longitudeDelta: 0.05,
        }}
        provider="google"
        showsUserLocation={true}
        showsMyLocationButton={true}
         mapType={Platform.OS == "android" ? "none" : "standard"}
      >
        {companies.map(company => (
          <Marker
            key={company.id}
            coordinate={{
              latitude: company.latitude,
              longitude: company.longitude,
            }}
            pinColor={company.isClosedToday ? 'red' : 'green'}
            onPress={() => handleMarkerPress(company)}
          >
            <View style={styles.customMarkerContainer}>
              <Image
                source={{ uri: `https://cdn4.iconfinder.com/data/icons/placeholder-4/64/wifi-internet-maps-location-placeholder-pin-256.png` }}
                style={styles.customMarkerImage}
                onError={(error) => console.error("Image loading error:", error.nativeEvent.error)}
              />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{company.name}</Text>

            </View>
          </Marker>
        ))}
      </MapView>

      {selectedCompany && (
        <Animated.View
          style={[
            styles.detailContainer,
            { transform: [{ translateY }] }
          ]}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeDetail}
            activeOpacity={0.7}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>

          <Text style={styles.companyName}>{selectedCompany.name}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total Employees:</Text>
            <Text style={styles.infoValue}>{selectedCompany.totalEmployees}</Text>
          </View>

          {selectedCompany.isClosedToday ? (
            <Text style={styles.closedText}>Closed Today</Text>
          ) : (
            <>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Present:</Text>
                <Text style={styles.presentText}>{selectedCompany.present}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Absent:</Text>
                <Text style={styles.absentText}>{selectedCompany.absent}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Attendance:</Text>
                <Text style={styles.percentageText}>
                  {((selectedCompany.present / selectedCompany.totalEmployees) * 100).toFixed(1)}%
                </Text>
              </View>
            </>
          )}

          <TouchableOpacity
            style={styles.directionButton}
            onPress={() => openDirections(selectedCompany)}
            activeOpacity={0.7}
          >
            <Text style={styles.directionButtonText}>Get Directions</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  detailContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  presentText: {
    color: 'green',
    fontSize: 16,
    fontWeight: '500',
  },
  absentText: {
    color: 'red',
    fontSize: 16,
    fontWeight: '500',
  },
  closedText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  percentageText: {
    color: '#2c3e50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  directionButton: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    alignItems: 'center',
    marginBottom: 20
  },
  directionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  customMarkerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  customMarkerImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  markerLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
});