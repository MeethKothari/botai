import React,{useState} from 'react';
import './Present.css';
import botLogo from '../../Assets/bot-logo.png';
import newChatImage from '../../Assets/newchat-image.png';

const PresentConversation = () => {
const [isOpen, setIsOpen] = useState(false);

const handleMenuBar = () => {
  setIsOpen(!isOpen);
}

return (
  <div className='past'>
     
    {/* we will not render it for lg screen it is set as display: none initially */}
    <div className = 'burgerMenu' onClick={handleMenuBar}> ☰ </div>
    

    {/* we are conditionally giving class name for smaller screen if sm screen then (.menu.open) or else (.menu) */}

    <div className = {`menu ${ isOpen === true ? 'open' : ''}`}>
      <div className='newChat'>
        <img src={botLogo} alt='Bot AI' height='50px' width='50px'/>
        <h3>New Chat</h3>
        <img src={newChatImage} alt='New Chat' height='30px'/>
      </div>
      <button>Past Conversations</button>
    </div>

  </div>
  )
}

export default PresentConversation;