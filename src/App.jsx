import Button from './components/buttons/button'
import './theme/global.css'
import './App.css'
import { Routes, Route} from "react-router-dom";
import LandingPage from './pages/landingPage/landingPage'

function App() {

  return <>
     <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
  </>
}

export default App
