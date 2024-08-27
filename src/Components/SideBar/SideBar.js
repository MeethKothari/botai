import React,{useState} from 'react';
import './SideBar.css';
import botLogo from '../../Assets/bot-logo.png';
import newChatImage from '../../Assets/newchat-image.png';
import { Link, useNavigate } from 'react-router-dom';

const SideBar = ({reset}) => {
const [isOpen, setIsOpen] = useState(false);
const navigate = useNavigate();

const handleMenuBar = () => {
  setIsOpen(!isOpen);
}


const handleRefresh = () => {
  console.log('refresh button clicked');
  reset();
  navigate('/');
}
// if we use only reset function it will only clear the unsaved ques and answers 
// This will cause the CurrentConversations component to re-render with conversation.length === 0
// to ensure it to redirect it back to ('/') which is side bar and CurrentConversations we are using navigate hook

return (
  <div className='past'>
     
    {/* we will not render it for lg screen it is set as display: none initially */}
    <div className = 'burgerMenu' onClick={handleMenuBar}> ☰ </div>
    

    {/* we are conditionally giving class name for smaller screen if sm screen then (.menu.open) or else (.menu) */}

    <div className = {`menu ${ isOpen === true ? 'open' : ''}`}>
      <div className='newChat' onClick={handleRefresh}>
        <img src={botLogo} alt='Bot AI' height='50px' width='50px'/>
        <h3>New Chat</h3>
        <img src={newChatImage} alt='New Chat' height='30px'/>
      </div>
      <Link to='/pastConversation' style={{textDecoration:'none'}}>
        <button >Past Conversations</button>
      </Link>
    </div>
  
  </div>
  )
}

export default SideBar;

