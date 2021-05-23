import React from "react";
import c from "./SingIn.module.css";
import { Field, reduxForm } from "redux-form";
import { Input } from "../../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../../utils/validators/validators";
import style from "../../common/FormsControls/FormsControls.module.css";

const SingIn = (props) => {
  const onSubmit = (formData) => {
    props.singIn(formData);
  };

  return (
    <div className={c.SingInWrapper}>
      <h1>Sing In</h1>
      <SingInReduxForm onSubmit={onSubmit} />
    </div>
  );
};

export default SingIn;

const maxLength50 = maxLengthCreator(50);
const SingInForm = (props) => {
  return (
    <>
      <form onSubmit={props.handleSubmit} className={c.formWrapper}>
        <div>
          <Field
            placeholder={"email"}
            type="email"
            name={"email"}
            component={Input}
            validate={[required, maxLength50]}
          />
        </div>
        <div>
          <Field
            placeholder="password"
            type="password"
            name={"password"}
            component={Input}
            validate={[required, maxLength50]}
          />
        </div>
        <div className={c.checkboxWrapper}>
          <Field className={c.RememberMe} type="checkbox" name={"rememberMe"} component='input' />
          Remember me
        </div>
        {props.error && (
          <div className={style.formSummaryError}>{props.error}</div>
        )}
        <div>
          <button className={c.btnSingIn}>Sing In</button>
        </div>
      </form>
    </>
  );
};

const SingInReduxForm = reduxForm({ form: "SingIn" })(SingInForm);
