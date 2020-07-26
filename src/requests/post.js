import axios from 'axios';
import config from '../config.json';

const server = config.server;

export const write = (token, text, imageList) => {
    return new Promise((resolve, reject) => {

        const formData = new FormData();
        formData.append('text', text);
        for(let i = 0; i < imageList.length; i++) formData.append('file_' + i, imageList[i]);

        axios.post(server + '/post', formData,
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

        axios.get(server + '/post/user/' + user + '?start=' + start + '&count=10',
            {
                headers: {token: token}
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const getData = (token, access) => {
    return new Promise((resolve, reject) => {

        axios.get(server + '/post/data/' + access,
            {
                headers: {token: token}
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const getPreview = (token, access) => {
    return new Promise((resolve, reject) => {

        axios.get(server + '/post/preview/' + access,
            {
                headers: {token: token}
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const getImages = (token, post, image) => {
    return new Promise((resolve, reject) => {

        axios.get(server + '/post/image/' + post + '/' + image,
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

        axios.get(server + '/post/feed?start=' + start + '&count=10',
            {
                headers: {token: token}
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const deletePost = (token, access) => {
    return new Promise((resolve, reject) => {

        axios.delete(server + '/post/' + access,
            {
                headers: {token: token}
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const getLike = (token, access) => {
    return new Promise((resolve, reject) => {

        axios.get(server + '/post/like/' + access,
            {
                headers: {token: token}
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const like = (token, access, type) => {
    return new Promise((resolve, reject) => {

        axios.post(server + '/post/like/' + access,
            {
                type: type
            }, {
                headers: {token: token}
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const getComment = (token, access) => {
    return new Promise((resolve, reject) => {

        axios.get(server + '/post/comment/' + access,
            {
                headers: {token: token}
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const writeComment = (token, access, comment) => {
    return new Promise((resolve, reject) => {

        axios.post(server + '/post/comment/' + access,
            {
                comment: comment
            }, {
                headers: {token: token}
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const deleteComment = (token, access) => {
    return new Promise((resolve, reject) => {

        axios.delete(server + '/post/comment/' + access,
            {
                headers: {token: token}
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};
