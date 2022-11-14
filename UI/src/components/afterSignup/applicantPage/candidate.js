import React, { Component } from 'react';
import "./candidate.css";
import NavBar from '../common/navBar';
import ResumesAndJD from './resumesAndJD';
import { connect } from "react-redux";
import { dummy, analytics } from '../../../store/mainSlice.js';
import analyze from "../../../images/analyze.png";
const config = require('../../../config.js')

class Candidate extends Component {
    state = { 
        dummyData: [],
        resumeSelected: false,
        jdSelected: false
    } 

    componentDidMount(){
        this.props.dummy();
    }

    onResumeOrJDSelect = (type, status) => {
        if(type){
            this.setState({resumeSelected: status})
        } else {
            this.setState({jdSelected: status})
        } 
    }

    analyzeFiles = () => {
        console.log("analyze")

        const data = {
            "resume": "Resume 1",
            "jd": "Job description 1"
        };

        const body = JSON.stringify(data);
        const customConfig = {
            headers: {
            'Content-Type': 'application/json'
            }
        };

        this.props.analytics(body, customConfig)
    }

    render() { 

        const analyzeStyle = [
            {
                width: "6%",
                margin: "20px"
            },
            {
                width: "0%",
                margin: "0px"
            },
            { height: "35px"},
            { height: "0px"}
        ]

        return (
            <div className='candidate-wrapper'>
                <NavBar />
                <div className='main-section'>
                    <ResumesAndJD 
                        type={1} 
                        width={this.state.resumeSelected && this.state.jdSelected ? "47%" : "50%"} 
                        data={this.props.dummyData}
                        onResumeOrJDSelect={this.onResumeOrJDSelect}
                    />
                    <div 
                        className='analysis-wrapper' 
                        style={this.state.resumeSelected && this.state.jdSelected ? 
                            analyzeStyle[0] : 
                            analyzeStyle[1]} 
                            onClick={this.analyzeFiles} 
                    >
                        <div className='analysis-logo'>
                            <img alt='' 
                                src={analyze} 
                                style={this.state.resumeSelected && this.state.jdSelected ? 
                                    analyzeStyle[2] : 
                                    analyzeStyle[3]}
                            />
                        </div>
                    </div>
                    <ResumesAndJD 
                        type={0} 
                        width={this.state.resumeSelected && this.state.jdSelected ? "47%" : "50%"} 
                        data={this.props.dummyData}
                        onResumeOrJDSelect={this.onResumeOrJDSelect}
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return { dummyData: state.main.dummyData };
};
  
const mapDispatch = { dummy, analytics };
 
export default connect(mapStateToProps, mapDispatch)(Candidate);