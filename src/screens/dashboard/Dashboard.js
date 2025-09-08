import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image, Pressable
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel from '../../components/Carousel/Carousel';
import CustomHeader from '../../components/CustomHeader'; // 👈 Adjust path as needed
import { carouselData } from '../../utils/carousel/carouselData';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / numColumns - 30;


const Dashboard = ({ navigation }) => {
  const [studentInfo, setStudentInfo] = useState(null);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('studentInfo');
        if (storedUser) {
          setStudentInfo(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log("Error loading studentInfo:", error);
      }
    };
    getUserData();
  }, []);
  const carouselData = [
    { image: require("../../assets/carousel1.jpg") },
    { image: require("../../assets/faculty2.jpg") },
    { image: require("../../assets/faculty3.jpg") }
  ];
  const dashboardItems = [
    // { id: '1', title: 'Class Schedule', icon: require('../../assets/class_schedule_icon.png'), color: '#1976D2' },
    { id: '1', title: 'Profile', icon: require('../../assets/icon_profile.png'), color: '#4CAF50' },
    { id: '2', title: 'Payment List', icon: require('../../assets/exam_results.png'), color: '#2196F3'  },
    // { id: '4', title: 'Profile', icon: require('../../../assets/icon_profile.png'), color: '#2196F3' },
    // { id: '5', title: 'Test Exam Report', icon: 'document-text-outline', color: '#FFB300' },
    // { id: '6', title: 'LMS Report', icon: 'bar-chart-outline', color: '#009688' },
  ];
  const renderItem = ({ item }) => (
    <Pressable style={({ pressed }) => [
      styles.itemContainer,
      pressed && { opacity: 0.6 }
    ]}
      onPress={() => {
        if (item.id == 1) {
          navigation.navigate('ProfileScreen', { studentInfo: studentInfo });
        } else if (item.id == 2) {
          navigation.navigate('PaymentListScreen', { studentInfo: studentInfo });
        }
        // else if (item.id == 3) {
        //   navigation.navigate('MarksEntryScreen')
        // } else if (item.id == 4) {
        //   navigation.navigate('ProfileScreen')
        // }
        else {
          navigation.navigate('Home')
        }
      }}>
      <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
        {/* <Icon name={item.icon} size={30} color="#fff" /> */}
        <Image
          resizeMode="cover"
          source={item.icon}
          style={styles.image}
          pointerEvents="none"
        />

      </View>
      <Text style={styles.label}>{item.title}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* <View style={{ padding: 0, marginTop: 5 }}>
        <Carousel data={carouselData} />
      </View> */}
      <FlatList
        data={dashboardItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-around' }}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f5f9',
  },
  headerTextContainer: {
    padding: 20,
    marginLeft: 10,
  },
  updateText: {
    fontSize: 16,
    color: '#4F4F4F',
    fontFamily: 'Montserrat-Medium',
  },
  subText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  image: {
    width: '70%',
    height: '70%',
    tintColor: 'white'
  },
  cardContainer: {
    paddingHorizontal: 15,
    paddingBottom: 30,
    gap: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    margin: 7,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  iconWrapper: {
    backgroundColor: '#f1f3f6',
    borderRadius: 50,
    padding: 10,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  cardTitle: {
    color: '#888',
    fontSize: 14,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 4,
  },
  itemContainer: {
    alignItems: 'center',
    flex: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'Montserrat-Bold',
  },
});
