import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderLeft = ({ navigation }) => {

    const toggleCustomDrawer = () => {
        console.log(navigation, 'navigation')
        navigation.toggleDrawer();
    }

    return (
        <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity style={{ alignContent: 'center', alignItems: 'center', marginLeft: 27, height: 32, width: 32 }} onPress={() => toggleCustomDrawer()} >
                <Icon name="menu" size={32} color={'#FFFFFF'} />
            </TouchableOpacity>
        </View>
    );
}
export default HeaderLeft;