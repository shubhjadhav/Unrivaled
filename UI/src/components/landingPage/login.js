import React, { Component } from 'react';
import "./login.css";

class login extends Component {
    state = {  } 
    render() { 
        return (
            <div className='loginWrapper'>
                <div className='loginText'>"Login"</div> 
                <div className='emailText'>"Email"</div> 
                <div className='emailBox'></div> 
                <div className='passwordText'>"Password"</div> 
                <div className='passwordBox'></div> 
                <div className='signinText'>"Sign in"</div> 
                <div className='createAccText'>"Create an Account"</div> 

                

            </div>
        );
    }
}
 
export default Header;