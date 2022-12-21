import React from 'react'
import style from './UserDialog.module.css';
import {NavLink} from "react-router-dom";

type propsType = {
    id: number
    name: string
}

const UserDialog = (prop: propsType) => {
    return (
        <div className={style.user_dialog}>
            <NavLink to={"/dialogs/" + prop.id}>{prop.name}</NavLink>
        </div>
    );
}

export default UserDialog