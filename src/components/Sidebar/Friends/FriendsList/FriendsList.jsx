import React from 'react';
import style from "./FriendsList.module.css";

const FriendsList = (props) =>{
    return (
        <div className={style.friends}>
            <img src={props.avatar} alt="friend"/>
        </div>
    );
}

export default FriendsList