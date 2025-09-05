import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const HeaderChat = (props) => {

    const { navigation } = props;

    return (
        <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1 }}>
                    <Text style={{ flex: 1, fontSize: 16, alignSelf: 'flex-start', color: 'black', fontWeight: 'bold' }}>{props.title}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    // navigation.navigate('PostTask1');
                }} style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1 }}>
                    <Text style={{ flex: 1, fontSize: 16, textAlign: 'right', color: 'black', fontWeight: 'bold' }}>$100</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}>
                <Text style={{ flex: 3, fontSize: 16, textAlign: 'left', color: '#4c6992', fontWeight: 'bold' }}>Offer :$85</Text>
                <View style={{ flexDirection: 'row', flex: 1, backgroundColor: '#69c4ff', paddingHorizontal: 10, paddingVertical: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                    <Icon name="ios-thumbs-up" size={30} color={'#ffffff'} />
                    <Text style={{
                        fontSize: 12, textAlign: 'center', color: 'white', fontWeight: 'bold',
                        paddingHorizontal: 5

                    }}>ACCEPT</Text>
                </View>
            </View>

        </View>

    )
}

export default HeaderChat;