import axios from 'axios';
import config from '../config.json';

const server = config.server;

export const getFollowing = (access) => {
    return new Promise((resolve, reject) => {

        axios.get(server + '/follow/ing/' + access)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const getFollower = (access) => {
    return new Promise((resolve, reject) => {

        axios.get(server + '/follow/er/' + access)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const checkFollow = (follower, following) => {
    return new Promise((resolve, reject) => {

        axios.get(server + '/follow/check/' + follower + '/' + following)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};

export const follow = (token, access, type) => {
    return new Promise((resolve, reject) => {

        axios.post(server + '/follow',
            {
                access: access,
                type: type
            }, {
                headers: {token: token}
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
};
