const SET_POSTS = 'SET_POSTS';
const SET_ALL_FRIENDS = 'SET_ALL_FRIENDS';
const SET_LIKE = 'SET_LIKE';
const ALL_POSTS_IS_FETCHING = 'ALL_POSTS_IS_FETCHING';
const FRIENDS_IS_FETCHING = 'FRIENDS_IS_FETCHING';

const initialState = {
  allPosts: [],
  friends: [],
  allPostsIsFetching: false,
  friendsIsFetching: false,
}

const homeReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_POSTS: 
      return {
        ...state,
        allPosts: action.posts
        };
    case SET_ALL_FRIENDS: 
      return {
        ...state,
        friends: action.friends
        };
    case SET_LIKE: 
      return {
          ...state,
          allPosts: [
              ...state.allPosts.map(p => p.postId === action.post.postId ? action.post : p )
            ]
        };
    case ALL_POSTS_IS_FETCHING:
        return { ...state, allPostsIsFetching: action.payload }
    case FRIENDS_IS_FETCHING:
        return { ...state, friendsIsFetching: action.payload }
  default: 
      return state;
  }
}

export const setPosts = (posts) =>  ({type: SET_POSTS, posts})
export const setAllFriends = (friends) =>  ({type: SET_ALL_FRIENDS, friends})
export const setLikeHome = (postId, post) =>  ({type: SET_LIKE, postId, post})
export const setAllPostIsFetching = (payload) =>  ({type: ALL_POSTS_IS_FETCHING, payload})
export const setFriendsIsFetching = (payload) =>  ({type: FRIENDS_IS_FETCHING, payload})

export default homeReducer;
