import React, { Component } from 'react';
import "./footer.css";
import logoGoogle from "../../images/GoogleLogo.png";
import logoIBM from "../../images/IBMLogo.png";
import logoMeta from "../../images/MetaLogo.png";
import logoMicrosoft from "../../images/MicrosoftLogo.png";

class Footer extends Component {
    state = {  } 
    render() { 
        return (
            <div className='footerWrapper'>
                <div className='logoMicrosoft'>
                    <img src={logoMicrosoft} width="170" class="img" alt="facebook"/>
                </div>
                <div className='logoMeta'>
                    <img src={logoMeta} width="150" class="img" alt="facebook"/>
                </div>
                <div className='logoIBM'>
                    <img src={logoIBM} width="100" class="img" alt="facebook"/>
                </div>
                <div className='logoGoogle'>
                    <img src={logoGoogle} width="150" class="img" alt="facebook"/>
                </div>
                
            </div>
        );
    }
}
 
export default Footer;
