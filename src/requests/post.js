import axios from 'axios';
import config from '../config.json';

export const writePost = (token, text, imageList) => {
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
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const getPostByUser = (token, user, start) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/post/user/' + user + '?start=' + start + '&count=10',
            {
                headers: {token: token}
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const getPostData = (token, access) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/post/data/' + access,
            {
                headers: {token: token}
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const getPostPreview = (token, access) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/post/preview/' + access,
            {
                headers: {token: token}
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const getImageFile = (token, post, image) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/post/image/' + post + '/' + image,
            {
                responseType: 'arraybuffer',
                headers: {token: token}
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const getFeed = (token, start) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/post/feed?start=' + start + '&count=10',
            {
                headers: {token: token}
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const getLike = (token, access) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/post/like/' + access,
            {
                headers: {token: token}
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const getComment = (token, access) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/post/comment/' + access,
            {
                headers: {token: token}
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};
