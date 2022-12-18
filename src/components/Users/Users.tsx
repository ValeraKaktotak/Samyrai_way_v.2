import style from './Users.module.css';
import React from "react";
import Paginator from "../commons/paginator/Paginator";

type propsType = {
    usersCount: number
    usersCountOnPage: number
    usersCurrentPage: number
    pagesInBlock?: number
    changePage: (page: number, usersCountOnPage: number) => void
    buildUsers: () => any
}

const Users: React.FC<propsType> = (props) => {

    return (
        <div className={style.users}>
            <Paginator {...props} pagesInBlock={10}/>
            {props.buildUsers()}
        </div>
    )
}

export default Users