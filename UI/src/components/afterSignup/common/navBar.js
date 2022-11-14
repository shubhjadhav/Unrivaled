import React, { Component } from 'react';
import documentLogo from "../../../images/folders.png";
import profile from "../../../images/man.png";
import settings from "../../../images/configuration.png";
import notifications from "../../../images/notification.png";
import logout from "../../../images/shutdown.png";
import { connect } from "react-redux";
import "./common.css";

class NavBar extends Component {
    state = {  } 
    render() { 
        return (
            <div className='navbar'>
                    <div className='logo'>
                        <img alt='' src={profile} />
                    </div>
                    <div className='username'>
                        {`Hi ${this.props.username}`}
                    </div>
                    <div className='logo'>
                        <img alt='' src={documentLogo} />
                    </div>
                    <div className='logo'>
                        <img alt='' src={notifications} />
                    </div>
                    <div className='logo settings'>
                        <img alt='' src={settings} />
                    </div>
                    <div className='logo settings'>
                        <img alt='' src={logout} />
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        username: state.main.username,
        resumeList: state.main.resumeList,
        jdList: state.main.jdList
    };
};
  
const mapDispatch = {};
 
export default connect(mapStateToProps, mapDispatch)(NavBar);