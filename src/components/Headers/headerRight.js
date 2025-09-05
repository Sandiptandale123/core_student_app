import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/Ionicons';
const HeaderRight = ({ navigation }) => {

    const toggleCustomDrawer = () => {
        navigation.toggleDrawer();
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => toggleCustomDrawer()} >
                <View style={{ marginRight: 20, width: 35, height: 35, padding: 5, backgroundColor: 'white', borderRadius: 40 / 2, justifyContent: 'center' }}>
                    {/* <Image
                        style={{ width: '100%', height: '100%' }}
                        source={require('../../assets/notification-bell.png')}
                    /> */}
                    <View style={{ alignContent: 'center', marginBottom: 10, marginTop: 10 }}>
                        <Icon name="ios-notifications" size={30} color="black" />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}
export default HeaderRight;