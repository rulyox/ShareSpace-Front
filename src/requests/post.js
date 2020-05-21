import axios from 'axios';
import config from '../config.json';

const writePost = (token, text, imageList) => {
    return new Promise((resolve, reject) => {

        const formData = new FormData();
        formData.append('text', text);
        for(let i = 0; i < imageList.length; i++) formData.append('file_' + i, imageList[i]);

        axios.post(config.server + '/post', formData,
            {
                headers: {
                    token: token,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => { resolve(); })
            .catch((error) => { reject(error); });

    });
};

const getPostByUser = (token, user, start) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/post/user/' + user + '?start=' + start + '&count=10',
            {
                headers: {token: token}
            })
            .then((response) => {

                resolve({
                    result: response.data.result,
                    total: response.data.total,
                    list: response.data.list
                });

            })
            .catch((error) => { reject(error); });

    });
};

const getPostData = (token, access) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/post/data/' + access,
            {
                headers: {token: token}
            })
            .then((response) => {

                resolve({
                    result: response.data.result,
                    data: response.data.data
                });

            })
            .catch((error) => { reject(error); });

    });
};

const getPostPreview = (token, access) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/post/preview/' + access,
            {
                headers: {token: token}
            })
            .then((response) => {

                resolve({
                    result: response.data.result,
                    data: response.data.data
                });

            })
            .catch((error) => { reject(error); });

    });
};

const getImageFile = (token, post, image) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/post/image/' + post + '/' + image,
            {
                responseType: 'arraybuffer',
                headers: {token: token}
            })
            .then((response) => { resolve(response.data); })
            .catch((error) => { reject(error); });

    });
};

const getFeed = (token, start) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/post/feed?start=' + start + '&count=10',
            {
                headers: {token: token}
            })
            .then((response) => { resolve(response.data); })
            .catch((error) => { reject(error); });

    });
};

export default {
    writePost,
    getPostByUser,
    getPostData,
    getPostPreview,
    getImageFile,
    getFeed
};
