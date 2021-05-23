import React from 'react'
import { connect } from 'react-redux';
import Home from './Home';
import { compose } from 'redux';
import { myPostsAPI, usersAPI } from '../../api/api';
import { setPosts, setAllFriends, setAllPostIsFetching, setFriendsIsFetching } from '../../redux/home-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

class HomeContainer extends React.Component {
  componentDidMount() {
    //set posts
    this.props.setAllPostIsFetching(true);
    const allPosts = [];
    Promise.all(this.props.following.filter(id => id !== "").map(u => myPostsAPI.getPosts(u)))
    .then(responses => {
      for (let response of responses) {
        if (response !== null) {
        Object.values(response).forEach(p => {
          allPosts.push(p);
        });
      }
    }
    })
    .then(() => {
      // set like status
      allPosts.map((p) => {
        this.props.myILikePostsUids.map(likeUid => {
          if (likeUid === p.postId) {
            p.isLike = true
          }
        })
      })
    })
    .then(() => {
      this.props.setPosts(allPosts);
      this.props.setAllPostIsFetching(false);
    })

    //set Friends
    this.props.setFriendsIsFetching(true);
    Promise.all(this.props.following.filter(id => id !== "").map(u => usersAPI.getUser(u)))
    .then((res) => {
      this.props.setAllFriends(res);
      this.props.setFriendsIsFetching(false);
    })

  }

  render() {
    return (
      <div>
        <Home 
          {...this.props} 
          allPosts={this.props.allPosts} 
          friends={this.props.friends} 
          allPostsIsFetching={this.props.allPostsIsFetching}
          friendsIsFetching={this.props.friendsIsFetching}
          /> 
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  myUid: state.auth.currentUserData.uid,
  myILikePostsUids: state.auth.currentUserData.iLikePostsUids,
  following:  state.auth.currentUserData.following,
  allPosts: state.home.allPosts,
  friends: state.home.friends,
  allPostsIsFetching: state.home.allPostsIsFetching,
  friendsIsFetching: state.home.friendsIsFetching,
})

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, {setPosts, setAllFriends, setAllPostIsFetching, setFriendsIsFetching}),
)(HomeContainer)
