import React from 'react';
import './Components/Homepage.css';
import Home from './Pages/Home';
import Signup from './Components/Signup';
import Userpage from './Pages/Userpage';
import Selection from './Pages/loginSelection'
import Pdf from './Pages/Pdf';
import Ats from './Pages/Ats';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IQquizpage from './Pages/IQquizpage';
import EQquizpage from './Pages/EQquizpage';
import Questionbank from './Components/Questionbank';
import Companydashboard from './Components/Companydashboard';
import CompanyRegistration from './Pages/CompanyRegistration';
import Userprofile from './Components/Userprofile';
import StudentRanking from './Components/StudentRanking';
import Technicalmcqs from "./Pages/TechnicalMcqs";
import TechnicalScreen from './Pages/TechnicalScreen';
import Technicalinstrunction from './Instrunctionpages/Technicalinstrunction';
import Iqinstrunction from './Instrunctionpages/Iqinstrunctions';
import Eqinstrunction from './Instrunctionpages/Eqinstrunction';
import Scoreboard from './Pages/Scoreboard';
import Admindashboard from './Pages/Admin/Admindashboard';
import Registeredcompanies from './Pages/Admin/RegisteredCompanies';
import AdminLogin from './Pages/Admin/AdminLogin';
import Review from './Pages/Review';

function App() {
  return (
  
    <div className="App">
    
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userpage" element={<Userpage />} />
          <Route path="/selection" element={<Selection/>}/>
          <Route path='/pdf' element={<Pdf/>}/>
          <Route path='/ats' element={<Ats/>}/>
          <Route path='/iqquiz' element={<IQquizpage/>}/>
          <Route path='/eqquiz' element={<EQquizpage/>}/>
          <Route path='/companyregistration' element={<CompanyRegistration/>}/>
          <Route path="/company" element={<Companydashboard />} />

        <Route path="/question-vault" element={<Questionbank />} />
        <Route path="/student-ranking/:universityName" element={<StudentRanking />} />
        <Route path="/userprofile" element={<Userprofile />} />
        <Route path="/Technical" element={<TechnicalScreen />} />
        <Route path="/TechnicalMcqs" element={<Technicalmcqs />} />
        <Route path='/eqinstrunction' element={<Eqinstrunction/>}/>
          <Route path='/iqinstrunction' element={<Iqinstrunction/>}/>
          <Route path='/technicalinstrunction' element={<Technicalinstrunction/>}/>
          <Route path='/scoreboard' element={<Scoreboard/>}/>
          
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin" element={<Admindashboard />} />
        <Route path="/registered-companies" element={<Registeredcompanies />} />
        
        <Route path ='/review' element={<Review/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
