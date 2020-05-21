import axios from 'axios';
import config from '../config.json';

const getToken = (email, pw) => {
    return new Promise((resolve, reject) => {

        axios.post(config.server + '/user/token',
            {
                email: email,
                pw: pw
            })
            .then((response) => {

                resolve({
                    result: response.data.result,
                    token: response.data.token
                });

            })
            .catch((error) => reject(error));

    });
};

const login = (token) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/user',
            {
                headers: {token: token}
            })
            .then((response) => {

                resolve({
                    access: response.data.access,
                    email: response.data.email,
                    name: response.data.name
                });

            })
            .catch((error) => { reject(error); });

    });
};

const getProfile = (profileAccess) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/user/data/' + profileAccess)
            .then((response) => { resolve(response.data); })
            .catch((error) => { reject(error); });

    });
};

const getProfileImageFile = (access) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/user/image/' + access,
            {
                responseType: 'arraybuffer'
            })
            .then((response) => { resolve(response.data); })
            .catch((error) => { reject(error); });

    });
};

export default {
    getToken,
    login,
    getProfile,
    getProfileImageFile
};
