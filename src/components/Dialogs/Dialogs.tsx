import React from 'react';
import style from './Dialogs.module.css';
import UserMessagesContainer from "./UserMessages/UserMessagesContainer";
import UserDialogsContainer from "./UserDialogs/UserDialogsContainer";

const Dialogs = () => {
    return(
        <div className={style.dialogs}>
            <UserDialogsContainer />
            <UserMessagesContainer />
        </div>
    );
}

export default Dialogs