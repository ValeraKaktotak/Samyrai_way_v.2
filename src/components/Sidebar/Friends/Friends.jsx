import React from 'react';
import FriendsList from "./FriendsList/FriendsList";
import style from './Friends.module.css';

const Friends = (props) => {

    const arrFriendsList = props.friendsList.map(f => <FriendsList key={f.id} avatar={f.avatar}/>);

    return (
        <div className={style.friends_block}>
            {arrFriendsList}
        </div>
    )

}

export default Friends