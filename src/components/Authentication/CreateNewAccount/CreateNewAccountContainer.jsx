import React, { Component } from "react";
import CreateNewAccount from "./CreateNewAccount";
import { connect } from "react-redux";
import { createNewAccountThunk } from "../../../redux/auth-reducer";
import { Redirect } from "react-router";

class LoginContainer extends Component {
  createNewAccount(formData) {
    this.createNewAccountThunk(formData);
  }
  render() {
    if (this.props.isAuth) {
      return <Redirect to={"/profile"} />;
    }
    return (
      <CreateNewAccount
        {...this.props}
        createNewAccount={this.createNewAccount}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.currentUserData.isAuth,
});

export default connect(mapStateToProps, {
  createNewAccountThunk,
})(LoginContainer);
