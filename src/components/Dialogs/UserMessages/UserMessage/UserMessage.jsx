import style from './UserMessage.module.css';

const UserMessage = (props) => {
    return(
        <div className={style.user_message}>
            {props.message}
        </div>
    );
}

export default UserMessage