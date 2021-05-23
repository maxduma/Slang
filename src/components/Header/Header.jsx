import React from 'react'
import {NavLink} from 'react-router-dom';

import c from './Header.module.css';
import userPhotoMan from '../../assets/defaultMan.png';
import userPhotoWoman from '../../assets/defaultWoman.png';
import logo from '../../assets/logo.png';

const Header = (props) => {
  const defaultPhoto = props.gender === 'male' ? userPhotoMan : userPhotoWoman;
  return (
    <header className={c.header}>
      <div  className={c.innerWrapper}>
        <div className={c.headerLeft}>
          <img className={c.img} alt='' src={logo} />
        </div>
        <div className={c.headerRight}>
          <div className={c.loginBlock}>
            <div className={c.headerRightWrapper}>
              {props.isAuth ? 
                <div className={c.headerCurrentUserData}>
                  <NavLink to={'/profile'} >
                    <div className={c.myPage}>
                      <h5>{props.name}</h5>
                      <img className={c.headerAva} src={props.urlPhoto ? props.urlPhoto : defaultPhoto} alt={props.name} />
                    </div>
                  </NavLink>
                  <button  className={c.btnLogout} onClick={props.logout}>Log out</button>
              </div>
              :
              <div>
                <NavLink to={'/login'}>
                  <div className={c.btnLogin}>
                    Login
                  </div>
                </NavLink>
              </div> 
          }
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;