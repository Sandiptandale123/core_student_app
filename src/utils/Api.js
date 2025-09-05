import axios, { AxiosPromise } from 'axios';

import APIURL from './urlConfig';
const CipherVideoURL = "https://dev.vdocipher.com/api/videos/"
// const APIURL = 'https://alfapay.focohub.in/web-service/';


const callApi = (formData, url, Method) => {
    const response = axios({
        url: APIURL + url,
        method: Method,
        data: formData,
        // headers: {
        //     "Content-Type":"application/json",
        // }
    })
    return response

}


const callApiWithContextType = (formData, url, Method, token) => {
    const response = axios({
        url: APIURL + url,
        method: Method,
        data: formData,
        headers: {
            "Content-Type": "application/json",
        },
    })
    return response

}


const CipherAPI = (formData, url, Method,) => {
    const response = axios({
        url: CipherVideoURL + url,
        method: Method,
        data: formData,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Apisecret ac36bd6a09474d4d974052db19990b8645e35f9a2a1e408885b16bd548ac4f87"
        }
    })
    return response

}

const postApi = (url, body, params = {}) => {
    return new Promise((resolve, reject) => {
        callApi(body, url, 'POST', params)
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
};

const postApiAuthUser = (body, url, token) => {
    return new Promise((resolve, reject) => {
        callApi(body, url, 'POST', token)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    });
}


const postApiDirectURL = (body, url) => {
    return new Promise((resolve, reject) => {
        CipherAPI(body, url, 'POST')
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                console.log(error, 'errorerrorerrorerrorerror')
                reject(error)
            })
    });
}

const getApi = (url, params = {}) => {
    const query = new URLSearchParams(params).toString();
    const fullUrl = `${APIURL}${url}?${query}`;
    return new Promise((resolve, reject) => {
        axios.get(fullUrl)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
};

export default {
    postApi,
    callApi,
    getApi,
    postApiDirectURL,
    postApiAuthUser,
    callApiWithContextType
}

