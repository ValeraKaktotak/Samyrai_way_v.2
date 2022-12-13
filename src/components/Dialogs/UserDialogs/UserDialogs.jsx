import React from 'react';
import style from './UserDialogs.module.css'
import UserDialog from "./UserDialog/UserDialog";

const UserDialogs = (props) => {
    const dialogs = props.dialogs.map(d => <UserDialog key={d.id} name={d.name} id={d.id} />);
    return(
        <div className={style.user_dialogs}>
            { dialogs }
        </div>
    );
}

export default UserDialogs