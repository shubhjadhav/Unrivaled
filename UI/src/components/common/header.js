import React, { Component } from 'react';
import "./header.css"

class Header extends Component {
    state = {  } 
    render() { 
        return (
            <div className='headerWrapper'>
                <div className='logo'>
                    <img src="C:/Users/The Marry/test/Unrivaled/UI/src/images/logo-png.png" />
                </div>
                <div className='userDetails'>"Hi Shubham"</div> 
            </div>
        );
    }
}
 
export default Header;