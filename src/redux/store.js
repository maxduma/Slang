import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

const store = {
   _state: {
    profilePage: {
      posts: [
        {text: 'Hi, how are you?', likeCount: 75, id: 11},
        {text: 'Hi, how weather', likeCount: 36, id: 2},
        // {text: 'guys, what new?', likeCount: 26, id: 3},
        // {text: 'good news people...', likeCount: 59, id: 4},
        // {text: 'hello!', likeCount: 35, id: 6}
      ],
      newPostText: ""
    },
    messagesPage: {
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
      ],
      newMessageText: ''
    },
    sidebar: {}
  },
  _callSubscriber() {
    console.log('ere');
  },
  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
  dispatch(action) {

    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscriber(this._state);
  }
}

export default store;
