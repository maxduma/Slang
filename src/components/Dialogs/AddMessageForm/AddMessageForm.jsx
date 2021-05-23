import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator} from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';
import c from './AddMessageForm.module.css';

const maxLength1000 = maxLengthCreator(1000);
const AddMessageForm = (props) => {
  return (
  <form onSubmit={props.handleSubmit} className={c.form}>
    <div className={c.inputWrapper}>
      <Field
        component={Textarea} 
        name="newMessageBody" 
        placeholder="Enter your message.."
        validate={[ maxLength1000 ]}
        />
    </div>
    <div>
      <button className={c.btnSend}>Send</button>
    </div>
  </form>
  )
}
export const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);
