import {stopSubmit} from 'redux-form';
import { authAPI, usersAPI } from '../api/api';

const SET_AUTH_CURRENT_USER_DATA = 'SET_AUTH_CURRENT_USER_DATA';
const SET_CURRENT_USER_DATA_FOLLOWING = 'SET_CURRENT_USER_DATA_FOLLOWING';
const SET_CURRENT_USER_DATA_FOLLOWERS = 'SET_CURRENT_USER_DATA_FOLLOWERS';
const SET_NOT_MY_FOLLOWERS = 'SET_NOT_MY_FOLLOWERS';

const initialState = {
  currentUserData: {
    name: '',
    surname: '',
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
    email: '',
    status: '',
    isAuth: false,
    following: [''],
    followers: [''],
    iLikePostsUids: [''],
  },
  notMyFollowers: [],
  isFetching: false
}

const authReducer = (state = initialState, action) => {

  switch(action.type) {
    case SET_AUTH_CURRENT_USER_DATA:
      return { ...state,
        currentUserData: {
          name: action.data.name,
          surname: action.data.surname,
          location: {
            ...state.currentUserData.location,
            country:  action.data.location.country,
            city:  action.data.location.city,
          },
          personalInformation: {
            ...state.currentUserData.personalInformation,
            job: action.data.personalInformation.job,
            education: action.data.personalInformation.education,
            hobby: action.data.personalInformation.hobby,
          },
          gender: action.data.gender,
          uid: action.data.uid,
          email: action.data.email,
          urlPhoto: action.data.urlPhoto,
          status: action.data.status,
          isAuth: action.data.isAuth,
          following: action.data.following,
          followers: action.data.followers,
          iLikePostsUids: action.data.iLikePostsUids,
        }
      }
    case SET_CURRENT_USER_DATA_FOLLOWING:
      return { ...state,
        currentUserData: { ...state.currentUserData,
          following: action.uidListFollowing
        }
      }
    case SET_CURRENT_USER_DATA_FOLLOWERS:
      return { ...state,
        currentUserData: { ...state.currentUserData,
          followers: action.uidListFollowers
        }
      }
    case SET_NOT_MY_FOLLOWERS:
      return { ...state,
        notMyFollowers: action.uidListNotMyFollowers
      }
    default:
      return state;
  }
}

export const setAuthCurrentUserData = ( name, surname, location, personalInformation, gender, uid, email, urlPhoto, status, isAuth, following, followers, iLikePostsUids ) => ({type: SET_AUTH_CURRENT_USER_DATA, data: { name, surname, location, personalInformation, gender, uid, email, urlPhoto, status, isAuth, following, followers, iLikePostsUids }});
export const setFollowing = ( uidListFollowing ) => ({type: SET_CURRENT_USER_DATA_FOLLOWING, uidListFollowing });
export const setFollowers = ( uidListFollowers ) => ({type: SET_CURRENT_USER_DATA_FOLLOWERS, uidListFollowers });

export const setNotMyFollowers = ( uidListNotMyFollowers ) => ({type: SET_NOT_MY_FOLLOWERS, uidListNotMyFollowers });

export const createNewAccountThunk = (formData) => (dispatch) => {
  authAPI.createNewAccount(formData.email, formData.password)
  .then(user => {
    // set database
    const {uid, email} = user;
    usersAPI.putNewUser(uid, formData.name, formData.surname, email, formData.gender, formData.city, formData.country)
    // set data to state
    .then(data => {
      dispatch(setAuthCurrentUserData(data.name, data.surname, data.location, data.personalInformation, data.gender, data.uid, data.email, data.urlPhoto, data.status, true, data.following, data.followers, data.iLikePostsUids));
      // set localStorage
      const CurrentUserData = {
        name: data.name,
        surname: data.surname,
        location: {
          country: data.location.country,
          city: data.location.city
        },
        personalInformation: {
          job: data.personalInformation.job,
          education: data.personalInformation.education,
          hobby: data.personalInformation.hobby,
        },
        urlPhoto: data.urlPhoto,
        gender: data.gender,
        uid: data.uid,
        email: data.email,
        status: data.status,
        isAuth: true,
        following: data.following,
        followers: data.followers,
        posts: [""],
        iLikePostsUids: data.iLikePostsUids
      }
      localStorage.setItem('CurrentUserData', JSON.stringify(CurrentUserData))
    })
  })
  .catch(error => {
    console.log('ERROR !!!')
    dispatch(stopSubmit("CreateNewAccountForm", {_error: error.message}))
  })
}

export const setAuthCurrentUser = (formData) => (dispatch) => {
  authAPI.signIn(formData.email, formData.password)
  .then(res => {
    // Set data Current User
    usersAPI.getUser(res.user.uid)
    .then(user => {
      // set user to state
      dispatch(setAuthCurrentUserData(user.name, user.surname, user.location, user.personalInformation, user.gender, user.uid, user.email, user.urlPhoto, user.status, true,   user.following,  user.followers, user.iLikePostsUids));
      // set localStorage
      const CurrentUserData = {
        name: user.name,
        surname: user.surname,
        location: {
          country: user.location.country,
          city: user.location.city
        },
        personalInformation: {
          job: user.personalInformation.job,
          education: user.personalInformation.education,
          hobby: user.personalInformation.hobby,
        },
        urlPhoto: user.urlPhoto,
        gender: user.gender,
        uid: user.uid,
        email: user.email,
        status: user.status,
        isAuth: true,
        following: user.following,
        followers: user.followers,
        iLikePostsUids: user.iLikePostsUids
      }
      localStorage.setItem('CurrentUserData', JSON.stringify(CurrentUserData))
    })
  })
  .catch(error => {
    dispatch(stopSubmit("SingIn", {_error: error.message}));
  });
}


export default authReducer;