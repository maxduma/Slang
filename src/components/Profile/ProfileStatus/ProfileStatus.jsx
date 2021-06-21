import React, { useEffect, useState } from "react";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator } from "../../../utils/validators/validators";
import { Input } from "../../common/FormsControls/FormsControls";
import c from  './ProfileStatus.module.css';

const ProfileStatus = (props) => {
  const isMyPage = props.myUid === props.currentProfileUid;
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);
  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);
  const activateEditMode = () => {
    if (isMyPage) {
      setEditMode(true);
    }
  };
  const onBlur = (formData) => {
    setEditMode(false);
    setStatus(formData.status);
    props.patchStatus(props.myUid, formData.status);
  };
  const initialData = {
    status: props.status
  }

  return (
    <div className={c.profileStatusWrapper}>
      <div>
        <ProfileStatusFormRedux  initialValues={initialData} onSubmit={onBlur} status={status} editMode={editMode} activateEditMode={activateEditMode} /> 
      </div>
    </div>
  );
};
export default ProfileStatus;

const maxLength750 = maxLengthCreator(750);
const ProfileStatusForm = (props) => {
  return (
    <div>
      <form onBlur={props.handleSubmit}>
        <div>
            {!props.editMode ? (
            <div>
              <span onDoubleClick={props.activateEditMode}>{props.status || "----"}</span>
            </div>
             ) : (
            <div>
               <Field className={c.input} autoFocus={true} type="text" name={"status"} component={Input} validate={[maxLength750]}  />
            </div>
           )}
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
const  ProfileStatusFormRedux = reduxForm({ form: "profileStatus" })(ProfileStatusForm);
