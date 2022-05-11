import './scss/main.scss'
import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./pages/Navigation";


function App() {
  return (
<>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<Navigation/>} />
    </Routes>

</>
  );
}

export default App;
