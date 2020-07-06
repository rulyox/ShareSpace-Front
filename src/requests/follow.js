import axios from 'axios';
import config from '../config.json';

export const getFollowing = (access) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/follow/ing/' + access)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
}

export const getFollower = (access) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/follow/er/' + access)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));

    });
}
