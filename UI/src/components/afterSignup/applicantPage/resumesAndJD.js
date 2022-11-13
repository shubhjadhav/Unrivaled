import React, { Component } from 'react';
import Table from '../common/table';
import Upload from '../common/upload';

class ResumesAndJD extends Component {
    state = { 
      fileSelected: false
    } 

    onFileSelect = (status) => {
      this.setState({fileSelected: status})
    }

    render() { 
        return (
            <div className='resumes'>
                <div className='header'>
                    <text>{this.props.type ? "RESUMES" : "JOB DESCRIPTIONS"}</text>
                </div>
                <div className='content-list'>
                  <Table data={this.props.data} onFileSelect={this.onFileSelect}/>
                  { !this.props.data.length || this.state.fileSelected ? null : <Upload />}                  
                </div>
            </div>
        );
    }
}
 
export default ResumesAndJD;