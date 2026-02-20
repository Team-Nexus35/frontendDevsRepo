import Button from './components/buttons/button'
import './App.css'
import { Routes, Route} from "react-router-dom";
import LandingPage from './pages/landingPage/landingPage'
import Accelerator from './pages/MatchPage/Accelerator';
import './theme/global.css';


function App() {

  return <>
     <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='accelerator' element={<Accelerator/>}></Route>
      </Routes>
  </>
}

export default App
