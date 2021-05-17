import React from 'react'
import {NavLink} from 'react-router-dom';

import c from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={c.navWrapper}>

            <div className={c.item}>
                 <NavLink to="/profile" activeClassName={c.active}>Profile</NavLink> 
            </div>
            <div className={c.item}>
                <NavLink to="/dialogs" activeClassName={c.active}>Messages</NavLink> 
            </div>
            <div className={c.item}>
                <NavLink to="/users" activeClassName={c.active}>Users</NavLink> 
            </div>
            <div className={c.item}>
                 <NavLink to="/news" activeClassName={c.active}>News</NavLink> 
            </div>
            <div className={c.item}>
                <NavLink to="/music" activeClassName={c.active}>Music</NavLink> 
            </div>
            <div className={c.item}>
                <NavLink to="/settings" activeClassName={c.active}>Settings</NavLink> 
            </div>
       </nav>
    )
}

export default Navbar;