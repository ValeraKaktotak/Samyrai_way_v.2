import React, {ChangeEvent, useState} from 'react';
import style from './MyProfile.module.css';
import Preloader from "../../Preloader/Preloader";
import defaultAvatar from "../../../assets/images/avatar.jpg";
import MyStatus from "./MyStatus";
import ProfileDataForm from "./ProfileDataForm";
import {profileType} from "../../../types/types";

type myOwnPropsType = {
    setPhoto: (data: any) => void
    userStatus: string
    setUserStatus: (data: string) => void
    setProfileData: (data: profileType) => any
    profile: profileType
    isOwner: boolean
}
type ProfileDataType = {
    editModeToggle: (data: any) => void
    avatarHandler: (data: any) => void
    isOwner: boolean
    profile: profileType
    userStatus: string
    setUserStatus: (data: string)=>void
}
type propsType = myOwnPropsType

const MyProfile: React.FC<propsType> = (props) => {
    let[editMode, setEditMode] = useState(false)

    const onSubmitFunction = (formData:any) => {
        props.setProfileData(formData).then(()=>{
            setEditMode(false)
        })
    }

    const avatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            props.setPhoto(e.target.files[0]);
        }
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
                {!editMode? <ProfileData avatarHandler={avatarHandler} editModeToggle={editModeToggle} {...props} />:
                    <ProfileDataForm initialValues={props.profile} {...props} onSubmit={onSubmitFunction} />}
            </div>
        )
    }
}

const ProfileData: React.FC<ProfileDataType> = (props) => {
    return(
        <div className={style.MyProfile}>
            {props.isOwner && <input type={"file"} onChange={props.avatarHandler}/>}
            <div className={style.user_block}>
                {props.isOwner && <button onClick={props.editModeToggle}>Edit my profile</button>}
                <img
                    src={!props.profile.photos.small ? defaultAvatar : props.profile.photos.small}
                    alt="user_photo"/>
                <div className={style.user_description}>
                    <MyStatus value={props.userStatus} setUserStatus={props.setUserStatus}/>
                    <h3>{props.profile.fullName}</h3>
                    <h3>?????? ???? ?? ????????????</h3>
                    <p>
                        {!props.profile.lookingForAJob ? <span>?????? :)</span> : <span>???? :(</span>}
                    </p>
                    {props.profile.lookingForAJob &&
                        <div>
                            <h3>?????????? ???????????? ?? ??????</h3>
                            <p>
                                {!props.profile.lookingForAJobDescription ?
                                    <span>???????????? ?????????????????????? :(</span> : props.profile.lookingForAJobDescription}
                            </p>
                        </div>}
                    <h3>?????? ??????</h3>
                    <p>
                        {!props.profile.aboutMe ?
                            <span>???????????? ?????????????????????? :(</span> : props.profile.aboutMe}
                    </p>
                    <h3>????????????????</h3>
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