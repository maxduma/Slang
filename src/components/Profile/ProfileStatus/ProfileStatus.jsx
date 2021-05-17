import React, { useEffect, useState } from "react";
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

  const deactivateEditMode = () => {
    setEditMode(false);
    props.patchStatus(props.myUid, status);
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div className={c.profileStatusWrapper}>
      {!editMode ? (
        <div>
          <span onDoubleClick={activateEditMode}>{props.status || "----"}</span>
        </div>
      ) : (
        <div>
          <input
            className={c.input}
            onChange={onStatusChange}
            value={status}
            onBlur={deactivateEditMode}
            autoFocus={true}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;
