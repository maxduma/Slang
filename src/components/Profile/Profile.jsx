import React, { useState } from 'react'
import Spinner from '../common/Spinner/Spinner';
import c from  './Profile.module.css';
import userPhotoMan from '../../assets/defaultMan.png';
import userPhotoWoman from '../../assets/defaultWoman.png';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import MyPostsContainer from './MyPost/MyPostsContainer';
import FollowBlock from './FollowBlock/FollowBlock';
import { Field, reduxForm } from "redux-form";
import { emptyField, maxLengthCreator } from '../../utils/validators/validators';
import { Input } from '../common/FormsControls/FormsControls';
import ProfileData from './ProfileData/ProfileData';
import ProfileDataForm from './ProfileDataForm/ProfileDataForm';

const Profile = ({ posts, changeUrlPhotoThunk, changeProfileDataForm, isOwner, profile, myUid, profile: { gender, following, followers, uid, status, urlPhoto }, patchStatus  }) => {
  const [avaChangeActive, setAvaChangeActive] = useState(false);
  const [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Spinner />
  }

  // const onMainPhotoSelected = (e) => {
  //   if(e.target.files.length) {
  //     savePhoto(e.target.files[0])
  //   }
  // }

  const avaChangeActiveBtn = () => {
    avaChangeActive ?
    setAvaChangeActive(false) :   setAvaChangeActive(true)
  }

  const onSubmit = (formData) => {
    changeUrlPhotoThunk(formData.urlPhoto, myUid);
    setAvaChangeActive(false);
  };

  const onSubmitForm = (formData) => {
    console.log("formData", formData)
     changeProfileDataForm(formData)
      setEditMode(false);
  };


  const defaultPhoto = gender === 'male' ? userPhotoMan : userPhotoWoman;
  
  return (
    <div>
      <div>
        <img  className={c.wallpaper}  src="https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg" alt=""/>
      </div>

      <div className={c.flex}>
        <div className={c.avaWrapper}>
          {isOwner ? 
            <button onClick={avaChangeActiveBtn} className={c.avaBtn}> 
              <img className={c.ava} alt="" src={urlPhoto ? urlPhoto : defaultPhoto} />
            </button> 
            : <img className={c.ava} alt="" src={urlPhoto ? urlPhoto : defaultPhoto} />
          }
          {isOwner && avaChangeActive &&
          // <input type={'text'} onChange={changeUrlPhotoInput}/>
            <UrlPhotoReduxForm onSubmit={onSubmit} />
          }
        </div>
        <div className={c.statusWrapper}>
          <ProfileStatus status={status} myUid={myUid} currentProfileUid={uid} patchStatus={patchStatus} />
        </div>
      </div>
      <div className={c.profileBottomWrapper}>
      <div  className={c.sidebar}>

      { editMode 
      ? <ProfileDataForm  profile={profile} onSubmitForm={onSubmitForm}/>
      : <ProfileData 
          profile={profile} 
          isOwner={isOwner} 
          goToEditMode={() => {setEditMode(true)}} />
       }
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
      <MyPostsContainer posts={posts}/>
      </div>
    </div>
  )
}

export default Profile;
const maxLength300 = maxLengthCreator(300);

const urlPhotoForm = (props) => {
  return (
    <>
      <form onSubmit={props.handleSubmit} >
      <div>
        <Field
          placeholder={"enter your URL photo..."}
          type="text"
          name={"urlPhoto"}
          component={Input}
          validate={[ maxLength300, emptyField ]}
          />
          <p className={c.tips}>P.S. Upload a square photo</p>
      </div>
        <button className={c.changePhotoBtn}>Change Photo</button>
      </form>
    </>
  );
};

const UrlPhotoReduxForm = reduxForm({ form: "urlPhotoForm" })(urlPhotoForm);