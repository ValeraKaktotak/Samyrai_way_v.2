import React from 'react';
import UserMessages from "./UserMessages";
import {connect} from "react-redux";
import {messageActionsCreators} from "../../../redux/messages-reducer";
import withAuthRedirect from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {stateType} from "../../../redux/redux-store";
import {messagesReducerMessageType} from "../../../types/types";

type DispatchProps = {
    onSendMessage: (message: messagesReducerMessageType) => void
}
type MapStateProps = {}
type OwnProps = {}

let mapStateToProps = (state: stateType) => {
    return{
        messages: state.messagesPage.messageData
    }
}

export default compose(withAuthRedirect,
    connect<MapStateProps, DispatchProps, OwnProps, stateType>(mapStateToProps, {
        onSendMessage: messageActionsCreators.addMessageActionCreator})
    )(UserMessages) as React.ComponentType
