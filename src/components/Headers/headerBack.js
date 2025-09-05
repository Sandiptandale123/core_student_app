import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderBack = (props) => {
    const { navigation, popCount = 1 } = props;

    const toggleCustomDrawer = () => {
        navigation.goBack();

    }
    return (

        <TouchableOpacity onPress={() => toggleCustomDrawer()} style={{ padding: 5, flexDirection: 'row', justifyContent: 'center' }}>

            <View style={{ alignContent: 'center', }}>

                <Icon
                    name={"arrow-back"}
                    size={25}
                    color="#333333"
                />
            </View>

        </TouchableOpacity>

    )
}

// export default HeaderBack;
export default HeaderBack;