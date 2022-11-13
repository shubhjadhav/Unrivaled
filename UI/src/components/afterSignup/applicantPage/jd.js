import React, { Component } from 'react';
import Upload from '../common/upload';

class JD extends Component {
    state = {  } 
    render() { 
        return (
            <div className='jd'>
                <div className='header'>
                    <text>JOB DESCRIPTIONS</text>
                </div>
                <div className='content-list'>
                    <Upload />
                </div>
            </div>
        );
    }
}
 
export default JD;