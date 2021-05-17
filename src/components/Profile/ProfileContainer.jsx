import React from 'react'
import { connect } from 'react-redux';

import Profile from './Profile';
import {getUserProfile, getStatus, patchStatus} from '../../redux/profile-reducer';
import { Redirect, withRouter } from 'react-router';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';


class ProfileContainer extends React.Component {

componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.myUid;
      //The case when the user is not logged in clicks on his profile which is not there
      // if (!userId) {
      //   this.props.history.push("/login")
      // }
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
}

render() {
    return (
        <div>
            <Profile  {...this.props} patchStatus={this.props.patchStatus} />
        </div>
    )
 }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  myUid: state.auth.currentUserData.uid
})

export default compose(
  connect(mapStateToProps, {getUserProfile, getStatus, patchStatus}),
  withRouter,
  withAuthRedirect
)(ProfileContainer)
