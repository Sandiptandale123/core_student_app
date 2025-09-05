import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/colors';
import { TextInput as PaperTextInput } from 'react-native-paper';
const studentNames = [
  'Prajesh Shakya',
  'Anjali Verma',
  'Rohit Sharma',
  'Neha Patil',
  'Amit Kumar',
  'Sneha Gupta',
  'Saurabh Yadav',
  'Kavita Joshi',
  'Vikas Mehta',
  'Pooja Singh',
  'Rahul Chauhan',
  'Divya Desai',
];

const initialStudents = studentNames.map((name, index) => ({
  id: index.toString(),
  name,
  status: index % 2 === 0 ? 'present' : 'absent',
}));


const CheckStudentAttendanceScreen = props => {
  const { navigation } = props;
  const [students, setStudents] = useState(initialStudents);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleStatus = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? { ...student, status: student.status === 'present' ? 'absent' : 'present' }
          : student
      )
    );
  };
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => {
    const isPresent = item.status === 'present';

    return (
      <View style={styles.row}>
        <Text style={[styles.name, { flex: 1, borderRightWidth: 1, borderColor: '#ddd', padding: 10 }]}>{item.name}</Text>
        <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center', }}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              { backgroundColor: isPresent ? '#4CAF50' : '#F44336', }, // green / red
            ]}
            onPress={() => toggleStatus(item.id)}
          >
            <Icon
              name={isPresent ? 'checkmark' : 'close'}
              size={18}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Row */}
      <PaperTextInput
        mode="outlined"
        placeholder="Search Student"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
        right={<PaperTextInput.Icon icon="magnify" color={colors.themeColor} />}
        theme={{
          colors: {
            primary: colors.themeColor,
            outline: colors.lightGrey,// lighter outline makes it appear thinner
          },
        }}
      />

      {/* Search Bar */}
      <View style={styles.headerRow}>
        <Text style={[styles.headerText, { flex: 1, borderRightWidth: 1, borderColor: '#ddd', padding: 10 }]}>Student Name</Text>
        <Text style={[styles.headerText, { flex: 0.3, textAlign: 'center', }]}>Status</Text>
      </View>

      {/* Student List */}
      <View style={{ flex: 1, marginBottom: 60 }}>
        <FlatList
          data={filteredStudents}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </View>
      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={() => {
        console.log(students)
        navigation.navigate('Home');
      }}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CheckStudentAttendanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#87CEEB',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center', alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
    flex: 1,
    textAlign: 'left',
  },
  searchInput: {
    marginVertical: 20,
    height: 50,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderColor: '#ddd',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1
  },
  name: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
    flex: 1,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4CAF50',
    marginHorizontal: 20,
  },
  selectedCircle: {
    backgroundColor: '#4CAF50',
  },
  saveButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: colors.themeColor,
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: '60%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveText: {
    color: '#ffffff',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginHorizontal: 10,
  },
});
