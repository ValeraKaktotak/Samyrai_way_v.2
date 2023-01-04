import React from 'react';
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {profileActionCreators} from "../../../redux/profile-reducer";
import withAuthRedirect from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {postDataType} from "../../../types/types";
import {stateType} from "../../../redux/redux-store";

type OwnPropsType = {}
type mapDispatchTypes = {
    onAddPost: (mss: string)=> any
}
type mapStateTypes = {
    posts: Array<postDataType>
    currentMessageText: string
}
type propTypes = mapDispatchTypes & mapStateTypes


class MyPostContainer extends React.Component<propTypes> {

    //запрашиваем, нужно ли данному компоненту ререндерится. Если return true, то компонент будет реренднрится, если false, то нет.
    shouldComponentUpdate(nextProps:propTypes) {
        return nextProps !== this.props
    }

    render() {
        return (
            <MyPosts {...this.props} />
        )
    }
}

let mapStateToProps = (state: stateType): mapStateTypes => {
    return{
        posts: state.profilePage.postData,
        currentMessageText: state.profilePage.newMessageArea,
    }
}

export default compose(
    withAuthRedirect,
    connect<mapStateTypes, mapDispatchTypes, OwnPropsType, stateType>(mapStateToProps, {
        onAddPost: profileActionCreators.addPostActionCreator
    })
)(MyPostContainer) as React.ComponentType