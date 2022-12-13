import React from 'react';
import style from './Header.module.css';
import {NavLink} from "react-router-dom";
const Header = (props) => {
    return (
        <header className={style.header}>
            <img src="https://assets.turbologo.ru/blog/ru/2019/04/18165419/oracle.png" alt="sky"/>
            <div className={style.login}>
                {!props.auth?
                    <NavLink to="/login" >Login</NavLink>
                    :<div>
                        <NavLink to={`/profile/${props.userId}`} >{props.loginName}</NavLink>
                        <button onClick={props.logOut}>Log out</button>
                    </div>}
            </div>
        </header>
    );
}

export default Header