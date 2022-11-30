import React, { Component } from 'react';
import "./common.css";
import NavBar from '../common/navBar';
import { connect } from "react-redux";
import setAnalyticsView from '../../../store/mainSlice.js';
import Analytics from '../analytics/analytics';
import Candidate from '../applicantPage/candidate';

class HomePage extends Component {

    render() { 

        return (
            <div className={`${this.props.loader ? 'loading' : ''} home-page-wrapper`}>
                <NavBar />
                { this.props.analyticsView ? <Analytics/> : <Candidate/> }
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return { 
        username: state.main.username,
        analyticsView: state.main.analyticsView,
        loader: state.main.loader
    };
};
  
const mapDispatch = { setAnalyticsView };
 
export default connect(mapStateToProps, mapDispatch)(HomePage);