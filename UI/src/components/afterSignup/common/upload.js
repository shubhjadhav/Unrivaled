import React, { Component } from 'react';
import "./common.css";
import upload from "../../../images/upload.png";
class Upload extends Component {

    constructor() {
        super({})
        this.inputOpenFileRef = React.createRef()
    }

    showOpenFileDlg = () => {
        this.inputOpenFileRef.current.click()
    }

    state = { 
        selectedFile: null
     } 

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });  
        alert(event.target.files[0].name)
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
 
export default Upload;