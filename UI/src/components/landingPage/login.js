import React, { Component } from 'react';
import "./login.css";

class login extends Component {
    state = {  } 
    render() { 
        return (
            <div className='loginWrapper'>
                <div className='loginText'>Login</div> 
                <div className='emailText'>Email</div> 
                <div className='emailBox'></div> 
                <div className='passwordText'>Password</div> 
                <div className='passwordBox'></div> 
                
                <div className='signInButtom'>
                    <Text>Sign 
                        in
                    </Text>
                </div> 

                <div className='createAccButtom'>
                    <Text>Create 
                        an Account
                    </Text>
                </div> 

                

            </div>
        );
    }
}
 
export default login;