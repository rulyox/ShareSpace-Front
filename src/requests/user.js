import axios from 'axios';
import config from '../config.json';

export const getToken = (email, pw) => {
    return new Promise((resolve, reject) => {

        axios.post(config.server + '/user/token',
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

        axios.get(config.server + '/user',
            {
                headers: {token: token}
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const getProfile = (profileAccess) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/user/data/' + profileAccess)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const getProfileImageFile = (access) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/user/image/' + access,
            {
                responseType: 'arraybuffer'
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};
