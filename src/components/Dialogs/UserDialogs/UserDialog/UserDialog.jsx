import style from './UserDialog.module.css';
import {NavLink} from "react-router-dom";

const UserDialog = (prop) => {
    return(
        <div className={style.user_dialog}>
            <NavLink to={"/dialogs/"+prop.id}>{prop.name}</NavLink>
        </div>
    );
}

export default UserDialog