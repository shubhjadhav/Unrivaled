import React from 'react';
import logo from './logo.svg';
import './App.css';
import Candidate from './components/afterSignup/applicantPage/candidate';
import { useSelector } from "react-redux";

import Header from './components/common/header.js';
import Login from './components/landingPage/login.js';

function App() {
  return (

    <div className="App">
      <Header/>
    </div>

  );

}


export default App;
