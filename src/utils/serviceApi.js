// src/services/facultyApi.js
import Api from "../utils/Api";

export const getStudentLogin = async (params) => {
    try {
        const response = await Api.getApi('PortalStudentLogIn/GetPortalStudentLoginMobile', params);
        return response;
    } catch (error) {
        // Axios error response handle
        if (error.response) {
            return error.response; // Return the 400/500 response
        }
        throw error; // Network error
    }
};


// 👇 Faculty Subject List API
export const getFacultyBasicSubjectList = async (params) => {
    try {
        const response = await Api.getApi(
            "MarksEntry/GetSubjectDetailForMarksEntryListNew",
            params
        );
        return response;
    } catch (error) {
        // Axios error response handle
        if (error.response) {
            return error.response; // Return the 400/500 response
        }
        throw error; // Network error
    }
};

export const getStudentDetailForMarksEntry = async (params) => {
    //console.log("API Call Params =>", params);
    try {
        const response = await Api.getApi(
            "MarksEntry/GetStudentDetailForMarksEntry",
            params
        );
        return response;
    } catch (error) {
        // Axios error response handle
        if (error.response) {
            return error.response; // Return the 400/500 response
        }
        throw error; // Network error
    }
};

