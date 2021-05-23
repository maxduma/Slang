import React from 'react'

import c from './Dialogs.module.css';
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem';
import { Redirect } from 'react-router';
import { AddMessageFormRedux } from './AddMessageForm/AddMessageForm';

const Dialogs = ({isAuth, messagesPage, sendMessage}) => {
  if (!isAuth) {
      return <Redirect to={'/login'} />
  }

  const state = messagesPage;

  const dialogsElements = state.dialogsData
    .map(dialog => <DialogItem 
        name={dialog.name} 
        id={dialog.id} 
        key={dialog.id}
        />);

  const messagesElements = state.messagesData
    .map(message => <Message 
        message={message.message} 
        id={message.id}
        key={message.id}
        />);

  const addNewMessage = (values) => {
    sendMessage(values.newMessageBody);
  }

  return (
    <div className={c.dialogs}>
      <div className={c.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={c.messages}>
        <div className={c.messagesElements}>
          {messagesElements}
        </div> 
        <AddMessageFormRedux onSubmit={addNewMessage}/>
      </div>
    </div>
  )
};

export default Dialogs;