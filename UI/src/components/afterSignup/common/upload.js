import React, { Component } from 'react';
import "./common.css";
import upload from "../../../images/upload.png";
import { connect } from "react-redux";
import { uploadFile } from '../../../store/mainSlice.js';
class Upload extends Component {

    constructor() {
        super()
        this.inputOpenFileRef = React.createRef()
    }

    showOpenFileDlg = () => {
        this.inputOpenFileRef.current.click()
    }

    state = { 
        selectedFile: null
     } 

    onFileChange = event => {

        const file = event.target.files[0];

        this.setState({ selectedFile: file });  
        const formData = new FormData();

        formData.append(
            file,
            file.name
        )
        ;
        this.props.uploadFile(formData);
    };

    render() { 
        return (
            <>
                <div className='upload-wrapper' onClick={this.showOpenFileDlg}>
                    <div className='upload-logo'>
                        <img src={upload} />
                    </div>
                </div>
                <input 
                    type="file" 
                    accept='.doc,.docx,.pdf'
                    ref={this.inputOpenFileRef} 
                    onChange={this.onFileChange} 
                    style={{display: 'none'}}
                />
            </>

        );
    }
}
 
const mapStateToProps = (state) => { return {};};
  
const mapDispatch = { uploadFile };
 
export default connect(mapStateToProps, mapDispatch)(Upload);