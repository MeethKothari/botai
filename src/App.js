import './App.css';
import PresentConversation from '../src/Components/PresentConversation/Present';
import CurrentConversations from './Components/CurrentConversation/Current';

function App() {
  return (
    <div className="app">
    <PresentConversation/>
    <CurrentConversations/>
    </div>
  );
}

export default App;
