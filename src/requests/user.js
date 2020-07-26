import axios from 'axios';
import config from '../config.json';

const server = config.server;

export const getToken = (email, pw) => {
    return new Promise((resolve, reject) => {

        axios.post(server + '/user/token',
            {
                email: email,
                pw: pw
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const login = (token) => {
    return new Promise((resolve, reject) => {

        axios.get(server + '/user',
            {
                headers: {token: token}
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const signUp = (name, email, pw) => {
    return new Promise((resolve, reject) => {

        axios.post(server + '/user',
            {
                name: name,
                email: email,
                pw: pw
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const edit = (token, name, pw) => {
    return new Promise((resolve, reject) => {

        axios.put(server + '/user',
            {
                name: name,
                pw: pw
            },
            {
                headers: {token: token}
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const getProfile = (profileAccess) => {
    return new Promise((resolve, reject) => {

        axios.get(server + '/user/data/' + profileAccess)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const getProfileImage = (access) => {
    return new Promise((resolve, reject) => {

        axios.get(server + '/user/image/' + access,
            {
                responseType: 'arraybuffer'
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const uploadProfileImage = (token, image) => {
    return new Promise((resolve, reject) => {

        const formData = new FormData();
        formData.append('file', image);

        axios.post(server + '/user/image', formData,
            {
                headers: {
                    token: token,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const search = (query) => {
    return new Promise((resolve, reject) => {

        axios.get(server + '/user/search/' + query)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};
