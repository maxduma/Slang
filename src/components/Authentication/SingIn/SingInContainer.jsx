import React, { Component } from "react";
import { connect } from "react-redux";
import SingIn from "./SingIn";
import { setAuthCurrentUser } from "../../../redux/auth-reducer";
import { Redirect } from "react-router";

class LoginContainer extends Component {
  singIn(formData) {
    this.setAuthCurrentUser(formData);
  }
  render() {
    if (this.props.isAuth) {
      return <Redirect to={"/profile"} />;
    }
    return <SingIn {...this.props} singIn={this.singIn} />;
  }
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.currentUserData.isAuth,
});

export default connect(mapStateToProps, {
  setAuthCurrentUser,
})(LoginContainer);
