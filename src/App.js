import Header from './components/header';
import NotesValue from './components/inputs';
import Options from './components/options';
import Notessaver from './components/Shownotes';
import './css/notes.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
       
       <Header/>
       <Options/>
       <NotesValue/>
       <Notessaver/>
       
      </header>
    </div>
  );
}

export default App;
