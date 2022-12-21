import React from 'react';
import style from './MyPost.module.css';

type propsType = {
    avatar: string
    message: string
    likes: number
}

const MyPost: React.FC<propsType> = (props) => {
    return(
        <div className={style.my_post}>
            <img src={props.avatar} alt="#"/>
            <p className={style.message}>{props.message}</p>
            <div>Likes: {props.likes}</div>
        </div>
    );
}

export default MyPost