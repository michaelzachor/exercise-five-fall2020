import './App.css';
import React from 'react';
import {Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
//Styles
import './App.css';
// Pages
import Login from './containers/Login';
import CreateAccount from './containers/CreateAccount';
import UserProfile from './containers/UserProfile';
//Components
import Header from './components/Header';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "exercise-five-2bea8.firebaseapp.com",
  databaseURL: "https://exercise-five-2bea8.firebaseio.com",
  projectId: "exercise-five-2bea8",
  storageBucket: "exercise-five-2bea8.appspot.com",
  messagingSenderId: "230274374647",
  appId: "1:230274374647:web:7c74b1f45f84c6be0c6cf2"
};

function App() {
  return (
  <div className="App">
    <Header />
    <Router>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/create-account">
        <CreateAccount />
      </Route>
      <Route exact path="/">
        <UserProfile />
      </Route>
    </Router>
  </div>
  );
}

export default App;
