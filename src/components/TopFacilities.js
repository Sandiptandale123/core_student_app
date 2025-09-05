import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
const facilities = [
    { id: '1', title: 'Park', icon: require('../assets/facility_icons/park.png') },
    { id: '2', title: 'Gated Community', icon: require('../assets/facility_icons/gated_community.png') },
    { id: '3', title: 'Paved Compound', icon: require('../assets/facility_icons/paved_compound.png') },
    { id: '4', title: 'CCTV Camera Security', icon: require('../assets/facility_icons/cctv_camera_security.png') },
    { id: '5', title: '24x7 Security', icon: require('../assets/facility_icons/security_24x7.png') },
    { id: '6', title: 'Toilet for Drivers', icon: require('../assets/facility_icons/toilet_for_drivers.png') },
    { id: '7', title: 'Lifts', icon: require('../assets/facility_icons/lift.png') },
    { id: '8', title: 'Property Staff', icon: require('../assets/facility_icons/property_staff.png') },
    { id: '9', title: 'Entrance Lobby', icon: require('../assets/facility_icons/entrance_lobby.png') },
];

const TopFacilities = ({ navigation }) => {
    const FacilityCard = ({ item }) => (
        <View style={styles.facilityCard}>
            <Image source={item.icon} style={styles.icon} resizeMode="contain" />
            <Text style={styles.facilityText}>{item.title}</Text>
        </View>
    );

    return (
        <View style={{ margin: 16 }}>
            <View style={styles.header}>
                <Text style={styles.title}>Top Facilities</Text>
                {/* <TouchableOpacity>
                    <Text style={styles.viewAll}>View All (14)</Text>
                </TouchableOpacity> */}
            </View>

            <Text style={styles.description}>
                Ideal Towers Kolhapur presents an exclusive opportunity to own a stunning home that offers
                all kinds of amenities and facilities. This includes a park, gated community, and easy access
                to paved compound...
            </Text>

            <FlatList
                data={facilities}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <FacilityCard item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 10 }}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1b1b1f',
    },
    viewAll: {
        color: '#007aff',
        fontWeight: '600',
        fontSize: 14,
    },
    description: {
        color: '#777',
        fontSize: 14,
        marginTop: 8,
        textAlign: 'justify'
    },
    facilityCard: {
        width: 90,
        height: 90,
        marginRight: 10,
        backgroundColor: '#fefefe',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 36,
        height: 36,
        marginBottom: 5,
    },
    facilityText: {
        fontSize: 12,
        textAlign: 'center',
        color: '#333',
    },
});

export default TopFacilities;