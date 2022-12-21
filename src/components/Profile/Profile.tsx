import React from 'react';
import style from './Profile.module.css';
import MyPostsContainer from "./Myposts/MyPostsContainer";
import MyProfileContainer from "./MyProfile/MyProfileContainer";

const Profile = () => {
    return (
        <article className={style.profile}>
            <MyProfileContainer />
            <MyPostsContainer />
        </article>);
}

export default Profile