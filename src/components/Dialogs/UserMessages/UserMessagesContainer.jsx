import React from 'react';
import UserMessages from "./UserMessages";
import {connect} from "react-redux";
import {addMessageActionCreator, changeMessageTextActionCreator} from "../../../redux/messages-reducer";
import withAuthRedirect from "../../../hoc/withAuthRedirect";
import {compose} from "redux";

//старый вариант без react-redux
// const UserMessagesContainer = (props) => {
//
//     let state = props.store.getState()
//     let messages = state.messagesPage.messageData;
//     let newMessageText = state.messagesPage.newMessageDataArea;
//
//     const onChangeText = (text) => {
//         props.store.dispatch(changeMessageTextActionCreator(text));
//     }
//     const onSendMessage = () => {
//         props.store.dispatch(addMessageActionCreator());
//     }
//     return (
//         <UserMessages messages={messages}
//                       newMessageText={newMessageText}
//                       onChangeText={onChangeText}
//                       onSendMessage={onSendMessage}
//         />
//     );
// }

let mapStateToProps = (state) => {
    return{
        messages: state.messagesPage.messageData,
        newMessageText: state.messagesPage.newMessageDataArea,
    }
}
/*
Объединил HOCs в функции compose
let withAuth = withAuthRedirect(UserMessages)

const UserMessagesContainer = connect(mapStateToProps, {
    onSendMessage: addMessageActionCreator,
    onChangeText: changeMessageTextActionCreator})(withAuth)

 */

export default compose(withAuthRedirect,
    connect(mapStateToProps, {
        onSendMessage: addMessageActionCreator,
        onChangeText: changeMessageTextActionCreator})
    )(UserMessages)
