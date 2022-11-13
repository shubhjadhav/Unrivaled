import React, { Component } from 'react';
import "./common.css";
import upload from "../../../images/upload.png";

class Upload extends Component {
    state = {  } 
    render() { 
        return (
            <div className='upload-wrapper'>
                <div className='upload-logo'>
                    <img src={upload} />
                </div>
            </div>
        );
    }
}
 
export default Upload;