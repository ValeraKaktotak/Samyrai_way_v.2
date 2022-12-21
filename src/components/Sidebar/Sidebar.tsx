import React from 'react';
import style from './Sidebar.module.css';
import {NavLink} from "react-router-dom";
import FriendsContainer from "./Friends/FriendsContainer";

const Sidebar:React.FC<any> = () => {
    return (
        <nav className={style.sidebar}>
            <ul>
                {/*<li><NavLink to="/profile" className = { navData => navData.isActive ? style.active: '' } >Profile</NavLink></li>*/}
                <li><NavLink className={({ isActive }) =>
                    isActive ? style.active : undefined
                } to="/profile"  >Profile</NavLink></li>
                <li><NavLink to="/dialogs" className = { navData => navData.isActive ? style.active: ''} >Messages</NavLink></li>
                <li><NavLink to="/users" className = { navData => navData.isActive ? style.active: ''} >Users</NavLink></li>
                <li><NavLink to="/news" className = { navData => navData.isActive ? style.active: ''} >News</NavLink></li>
                <li><NavLink to="/music" className = { navData => navData.isActive ? style.active: ''} >Music</NavLink></li>
                <li><NavLink to="/settings" className = { navData => navData.isActive ? style.active: ''} >Settings</NavLink></li>
                <li><NavLink to="/login" className = { navData => navData.isActive ? style.active: ''} >Login</NavLink></li>
            </ul>
            <h3>My friends</h3>
            <FriendsContainer />
        </nav>
    );
}



export default Sidebar