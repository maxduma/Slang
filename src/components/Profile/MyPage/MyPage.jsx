import React from 'react'
import { connect } from 'react-redux';

import Profile from './../Profile';
import {getUserProfile, getStatus, patchStatus} from '../../../redux/profile-reducer';
import { withRouter } from 'react-router';
import { withAuthRedirect } from '../../../hoc/withAuthRedirect';
import { compose } from 'redux';


class MyPage extends React.Component {

componentDidMount() {
    this.props.getUserProfile( this.props.myUid);
    this.props.getStatus( this.props.myUid);
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
)(MyPage)

