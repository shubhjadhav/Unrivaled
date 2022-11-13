import React, { Component } from 'react';
import Table from '../common/table';
import Upload from '../common/upload';

class Resumes extends Component {
    state = {  } 
    render() { 
        return (
            <div className='resumes'>
                <div className='header'>
                    <text>RESUMES</text>
                </div>
                <div className='content-list'>
                    <Table />
                    <Upload />
                </div>
            </div>
        );
    }
}
 
export default Resumes;