import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/common/header.js';
import Login from './components/landingPage/login.js';
import Footer from './components/common/footer';

function App() {
  return (

    <div className="App">
      <Header/>
      <Login/>
      <Footer/>
    </div>

  );

}


export default App;
