import React from 'react';
import App from './App'
import { connect } from 'react-redux';
import {initializedApp, initializedSuccess} from './redux/app-reducer';
import {setAuthCurrentUserData} from './redux/auth-reducer';
import Spinner from './components/common/Spinner/Spinner';
import { usersAPI } from './api/api';

class AppContainer extends React.Component {
  catchAllUnhandledErrors = (promiseRejectionEvent) => {
    console.log(promiseRejectionEvent);
  }
  componentDidMount() {
    if (!this.props.isAuth && localStorage.getItem('CurrentUserData')) {
      const data = JSON.parse(localStorage.getItem('CurrentUserData'));
      usersAPI.getUser(data.uid)
      .then(res => {
        this.props.initializedApp(res.name, res.surname, res.location, res.personalInformation, res.gender, res.uid, res.email, res.urlPhoto, res.status, res.following, res.followers, res.iLikePostsUids)
      })
    } else {
      this.props.initializedSuccess()
    }
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  render() {
    if (!this.props.initialized) {
      return <Spinner />
    }
    return <App />
  }
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.currentUserData.isAuth,
  initialized: state.app.initialized
});
export default connect(mapStateToProps, {initializedApp, setAuthCurrentUserData, initializedSuccess})(AppContainer);




