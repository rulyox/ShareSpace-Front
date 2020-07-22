import axios from 'axios';
import config from '../config.json';

const server = config.server;

export const getFollowing = (access) => {
    return new Promise((resolve, reject) => {

        axios.get(server + '/follow/ing/' + access)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
}

export const getFollower = (access) => {
    return new Promise((resolve, reject) => {

        axios.get(server + '/follow/er/' + access)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
}
