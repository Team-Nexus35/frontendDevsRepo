import Button from './components/buttons/button'
import './theme/global.css'
import './App.css'
import { Routes, Route} from "react-router-dom";
import LandingPage from './pages/landingPage/landingPage'
import Accelerator from './pages/MatchPage/Accelerator';
import './theme/global.css';


function App() {

  return <>
     <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/formOne" element={<FormOne />} />
        <Route path="/formTwo" element={<FormTwo />} />
        <Route path="/formThree" element={<FormThree />} />
        <Route path="/formFour" element={<FormFour />} />
        <Route path="/formFive" element={<FormFive />} />
        <Route path='accelerator' element={<Accelerator/>} />
      </Routes>
  </>
}

export default App
