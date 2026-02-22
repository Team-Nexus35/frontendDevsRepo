import Button from './components/buttons/button'
import './theme/global.css'
import './App.css'
import { Routes, Route} from "react-router-dom";
import LandingPage from './pages/landingPage/landingPage'
import Accelerator from './pages/MatchPage/Accelerator';
import FormOne from './pages/questionPages/questionPage1/questionPage1';
import FormTwo from './pages/questionPages/questionPage2/questionPage2';
import FormThree from './pages/questionPages/questionPage3/questionPage3';
import FormFour from './pages/questionPages/questionPage4/questionPage4';
import FormFive from './pages/questionPages/questionPage5/questionPage5';
import { FormProvider } from './components/form/formContext';

import './theme/global.css';


function App() {

  return <>
  <FormProvider>
     <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/formOne" element={<FormOne />} />
        <Route path="/formTwo" element={<FormTwo />} />
        <Route path="/formThree" element={<FormThree />} />
        <Route path="/formFour" element={<FormFour />} />
        <Route path="/formFive" element={<FormFive />} />
        <Route path='accelerator' element={<Accelerator/>} />
      </Routes>
  </FormProvider>
  </>
}

export default App
