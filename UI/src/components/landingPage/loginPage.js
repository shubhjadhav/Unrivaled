import React from 'react';
import "./login.css";
import Meta from "../../images/MetaLogo.png";
import Google from "../../images/GoogleLogo.png";
import Microsoft from "../../images/MicrosoftLogo.png";
import IBM from "../../images/IBMLogo.png";
import Logo from "../../images/logo-png.png";
import { connect } from "react-redux";
import { login, setLoading } from '../../store/mainSlice.js';

class LoginForm extends React.Component {

  // construtor for LoginForm class component
  constructor(props) {

    // call parent class constructor
    super(props);

    // state variables for LoginForm class component
    this.state = {
      password: '',
      username: ''
    };
  }

  /*******************************
  * @desc this function creates a object 
  * with username and encrypted password 
  * and authenticate user
  *******************************/
  authenticate = () => {

    this.props.setLoading(true)

    const userDetails = {
      Name: this.state.username,
      password: this.state.password
    }

    const body = JSON.stringify(userDetails);
    const customConfig = {
        headers: {
        'Content-Type': 'application/json'
        }
    };

    setTimeout(() => {
        this.props.login(body, customConfig)
    }, 1000);
  }

  /*******************************
  * @desc this function renders login 
  * form for user to authenticate
  *******************************/ 
  render() {

    return (
        <div className='login-page-wrapper'>
            <div className="login-form-wrapper">
                <div className="login-form">
                    <div className='header-text'><img alt='' src={Logo} /></div> 
                    <div className="login-form-input-wrapper">
                        <input onChange={(e) => this.setState({username: e.target.value})} placeholder="Username"/>
                        <input 
                            onChange={(e) => this.setState({password: e.target.value})} 
                            className="password"
                            placeholder="Password"
                        />
                    <button onClick={() => this.authenticate()} className="login-form-submit" type="button" >Sign In</button>
                    </div>        
                </div>
            </div> 
            <div className='footer'>
                <img alt='' src={Meta}/>
                <img alt='' src={IBM}/>
                <img alt='' src={Google}/>
                <img alt='' src={Microsoft}/>
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => { return {};};
  
const mapDispatch = { login, setLoading };
 
export default connect(mapStateToProps, mapDispatch)(LoginForm);