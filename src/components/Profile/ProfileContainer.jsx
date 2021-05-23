import React from 'react'
import { connect } from 'react-redux';

import Profile from './Profile';
import {getUserProfile, getStatus, patchStatus, changeUrlPhotoThunk, changeProfileData} from '../../redux/profile-reducer';
import { withRouter } from 'react-router';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.myUid;
      //The case when the user is not logged in clicks on his profile which is not there
      // if (!userId) {
      //   this.props.history.push("/login")
      // }
    }
    
    this.props.getUserProfile(userId, this.props.myILikePostsUids);
    this.props.getStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  changeProfileDataForm = (formData) => {
    this.props.changeProfileData(formData, this.props.myUid, this.props.myILikePostsUids);
  }

render() {
    return (
        <div>
            <Profile  
            {...this.props} 
            isOwner={this.props.match.params.userId === this.props.myUid || !this.props.match.params.userId}
            patchStatus={this.props.patchStatus} 
            changeUrlPhotoThunk={this.props.changeUrlPhotoThunk}
            changeProfileDataForm={this.changeProfileDataForm}
            posts={this.props.posts}
            />
        </div>
    )
 }
}

let mapStateToProps = (state) => ({
  posts: state.profilePage.profile.posts,
  profile: state.profilePage.profile,
  myUid: state.auth.currentUserData.uid,
  myILikePostsUids: state.auth.currentUserData.iLikePostsUids
})

export default compose(
  connect(mapStateToProps, {getUserProfile, getStatus, patchStatus, changeUrlPhotoThunk, changeProfileData}),
  withRouter,
  withAuthRedirect
)(ProfileContainer)
