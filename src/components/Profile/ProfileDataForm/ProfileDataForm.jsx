import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required, emptyField } from '../../../utils/validators/validators';
import { Input } from '../../common/FormsControls/FormsControls';
import Spinner from '../../common/Spinner/Spinner';
import c from  './ProfileDataForm.module.css';
import checked from '../../../assets/checked.png';

const ProfileDataForm = ({profile, onSubmitForm}) => {
  if (!profile) {
    return <Spinner />
  }
  
  const onSubmit = (formData) => {
    onSubmitForm(formData);
  };

  const initialData = {
    name: profile.name,
    surname: profile.surname,
    country: profile.location.country,
    city: profile.location.city,
    job: profile.personalInformation.job,
    education: profile.personalInformation.education,
    hobby: profile.personalInformation.hobby,
  }
  console.log('initialData', initialData);

  return (
    <div>
      <ProfileDataFormReduxForm initialValues={initialData} onSubmit={onSubmit}/>
    </div>
  )
}
export default ProfileDataForm;

const maxLength50 = maxLengthCreator(50);
const SingInForm = (props) => {
  return (
    <div className={c.profileDataFromWrapper} >
      <form onSubmit={props.handleSubmit}>
        <div className={c.btnCheckedWrapper}>
          <button className={c.btnChecked} onClick={() => {} } >
            <img className={c.imgEdit} src={checked}  alt={'edit'}/>
          </button> 
        </div>
        <div>
          <h5 className={c.title}>Name</h5> 
          <Field placeholder={"name"} type="text" name={"name"} component={Input} validate={[required, maxLength50]}  />

          <h5 className={c.title}>Surname</h5>
          <Field placeholder={"surname"} type="text" name={"surname"} component={Input} validate={[required, maxLength50]} />

          <h5 className={c.title}>Country</h5>
          <Field placeholder={"country"} type="text" name={"country"} component={Input} validate={[required, maxLength50]} />

          <h5 className={c.title}>City</h5>
          <Field placeholder={"city"} type="text" name={"city"} component={Input} validate={[required, maxLength50]}/>

          <h5 className={c.title}>Job</h5>
          <Field placeholder={"Job"} type="text" name={"job"} component={Input} validate={[maxLength50]}/>

          <h5 className={c.title}>Education</h5>
          <Field placeholder={"Education"} type="text" name={"education"} component={Input} validate={[maxLength50]}/>

          <h5 className={c.title}>Hobby</h5>
          <Field placeholder={"Hobby"} type="text" name={"hobby"} component={Input} validate={[maxLength50]}/>

          <div>
            {props.error && (
              <div className={c.formSummaryError}>{props.error}</div>
            )}
          </div>
       </div>
      </form>
    </div>
    )
  };


const ProfileDataFormReduxForm = reduxForm({ form: "editProfile" })(SingInForm);














