import React from 'react'
import style from './UserMessage.module.css';

type propsType = {
    message: string
}

const UserMessage:React.FC<propsType> = (props) => {
    return(
        <div className={style.user_message}>
            {props.message}
        </div>
    );
}

export default UserMessage