import React from 'react';
import c from './user.module.css';
import userPhotoMan from '../../../assets/defaultMan.png';
import userPhotoWoman from '../../../assets/defaultWoman.png';
import { NavLink } from 'react-router-dom'

type UserType = {
  name: string
  surname: string
  email: string
  followed: Boolean
  followers: Array<string>
  following: Array<string>
  gender: string
  iLikePostsUids: Array<string>
  location: {
    city: string
    country: string
  }
  personalInformation: {
    education: string
    hobby: string
    job: string
  }
  posts: {
    data: {
      day: string
      hours: string
      minutes: string
      month: string
      year: string
    }
    isLike: string
    likesUid: Array<string>
    ownerPostName: string
    ownerPostSurname: string
    ownerPostUid: string
    ownerPostUrlPhoto: string
    postId: string
  }
  status: string
  uid: string
  urlPhoto: string
}

type PropsType = {
  user: UserType
  isFollowingInProgress: Array<string>
  followFun: (uid: string) => void
  unfollowFun: (uid: string) => void
}

const User: React.FC<PropsType> = ({user, isFollowingInProgress, followFun, unfollowFun}) => {
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