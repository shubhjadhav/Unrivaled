import React, { Component } from 'react';
import Table from '../common/table';
import Upload from '../common/upload';

class ResumesAndJD extends Component {
    state = { 
      fileSelected: false
    } 

    onFileSelect = (status) => {
      this.setState({fileSelected: status})
      this.props.onResumeOrJDSelect(this.props.type, status)
    }

    render() { 
        return (
            <div className='resumes' style={{width: this.props.width}}>
                <div className='header'>
                    {this.props.type ? "RESUMES" : "JOB DESCRIPTIONS"}
                </div>
                <div className='content-list'>
                  <Table data={this.props.data} onFileSelect={this.onFileSelect}/>
                  { this.state.fileSelected ? null : <Upload docType={this.props.type}/> }                  
                </div>
            </div>
        );
    }
}
 
export default ResumesAndJD;