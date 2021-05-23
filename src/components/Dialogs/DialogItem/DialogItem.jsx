import React from 'react'
import { NavLink } from 'react-router-dom';
import userPhotoMan from '../../../assets/defaultMan.png';
import userPhotoWoman from '../../../assets/defaultWoman.png';
import c from './DialogItem.module.css';

const DialogItem = ({id, name, surname, gender, uplPhoto}) => {
  let path = "/dialogs/" + id;
  const defaultPhoto = gender === 'male' ? userPhotoMan : userPhotoWoman;
  return (
    <div className={c.dialogItem + ' ' + c.active}>
      <NavLink to={path} className={c.dialogItemText}>
        <div>
          <img className={c.img} src={uplPhoto ? uplPhoto : defaultPhoto } alt={name}/>
        </div>
        <div className={c.fullName}>
          {name}{surname}
        </div>
      </NavLink> 
    </div>
  )
}

export default DialogItem;