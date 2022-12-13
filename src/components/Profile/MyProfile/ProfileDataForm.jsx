import style from "./MyProfile.module.css";
import defaultAvatar from "../../../assets/images/avatar.jpg";
import MyStatus from "./MyStatus";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLength200, required} from "../../../helpers/validators";
import {Element} from "../../commons/FormsControls/FormsControls";

const Input = Element("input");
const Textarea = Element("textarea");

const ProfileDataForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit} className={style.MyProfile}>
            <div className={style.user_block}>
                <img
                    src={!props.profile.photos.small ? defaultAvatar : props.profile.photos.small}
                    alt="user_photo"/>
                <div className={style.user_description}>
                    {/*статус и кнопка для редактирования аватарки*/}
                    {/*<MyStatus value={props.userStatus} setUserStatus={props.setUserStatus}/>*/}
                    {/*{props.isOwner && <input type={"file"} onChange={props.avatarHandler}/>}*/}
                    <div>
                        <label htmlFor="fullName">Enter your full name</label>
                        <Field placeholder="Full name" name="fullName" component={Input} type="text" validate={[required]} />
                    </ div>
                    <div>
                        <label htmlFor="lookingForAJob">Looking for a job?</label>
                        <Field name="lookingForAJob" component={Input} type="checkbox" />
                    </ div>
                    <div>
                        <label htmlFor="lookingForAJobDescription">Describe what job you looking</label>
                        <Field placeholder="enter description" name="lookingForAJobDescription" component={Textarea} type="text" validate={[required]} />
                    </div>
                    <div>
                        <label htmlFor="aboutMe">About me</label>
                        <Field placeholder="About me" name="aboutMe" component={Textarea} type="text" validate={[required, maxLength200]} />
                    </div>
                    <h3>Контакты</h3>
                    <div>
                        {Object.entries(props.profile.contacts).map(([key, value]) => {
                            return <div><b>{key} :</b> <Field placeholder={key} name={"contacts."+key} component={Input} type="text" /></div>
                        })}
                    </div>
                    {props.error && <div className={style.error}>{props.error}</div>}
                    <div>
                        <button>Save</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

const ProfileDataFormWithReduxForm = reduxForm({
    // a unique name for the form
    form: 'profile-data'
})(ProfileDataForm)


export default ProfileDataFormWithReduxForm