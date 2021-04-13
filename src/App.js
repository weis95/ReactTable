import Topbar from './components/Topbar/Topbar'
import Table from './components/Table/Table'
import './App.css';
import { participants } from './participants.js'

function App() {
  return (
    <div className="App">
      <Topbar />
      <Table participants={ participants }/>
    </div>
  );
}

export default App;
