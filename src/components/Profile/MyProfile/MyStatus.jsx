import React, {useEffect, useState} from "react";

const MyStatus = (props) => {
    let[editMode, setEditMode] = useState(false)
    let[statusValue, setStatusValue] = useState(props.value)

    useEffect(()=>{
        setStatusValue(props.value)
    },[props.value])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deActivateEditMode = () => {
        setEditMode(false)
        props.setUserStatus(statusValue)
    }

    const changeStatus = (e) => {
        setStatusValue(e.currentTarget.value)
    }

    return (
        <>
            {!editMode?
                <div onClick={activateEditMode}>
                    <span>Ваш статус: </span>
                    <br />
                    <span>{props.value}</span>
                </div>:
                <div>
                    <input autoFocus={true} type="text" value={statusValue} onBlur={deActivateEditMode} onChange={changeStatus}/>
                </div>
            }
        </>
    )
}

export default MyStatus