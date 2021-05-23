import React from 'react'
import c from  './FollowBlock.module.css';
import FollowCardContainer from './FollowCard/FollowCardContainer';

const FollowBlock = ({followList}) => {
  const usersUid = followList.filter(f => f !== "").slice(0, 6);
  return (
    <div className={c.followBlockWrapper}>
      { usersUid &&
       usersUid.map(u => {
        return  <FollowCardContainer uid={u}  key={u} />
         })
      }
    </div>
  )
}

export default  FollowBlock;