
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
import RegisterPage from './pages/register/register';
import LoginPage from './pages/login/login';

import GrantMatchPage from './pages/grantMatch/grantMatch';



function App() {

  return <>
  <FormProvider>
     <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/getStarted1" element={<FormOne />} />
        <Route path="/getStarted2" element={<FormTwo />} />
        <Route path="/getStarted3" element={<FormThree />} />
        <Route path='accelerator' element={<Accelerator/>} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path="/grant-matches" element={<GrantMatchPage />} />
      </Routes>
  </FormProvider>
  </>
}

export default App

//   <Button text='Get started free' Icon={WhiteArrowRight} variant='heroSectionBtn' btnFunction={() => navigate('/grant-matches')} />