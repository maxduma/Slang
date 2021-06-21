import { profileAPI, usersAPI } from '../api/api';
import { reset, stopSubmit } from "redux-form";

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const ADD_ALL_POSTS = 'ADD_ALL_POSTS';
const SET_LIKE = 'SET_LIKE';
const SET_CURRENT_USER_DATA_I_LIKE_POST_UIDS = 'SET_CURRENT_USER_DATA_I_LIKE_POST_UIDS';
// const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
const CHANGE_PHOTO_SUCCESS = 'CHANGE_PHOTO_SUCCESS';

const initialState = {
  profile: {
    name: '',
    surname: '',
    email: '',
    followed: false,
    location: {
      country: '',
      city: ''
    },
    personalInformation: {
      job: '',
      education: '',
      hobby: '',
    },
    urlPhoto: '',
    gender: '',
    uid: null,
    status: '',
    following: [''],
    followers: [''],
    posts: [],
    iLikePostsUids: [''],
  }
}

const profileReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_POST: 
      const newPost = {
        postId: action.postData.postId,
        text: action.postData.text,
        isLike: action.postData.isLike,
        ownerPostUrlPhoto: action.postData.ownerPostUrlPhoto,
        likesUid: action.postData.likesUid,
        ownerPostUid: action.postData.ownerPostUid,
        ownerPostName: action.postData.ownerPostName,
        ownerPostSurname: action.postData.ownerPostSurname,
        data: {
          day: action.postData.data.day,
          month: action.postData.data.month,
          year: action.postData.data.year,
          hours: action.postData.data.hours,
          minutes: action.postData.data.minutes,
        }
        };
      return {
        ...state,
        profile: { 
          ...state.profile,
          posts: [ ...state.profile.posts, newPost ]
        }
        };
    case ADD_ALL_POSTS: 
      return {
        ...state,
        profile: { 
          ...state.profile,
          posts: action.posts
        }
        };
        case DELETE_POST:
        return {...state,
          profile: { 
            ...state.profile,
            posts: [ ...state.profile.posts.filter(p => p.postId !== action.postId) ]
          }
        }
    case SET_USER_PROFILE: 
      return {
        ...state,
        profile: {
          name: action.profile.name,
          surname: action.profile.surname,
          email: action.profile.email,
          followed: action.profile.followed,
          location: {
            country: action.profile.location.country,
            city: action.profile.location.city
          },
          personalInformation: {
            job: action.profile.personalInformation.job,
            education: action.profile.personalInformation.education,
            hobby: action.profile.personalInformation.hobby
          },
          urlPhoto: action.profile.urlPhoto,
          gender: action.profile.gender,
          uid: action.profile.uid,
          status: action.profile.status,
          following: action.profile.following,
          followers: action.profile.followers,
          posts: action.posts,
          iLikePostsUids: action.profile.iLikePostsUids
        }
      };
    case SET_STATUS: 
      return {
        ...state,
        profile: { ...state.profile,
          status: action.status
        }
      };
    case SET_LIKE: 
      return {
        ...state,
        profile: { ...state.profile,
          posts: [
            ...state.profile.posts.map(p => p.postId === action.post.postId ? action.post : p )
          ]
        }
      };
    case SET_CURRENT_USER_DATA_I_LIKE_POST_UIDS:
      return { ...state,
        profile: { ...state.profile,
          iLikePostsUids: action.iLikePostsUids
        }
      }
    // case SAVE_PHOTO_SUCCESS:
    //   return { ...state,
    //     profile: { ...state.profile,
    //       photo: action.photo
    //     }
    //   }
    case CHANGE_PHOTO_SUCCESS:
      return { ...state,
        profile: { ...state.profile,
          urlPhoto: action.urlPhoto
        }
      }
    default: 
      return state;
  }
}

export const addPostActionCreator = (postData) =>  ({type: ADD_POST, postData})
export const setLike = (postId, post) =>  ({type: SET_LIKE, postId, post})
export const addAllPosts = (posts) =>  ({type: ADD_ALL_POSTS, posts})
export const deletePostAC = (postId) =>  ({type: DELETE_POST, postId})
const setUserProfile = (profile, posts ) => ({type: SET_USER_PROFILE, profile, posts })
const setStatus = (status) => ({type: SET_STATUS, status })
export const setILikePostsUids = (iLikePostsUids) => ({type: SET_CURRENT_USER_DATA_I_LIKE_POST_UIDS, iLikePostsUids });
// export const savePhotoSuccess = (photo) => ({type: SAVE_PHOTO_SUCCESS, photo });
export const changeUrlPhoto = (urlPhoto) => ({type: CHANGE_PHOTO_SUCCESS, urlPhoto });

export const getUserProfile = (userId, myILikePostsUids) => (dispatch) => {
  usersAPI.getUser(userId)
  .then(res => {
    if (res.posts) {
      const posts = [];
      Object.values(res.posts).map(post => {
        //set like status
        myILikePostsUids.map(likeUid => {
          if (likeUid === post.postId) {
            post.isLike = true;
          }
        })
      posts.push(post)
       })
      dispatch(setUserProfile(res, posts));
    } else {
      const posts = [];
      dispatch(setUserProfile(res, posts));
    }
  })
}

export const getStatus = (userId) => async (dispatch) => {
  const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
}

export const patchStatus = (myUid, NewStatus) => async (dispatch) => {
  const response = await profileAPI.patchStatus(myUid, NewStatus)
    dispatch(setStatus(Object.values(response.data).join()));
}
// export const savePhoto = (file) => async (dispatch) => {
//   const response = await profileAPI.savePhoto(file)
//         dispatch(savePhotoSuccess(response.data.photos) // response.data.photos?
// }

export const changeUrlPhotoThunk = (urlPhoto, myUid) => async (dispatch) => {
  const response = await profileAPI.changeUrlPhoto(urlPhoto, myUid);
    dispatch(changeUrlPhoto(response.data.urlPhoto));
    dispatch(reset("urlPhotoForm"));
}

export const changeProfileData = (formData, myUid, myILikePostsUids) => async (dispatch) => {
  const response = await profileAPI.changeProfileData(formData, myUid)
    if (response.statusText === "OK") {
      dispatch(getUserProfile(myUid, myILikePostsUids));
      // dispatch(reset("editProfile"));
    } else {
      console.log('else', response)
      dispatch(stopSubmit("editProfile", {_error: response.data.message})); //dnc
      return Promise.reject(response.data.message);
    }
};
export default profileReducer;
