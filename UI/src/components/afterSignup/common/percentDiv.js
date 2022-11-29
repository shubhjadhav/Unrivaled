import React, { Component } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./common.css";

class PercentDiv extends Component {
    state = {  } 
    render() { 
        return (
            <div className='percent-div-wrapper'>
                <div className='percent-div-text'>
                    {this.props.header}
                </div>
                <div className='percent-div-cpb'>
                    <CircularProgressbar 
                        value={this.props.value} 
                        maxValue={1} 
                        text={`${Math.round(this.props.value * 1000)/10}%`} 
                    />
                </div>
            </div>
        );
    }
}
 
export default PercentDiv;