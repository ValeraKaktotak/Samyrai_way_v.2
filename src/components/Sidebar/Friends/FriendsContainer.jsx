import React from 'react';
import Friends from "./Friends";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return{
        friendsList: state.sidebar.friends
    }
}

const FriendsContainer = connect(mapStateToProps)(Friends)


export default FriendsContainer