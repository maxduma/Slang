import React, {useState, useEffect} from 'react'

import FollowCard from './FollowCard';
import {usersAPI} from '../../../../api/api';

const FollowCardContainer = (props) => {
  const [urlPhoto, setUrlPhoto] = useState();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [gender, setGender] = useState();
  const [uid, setUid] = useState();

  useEffect(() => {
    usersAPI.getUser(props.uid)
    .then(u => {
      if (u === null) return  // if uid does not exist
      setName(u.name)
      setUrlPhoto(u.urlPhoto)
      setSurname(u.surname)
      setGender(u.gender)
      setUid(u.uid)
    })
  });

  return (
    <div>
      <FollowCard  urlPhoto={urlPhoto} name={name} surname={surname} gender={gender} uid={uid} />
    </div>
  )
}

export default FollowCardContainer;
