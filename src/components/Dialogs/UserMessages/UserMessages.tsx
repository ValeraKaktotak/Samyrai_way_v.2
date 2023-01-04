import React from "react"
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import UserMessage from "./UserMessage/UserMessage"
import {Textarea} from "../../commons/FormsControls/FormsControls"
import {maxLength200, required} from "../../../helpers/validators"
import {messagesReducerMessageDataType, messagesReducerMessageType} from "../../../types/types"
import style from './UserMessages.module.css'

type propsType = {
    messages: Array<messagesReducerMessageDataType>
    onSendMessage: (message:messagesReducerMessageType) => void
}

const UserMessages = (props: propsType) => {

    const messages = props.messages.map(m => <UserMessage key={m.id} message={m.message}/>)

    const sendMessage = (data: messagesReducerMessageType) => {
        props.onSendMessage(data)
    }
    return (
        <div className={style.user_messages}>
            {messages}
            <WithReduxForm onSubmit={sendMessage}/>
        </div>
    )
}

const UserMessagesForm: React.FC<InjectedFormProps<messagesReducerMessageType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name="userMessage" component={Textarea} placeholder='Enter your message'
                   validate={[required, maxLength200]}/>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

let WithReduxForm = reduxForm<messagesReducerMessageType>({
    // a unique name for the form
    form: 'userMessage'
})(UserMessagesForm)

export default UserMessages