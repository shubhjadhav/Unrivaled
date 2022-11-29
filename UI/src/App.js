import React from 'react';
import './App.css';
import HomePage from './components/afterSignup/common/homePage';
import LoginForm from './components/landingPage/loginPage.js';
import { connect } from "react-redux";
import { Audio } from  'react-loader-spinner';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        { this.props.login ? <HomePage/> : <LoginForm/> }
        <div className={`loader ${this.props.loader ? 'loader-visible' : ''}`}>
          <Audio visible={this.props.loader}/>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => { return {
  username: state.main.username,
  login: state.main.login,
  loader: state.main.loader
};};
  
const mapDispatch = { };
 
export default connect(mapStateToProps, mapDispatch)(App);
