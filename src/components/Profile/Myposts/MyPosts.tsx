import React from 'react';
import style from './MyPosts.module.css';
import MyPost from "./MyPost/MyPost";
import {Field, reduxForm} from "redux-form";
import {maxLength20, required} from "../../../helpers/validators";
import {Textarea} from "../../commons/FormsControls/FormsControls";
import {postDataType} from "../../../types/types";
import {addPostActionCreatorType} from "../../../redux/profile-reducer";

type propsType = {
    posts: Array<postDataType>
    onAddPost: (mss: string)=> addPostActionCreatorType
}

const MyPosts:React.FC<propsType> = (props) => {
    const posts = props.posts.map(p => <MyPost key={p.id} message={p.message} likes={p.likes} avatar={p.avatar}/>);

    const onSubmitFunction = (data:any) => {
        props.onAddPost(data)
    }
    return (
        <div className={style.my_posts}>
            <div className={style.add_data}>
                < WithReduxForm onSubmit={onSubmitFunction} />
            </div>
            <h3>My posts</h3>
            {posts}
        </div>
    );
}

const MyPostsForm = (props:any) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <Field name="myMessage" component={Textarea} placeholder='Enter your message' validate={[required, maxLength20]}/>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

let WithReduxForm = reduxForm({
    // a unique name for the form
    form: 'my-post'
})(MyPostsForm)

export default MyPosts