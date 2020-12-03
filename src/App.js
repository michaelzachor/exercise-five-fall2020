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
  const [userInformation, setUserInformation] = useState({});

  // ensure app is initialized when it's ready
  useEffect(() => {
    // initializes firebase, but only if it hasn't been initialized before
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    console.log('firebase initialized');
  }, [firebaseConfig])

  // check to see if user is logged in
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      console.log({user});
      if(user) {
        setLoggedIn(true);
        setUserInformation(user);
      } else {
        setLoggedIn(false);
      }
      // it's no longer loading
      setLoading(false);
    })
  }, []);

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
    firebase.auth().signOut().then(function() {
      setLoggedIn(false);
      setUserInformation({});
    }).catch(function(error) {
      console.log("LOGOUT ERROR", error);
    });
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

  if(loading) return null;

  return (
  <div className="App">
    <Header loggedIn={loggedIn} LogoutFunction={LogoutFunction}/>
    <Router>
      <Route exact path="/login">
        {!loggedIn ? (
          // if user is not logged in
          // go to Login
          <Login LoginFunction={LoginFunction} />
        )  : (
          // otherwise go to UserProfile
          <Redirect to="/"/>
        )}
      </Route>
      <Route exact path="/create-account">
        {!loggedIn ? (
          // if user is not logged in
          // go to CreateAccount
          <CreateAccount CreateAccountFunction={CreateAccountFunction}/>
        ) : (
          // otherwise go to UserProfile
          <Redirect to="/"/>
        )}
      </Route>
      <Route exact path="/">
        {!loggedIn ? (
          // if user is not logged in
          // go to login
          <Redirect to="/login" />
        ): (
          // otherwise go to UserProfile
          // pass userInformation as a prop to the UserProfile page
          <UserProfile userInformation={userInformation} />
        )}
      </Route>
    </Router>
  </div>
  );
}

export default App;
