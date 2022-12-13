import style from './UserMessages.module.css';
import UserMessage from "./UserMessage/UserMessage";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../commons/FormsControls/FormsControls";
import {maxLength200, required} from "../../../helpers/validators";

const UserMessages = (props) => {

    const messages = props.messages.map(m => <UserMessage key={m.id} message={m.message}/>);

    const sendMessage = (data) => {
        props.onSendMessage(data);
    }
    return (
        <div className={style.user_messages}>
            {messages}
            <WithReduxForm onSubmit={sendMessage} />
        </div>
    );
}

const UserMessagesForm = (props) =>{
    return(
        <form onSubmit={props.handleSubmit}>
            <Field name="userMessage" component={Textarea} placeholder='Enter your message' validate={[required, maxLength200]} />
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

let WithReduxForm = reduxForm({
    // a unique name for the form
    form: 'userMessage'
})(UserMessagesForm)

export default UserMessages