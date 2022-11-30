import React, { Component } from 'react';
import "./common.css";
import upload from "../../../images/upload.png";
import { connect } from "react-redux";
import { uploadFile, setLoading, getAllResumes, getAllJDs } from '../../../store/mainSlice.js';
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

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
            const data = {
                "name": file.name,
                "username": "shubham",
                "type": file.type,
                "docType": this.props.docType ? "resume" : "jd",
                "file": e.target.result,
                "createdOn": new Date(file.lastModifiedDate).toJSON().slice(0, 10)
            };

            const body = JSON.stringify(data);
            const customConfig = {
                headers: {
                'Content-Type': 'application/json'
                }
            };
    
            this.props.uploadFile(body, customConfig)
            this.props.setLoading(true);

            setTimeout(() => {
                this.props.getAllResumes();
                this.props.getAllJDs();               
            }, 500);

        }
  
    };

    render() { 
        return (
            <>
                <div className='upload-wrapper' onClick={this.showOpenFileDlg}>
                    <div className='upload-logo'>
                        <img alt='' src={upload} />
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
  
const mapDispatch = { uploadFile, setLoading, getAllResumes, getAllJDs };
 
export default connect(mapStateToProps, mapDispatch)(Upload);