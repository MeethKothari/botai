import React,{useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SideBar from './Components/SideBar/SideBar';
import CurrentConversations from './Components/CurrentConversation/Current';
import ShowPastConversation from './Components/ShowPastConversation/ShowPastConversation';

function App() {
  const [conversation, setConversation] = useState([]); 
  // first conversation, setConversation was initialized in CurrentConversations but due to resest of new 
  // conversation i initialized this local state in local parent as lifting state up method
  // in this way i can pass the local state to CurrentConversations comp and reset func to sideBar comp


  const reset = () => {
    setConversation([]);
  }

return (
  <Router> 
    <Routes>
      <Route path='/' element={ 
      <div className="app">
        <SideBar reset={reset}/>
        <CurrentConversations conversation={conversation} setConversation={setConversation}/>
      </div>
      }/>
      <Route path='/pastConversation' element={<ShowPastConversation reset={reset}/>} />
    </Routes>
  </Router>
);
}

export default App;
