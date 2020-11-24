import './App.css';
import React, {useEffect, useState} from 'react';
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
  const [loggedIn, setLoggedIn] = useState(false); // bool to determine if logged in
  const [loading, setLoading] = useState(true); // is page loading? (don't show info before its' loaded)
  // const [userInformation, setUserInformation] = useState({});

  // ensure app is initialized when it's ready
  useEffect(() => {
    // initializes firebase, but only if it hasn't been initialized before
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    console.log('firebase initialized');
  }, [firebaseConfig])

  // function for logging in
  function LoginFunction(e) {
    // This is what you'll run when you wanna log in
    e.preventDefault(); // stop the form from submitting as a normal html form
    const email = e.currentTarget.loginEmail.value;
    const password = e.currentTarget.loginPassword.value;

    console.log({ email, password });

    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(response) {
      console.log('LOGIN RESPONSE', response);
      setLoggedIn(true);
    })
    .catch(function(error) {
      console.log('LOGIN ERROR', error);
      // setLoggedIn(false); // it already is by default
    });
  }
  // function for logging out
  function LogoutFunction() {
    // Run this when you wanna log out
  }
  // function for creating an account
  function CreateAccountFunction(e) {
    // Run this when you create an account
    e.preventDefault();
    const email = e.currentTarget.createEmail.value;
    const password = e.currentTarget.createPassword.value;

    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function(response) {
      console.log('VALID ACCOUNT CREATED FOR:', email, response);
      setLoggedIn(true);
    })
    .catch(function(error) {
      console.log('ACCOUNT CREATION FAILED', error);
    })
  }
  console.log({ loggedIn });

  return (
  <div className="App">
    <Header loggedIn={loggedIn} LogoutFunction={LogoutFunction}/>
    <Router>
      <Route exact path="/login">
        <Login LoginFunction={LoginFunction} />
      </Route>
      <Route exact path="/create-account">
        <CreateAccount CreateAccountFunction={CreateAccountFunction}/>
      </Route>
      <Route exact path="/">
        <UserProfile />
      </Route>
    </Router>
  </div>
  );
}

export default App;
