import React, { Component } from 'react';
import "./candidate.css";
import NavBar from '../common/navBar';
import ResumesAndJD from './resumesAndJD';
import { connect } from "react-redux";
import { dummy, analytics, getAllResumes, getAllJDs } from '../../../store/mainSlice.js';
import analyze from "../../../images/analyze.png";

class Candidate extends Component {
    state = { 
        dummyData: [],
        resumeSelected: false,
        jdSelected: false
    } 

    componentDidMount(){
        this.props.dummy();
        this.props.getAllResumes();
        this.props.getAllJDs();
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
            "resume": this.state.resumeSelected,
            "jd": this.state.jdSelected
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
                        data={this.props.resumeList}
                        onResumeOrJDSelect={this.onResumeOrJDSelect}
                    />
                    <div 
                        className='analysis-wrapper' 
                        title="Click to analyze your selected resume"
                        style={this.state.resumeSelected && this.state.jdSelected ? 
                            analyzeStyle[0] : 
                            analyzeStyle[1]} 
                            onClick={this.analyzeFiles} 
                    >
                        <div className='analysis-logo' >
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
                        data={this.props.jdList}
                        onResumeOrJDSelect={this.onResumeOrJDSelect}
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return { 
        dummyData: state.main.dummyData,
        resumeList: state.main.resumeList,
        jdList: state.main.jdList
    };
};
  
const mapDispatch = { dummy, analytics, getAllResumes, getAllJDs };
 
export default connect(mapStateToProps, mapDispatch)(Candidate);