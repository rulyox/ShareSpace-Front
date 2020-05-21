import userRequests from './requests/user';
import postRequests from './requests/post';
import followRequests from './requests/follow';

export default {
    getToken : userRequests.getToken,
    login: userRequests.login,
    getProfile: userRequests.getProfile,
    getProfileImageFile: userRequests.getProfileImageFile,
    writePost: postRequests.writePost,
    getPostByUser: postRequests.getPostByUser,
    getPostData: postRequests.getPostData,
    getPostPreview: postRequests.getPostPreview,
    getImageFile: postRequests.getImageFile,
    getFeed: postRequests.getFeed,
    getFollowing: followRequests.getFollowing,
    getFollower: followRequests.getFollower
};
