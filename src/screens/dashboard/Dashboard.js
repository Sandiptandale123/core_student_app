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
import CustomHeader from '../../components/CustomHeader'; // 👈 Adjust path as needed
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
  const [menuList1, setMenuList] = useState([]);

  useEffect(() => {
    if (studentInfo) {
      const sysProgList = studentInfo?.sysModList?.[0]?.sysSubModList?.[0]?.sysProgList;
      setMenuList(sysProgList || []);
    }
  }, [studentInfo]);

  const dashboardColors = [
    '#4CAF50',
    '#2196F3',
    '#9C27B0',
    '#ff99dd',
    '#ff4700'
  ];

  const renderItem = ({ item, index }) => (
    <Pressable style={({ pressed }) => [
      styles.itemContainer,
      pressed && { opacity: 0.6 }
    ]}
      onPress={() => {
        if (item.sysProgID === 9579) {
          navigation.navigate('ProfileScreen', { studentInfo: studentInfo });
          navigation.closeDrawer();
        } else if (item.sysProgID === 9575) {
          navigation.navigate('PaymentListScreen', { studentInfo: studentInfo });
        } else if (item.sysProgID === 16076) {
          navigation.navigate('ClassTimetableScreen', { studentInfo: studentInfo });
        } else if (item.sysProgID === 16077) {
          navigation.navigate('MonthlyAttendanceScreen', { studentInfo: studentInfo });
        } else if (item.sysProgID === 16079) {
          navigation.navigate('ExamTimetableScreen', { studentInfo: studentInfo });
        }else if (item.sysProgID === 16080) {
          navigation.navigate('AcademicCalendarScreen', { studentInfo: studentInfo });
        }else if (item.sysProgID === 16081) {
          navigation.navigate('HolidayListScreen', { studentInfo: studentInfo });
        }
        else {
          navigation.navigate('Home')
        }
      }}>
      <View style={[styles.iconCircle, { backgroundColor: dashboardColors[index % dashboardColors.length] }]}>
        {/* <Icon name={item.icon} size={30} color="#fff" /> */}
        <Image
          resizeMode="cover"
          // source={item.icon}
          source={require('../../assets/icon_profile.png')}
          style={[styles.image, { tintColor: 'white' }]}
          pointerEvents="none"
        />

      </View>
      <Text style={styles.label}>{item.sysProgName}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={menuList1}
        keyExtractor={(item, index) => String(item.sysProgID ?? index)} // fallback भी रखा
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-around' }}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item, index }) => renderItem({ item, index })}
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
