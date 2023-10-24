import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/register' element={<Register></Register>}></Route>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
