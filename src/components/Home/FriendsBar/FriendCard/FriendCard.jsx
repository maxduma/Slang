import React from 'react'
// import Spinner from '../common/Spinner/Spinner';
import c from  './FriendCard.module.css';
import {NavLink} from 'react-router-dom';

const FriendCard = ({f}) => {


  return (
    <div className={c.friendCardWrapper}>
      <NavLink className={c.link} to={'/profile/' + f.uid} >
        <div className={c.blockWrapper}>
          <img className={c.friendCardImg} src={f.urlPhoto}  alt={f.name}/>
          <div className={c.friendCardName}>{f.name}</div>
          <div className={c.friendCardSurname}>{f.surname}</div>
        </div>
      </NavLink>
    </div>
  )
}

export default FriendCard;
