import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Diabetic from './Components/Diabetic';

function App() {
  return (
    <>
    <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/diabetic' element={<Diabetic/>}/>
        </Routes>
    </BrowserRouter>
      
    
    </>
  );
}

export default App;
