import React, { Component } from 'react';
import "./analytics.css";
import { connect } from "react-redux";
import { } from '../../../store/mainSlice.js';
import 'react-circular-progressbar/dist/styles.css';
import WordCloud from 'react-d3-cloud';
import PercentDiv from "../common/percentDiv";
import TextDiv from "../common/textDiv";
import { v4 as uuidv4 } from 'uuid';
class Analytics extends Component {
  
  state = {
    viz:[]
  }

  componentDidMount(){

    let temp = this.props.analyticsResult.Frequency_Dict
    let tempList = []

    temp.forEach(element => {
      tempList.push({
        "text": element.text,
        "value": element.value
      })
    });

    this.setState({viz: tempList})
  }

    render() { 

        const result = this.props.analyticsResult

        return (
            <div className='analytics-wrapper'>
                <div className='analytics-row-1'>
                  <div className='cpb-div'>
                    <PercentDiv 
                      key={uuidv4()}
                      value={result["Similarity Score"]} 
                      header={"Similarity Score"} 
                    />
                  </div>
                  <div className='wc-div'>
                    <WordCloud
                      data={this.state.viz}
                      fontSize={(word) => word.value*10}
                      rotate={0}
                    />
                  </div>
                    <div className='cpb-div'>
                      <PercentDiv 
                        key={uuidv4()}
                        value={result["Keyword Match Rate"]} 
                        header={"Keyword Match Rate"} 
                      />
                    </div>
                </div>
                <div className='analytics-row-2'>
                  <TextDiv value={result["Words in Resume"]} header={"Words in Resume"}/>
                  <TextDiv value={result["Keywords in resume"]} header={"Keywords in Resume"}/>
                  <TextDiv value={result["Words in JD"]} header={"Words in Job Description"}/>
                  <TextDiv value={result["Matched Keywords"]} header={"Matched Keywords"}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        resumeList: state.main.resumeList,
        jdList: state.main.jdList,
        username: state.main.username,
        analyticsResult: state.main.analyticsResult
    };
};
  
const mapDispatch = { };
 
export default connect(mapStateToProps, mapDispatch)(Analytics);