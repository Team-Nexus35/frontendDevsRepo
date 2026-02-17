import Button from './components/buttons/button'
import './App.css'
import { Routes, Route} from "react-router-dom";
import LandingPage from './pages/landingPage/landingPage'

function App() {

  return <>
    <div>Hi Queen and Fatma, add your routes </div>
     <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
  </>
}

export default App
