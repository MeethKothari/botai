import React,{useState} from 'react';
//import ReactDOM from 'react-dom';
import { enqueueSnackbar} from "notistack";
import Modal from 'react-modal';
import suggestionLogo from '../../Assets/suggestion.png';
import close from '../../Assets/close.png';
import './Feedback.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function Feedback({closeForm, query, setQuery, suggestion, setSuggestion}) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(true);
  // const [query, setQuery] = useState('');
  // const [suggestion, setSuggestion] = useState('');

  function openModal() {  // open modal
    setIsOpen(true);
  }
  
  function afterOpenModal(){}

  function closeModal() { // close modal
    setIsOpen(false);
    closeForm();
  }
 
  function submitFeedback(){
    if (query){
      setSuggestion(query);
      setQuery('');
      enqueueSnackbar('feedback submitted successfully', {variant:'success'});
    }
    else{
      enqueueSnackbar('feedback cannot be blank',{variant:'warning'});
    }
  }
  //console.log('suggestion', suggestion);


  return (
    <div style={{display:'flex'}}>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className='heading'>
          <img src={suggestionLogo} alt='suggestion' height='30px' width='30px'/>
          <h3>Provide Additional Feedback</h3>
          <img src={close} alt='close' height='10px' width='10px' style={{cursor:'pointer'}}
            onClick={closeModal}
          />
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
          <input type='text' className='input-field' value={query} onChange={(e)=>setQuery(e.target.value)}/>  
        </div>  
        <div style={{display:'flex', justifyContent:'end'}}>
          <button className='submit-button' onClick={submitFeedback}>Submit</button>
        </div>
      </Modal>
    </div>
  );
}


export default Feedback;