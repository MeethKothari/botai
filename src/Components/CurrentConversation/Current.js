import React,{useState, useEffect} from 'react';
import { enqueueSnackbar} from "notistack";
import sampleData from '../../Data/data.json';
import './Current.css';
import Feedback from '../FeedbackModal/Feedback';
import Ratings from '../RatingsCard/Ratings';
import botLogo from '../../Assets/bot-logo.png';
import userLogo from '../../Assets/user-logo.png';
import like from '../../Assets/like.png';
import dislike from '../../Assets/dislike.png';

const CurrentConversations = ({conversation, setConversation}) => {
const [text, setText] = useState(''); 
const [save, setSave] = useState(false);
const [ratingsForm, setRatingsForm] = useState(false);
const [feedbackForm, setFeedbackForm] = useState(false);
// states that we will pass to feedback component 
const [currentIndex, setCurrentIndex] = useState(''); // we will use this for indexing purpose of feedback form
const [currentRatingIndex, setCurrentRatingIndex] = useState('');
const [query, setQuery] = useState('');
const [suggestion, setSuggestion] = useState('');
 
//console.log('suggestion (current component)', suggestion);






// ask button (ask question)
const handleSearch = () => {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US',{
    hour: 'numeric',
    minute:'numeric',
    hour12: true
  });
  setConversation(prev => [...prev, {question: text, answer: null, time: timeString, suggestion: '', ratings:0}]);  // this will render user question to ui in return statement only if ask button clicked
  setText(''); // clear the search input 'blank'
}








//send question to find answer
useEffect(()=>{
if (conversation.length > 0){
  let lastConversation = conversation[conversation.length-1];  
  let lastQuestion = conversation[conversation.length-1].question;
  
  const questionToAsk = typeof lastQuestion === 'string' ? lastQuestion : String(lastQuestion);

  if (!lastConversation.answer){
    findAnswer(questionToAsk)
  } 
}
},[conversation]);








// find answer for the question received from the upper function
const findAnswer = (question) => {
  let answerFound = sampleData.find((item) => 
    item.question.toLocaleLowerCase() === question.toLocaleLowerCase());
  

  setConversation((prev) => {  // this is like dummy ans as typing.... before answer is generated.
    let updatedConversation = [...prev];
    let lastConversation = updatedConversation[updatedConversation.length - 1];

    lastConversation = {
      ...lastConversation,
      answer: "typing...."
    };

    updatedConversation[updatedConversation.length - 1] = lastConversation;
    return updatedConversation;
  });



  setTimeout(()=>{  // to delay the answer and show as bot is typing
    setConversation((prev) => {
      let updatedConversation = [...prev];
      let lastConversation = updatedConversation[updatedConversation.length-1];
  
      if(answerFound){
        lastConversation = {
          ...lastConversation, 
          answer: answerFound.response
        }
      }
      else {
        lastConversation = {
          ...lastConversation, 
          answer: `sorry, I dont have an answer to that question...`
        }
      }
  
      updatedConversation[updatedConversation.length-1] = lastConversation;
      return updatedConversation;
    })
  },1500)
  
};






// Feedback Form --
const openForm = (index) => {
  //<Feedback feedbackForm={feedbackForm}/>
  // if we store the curr idx then this will make sure that modal is opened and feedback is given for the particular conversation
  //console.log('Index of the current conversation', index);
  setFeedbackForm(true);
  setCurrentIndex(index);
  //setSuggestion(conversation[index].suggestion || '');
}
useEffect(()=>{
  if (currentIndex !== ''){
    setConversation( prev => {
      let updatedConversation = [...prev];
      updatedConversation[currentIndex].suggestion = suggestion;
      return updatedConversation;
    })
  }
},[suggestion, currentIndex]);






// Ratings Form --
// using if else statement we have ensured that on click of like button it should render or not...
const openRatings = (index) =>{
  //console.log('ratings btn clicked')
  //console.log(index);
  if (ratingsForm === false){
    setCurrentRatingIndex(index);
    setRatingsForm(true);
  }
  else {
    setRatingsForm(false);
  }
}






// save button to store in local storage
const handleSave = () => {
  console.log('save button clicked');
  setSave(true);
  enqueueSnackbar('saved successfully', {variant:'success'});
}

// save the conversation to local storage only if save button is clicked to use it later (to show it in past conversation history)
useEffect(()=>{
  if (save === true){
    if ( conversation.length > 0 ){  // ensuring conditions before saving 
    let prevQuestionAndAnswer = JSON.parse(localStorage.getItem('questionAndAnswer')) || [];
    let updatedQuestionAndAnswer = [...prevQuestionAndAnswer, conversation];
    localStorage.setItem('questionAndAnswer', JSON.stringify(updatedQuestionAndAnswer));
  }
  setSave(false); // reset the save button to false 
 }
},[save, conversation]);








return (
<div className='currentConversation'>
<h1 className='heading'>Bot AI</h1>
{ conversation.length === 0 ? (
  <>
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
  </>
) : (
  <>
  { conversation.map((ques, index) => (
  <div key={index}>
    <div className='userQuestionCard'>
      <img src={userLogo} alt='user-logo' height='50px' width='50px'/>
      <div className='textArea'>
        <h4>You</h4>
        <h4>{ques.question}</h4>
        <p>{ques.time}</p>
      </div>
    </div>
  

  
  {ques.answer && (
    <div className='userQuestionCard' key={`answer-${index}`}>
      <img src={botLogo} alt='bot-logo' height='50px' width='50px'/>
      <div className='textArea'>
        <h4>Soul AI</h4>
        <h4>{ques.answer}</h4>
        <div style={{display: 'flex', gap:'10px'}}>
          <p>{ques.time}</p>
          <img src={like} alt='like' className='likeAndDislikeBtn' onClick={()=>openRatings(index)}/>
          <p>{ratingsForm  && currentRatingIndex === index ? <Ratings conversation={conversation} setConversation={setConversation} currentRatingIndex={currentRatingIndex}/> : null}</p>
          <img src={dislike} alt='dislike' className='likeAndDislikeBtn' onClick={()=>openForm(index)}/>
          <p> {ques.suggestion && `Feedback: ${ques.suggestion}`} </p>
        </div>
      </div>
    </div>
  )}
</div>
))} 

</>

)}
   

  <div className='inputField'>
    <input type='search' placeholder='Search' value={text} onChange={(e)=>setText(e.target.value)}/>
    <button onClick={handleSearch}>Ask</button>
    <button onClick={handleSave}>Save</button>
  </div>

  
  
  {feedbackForm === true ? <Feedback closeForm={()=> setFeedbackForm(false)} 
                            query={query} setQuery={setQuery} 
                            suggestion={suggestion} setSuggestion={setSuggestion} /> : null}
</div>
  )
}

export default CurrentConversations;