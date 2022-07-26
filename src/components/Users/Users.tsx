import React from 'react';
import Pagination from '../common/Paginator/Pagination';
import User from './User/User';

type PropsType = {
  users: Array<Object>
  totalUsersCount: number
  pageSize: number
  currentPage: number
  follow: (uid: string) => void
  addFollow: (uid: string) => void
  unfollow: (uid: string) => void
  removeFollow:  (uid: string) => void
  isFollowingInProgress: Boolean
  onPageChanged: (pageNumber: number) => void
  portionSize: number
}

const Users: React.FC<PropsType> = ({users, totalUsersCount, pageSize, currentPage, follow, addFollow, unfollow, removeFollow, isFollowingInProgress, onPageChanged, portionSize}) => {
  const followFun = (uid: string) => {
    follow(uid)
    addFollow(uid)
  }
  const unfollowFun = (uid: string) => {
    unfollow(uid)
    removeFollow(uid)
  }

  return (
    <div>
      <Pagination currentPage={currentPage} totalItemsCount={totalUsersCount} pageSize={pageSize} onPageChanged={onPageChanged} portionSize={portionSize} />
      {
        users.map(u =>
          <User
            user={u} 
            isFollowingInProgress={isFollowingInProgress} 
            followFun={followFun}
            unfollowFun={unfollowFun}
            key={u.uid} />
          )
      }
    </div>
  )
};
export default Users;