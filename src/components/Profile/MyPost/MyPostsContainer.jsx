import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reset } from "redux-form";

import {addPostActionCreator, deletePostAC, addAllPosts, addLike} from '../../../redux/profile-reducer';
import { getCurrentUserDataUid } from '../../../redux/users-selectors';
import MyPosts from './MyPosts';
import { getZero, getMonth } from '../../../utils/helpers/helpers';
import { myPostsAPI, usersAPI } from '../../../api/api';
import { setILikePostsUids } from '../../../redux/profile-reducer';

const MyPostsContainer = (props) => {

  const addPost = (values) => {
    if (props.myUid === props.currentProfileUid) {
      const Data = new Date;
      const postData = {
        text: values.newPostText,
        postId: props.myUid + (Math.random() * 1000000000000000000),
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
    myPostsAPI.patchPost(postData, props.myUid)
    // to dispatch
    props.addPostActionCreator(postData);
    }
  };

  const deletePost = (postId) => {
    if (props.myUid === props.currentProfileUid) {
      //API
    myPostsAPI.deletePost(postId, props.myUid);
    //dispatch
    props.deletePostAC(postId);
    }
  }

    const addLike = (postId) => {
      //post likes (uids)
      myPostsAPI.getLikeCountUid(props.currentProfileUid, postId)
      .then(res => {
        const newLikesUid = res;
          // just one like
        const a = newLikesUid.some( id => {
          return id === props.myUid
        })
        if (!a) {
          newLikesUid.push(props.myUid)
        }
        myPostsAPI.addNewLikeCountUid(props.currentProfileUid, postId, newLikesUid)

          // I like post list
        usersAPI.getILikePostsUids(props.myUid)
        .then(res => {
          const newILikePostsUids = res;
          // do not push the same uid
        const a = newILikePostsUids.some( id => {
          return id === postId
        })
        if (!a) {
          newILikePostsUids.push(postId)
        }
         usersAPI.patchILikePostsUids(props.myUid, newILikePostsUids)

         props.setILikePostsUids(newILikePostsUids); 
        })

        // dispatch
        myPostsAPI.getPost(props.currentProfileUid, postId)
        .then(res => {
          const post = res;
          post.isLike = true;
          const a = post.likesUid.some( uid => {
            return uid === props.myUid
          })
          if (!a ) {
            post.likesUid.push(props.myUid)
          }
          props.addLike(postId, post);
        })
      })
    }

    const removeLike = (postId) => {
      //post likes (uids)
      myPostsAPI.getLikeCountUid(props.currentProfileUid, postId)
      .then(res => {
        const newLikesUid = res;
        myPostsAPI.addNewLikeCountUid(props.currentProfileUid, postId, newLikesUid.filter(l => l !== props.myUid))
        })

      // I like post list
      usersAPI.getILikePostsUids(props.myUid)
      .then(res => {
      const newILikePostsUids = res;
      usersAPI.patchILikePostsUids(props.myUid, newILikePostsUids.filter(id => id !== postId))
      props.setILikePostsUids(newILikePostsUids.filter(id => id !== postId));
      })

      // dispatch
      myPostsAPI.getPost(props.currentProfileUid, postId)
      .then(res => {
        const post = res;
        post.isLike = false;
        const newPost = [];
        post.likesUid.map(id => {
          if (id !== props.myUid) {
            newPost.push(id);
          }
        })
        post.likesUid = newPost;
        console.log("!!!!!!!!!!11", post)
        props.addLike(postId, post); 
    })
  }

  return (
    <MyPosts  {...props} addPost={addPost} deletePost={deletePost} addLike={addLike} removeLike={removeLike}/>
  )

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
    addLike: (postId, myUid) => {
      dispatch(addLike(postId, myUid));
    }

  }
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps)
  (MyPostsContainer));
