import React from 'react';
import styles from './users.module.css';
import Pagination from '../common/Paginator/Pagination';
import User from './User/User';


const Users = ({users, totalUsersCount, pageSize, currentPage, follow, addFollow, unfollow, removeFollow, isFollowingInProgress, onPageChanged, portionSize}) => {

  const followFun = (uid) => {
    follow(uid)
    addFollow(uid)
  }

  const unfollowFun = (uid) => {
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
}

export default Users;