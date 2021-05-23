import store from './redux/redux-store';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './AppContainer';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

//DataBase
import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyDhL8YrgEnuEFguDC87uRevnbrvuu9dYk8",
  authDomain: "slang-16.firebaseapp.com",
  databaseURL: "https://slang-16-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "slang-16",
  storageBucket: "slang-16.appspot.com",
  messagingSenderId: "1090518574297",
  appId: "1:1090518574297:web:c9464fdfad22bb18a90ac8"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
    document.getElementById('root')
); 





