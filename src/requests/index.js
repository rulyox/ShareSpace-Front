import { getToken, login, signUp, edit, getProfile, getProfileImage, uploadProfileImage, search } from './user';
import { write, getPostByUser, getData, getPreview, getImages, getFeed, deletePost, getLike, like, getComment, writeComment, deleteComment } from './post';
import { getFollowing, getFollower, check, follow } from './follow';

export default {
    user: { getToken, login, signUp, edit, getProfile, getProfileImage, uploadProfileImage, search },
    post: { write, getPostByUser, getData, getPreview, getImages, getFeed, deletePost, getLike, like, getComment, writeComment, deleteComment },
    follow: { getFollowing, getFollower, check, follow }
};
