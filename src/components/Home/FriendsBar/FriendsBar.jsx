import React from 'react'
import c from  './FriendsBar.module.css';
import FriendCard from './FriendCard/FriendCard';

const FriendsBar = ({friends}) => {
  const friendsCards = 
  friends.map(f => {
   return  <FriendCard  f={f} key={f.uid}/>
  })

  return (
    <div className={c.friendsCardsWrapper}>
      <div className={c.friendsCardsTitle}>Contacts</div>
      <div>
        {friendsCards}
      </div>
    </div>
  )
};
export default FriendsBar;
