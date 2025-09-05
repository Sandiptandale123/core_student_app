import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput as PaperTextInput, Switch } from 'react-native-paper';
import colors from '../../utils/colors';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../components/Loader/Loader';
import Api from '../../utils/Api';
import moment from 'moment';
import SuccessModal from '../../components/Modals/successModel';
import ForgotPasswordModal from '../../components/Modals/ForgotPasswordModal';
import { getStudentDetailForMarksEntry } from '../../utils/serviceApi'; // 👈 service import
import SubmitButtonWarningModal from '../../components/Modals/SubmitButtonWarningModal';
const MarksEntryScreen = props => {
    const { navigation, route } = props;
    const { itemData, facultyInfo, showLoader, attendanceDate } = route.params;
    const [attendanceDate1, setAttendanceDate1] = useState(new Date());
    //console.log("Got Date:", attendanceDate1);
    const [viewMode, setViewMode] = useState('prn');
    const [originalStudentList, setOriginalStudentList] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [orderByPRN, setOrderByPRN] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [showErorMsg, setErrorMsg] = useState('');
    const [showModalMsg, setModalMsg] = useState('');
    const [showSubmitModalMsg, setSubmitModalMsg] = useState('');
    const [loader, setLoader] = useState(showLoader || false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (showLoader) {
            setLoader(true);
            const timer = setTimeout(() => {
                setLoader(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showLoader]);

    const toggleStatus = (studentID) => {
        setStudentList((prevList) => {
            return prevList.map(student => {
                if (student.studentID === studentID) {
                    return {
                        ...student,
                        attendanceStatus: student.attendanceStatus === 'P' ? 'A' : 'P'
                    };
                }
                return student;
            });
        });
    };

    useEffect(() => {
        loadFacultySubjects();
    }, []);
    // ✅ local sorting effect
    useEffect(() => {
        if (originalStudentList && originalStudentList.length > 0) {
            setLoader(true);
            setTimeout(() => {   // delay de rahe hai, taaki UI smooth lage
                let sortedData = [...originalStudentList];

                if (orderByPRN === 2) {
                    sortedData.sort((a, b) => a.studentName.localeCompare(b.studentName));
                }
                setStudentList(sortedData);
                setHasAnyInputChanged(false); // Reset flag after sorting
                setLoader(false); // sorting ke baad loader stop
            }, 300); // 0.3 sec ka chhota delay
        }
    }, [orderByPRN, originalStudentList]);

    const loadFacultySubjects = async () => {
        setErrorMsg('');
        setLoader(true);

        try {
            if (!facultyInfo?.examInstID) {
                throw new Error("Invalid faculty info");
            }
            const params = {
                CoursePartID: itemData?.coursePartID ? parseInt(itemData.coursePartID) : 0,
                ExamInstanceID: facultyInfo.examInstID,  // ✅ fallback रखो
                // ExamInstanceID: 36,  // ✅ fallback रखो
                BranchID: itemData?.branchID || 0,
                SubjectID: itemData?.subjectID || 0,
                CategoryID: itemData?.categoryID || 0,
                PaperID: itemData?.paperID || 0,
                SectionID: 0,
                Orderby: orderByPRN || 1,
            };
            const response = await getStudentDetailForMarksEntry(params);
            setLoader(false);
            if (response?.status === 200) {
                if (Array.isArray(response.data)) {
                    //console.log("printstudentlist", JSON.stringify(response.data))
                    setOriginalStudentList(response.data);
                    setStudentList(response.data);
                    setHasAnyInputChanged(false); // Reset flag when new data loads
                } else {
                    setLoader(false);
                    setOriginalStudentList([]);
                    setStudentList([]);
                    setErrorMsg("No student data found");
                }
            } else {
                setLoader(false);
                setErrorMsg(response?.data?.message || "Something went wrong");
            }
        } catch (error) {
            setLoader(false);
            //console.log("❌ API Error:", error?.response || error.message);
            if (error.response?.data?.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg("Something went wrong");
            }
        }
    };

    const GetStudentListForDivisionAttendanceApi = () => {
        setErrorMsg('');
        if (facultyInfo?.examInstID) {
            setLoader(true);
            const params = {
                SubjectID: itemData?.subjectID,
                CoursePartID: itemData?.coursePartID,
                // SubjectID: 3223,
                // CoursePartID: 1091,
                DivisionID: itemData?.divisionID,
                AttendanceDate: moment(attendanceDate1).format('DD/MMM/YYYY'),
                AcademicInstanceID: facultyInfo?.acdYrID,
                //AcademicInstanceID: 15,
                DatabaseName: facultyInfo?.databaseName,
                Orderby: orderByPRN
            };
            //console.log("paramsparamsparams", JSON.stringify(params))
            Api.getApi('DivisionAttendance/GetStudentListForDivisionAttendance', params)
                .then(response => {
                    //console.log("DivisionAttendanceDivisionAttendance", JSON.stringify(response))
                    if (response.status === 200) {
                        setLoader(false);
                        //console.log("GetStudentListForDivisionAttendance", JSON.stringify(response.data))
                        setStudentList(response.data)
                    } else {
                        Alert(response.data.message);
                        setLoader(false);
                    }
                })
                .catch(error => {
                    //console.log("errorerrorerror", error.response.data)
                    //Alert.alert('Error', error.response.data);
                    setErrorMsg(error.response.data);
                    //Alert(error.response.data);
                    setLoader(false);
                    // if (error?.response?.data) {
                    //     Alert(error?.response?.data);
                    //     //setErrorMsg(error.response.data);
                    // }
                });
        } else {
            setErrorMsg('Something went wrong');
        }
    };

    const PostStudentMarksApi = (transformedData) => {
        setModalMsg('');
        if (transformedData) {
            setLoader(true);
            //console.log("printtransformedDatatransformedData", JSON.stringify(transformedData))
            Api.postApi('MarksEntry/PostInsertStudentMarksEntryList', transformedData)
                .then(response => {
                    //console.log("PostStudentMarksApiPostStudentMarksApi:", JSON.stringify(response));
                    if (response.status === 200) {
                        setLoader(false);
                        setShowModal(true)
                        setModalMsg("Marks Saved Successfully")
                        setIsSubmitted(true);
                        //console.log("finalpostresponse:", JSON.stringify(response.data));
                        //setStudentList(response.data);

                    } else {
                        Alert.alert("Error", response.data.message);
                        setLoader(false);
                    }
                })
                .catch(error => {
                    // console.log("error:", error?.response?.data);
                    // setErrorMsg(error?.response?.data || "Something went wrong");
                    //console.log("error:", JSON.stringify(error?.response));
                    setModalMsg(error?.response?.data || "Something went wrong");
                    setLoader(false);
                });
        } else {
            setModalMsg('Something went wrong');
        }
    };

    const PostUpdateCheckListFlagApi = (transformedData) => {
        setModalMsg('');
        if (transformedData) {
            setLoader(true);
            //console.log("printtransformedDatatransformedData", JSON.stringify(transformedData))
            Api.postApi('MarksEntry/PostUpdateCheckListFlag', transformedData)
                .then(response => {
                    console.log("PostUpdateCheckListFlagApiresponse:", JSON.stringify(response));
                    if (response.status === 200) {
                        setLoader(false);
                        setShowModal(true)
                        setModalMsg("Marks Saved Successfully")
                        //console.log("finalpostresponse:", JSON.stringify(response.data));
                        //setStudentList(response.data);

                    } else {
                        Alert.alert("Error", response.data.message);
                        setLoader(false);
                    }
                })
                .catch(error => {
                    // console.log("error:", error?.response?.data);
                    // setErrorMsg(error?.response?.data || "Something went wrong");
                    //console.log("error:", JSON.stringify(error?.response));
                    setModalMsg(error?.response?.data || "Something went wrong");
                    setLoader(false);
                });
        } else {
            setModalMsg('Something went wrong');
        }
    };
    const filteredStudents = studentList?.filter(student => {
        const query = searchQuery.toLowerCase();
        if (viewMode === 'name') {
            return student.studentName.toLowerCase().includes(query);
        } else if (viewMode === 'prn') {
            return student.prnno.toLowerCase().includes(query);
        }
        return false;
    });

    const handleMarksChange = (updated, prnno) => {
        setHasAnyInputChanged(true); // Set flag when any input changes
        setStudentList((prev) =>
            prev.map((student) =>
                student.prnno === prnno
                    ? { ...student, marks: updated.marks, statusFlag: updated.statusFlag }
                    : student
            )
        );
    };

    //console.log("printitemconsoleeee", JSON.stringify(filteredStudents))
    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.row}>
                <View style={{ flex: 1 }}>
                    {viewMode === 'name' && (
                        <Text
                            style={[
                                styles.studentNameText,
                                { borderRightWidth: 1, borderColor: colors.themeColor, padding: 10 },
                            ]}>
                            {index + 1}. {item.studentName}
                        </Text>
                    )}
                    {viewMode === 'prn' && (
                        <Text
                            style={[
                                styles.studentPrnText,
                                { borderRightWidth: 1, borderColor: colors.themeColor, padding: 10 },
                            ]}>
                            {item.prnno}
                        </Text>
                    )}
                </View>

                <View
                    style={{
                        flex: 0.46,
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}>
                    <TextInput
                        style={[
                            styles.marksInput,
                            item.chkListFlag === "V" && { backgroundColor: '#f0f0f0', color: '#666' }
                        ]}
                        value={getMarksValue(item)}   // 👈 controlled value
                        keyboardType="default"        // 👈 numbers + chars allow
                        maxLength={3}
                        placeholder="Enter Marks"
                        placeholderTextColor={colors.lightGrey}
                        editable={item.chkListFlag !== "V"} // Disable if finalized
                        onChangeText={(text) => {
                            let filtered = "";

                            const maxMarks = itemData?.categoryMaxMarksNew ?? 100; // fallback

                            // ✅ Sirf numbers
                            if (/^[0-9]+$/.test(text)) {
                                const onlyNums = text.replace(/[^0-9]/g, "");
                                const num = parseInt(onlyNums || "0", 10);

                                if (num <= maxMarks) {
                                    filtered = String(num);
                                    handleMarksChange(
                                        { marks: filtered, statusFlag: null },
                                        item.prnno
                                    );
                                } else {
                                    filtered = String(maxMarks);
                                    handleMarksChange(
                                        { marks: filtered, statusFlag: null },
                                        item.prnno
                                    );
                                }
                            }
                            // ✅ Sirf C/D/N
                            else if (/^[CNDcnd]$/.test(text)) {
                                filtered = text.toUpperCase();
                                handleMarksChange(
                                    { marks: 0, statusFlag: filtered },
                                    item.prnno
                                );
                            }
                            // ✅ Blank case
                            else if (text === "") {
                                handleMarksChange(
                                    { marks: 0, statusFlag: "A" },
                                    item.prnno
                                );
                            }
                        }}
                    />

                </View>
            </View>
        );
    };
    const [showModal, setShowModal] = useState(false);
    const [showSubmitModal, setSubmitShowModal] = useState(false);
    const [hasAnyInputChanged, setHasAnyInputChanged] = useState(false); // Track if any input changed
    const closeModal = () => {
        setShowModal(false), navigation.replace('CourseWiseMarksEntry', { facultyInfo });
    }
    const closeModal1 = () => {
        setSubmitShowModal(false)
        //navigation.replace('CourseWiseMarksEntry', { facultyInfo });
    }
    const getMarksValue = (item) => {
        // ✅ C/D/N ko priority
        if (["C", "D", "N"].includes(item.statusFlag)) {
            return item.statusFlag;
        }

        // ✅ Absent case
        if (item.statusFlag === "A") {
            return "";
        }

        // ✅ Naya student aur marks 0
        if (item.studentMarksID === 0 && item.marks === 0) {
            return "";
        }

        // ✅ Otherwise marks show karo
        return String(item.marks ?? "");
    };


    const transformMarksData = (students, facultyInfo, item) => {
        return students.map((student) => {
            const marksStr = getMarksValue(student); // UI helper

            let finalMarks = marksStr;   // by default actual marks
            let statusFlag = "P";        // default Present

            if (marksStr === "") {
                statusFlag = "A";          // Blank -> Absent
                finalMarks = 0;
            }
            else if (/^[CND]$/.test(marksStr)) {
                // ✅ Grade case
                statusFlag = marksStr;     // A/B/C status
                finalMarks = 0;          // marks always 0 for grade
            }
            else {
                // ✅ Number case (0 ya >0)
                statusFlag = "P";
                finalMarks = marksStr;
            }

            return {
                studentMarksID: student.studentMarksID || 0,
                studentID: student.studentID,
                courseID: student.courseID || 0,
                coursePartID: student.coursePartID,
                branchID: 0,
                studentSeatNO: student.studentSeatNO || 0,
                prnno: student.prnno || "",
                collegeID: student.collegeID || 0,
                subjectID: item?.subjectID || 0,
                marks: parseInt(finalMarks),         // ✅ marks cleaned
                statusFlag,                // ✅ status logic (A/B/C/P)
                //instanceID: student.instanceID || 0,
                instanceID: facultyInfo?.examInstID,
                examInstanceID: facultyInfo?.examInstID,
                //instanceID: 36,
                //examInstanceID: 36,
                categoryID: itemData?.categoryID || 0,
                paperID: student?.paperID || 0,
                sectionID: student?.sectionID || 0,
                deleteFlag: "N",
                createdDate: moment().toISOString(),
                createdLoginID: facultyInfo?.sysUserID,
                updatedDate: moment().toISOString(),
                updatedLoginID: facultyInfo?.sysUserID,
                categoryMaxMarks: 0,
                codeFlag: "",
                chkListFlag: "",
                markType: "",
                printFlag: "",
                resultFlag: "",
                transferFlag: "",
                instanceFlag: "",
                auditFlag: "",
                entryNo: 0,
                codeSeatNo: 0,
                oddSeatnoFlag: "",
                examinerName: "",
                centreID: 0,
                barCode: 0,
            };
        });
    };

    const submitTransformMarksData = (studentList, facultyInfo, itemData) => {
        return studentList.map((student) => ({
            ExaminstanceID: itemData?.examInstanceId || 0,   // exam instance id
            ExamEventID: itemData?.examEventId || 0,         // exam event id
            SubjectID: itemData?.subjectId || 0,             // subject id
            PaperID: itemData?.paperId || 0,                 // paper id
            FacultyID: facultyInfo?.sysUserID || 0,          // login faculty id
            PRNNo: student.prnno,                            // student prn number
            Marks: student.marks,                            // marks value
            StatusFlag: student.statusFlag,                  // status A/P/C/D/N
            chkListFlag: "N",                                // submit karatanna N
            CreatedBy: facultyInfo?.sysUserID || 0,          // created by
            UpdatedBy: facultyInfo?.sysUserID || 0,          // updated by
        }));
    };

    const finalSubmitTransformMarksData = (students, facultyInfo, item) => {
        return students.map((student) => {
            return {
                studentMarksID: student.studentMarksID,
                deleteFlag: "N",
                createdDate: moment().toISOString(),
                createdLoginID: facultyInfo?.sysUserID,
                updatedDate: moment().toISOString(),
                updatedLoginID: facultyInfo?.sysUserID,
                chkListFlag: "V"
            };
        });
    };
    // ✅ Check agar ek bhi student ka marks fill hai
    const hasAnyMarksEntered = studentList.some(student => {
        const val = getMarksValue(student);
        // Check if student has marks (numbers) or status (C/D/N) but not empty or absent
        const hasValue = val !== "" && val !== null && val !== undefined && student.statusFlag !== "A";
        //console.log(`Student ${student.prnno}: val="${val}", statusFlag="${student.statusFlag}", hasValue=${hasValue}, studentMarksID=${student.studentMarksID}`);
        return hasValue;
    });

    // ✅ Check if any changes have been made to existing data
    const hasChangesBeenMade = studentList.some(student => {
        // If student has existing marks but current value is different from original
        if (student.studentMarksID > 0) {
            const currentValue = getMarksValue(student);
            const originalValue = student.marks || student.statusFlag || "";
            return currentValue !== originalValue;
        }
        return false;
    });
    // ✅ Submit disable condition (only marks check & N check)
    // Submit button disable condition
    const isSubmitDisabled =
        !hasAnyMarksEntered ||                        // koi marks hi nahi daale
        studentList.every(student => student.chkListFlag === "V"); // sab finalized

    // Final Submit disable condition
    const isFinalSubmitDisabled =
        studentList.some(student => student.statusFlag === "A") ||   // koi absent hai
        studentList.every(student => student.chkListFlag === "V");   // sab already finalized hai

    // console.log("hasAnyMarksEntered", hasAnyMarksEntered)
    // console.log("isSubmitDisabled", isSubmitDisabled)
    // console.log("isFinalSubmitDisabled", isFinalSubmitDisabled)
    // console.log("printconsolemylist", JSON.stringify(studentList))

    // Debug: Check individual student conditions
    studentList.forEach((student, index) => {
        const marksValue = getMarksValue(student);
        //console.log(`Student ${index + 1} (${student.prnno}): marks="${marksValue}", statusFlag="${student.statusFlag}", chkListFlag="${student.chkListFlag}", studentMarksID=${student.studentMarksID}`);
    });
    return (
        <>
            {loader ? (
                <Loader visible={loader} />
            ) : (
                <View style={styles.container}>
                    {/* Header */}
                    <TouchableOpacity style={styles.card}>
                        <View style={styles.cardRow}>
                            <View style={{ flex: 1, paddingRight: 10 }}>
                                <Text numberOfLines={2} style={[styles.subjectText, { fontFamily: 'Montserrat-Bold' }]}>
                                    {itemData.courseName}-{itemData.coursePartDescription}
                                </Text>
                                <Text numberOfLines={2} style={styles.subjectText}>
                                    {itemData.subjectName}-{itemData.categoryName} {itemData.paperName && <Text style={styles.subjectText}></Text>}
                                </Text>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={[styles.subjectText, { flex: 1 }]}>
                                        Total Count = {itemData.totalStudent}
                                    </Text>
                                    <Text style={[styles.subjectText, { flex: 1 }]}>
                                        Present Count = {itemData.presentStudent}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={[styles.subjectText, { flex: 1 }]}>
                                        Ab/CC/DT Count = {itemData.abCCDtStudent}
                                    </Text>
                                    <Text style={[styles.subjectText, { flex: 1 }]}>
                                        Pending Count = {itemData.pendingStudent}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.codeBadge}>
                                <Text style={styles.codeText}>{itemData.subjectUniversityCode}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {showSubmitModal &&
                        <SubmitButtonWarningModal
                            showModal={showSubmitModal}
                            closeModal={closeModal1}
                            title="Message"
                            content={showSubmitModalMsg}
                            iconColor="black"
                        />
                    }
                    {showErorMsg !== '' && (
                        <Text style={styles.errorText}>{showErorMsg}</Text>
                    )}
                    {showModal &&
                        <ForgotPasswordModal
                            showModal={showModal}
                            closeModal={closeModal}
                            title="Message"
                            content={showModalMsg}
                            iconColor="black"
                        />
                    }

                    {studentList.length !== 0 &&
                        <>
                            <PaperTextInput
                                mode="outlined"
                                placeholder="Search by Name or PRN"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                style={styles.searchInput}
                                autoCapitalize="none"
                                right={<PaperTextInput.Icon icon="magnify" color={colors.themeColor} />}
                                theme={{
                                    colors: {
                                        primary: colors.themeColor,
                                        outline: colors.lightGrey,
                                    },
                                }}
                            />

                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <TouchableOpacity
                                    style={[
                                        styles.touchType,
                                        { backgroundColor: viewMode === 'prn' ? colors.themeColor : 'transparent' },
                                    ]}
                                    onPress={() => {
                                        setViewMode('prn');
                                        setOrderByPRN(1);
                                    }}>
                                    <Text
                                        style={[
                                            styles.touchTypeText,
                                            { color: viewMode === 'prn' ? '#fff' : '#555' },
                                        ]}>
                                        PRN
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.touchType,
                                        { backgroundColor: viewMode === 'name' ? colors.themeColor : 'transparent' },
                                    ]}
                                    onPress={() => {
                                        setViewMode('name');
                                        setOrderByPRN(2);
                                    }}>
                                    <Text
                                        style={[
                                            styles.touchTypeText,
                                            { color: viewMode === 'name' ? '#fff' : '#555' },
                                        ]}>
                                        NAME
                                    </Text>
                                </TouchableOpacity>
                                {/* Submit Button */}
                                <TouchableOpacity
                                    style={[
                                        styles.touchType,
                                        {
                                            backgroundColor: isSubmitDisabled ? '#d3d3d3' : '#00B72B',
                                            opacity: isSubmitDisabled ? 0.6 : 1,
                                        },
                                    ]}
                                    onPress={() => {
                                        if (isSubmitDisabled) {
                                            if (studentList.every(student => student.chkListFlag === "V")) {
                                                setSubmitModalMsg("All records have already been finalized. Cannot submit again.");
                                                setSubmitShowModal(true);
                                                return;
                                            }
                                            if (!hasAnyMarksEntered) {
                                                setSubmitModalMsg("Please enter marks for at least one student before submitting.");
                                                setSubmitShowModal(true);
                                                return;
                                            }
                                            return;
                                        }
                                        const transformedData = transformMarksData(studentList, facultyInfo, itemData);
                                        PostStudentMarksApi(transformedData);
                                        setHasAnyInputChanged(false); // Reset flag after submit
                                    }}
                                >
                                    <Text style={styles.touchTypeText}>Submit</Text>
                                </TouchableOpacity>

                                {/* Final Submit Button - Show when all students have values, no student is absent, AND no input has changed */}
                                {!hasAnyInputChanged && studentList.every(student => {
                                    const hasInputValue = getMarksValue(student) !== "" && getMarksValue(student) !== null && getMarksValue(student) !== undefined;
                                    const isNotAbsent = student.statusFlag !== "A";
                                    return hasInputValue && isNotAbsent;
                                }) && (
                                        <TouchableOpacity
                                            style={[
                                                styles.touchType,
                                                {
                                                    backgroundColor: isFinalSubmitDisabled ? '#d3d3d3' : '#99bbff',
                                                    opacity: isFinalSubmitDisabled ? 0.6 : 1,
                                                },
                                            ]}
                                            onPress={() => {
                                                if (isFinalSubmitDisabled) {
                                                    if (studentList.every(student => student.chkListFlag === "V")) {
                                                        setSubmitModalMsg("All records have already been finalized. Cannot final submit again.");
                                                        setSubmitShowModal(true);
                                                        return;
                                                    }
                                                    if (studentList.some(student => student.statusFlag === "A")) {
                                                        setSubmitModalMsg("Cannot final submit when any student is absent (A).");
                                                        setSubmitShowModal(true);
                                                        return;
                                                    }
                                                    return;
                                                }
                                                const transformedData2 = finalSubmitTransformMarksData(studentList, facultyInfo, itemData);
                                                PostUpdateCheckListFlagApi(transformedData2);
                                                // Add your final submit logic here
                                                console.log("Final Submit pressed");
                                                setHasAnyInputChanged(false); // Reset flag after final submit
                                            }}
                                        >
                                            <Text style={styles.touchTypeText}>Final Submit</Text>
                                        </TouchableOpacity>
                                    )}
                            </View>

                            <View style={styles.headerRow}>
                                <Text style={[styles.headerText, {
                                    flex: 1, padding: 10, borderRightWidth: 1,
                                    borderColor: colors.themeColor,
                                }]}>{viewMode === 'name' ? 'NAME' : 'PRN NO'}</Text>
                                <Text style={[styles.headerText, { flex: 0.5, textAlign: 'center', }]}>MARKS</Text>
                            </View>

                            <FlatList
                                data={filteredStudents}
                                keyExtractor={(item) => item.prnno.toString()}
                                renderItem={renderItem}
                                initialNumToRender={15}
                                maxToRenderPerBatch={10}
                                windowSize={10}
                                removeClippedSubviews={false} // ❌ इसे false कर दो
                                extraData={studentList}
                                keyboardShouldPersistTaps="handled"
                                keyboardDismissMode="on-drag" // drag करने से keyboard hide
                                contentContainerStyle={{ paddingBottom: 100 }} // space for button
                            />
                        </>}
                </View>

            )}
        </>
    );
};

