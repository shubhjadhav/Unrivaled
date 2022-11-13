import React, { Component } from 'react';
import "./candidate.css";
import NavBar from '../common/navBar';
import ResumesAndJD from './resumesAndJD';
import { connect } from "react-redux";
import { dummy } from '../../../store/mainSlice.js';

class Candidate extends Component {
    state = { 
        dummyData: []
    } 

    componentDidMount(){
        this.props.dummy();
    }

    render() { 
        return (
            <div className='candidate-wrapper'>
                <NavBar />
                <div className='main-section'>
                    <ResumesAndJD type={1} data={this.props.dummyData}/>
                    <ResumesAndJD type={0} data={this.props.dummyData}/>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return { dummyData: state.main.dummyData };
};
  
const mapDispatch = { dummy };
 
export default connect(mapStateToProps, mapDispatch)(Candidate);