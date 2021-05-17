const SEND_MESSAGE = 'SEND-MESSAGE';

const initialState = {
    messagesData: [
      {id: 1, message: 'Hi'},
      {id: 2, message: 'How are you?'},
      {id: 3, message: 'Yo'},
      {id: 4, message: 'Hello'},
      {id: 5, message: 'bla-bla-bla'}
    ],
    dialogsData: [
      {id: 1, name: 'Dimych'},
      {id: 2, name: 'Andry'},
      {id: 3, name: 'Max'},
      {id: 4, name: 'Oleg'},
      {id: 5, name: 'Victor'},
      {id: 6, name: 'Nick'}
    ]
};

const dialogsReducer = (state = initialState, action) => {
  switch(action.type) {
      case SEND_MESSAGE:
        const messageTextBody = action.newMessageBody;
       return {
          ...state,
          messagesData: [...state.messagesData, {id: 6, message: messageTextBody}]
        }
      default:
        return state;
    }
};

export const sendMessageActionCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody});

export default dialogsReducer;