import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reset } from "redux-form";

import {addPostActionCreator, deletePostAC, addAllPosts} from '../../../redux/profile-reducer';
import { getCurrentUserDataUid } from '../../../redux/users-selectors';
import MyPosts from './MyPosts';
import { getZero, getMonth } from '../../../utils/helpers/helpers';
import { myPostsAPI, usersAPI } from '../../../api/api';
import { setILikePostsUids } from '../../../redux/auth-reducer';
import { Component } from 'react';

class MyPostsContainer extends Component {

  componentDidMount() {
    console.log("componentDidMount")
    console.log('this.props.myUid', this.props.myUid)



      myPostsAPI.getPosts(this.props.myUid)   // need shange on this.props.currentProfileUid          !!!!!!!!!!!!!!!!!!!!
      .then(data => {
        console.log('data', data)
        if (data) {
          const posts = [];
          Object.values(data).map(post => {
            console.log("START")
            // set isLike
            this.props.iLikePostsUids.map(likeUid => {
              if (likeUid === post.id) {
                console.log("Will BE TRUE")
                post.isLike = true;
              }
            })
            console.log("DO this post", post)
            posts.push(post)
          })
          console.log('before posts', posts)
          this.props.addAllPosts(posts);
        }
    })

    
  }

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
      console.log(postId)
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
          console.log(res)
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

        /////////////////////////////////////////////////


        

       







        /////////////////////////////////////////////////
      })
    }



  // useEffect(() => {
  //   console.log('useEffect')
  //   myPostsAPI.getPosts(props.currentProfileUid)
  //     .then(data => {
  //       if (data) {
  //         const posts = [];
  //         Object.values(data).map(post => {
  //           // set isLike
  //           props.iLikePostsUids.map(likeUid => {
  //             if (likeUid === post.id) {
  //               post.isLike = true;
  //             }
  //           })
  //           posts.push(post)
  //         })
  //         console.log('before posts', posts)
  //         props.addAllPosts(posts);
  //       }
  //     })
  // }, [])  // addLike



render() {
  return (
    <MyPosts  {...this.props} addPost={this.addPost} deletePost={this.deletePost} addLike={this.addLike}/>
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
    }

  }
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps)
  (MyPostsContainer));
