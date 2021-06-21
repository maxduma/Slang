import { usersAPI } from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

const initialState = {
    users: [],
    pageSize: 3,
    totalUsersCount: '',
    currentPage: 1,
    isFetching: false,
    isFollowingInProgress: [],
    portionSize: 3
}

const usersReducer = (state = initialState, action) => {
  switch(action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.uid === action.uid) {
            return {...u, followed: true}
          }
          return u;
        })
      }
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.uid === action.uid) {
            return {...u, followed: false}
          }
          return u;
        })
      }
      case SET_USERS:
        return {
          ...state, users: action.users
        }
      case SET_CURRENT_PAGE:
        return {
          ...state, currentPage: action.currentPage
        }
      case SET_TOTAL_USERS_COUNT:
        return { ...state, totalUsersCount: action.count };
      case TOGGLE_IS_FETCHING:
        return { ...state, isFetching: action.isFetching }
      case TOGGLE_IS_FOLLOWING_PROGRESS:
        return { ...state, 
          isFollowingInProgress: action.isFetching ?
            [ ...state.isFollowingInProgress, action.uid ]
          : state.isFollowingInProgress.filter(uid => uid !== action.uid) }
    default: 
      return state;
  }
}

export const follow = (uid) =>  ({type: FOLLOW, uid})
export const unfollow = (uid) => ({type: UNFOLLOW, uid})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalCount})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching})
export const toggleIsFollowingProgress = (isFetching, uid) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, uid })

export const getUsersThunkCreator = (myUid, currentPage, pageSize, following, pageNumber) => {
  return (dispatch) => {
  dispatch(toggleIsFetching(true));  // Spinner
  dispatch(setCurrentPage(pageNumber))
  // Get users 
  usersAPI.getAllUsers()
  .then(data => {
    // get users
    const users = Object.values(data);
      // Do not show my page 
      const newUsers = [];
      Object.values(users).map(user => {
        if (user.uid !== myUid) {
          newUsers.push(user)
        }
      })
    // set Total Users
    dispatch(setTotalUsersCount(newUsers.length)) //  DataBase need refactoring => res.data.totalCount 
    // Set users according to the pageSize ||  "pageSize (5)"  // DataBase need refactoring => this need delete later
    const startPage =  (currentPage - 1) * pageSize;
    const lastPage = startPage + pageSize;
    let partUsers = [];
    for (let key in newUsers) { 
      if ( key >= startPage && key < lastPage  ) {
        partUsers.push(newUsers[key])
      } 
    }
    // set followed Status
    Object.values(partUsers).map(u => {
      following.map(myId => {
          if (u.uid === myId) {
            u.followed = true
          }
      })
    })
    // set Users to state
    dispatch(setUsers(partUsers));
    dispatch(toggleIsFetching(false));  // Spinner
  })
  }
};
export default usersReducer;