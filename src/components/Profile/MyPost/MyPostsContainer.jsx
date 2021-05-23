import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reset } from "redux-form";

import {addPostActionCreator, deletePostAC, addAllPosts, setLike} from '../../../redux/profile-reducer';
import { getCurrentUserDataUid } from '../../../redux/users-selectors';
import MyPosts from './MyPosts';
import { setILikePostsUids } from '../../../redux/profile-reducer';
import { addLikeFunction, addPostFunction, deletePostFunction, removeLikeFunction } from '../../common/PostsHandler/postsHandler';
import { withRouter } from 'react-router';

const MyPostsContainer = (props) => {
  const isHomePage = props.match.path === "/home";

  const addPost = (values, urlPhoto) => {
    if(props.myUid === props.currentProfileUid) {
      addPostFunction(props.myUid, values.newPostText, props.addPostActionCreator, urlPhoto, props.name, props.surname)
    }
  };

  const deletePost = (postId) => {
    if (props.myUid === props.currentProfileUid) {
      deletePostFunction(postId, props.myUid, props.deletePostAC)
    }
  }

  const addLike = (postId, ownerPostUid) => {
    addLikeFunction(postId, ownerPostUid, props.myUid, props.setILikePostsUids, props.setLike);
  }

  const removeLike = (postId, ownerPostUid) => {
    removeLikeFunction(postId, ownerPostUid, props.myUid, props.setILikePostsUids, props.setLike);
  }

  return (
    <MyPosts  {...props} posts={props.posts} isHomePage={isHomePage}  addPost={addPost} deletePost={deletePost} addLike={addLike} removeLike={removeLike}/>
  )
}

const mapStateToProps = (state) => {
  return {
    urlPhoto: state.profilePage.profile.urlPhoto,
    myUid: getCurrentUserDataUid(state),
    iLikePostsUids: state.profilePage.profile.iLikePostsUids,
    currentProfileUid: state.profilePage.profile.uid,
    name: state.auth.currentUserData.name,
    surname: state.auth.currentUserData.surname
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPostActionCreator: (newPostText, data, id) => {
      dispatch(addPostActionCreator(newPostText, data, id));
      dispatch(reset("ProfileAddNewPostForm"));
    },
    deletePostAC: (postId) => {
      dispatch(deletePostAC(postId));
    },
    addAllPosts: (posts) => {
      dispatch(addAllPosts(posts));
    },
    setILikePostsUids: (newILikePostsUids) => {
      dispatch(setILikePostsUids(newILikePostsUids));
    },
    setLike: (postId, myUid) => {
      dispatch(setLike(postId, myUid));
    }

  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  )(MyPostsContainer);
