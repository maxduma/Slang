import React from 'react';
import Spinner from '../../common/Spinner/Spinner';
import c from  './ProfileData.module.css';
import editImg from '../../../assets/edit.png';
import locationImg from '../../../assets/location.png';
import jobImg from '../../../assets/job.png';
import hobbyImg from '../../../assets/hobby.png';
import educationImg from '../../../assets/education.png';

const ProfileData = ({profile, isOwner, goToEditMode, profile: {name, personalInformation: {job, hobby, education},  surname, location: { country, city } }}) => {
  if (!profile) {
    return <Spinner />
  }

  return (
    <div className={c.profileDataWrapper}>
      {isOwner && 
      <div className={c.btnEditWrapper}>
        <button className={c.btnEdit} onClick={goToEditMode}>
          <img className={c.imgEdit} src={editImg} alt={'edit'}/>
        </button>
      </div>
      }
      <div className={c.flex}>
        <h2 className={c.m}>{name} </h2>
        <h2 className={c.m}>{surname}</h2>
      </div>
      <div className={c.flexLocation}>
        <img className={c.location} src={locationImg} alt={'edit'}/>
        <p className={c.m}>{country}</p>
        <p className={c.m}>{city}</p>
      </div>
      {job && 
        <div className={c.flexLocation}>
        <img className={c.jobImg} src={jobImg} alt={'job'}/>
        <p className={c.m}>{job}</p>
      </div>
      }
      {education && 
        <div className={c.flexLocation}>
        <img className={c.educationImg} src={educationImg} alt={'job'}/>
        <p className={c.m}>{education}</p>
      </div>
      }
      {hobby && 
        <div className={c.flexLocation}>
        <img className={c.hobbyImg} src={hobbyImg} alt={'job'}/>
        <p className={c.m}>{hobby}</p>
      </div>
      }
    </div>
  )
};
export default ProfileData;