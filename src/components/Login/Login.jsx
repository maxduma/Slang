import React, { useState } from "react";
import CreateNewAccountContainer from "../Authentication/CreateNewAccount/CreateNewAccountContainer";
import SingInContainer from "../Authentication/SingIn/SingInContainer";
import c from './Login.module.css';

const Login = () => {

  const [singIn, setSingIn] = useState(false);


  const showSingIn = () => {
    setSingIn(true);
  }
  const showCreateNewAccount = () => {
    setSingIn(false);
  }


  return (
    <div className={c.wrapper}>
      <h1 className={c.title}>Log In</h1>

      { singIn ?
      <div className={c.btnWrapper}>
         <button className={c.btnLogin} onClick={showCreateNewAccount}>Create New Account</button>
      </div>
      :
      <div className={c.btnWrapper}>
        <button className={c.btnLogin} onClick={showSingIn}>Sing In</button>
      </div>
      }

      { singIn ?
      <div>
        <SingInContainer />
      </div>
      :
      <div>
        <CreateNewAccountContainer />
      </div>
      }

    </div>
  );
};

export default Login;
