import './scss/main.scss'
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./pages/Navigation";


function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/navigation' element={<Navigation/>}/>
            </Routes>

        </>
    );
}

export default App;