export default MarksEntryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#fff',
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#87CEEB',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderWidth: 1,
        borderColor: colors.themeColor,
        justifyContent: 'center', alignItems: 'center',
    },
    headerText: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#000',
        fontSize: 14,
        flex: 1,
        textAlign: 'left',
    },
    searchContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#F4F4F4',
        borderRadius: 12,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    searchInput: {
        marginVertical: 10,
        height: 50,
        fontSize: 14,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderColor: colors.themeColor,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1
    },
    studentPrnText: {
        fontSize: 13,
        fontFamily: 'Montserrat-SemiBold',
        color: '#000000',
        flex: 1,
    },
    studentNameText: {
        fontSize: 13,
        fontFamily: 'Montserrat-SemiBold',
        color: '#000000',
        flex: 1,
    },
    marksInput: {
        width: 100,
        borderWidth: 1,
        borderColor: colors.themeColor,
        margin: 5,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: colors.black,
        fontSize: 14
    },
    saveButton: {
        backgroundColor: '#00B72B',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
    },
    saveButtonText: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        textAlign: 'center'
    },
    checkbox: {
        width: 28,
        height: 28,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: colors.themeColor,
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: 'transparent' // inactive ka default
    },
    toggleButtonActive: {
        backgroundColor: colors.themeColor
    },
    toggleButtonText: {
        fontWeight: 'bold',
    },
    touchType: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.themeColor,
        paddingVertical: 5,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
        flex: 1
    },
    touchTypeText: {
        color: colors.black,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        fontSize: 12
    },
    card: {
        backgroundColor: colors.white,
        borderColor: colors.themeColor,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginBottom: 10,
        borderRadius: 10,
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subjectBold: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 10,
    },
    codeBadge: {
        backgroundColor: colors.themeColor,
        borderRadius: 12,
        paddingVertical: 6,
        paddingHorizontal: 12,
        alignSelf: 'flex-start',
    },
    codeText: {
        color: colors.white,
        fontSize: 12,
        fontFamily: 'Montserrat-Bold',
    },
    subjectText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        color: colors.black,
        textAlign: 'left',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'Montserrat-Bold'
    },
    fabContainer: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        alignItems: 'flex-end',
    },
    fabButton: {
        flexDirection: 'row',
        backgroundColor: colors.themeColor,
        paddingHorizontal: 15,
        width: 100,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    fabText: {
        color: 'white',
        marginLeft: 8,
        fontSize: 14,
    },
});
