import React, { Component } from 'react';
import "./header.css";

class Header extends Component {
    state = {  } 
    render() { 
        return (
            <div className='headerWrapper'>
                <div className='logo'>
                    <img src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" width="112" class="img" alt="facebook"/>
                </div>
                <div className='userDetails'>"Hi Shubham"</div> 
            </div>
        );
    }
}
 
export default Header;