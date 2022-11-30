import React, { Component } from 'react';
import documentLogo from "../../../images/folders.png";
import profile from "../../../images/man.png";
import settings from "../../../images/configuration.png";
import notifications from "../../../images/notification.png";
import logoutLogo from "../../../images/shutdown.png";
import { connect } from "react-redux";
import { setAnalyticsView, logout } from '../../../store/mainSlice.js';
import "./common.css";

class NavBar extends Component {
    state = {  } 

    setCandidateView = () => {
        this.props.setAnalyticsView(false)
    }

    render() { 
        return (
            <div className='navbar'>
                    <div className='logo'>
                        <img alt='' src={profile} />
                    </div>
                    <div className='username'>
                        {`Hi ${this.props.username}`}
                    </div>
                    <div className='logo' onClick={this.setCandidateView}>
                        <img alt='' src={documentLogo} />
                    </div>
                    <div className='logo'>
                        <img alt='' src={notifications} />
                    </div>
                    <div className='logo settings'>
                        <img alt='' src={settings} />
                    </div>
                    <div className='logo settings' >
                        <img alt='' src={logoutLogo} onClick={this.props.logout}/>
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
  
const mapDispatch = { setAnalyticsView, logout };
 
export default connect(mapStateToProps, mapDispatch)(NavBar);