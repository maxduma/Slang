import React from 'react';
import './App.css';
import { Redirect, Route, Switch} from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import CreateNewAccountContainer from './components/Authentication/CreateNewAccount/CreateNewAccountContainer';
import SingInContainer from './components/Authentication/SingIn/SingInContainer';
import Login from './components/Login/Login';
import { withSuspense } from './hoc/withSuspense';
import NotFound from './components/NotFound/NotFound';
import HomeContainer from './components/Home/HomeContainer';
const News = React.lazy(() => import('./components/News/News'));
const Music = React.lazy(() => import('./components/Music/Music'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));

const App = () => {
  return (
    <div className='app-wrapper'>
      <HeaderContainer />
      <Navbar />
      <div className="app-wrapper-content"> 
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={HomeContainer}/>
          <Route path="/singIn" render={ () => <SingInContainer /> }/>
          <Route path="/createAccount" render={ () => <CreateNewAccountContainer /> }/>
          <Route exact path="/profile/:userId?"  render={ () => <ProfileContainer />}/>
          <Route path="/dialogs" render={ () => <DialogsContainer />}/>
          <Route path="/users" render={ () => <UsersContainer /> }/>
          <Route path="/news" render={withSuspense(News)}/>
          <Route path="/music" render={withSuspense(Music)}/>
          <Route path="/settings" render={withSuspense(Settings)}/>
          <Route path="/login" component={Login}/>
          <Route path="*" component={NotFound}/>
        </Switch>
      </div>
    </div>
  );
};
export default App;
