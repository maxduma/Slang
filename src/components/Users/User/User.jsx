import React from 'react';
import c from './user.module.css';
import userPhotoMan from '../../../assets/defaultMan.png';
import userPhotoWoman from '../../../assets/defaultWoman.png';
import { NavLink } from 'react-router-dom'

const User = ({user, isFollowingInProgress, followFun, unfollowFun}) => {
  const defaultPhoto = user.gender === 'male' ? userPhotoMan : userPhotoWoman;
  return (
    <div>
      {
        <div className={c.wrapper}>
          <div className={c.userPhotoContainer}>
            <div className={c.userPhotoWrapper}>
              <NavLink to={'/profile/' + user.uid} >
                <img className={c.userPhoto} src={user.urlPhoto ? user.urlPhoto : defaultPhoto} alt="" />
              </NavLink>
            </div>
          </div>
          <span>
            <div className={c.content}>
                <div className={c.name}>{user.name} {user.surname}</div>
            </div>
            <div className={c.content}>
                <div className={c.location}>{user.location.country} {user.location.city}</div> 
            </div>
          </span>
          <div  className={c.btnBlock}>
              { user.followed ?  
              <button className={c.btnUnfollow} disabled={isFollowingInProgress.some(uid => uid === user.uid)} onClick={() => {unfollowFun(user.uid)}}>unfollow</button> : 
              <button className={c.btnFollow} disabled={isFollowingInProgress.some(uid => uid === user.uid)} onClick={() => {followFun(user.uid)}}>follow</button>}
          </div>
          </div>
      }
    </div>
  )
};
export default User;