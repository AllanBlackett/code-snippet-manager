import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase');
require('firebase/firestore');
        
  firebase.initializeApp({   
    apiKey: "AIzaSyDwf5coJqzXgYbXY9JzYElmB_l86_a1GbA",	
    authDomain: "code-snippet-manager-8814b.firebaseapp.com",	   
    databaseURL: "https://code-snippet-manager-8814b.firebaseio.com",	
    projectId: "code-snippet-manager-8814b",	
    storageBucket: "code-snippet-manager-8814b.appspot.com",	
    messagingSenderId: "795530527968",	
    appId: "1:795530527968:web:53e4ebb9faac5b024f7c85"
  });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('csm-container')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
