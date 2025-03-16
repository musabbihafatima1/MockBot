import React from 'react';
import video from '../Assets/video.mp4';

const PurpleGlassFrame = () => {
  return (
    <>
    <div><h1 style={{ color:'#5D009F', 
      fontSize:'3rem', 
      fontWeight:'bold', 
      display:'flex', 
      justifyContent:'center', textAlign:'center'}}>Advertise Your  <span style={{ color:'#D7BDE2', 
        fontSize:'3rem', 
        fontWeight:'bold', 
        display:'flex', 
        justifyContent:'center', textAlign:'center', marginLeft:'10px'}}> Technical Skills</span></h1>

        <p style={{color:'black',
        fontSize:'1.5rem',
        marginTop:'10px',
        display:'flex', 
        justifyContent:'center',
        textAlign:'center' }}>
        Showcase your expertise through scores in mockbot technical mcqs test</p>
        
        </div>

    <div style={{ borderRadius:'20px',display: 'flex', justifyContent: 'center', alignItems: 'center', height: '600px', backgroundColor: '#f4f4f4' , marginTop:'30px', margin:"100px" }}>
      {/* Outer Purple Div with Glass Effect */}
    
        <div style={{
          width: '900px',
          height: '500px',
          borderRadius: '0px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#000',
          fontSize: '1.5rem',
          overflow: 'hidden',
        }}>
          <video
          src={video}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Ensures the video covers the entire container while maintaining aspect ratio
            
          }}
          controls />

        </div>
      </div>
 </> 
  );
};

export default PurpleGlassFrame;
