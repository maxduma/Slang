import React from "react";
import { reduxForm, Field } from "redux-form";
import Post from "./Post/Post";
import c from "./MyPosts.module.css";
import {
  maxLengthCreator
} from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";

const MyPosts = React.memo(({posts, urlPhoto, deletePost, myUid, addPost, currentProfileUid, addLike, removeLike }) => {

  const isMyPage = myUid === currentProfileUid;

  const postsElements = 
   [...posts]
    .reverse()
    .map((post) => (
    <Post post={post} urlPhoto={urlPhoto}  key={post.id} deletePost={deletePost} isMyPage={isMyPage} addLike={addLike} removeLike={removeLike} />
  ));



  const onAddPost = (values) => {
    addPost(values);
  }

  return (
    <div className={c.postWrapper}>
      <div>
        { isMyPage ? <h3>My Posts</h3> : <h3>Posts</h3>} 
        { isMyPage ?
          <div className={c.formWrapper}>
            <AddNewPostFormRedux onSubmit={onAddPost} />
           </div> : null
        }
        {postsElements}
      </div>
    </div>
  );
});


const maxLength1000 = maxLengthCreator(1000);

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={c.postSendWrapper}>
      <div className={c.inputWrapper}>
        <Field
          name="newPostText"
          component={Textarea}
          validate={[ maxLength1000 ]}
          placeholder={"Post message"}
        />
      </div>
      <div>
        <button className={c.btn}>Add Post</button>
      </div>
    </form>
  );
};
const AddNewPostFormRedux = reduxForm({ form: "ProfileAddNewPostForm" })(
  AddNewPostForm
);



export default MyPosts;
