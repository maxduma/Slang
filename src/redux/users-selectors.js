import {createSelector} from "reselect";

export const getUsers = (state) => {
  return state.usersPage.users
}

// export const getUsersSuper = createSelector(getUsers, getIsFetching, (users, IsFetching) => {
//   return users.usersPage.users.filter(u => true)
// })

export const getPageSize = (state) => {
  return state.usersPage.pageSize
}
export const getTotalUsersCount = (state) => {
  return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state) => {
  return state.usersPage.currentPage
}
export const getIsFetching = (state) => {
  return state.usersPage.isFetching
}
export const getCurrentUserDataUid = (state) => {
  return state.auth.currentUserData.uid
}
export const getCurrentUserDataFollowing = (state) => {
  return state.auth.currentUserData.following
}
export const getNotMyFollowers = (state) => {
  return state.auth.notMyFollowers
}
export const getIsFollowingInProgress = (state) => {
  return state.usersPage.isFollowingInProgress
}
export const getPortionSize = (state) => {
  return state.usersPage.portionSize
}