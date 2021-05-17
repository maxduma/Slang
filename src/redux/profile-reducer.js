import { profileAPI, usersAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const ADD_ALL_POSTS = 'ADD_ALL_POSTS';
const ADD_LIKE = 'ADD_LIKE';
const SET_CURRENT_USER_DATA_I_LIKE_POST_UIDS = 'SET_CURRENT_USER_DATA_I_LIKE_POST_UIDS';

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

    // console.log('profileReducer state', state)
    // console.log('profileReducer action', action)

    switch(action.type) {
      case ADD_POST: 
        const newPost = {
          id: action.postData.postId,
          text: action.postData.text,
          isLike: action.postData.isLike,
          likesUid: action.postData.likesUid,
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
      // const newAllPosts = action.posts.reverse()                     //   ????????????????????????????????
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
              posts: [ ...state.profile.posts.filter(p => p.id !== action.postId) ]
            }
          }

      // case SET_USER_PROFILE: 
      //  return {
      //     ...state,
      //     profile: {  
      //       ...action.profile,
      //       posts: { ...state.profile.posts}
      //     }
      //   };

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

      // case ADD_LIKE: 
      //  return {
      //     ...state,
      //     profile: { ...state.profile,
      //       posts: [
      //         ...state.profile.posts.filter(p => p.id !== action.postId), action.post
      //       ]
      //     }
      //   };
      case ADD_LIKE: 
       return {
          ...state,
          profile: { ...state.profile,
            posts: [
              ...state.profile.posts.map(p => p.id === action.post.id ? action.post : p )
            ]
          }
        };
        // return {
        //   ...state,
        //   array: state.array.map(n => n.id === action.newObject.id ? action.newObject : n),
        // };

      // case ADD_LIKE: 
      //  return {
      //     ...state,
      //     profile: { ...state.profile,
      //       posts: [
      //         ...state.profile.posts.splice(state.profile.posts.indexOf(action.postId)),
      //         action.post,
      //         ...state.profile.posts.splice(0, state.profile.posts.indexOf(action.postId) + 1) 
      //       ]
      //     }
      //   };

      // case ADD_LIKE: 
      // const array = state.profile.posts.reverse();
      // const prev = array.slice(0, state.profile.posts.indexOf(action.postId) - 1);
      // const next = array.slice(state.profile.posts.indexOf(action.postId));
      //  return {
      //     ...state,
      //     profile: { ...state.profile,
      //       posts: [
      //         ...prev,
      //         action.post,
      //         ...next
      //       ]
      //     }
      //   };
      // case ADD_LIKE: 
      // const array = state.profile.posts.reverse();
      // array.map((p, index) => {
      //   if(index !== array.indexOf(action.postId)) {
      //     return p
      //   }
      //   return {
      //     ...p,
      //     ...action.post
      //   }

      // })
      //  return {
      //     ...state,
      //     profile: { ...state.profile,
      //       posts: [
      //         ...array
      //       ]
      //     }
      //   };
        case SET_CURRENT_USER_DATA_I_LIKE_POST_UIDS:
          return { ...state,
            profile: { ...state.profile,
              iLikePostsUids: action.iLikePostsUids
            }
          }

      default: 
        return state;
    }
}

export const addPostActionCreator = (postData) =>  ({type: ADD_POST, postData})
export const addLike = (postId, post) =>  ({type: ADD_LIKE, postId, post})
export const addAllPosts = (posts) =>  ({type: ADD_ALL_POSTS, posts})
export const deletePostAC = (postId) =>  ({type: DELETE_POST, postId})
const setUserProfile = (profile, posts ) => ({type: SET_USER_PROFILE, profile, posts })
const setStatus = (status) => ({type: SET_STATUS, status })
export const setILikePostsUids = ( iLikePostsUids ) => ({type: SET_CURRENT_USER_DATA_I_LIKE_POST_UIDS, iLikePostsUids });

export const getUserProfile = (userId) => (dispatch) => {
  usersAPI.getUser(userId)
  .then(res => {
    if (res.posts) {
      const posts = [];
      Object.values(res.posts).map(post => {
        //set like status
        res.iLikePostsUids.map(likeUid => {
          if (likeUid === post.id) {
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
  const responce = await profileAPI.getStatus(userId)
        dispatch(setStatus(responce.data));
}

export const patchStatus = (myUid, NewStatus) => async (dispatch) => {
  const responce = await profileAPI.patchStatus(myUid, NewStatus)
        dispatch(setStatus(Object.values(responce.data).join()));
}

export default profileReducer;