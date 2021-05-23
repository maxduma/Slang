import React, { Component } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reset } from "redux-form";

import {addPostActionCreator, deletePostAC, addAllPosts, setLike} from '../../../redux/profile-reducer';
import { getCurrentUserDataUid } from '../../../redux/users-selectors';
import MyPosts from './MyPosts';
import { getZero, getMonth } from '../../../utils/helpers/helpers';
import { myPostsAPI, usersAPI } from '../../../api/api';
import { setILikePostsUids } from '../../../redux/profile-reducer';

class MyPostsContainer extends Component {

  addPost = (values) => {
    if (this.props.myUid === this.props.currentProfileUid) {
      const Data = new Date;
      const postData = {
        text: values.newPostText,
        postId: this.props.myUid + (Math.random() * 1000000000000000000),
        isLike: false,
        likesUid: [""],
        data: {
          day: getZero(Data.getDate()),
          month: getMonth(Data.getMonth()),
          year: getZero(Data.getFullYear()),
          hours: getZero(Data.getHours()),
          minutes: getZero(Data.getMinutes())
        }
    }
    //  patchPost
    myPostsAPI.patchPost(postData, this.props.myUid)
    // to dispatch
    this.props.addPostActionCreator(postData);
    }
  };

  deletePost = (postId) => {
    if (this.props.myUid === this.props.currentProfileUid) {
      //API
    myPostsAPI.deletePost(postId, this.props.myUid);
    //dispatch
    this.props.deletePostAC(postId);
    }
  }

  addLike = (postId) => {
    //post likes (uids)
    myPostsAPI.getLikeCountUid(this.props.currentProfileUid, postId)
    .then(res => {
      const newLikesUid = res;
        // just one like
      const a = newLikesUid.some( id => {
        return id === this.props.myUid
      })
      if (!a) {
        newLikesUid.push(this.props.myUid)
      }
      myPostsAPI.addNewLikeCountUid(this.props.currentProfileUid, postId, newLikesUid)

        // I like post list
      usersAPI.getILikePostsUids(this.props.myUid)
      .then(res => {
        const newILikePostsUids = res;
        // do not push the same uid
      const a = newILikePostsUids.some( id => {
        return id === postId
      })
      if (!a) {
        newILikePostsUids.push(postId)
      }
        usersAPI.patchILikePostsUids(this.props.myUid, newILikePostsUids)

        this.props.setILikePostsUids(newILikePostsUids); 
      })

      // dispatch
      myPostsAPI.getPost(this.props.currentProfileUid, postId)
      .then(res => {
        const post = res;
        post.isLike = true;
        const a = post.likesUid.some( uid => {
          return uid === this.props.myUid
        })
        if (!a ) {
          post.likesUid.push(this.props.myUid)
        }
        this.props.setLike(postId, post);
      })
    })
  }

  removeLike = (postId) => {
    //post likes (uids)
    myPostsAPI.getLikeCountUid(this.props.currentProfileUid, postId)
    .then(res => {
      const newLikesUid = res;
      myPostsAPI.addNewLikeCountUid(this.props.currentProfileUid, postId, newLikesUid.filter(l => l !== this.props.myUid))
      })

    // I like post list
    usersAPI.getILikePostsUids(this.props.myUid)
    .then(res => {
    const newILikePostsUids = res;
    usersAPI.patchILikePostsUids(this.props.myUid, newILikePostsUids.filter(id => id !== postId))
    this.props.setILikePostsUids(newILikePostsUids.filter(id => id !== postId));
    })

    // dispatch
    myPostsAPI.getPost(this.props.currentProfileUid, postId)
    .then(res => {
      const post = res;
      post.isLike = false;
      const newPost = [];
      post.likesUid.map(id => {
        if (id !== this.props.myUid) {
          newPost.push(id);
        }
      })
      post.likesUid = newPost;
      this.props.setLike(postId, post); 
  })
  }

  render() {
    return (
      <MyPosts  {...this.props} addPost={this.addPost} deletePost={this.deletePost} addLike={this.addLike} removeLike={this.removeLike}/>
    )
  }
  

}



const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.profile.posts,
    urlPhoto: state.profilePage.profile.urlPhoto,
    myUid: getCurrentUserDataUid(state),
    iLikePostsUids: state.profilePage.profile.iLikePostsUids,
    currentProfileUid: state.profilePage.profile.uid
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
  connect(mapStateToProps, mapDispatchToProps)
  (MyPostsContainer));
