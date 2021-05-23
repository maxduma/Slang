import React, {Component} from 'react'
import Header from './Header';
import {setAuthCurrentUserData} from '../../redux/auth-reducer';
import {connect} from 'react-redux';
import { getCurrentUserDataUid } from '../../redux/users-selectors';

class HeaderContainer extends Component {
  logout() {
    localStorage.removeItem('CurrentUserData')
    window.location.reload();
  }
  render() {
    return (
      <Header {...this.props} logout={this.logout}/>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.currentUserData.isAuth,
    login: state.auth.currentUserData.login,
    name: state.auth.currentUserData.name,
    urlPhoto: state.auth.currentUserData.urlPhoto,
    gender: state.auth.currentUserData.gender,
    myUid: getCurrentUserDataUid(state)
  }
}

export default connect(mapStateToProps, {setAuthCurrentUserData})(HeaderContainer);
