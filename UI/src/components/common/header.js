import React, { Component } from 'react';
import "./header.css";
import logo from "../../images/logo-svg 1.png";

class Header extends Component {
    state = {  } 
    render() { 
        return (
            <div className='headerWrapper'>
                <div className='logo'>
                    <img src={logo} width="150" class="img" alt="facebook"/>
                </div>
                <div className='userDetails'>"Welcome!"</div> 
            </div>
        );
    }
}
 
export default Header;

