import React from 'react'
import Spinner from '../common/Spinner/Spinner';
import c from  './Profile.module.css';
import userPhotoMan from '../../assets/defaultMan.png';
import userPhotoWoman from '../../assets/defaultWoman.png';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import MyPostsContainer from './MyPost/MyPostsContainer';
import FollowBlock from './FollowBlock/FollowBlock';

const ProfileInfo = ({ profile, myUid, profile: {name, surname, gender, location: { country, city }, following, followers, uid, status, urlPhoto }, patchStatus  }) => {


  if (!profile) {
    return <Spinner />
  }

  const defaultPhoto = gender === 'male' ? userPhotoMan : userPhotoWoman;
  return (
    <div>
      <div>
        <img  className={c.wallpaper}  src="https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg" alt=""/>
      </div>

      <div className={c.flex}>
        <div className={c.avaWrapper}>
          <img className={c.ava} alt="" src={urlPhoto ? urlPhoto : defaultPhoto} />
        </div>
        <div className={c.statusWrapper}>
          <ProfileStatus status={status} myUid={myUid} currentProfileUid={uid} patchStatus={patchStatus} />
        </div>
      </div>

      <div className={c.profileBottomWrapper}>

      <div  className={c.sidebar}>

        <div className={c.flex}>
          <h2 className={c.mr}>{name} </h2>
          <h2>{surname}</h2>
        </div>

        <div className={c.flex}>
          <p className={c.mr}>{country}</p>
          <p>{city}</p>
        </div>

        <div>
          <div className={c.followBlockWrapper}>
            <p>following: {following.length - 1}</p>
            <div>
              <FollowBlock followList={following} />
            </div>
          </div>
          <div className={c.followBlockWrapper}>
            <p>followers: {followers.length - 1}</p>
            <div>
              <FollowBlock followList={followers}/>
            </div>
          </div>
        </div>
      </div>

      <MyPostsContainer />

      </div>
      
    </div>
  )
}

export default ProfileInfo;