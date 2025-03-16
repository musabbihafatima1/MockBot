/*import Homepage from '../Components/Homepage';
import Technicalmcqs from '../Components/Technicalmcqs';
import Iqmcqs from '../Components/Iqmcqs';
import Eqmcqs from '../Components/Eqmcqs';
import Resume from '../Components/Resume';
import InterviewScreen from '../Components/Interviewscreen';
import FAQ from '../Components/FAQ';
import Footer from '../Components/Footer';
function Home() {
    return (
        <div className="App">
            <Homepage/>
            <Technicalmcqs/> 
            <Iqmcqs/>
            <Eqmcqs/>
            <Resume/>
            <InterviewScreen/>
            <FAQ/>
            <Footer/>

          
        </div>
    )
    
}
 export default Home;*/
 import React from 'react';
import Slider from 'react-slick';
import Homepage from '../Components/Homepage';
import Technicalmcqs from '../Components/Technicalmcqs';
import Iqmcqs from '../Components/Iqmcqs';
import Eqmcqs from '../Components/Eqmcqs';
import Resume from '../Components/Resume';
import Company from '../Components/Companyhome.jsx';
import Videoscreen from '../Components/Videoscreen.jsx';
import InterviewScreen from '../Components/Interviewscreen';
import FAQ from '../Components/FAQ';
import Footer from '../Components/Footer';
import Mission from '../Components/Mission.jsx';
import Testimonials from '../Components/Testimonials.jsx';

function Home() {
    // Settings for the react-slick slider
    const settings = {
        dots: true,          
        infinite: true,      
        speed: 500,          
        slidesToShow: 1,     
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000  
    };

    return (
        <div className="App">
            <Homepage/>
            
           
            <Slider {...settings}>
                <div>
                    <Technicalmcqs />
                </div>
                <div>
                    <Iqmcqs />
                </div>
                <div>
                    <Eqmcqs />
                </div>
                <div>
                <Resume />
                </div>
            </Slider>
            
           <Company/>
           <Videoscreen/>
           <Testimonials/>
           <Mission/>            
            {/*<InterviewScreen />*/}
            <FAQ />
            <Footer />
        </div>
    );
}

export default Home;
