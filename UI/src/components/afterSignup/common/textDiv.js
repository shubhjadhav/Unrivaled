import React, { Component } from 'react';
import "./common.css";

class TextDiv extends Component {
    state = {  } 
    render() { 
        return (
            <div className='text-div-wrapper'>
                <div className='text-div-header'>
                    {this.props.header}
                </div>
                <div className='text-div-text'>
                    {this.props.value} 
                </div>
            </div>
        );
    }
}
 
export default TextDiv;