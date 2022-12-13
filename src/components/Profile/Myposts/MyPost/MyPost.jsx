import React from 'react';
import style from './MyPost.module.css';

const MyPost = (props) => {
    return(
        <div className={style.my_post}>
            <img src={props.avatar} alt="#"/>
            <p className={style.message}>{props.message}</p>
            <div>Likes: {props.likes}</div>
        </div>
    );
}

export default MyPost