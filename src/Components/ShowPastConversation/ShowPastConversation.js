import React,{useEffect, useState} from 'react';
import './ShowPastConversation.css';
import SideBar from '../SideBar/SideBar';
import botLogo from '../../Assets/bot-logo.png';
import userLogo from '../../Assets/user-logo.png';
import Ratings from '../RatingsCard/Ratings';



const ShowPastConversation = ({reset}) => {
const [convDetails, setConvDetails] = useState([]);
// console.log('index-1', typeof convDetails[1][0].ratings)




useEffect(()=>{
  let localStorageItems = JSON.parse(localStorage.getItem('questionAndAnswer')) || [];
  setConvDetails(localStorageItems);
},[])


return (
<div className='container'>
    <SideBar className='sidebar' reset={reset}/>
    <div className='historyContainer'>
        <h1 style={{textAlign:'center'}}>Conversation History</h1>
        <div className='card'>
        {convDetails.map((items, outerIndex) => (
          items.map((details, index) => (
          <div key={`${outerIndex}-${index}`}> {/* Combine outer and inner indices for a unique key */}
            <div className='ques'>
            <img src={userLogo} alt='user-logo' height='50px' width='50px'/>
            <div className='quesDetails'>
              <h4>You</h4>
              <h4>{details.question}</h4>
              <p>{details.time}</p>
            </div>
            </div>
            
            <div className='ans'>
            <img src={botLogo} alt='bot-logo' height='50px' width='50px'/>
            <div className='ansDetails'>
              <h4>Soul AI</h4>
              <h4>{details.answer}</h4>
              <p>{details.time}  {' '}
              {details.suggestion && <span style={{fontWeight:'bold'}}> - Feedback: </span>} 
              {details.suggestion}
              </p>
              { details.ratings > 0 && <p>{details.ratings}⭐ </p>} 
              
              {/* {details.ratings > 0 && (
              <Ratings value={details.ratings} readOnly={true} />
              )} */}

            </div>
            </div>
          </div>
          ))
        ))}
        </div>
    </div>
</div>
)
}

export default ShowPastConversation;