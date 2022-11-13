import React, { Component } from 'react';
import "./candidate.css";
import NavBar from '../common/navBar';
import Resumes from './resumes';
import JD from './jd';

class Candidate extends Component {
    state = {  } 
    render() { 
        return (
            <div className='candidate-wrapper'>
                <NavBar />
                <div className='main-section'>
                    <Resumes />
                    <JD/>
                </div>
            </div>
        );
    }
}
 
export default Candidate;