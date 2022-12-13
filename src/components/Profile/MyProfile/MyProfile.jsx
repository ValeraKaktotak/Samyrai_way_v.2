import React, {useState} from 'react';
import style from './MyProfile.module.css';
import Preloader from "../../Preloader/Preloader";
import defaultAvatar from "../../../assets/images/avatar.jpg";
import MyStatus from "./MyStatus";
import ProfileDataForm from "./ProfileDataForm";

const MyProfile = (props) => {
    let[editMode, setEditMode] = useState(false)

    const onSubmitFunction = (formData) => {
        props.setProfileData(formData).then(()=>{
            setEditMode(false)
        })
    }

    const avatarHandler = (e) => {
        this.props.setPhoto(e.target.files[0])
    }
    const editModeToggle = () => {
        setEditMode(true)
    }

    if (!props.profile) {
        return (
            <Preloader/>
        )
    } else {
        return (
            <div>
                {!editMode? <ProfileData editModeToggle={editModeToggle} avatarHandler={avatarHandler} {...props} />:
                    <ProfileDataForm initialValues={props.profile} {...props} onSubmit={onSubmitFunction} />}
            </div>
        )
    }
}

const ProfileData = (props) => {
    return(
        <div className={style.MyProfile}>
            <div className={style.user_block}>
                {props.isOwner && <button onClick={props.editModeToggle}>Edit my profile</button>}
                <img
                    src={!props.profile.photos.small ? defaultAvatar : props.profile.photos.small}
                    alt="user_photo"/>
                <div className={style.user_description}>
                    <MyStatus value={props.userStatus} setUserStatus={props.setUserStatus}/>
                    <h3>{props.profile.fullName}</h3>
                    <h3>Ищу ли я работу</h3>
                    <p>
                        {!props.profile.lookingForAJob ? <span>Нет :)</span> : <span>Да :(</span>}
                    </p>
                    {props.profile.lookingForAJob &&
                        <div>
                            <h3>Какую работу я ищу</h3>
                            <p>
                                {!props.profile.lookingForAJobDescription ?
                                    <span>Данные отсутствуют :(</span> : props.profile.lookingForAJobDescription}
                            </p>
                        </div>}
                    <h3>Обо мне</h3>
                    <p>
                        {!props.profile.aboutMe ?
                            <span>Данные отсутствуют :(</span> : props.profile.aboutMe}
                    </p>
                    <h3>Контакты</h3>
                    <div>
                        {Object.entries(props.profile.contacts).map(([key, value]) => {
                            return <div key={key}><b>{key}</b>:<span> {value}</span></div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile