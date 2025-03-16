import React from 'react';
import Company from '../Assets/Companyhome.jpg'

const MockBotDescription = () => {
  return (
    <>
    <div style={{ fontFamily:'monospace', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin:'120px 140px'}}>
      <div style={{ maxWidth: '45%', marginRight:"80px" }}>
        <h1 style={{ fontSize: '2.3rem', fontWeight: 'bold', marginBottom: '20px', color:'black'}}>Smarter Hiring, Simplified.</h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.5', marginBottom: '30px', color:"black"}}>
          MockBot is an AI-powered interview preparation and talent evaluation platform, connecting companies with top candidates through intelligent assessments and real-time insights.
        </p>
        <button style={{ padding: '10px 20px', backgroundColor: '#5D009F', color: '#ffffff', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize:'1.2rem' }}>
          Discover Talent
        </button>
      </div>
      <div style={{ maxWidth: '45%' }}>
        <img src={Company} alt='MockBot description' style={{ width: '90%', borderRadius: '10px', height:'90%' }} />
      </div>
    </div>

  </>
  );
};

export default MockBotDescription;
