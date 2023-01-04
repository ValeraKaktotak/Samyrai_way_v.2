import React from 'react';
import UserDialogs from "./UserDialogs";
import {connect} from "react-redux";
import withAuthRedirect from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {stateType} from "../../../redux/redux-store";

type DispatchProps = {}
type MapStateProps = {}
type OwnProps = {}
let mapStateToProps = (state:stateType)=> {
    return{
        dialogs: state.messagesPage.dialogData
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStateProps, DispatchProps, OwnProps, stateType>(mapStateToProps)
)(UserDialogs) as React.ComponentType