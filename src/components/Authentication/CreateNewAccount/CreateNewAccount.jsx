import React from 'react';
import c from './CreateNewAccount.module.css';
import {Field, reduxForm} from 'redux-form';
import style from '../../common/FormsControls/FormsControls.module.css';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Input } from '../../common/FormsControls/FormsControls';

const maxLength50 = maxLengthCreator(50);
const CreateNewAccount = (props) => {
  const onSubmit = (formData) => {
    props.createNewAccount(formData)
  }
  return (
      <div  className={c.wrapper}>
          <h1>Create New Account</h1>
          <CreateNewAccountFormRedux onSubmit={onSubmit}/>
      </div>
  )
};
export default CreateNewAccount;

const CreateNewAccountForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={c.formWrapper}>
    <Field
      name={"name"}
      type="text"
      placeholder="name"
      component={Input}
      validate={[required, maxLength50]}
      />
    <Field
      name={"surname"}
      type="text"
      placeholder="surname"
      component={Input}
      validate={[required, maxLength50]}
      />
    <div>
      <Field
        name={"gender"}
        type="radio"
        value="male" 
        component={'input'}
        validate={[required]}
        /> Male
      <Field
        name={"gender"}
        type="radio"
        value="female" 
        component={'input'}
        validate={[required]}
        /> Female 
    </div>
    <Field
      name={"country"}
      type="text"
      placeholder="Country"
      component={Input}
      validate={[required, maxLength50]}
      />
    <Field
      name={"city"}
      type="text"
      placeholder="City"
      component={Input}
      validate={[required, maxLength50]}
      />
    <Field
      name={"email"}
      type="email"
      placeholder="email"
      component={Input}
      validate={[required, maxLength50]}
      />
    <Field
      name={"password"}
      type="password"
      placeholder="password"
      component={Input}
      validate={[required, maxLength50]}
      />
      { props.error &&
          <div className={style.formSummaryError}>
            {props.error}
           </div>
        }
    <div>
      <button className={c.btnCreateAccount}>Create Account</button>
    </div>
  </form>
  )
}

const CreateNewAccountFormRedux = reduxForm({form: 'CreateNewAccountForm'})(CreateNewAccountForm);



