import './App.css'
import { Routes, Route} from "react-router-dom";
import LandingPage from './pages/landingPage/landingPage'
import Accelerator from './pages/MatchPage/Accelerator';
import GrantMatchPage from './pages/grantMatch/grantMatch';
import './theme/global.css';


function App() {

  return <>
     <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/accelerator" element={<Accelerator />} />
        {/* Funding matches list page */}
        <Route path="/grant-matches" element={<GrantMatchPage />} />
      </Routes>
  </>
}

export default App
