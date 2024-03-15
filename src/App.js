import './App.css';
import Main from './components/Main/Main';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Main />
      <ToastContainer />
    </div>
  );
}

export default App;
