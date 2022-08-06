import React from 'react';
import Pagination from '../common/Paginator/Pagination';
import User from './User/User';
import { UserType } from '../../types';
import { getPageSize, getUsers, getTotalUsersCount, getCurrentPage, getIsFollowingInProgress, getPortionSize } from '../../redux/users-selectors';

import { useDispatch, useSelector } from 'react-redux';

type PropsType = {
  // users: Array<UserType>
  // totalUsersCount: number
  // pageSize: number
  // currentPage: number
  // portionSize: number
  // isFollowingInProgress: Array<string>

  follow: (uid: string) => void
  unfollow: (uid: string) => void
  addFollow: (uid: number) => void
  removeFollow:  (uid: number) => void
  onPageChanged: (pageNumber: number) => void
}

const Users: React.FC<PropsType> = ({ follow, unfollow, addFollow, removeFollow, onPageChanged}) => {

  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getCurrentPage);
  const isFollowingInProgress = useSelector(getIsFollowingInProgress);
  const portionSize = useSelector(getPortionSize);

  const followFun = (uid: any ) => {
    follow(uid)
    addFollow(uid)
  }
  const unfollowFun = (uid: any) => {
    unfollow(uid)
    removeFollow(uid)
  }

  return (
    <div>
      <Pagination currentPage={currentPage} totalItemsCount={totalUsersCount} pageSize={pageSize} onPageChanged={onPageChanged} portionSize={portionSize} />
      {
        //@ts-ignore
        users.map((u) =>
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