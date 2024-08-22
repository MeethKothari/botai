import React from 'react';
import './Current.css';
import botLogo from '../../Assets/bot-logo.png';

const CurrentConversations = () => {
  return (
    <div className='currentConversation'>
        
        <h1 className='heading'>Bot AI</h1>
        <div className='subHeading'>
            <h3 style={{fontFamily:'Ubuntu'}}>How Can I Help You Today ?</h3>
            <img src={botLogo} alt='bot-logo' height='70px' width='70px'/>
        </div>
       
       
        <div className='grid-container'>
            <div className='grid-item'>
                <h4>Hi, What is the weather <br/> 
                <span >Get immediate AI generated response</span>
                </h4>
            </div>
            <div className='grid-item'>
                <h4>Hi, What is my location <br/> 
                <span >Get immediate AI generated response</span>
                </h4>
            </div>
            <div className='grid-item'>
                <h4>Hi, what is the temperature <br/> 
                <span >Get immediate AI generated response</span>
                </h4>
            </div>
            <div className='grid-item'>
                <h4>Hi, how are you <br/> 
                <span >Get immediate AI generated response</span>
                </h4>
            </div>
        </div>
        
        <div style={{display:'flex', flexDirection: 'column', height:'20vh' }}>
        <div style={{marginTop:'auto'}} className='inputField'>
            <input/>
            <button>Ask</button>
            <button>Save</button>
        </div>
        </div>
    </div>
  )
}

export default CurrentConversations;