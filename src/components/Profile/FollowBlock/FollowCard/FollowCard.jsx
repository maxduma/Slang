import React from 'react'
// import Spinner from '../common/Spinner/Spinner';
import c from  './FollowCard.module.css';
import {NavLink} from 'react-router-dom';
import userPhotoMan from '../../../../assets/defaultMan.png';
import userPhotoWoman from '../../../../assets/defaultWoman.png';


const FollowCard = ({urlPhoto, name, surname, gender, uid}) => {

  const defaultPhoto = gender === 'male' ? userPhotoMan : userPhotoWoman;
  return (
    <div>
      <NavLink to={'/profile/' + uid }>
        <div className={c.followWrapper}>
            <div >
              <img className={c.img} src={urlPhoto ? urlPhoto : defaultPhoto} alt={c.name} />
            </div>
            <div className={c.fullnameWrapper}>
              <div className={c.name}>{name}</div>
              <div>{surname}</div>
            </div>
        </div>
      </NavLink>
    </div>
    

  )
}

export default FollowCard;