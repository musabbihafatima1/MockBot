import React from "react";
import { Link, useLocation } from "react-router-dom";

function RegisteredCompanies() {
  const location = useLocation();
  const registeredCompanies = location.state?.registeredCompanies || [];

  return (
    <div style={styles.dashboardContent}>
      <header style={styles.dashboardHeader}>
        <div style={styles.headerBox}>
          <Link to="/admin" style={styles.backArrow}>⬅</Link>
          <h1 style={styles.pageHeading}>Registered Companies</h1>
        </div>
      </header>

      <section style={styles.companySection}>
        <h2 style={styles.sectionHeading}>Approved Companies</h2>
        <div style={styles.companyGrid}>
          {registeredCompanies.length > 0 ? (
            registeredCompanies.map((company, index) => (
              <div key={index} style={styles.companyCard}>
                <h3 style={styles.companyName}>{company.organizationName}</h3> {/* Access organizationName */}
                <p style={styles.verifiedText}>✔ Approved & Verified</p>
              </div>
            ))
          ) : (
            <p style={styles.noCompanies}>No approved companies yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}

const styles = {
  dashboardContent: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f6f9',
    padding: '20px',
    minHeight: '100vh',
  },
  dashboardHeader: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    position: 'relative',
  },
  headerBox: {
    backgroundColor: '#fff',
    padding: '10px 20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
  },
  backArrow: {
    position: 'absolute',
    left: '20px',
    fontSize: '1.5rem',
    textDecoration: 'none',
    color: '#5D009F',
    transition: 'color 0.3s ease',
  },
  pageHeading: {
    fontSize: '2rem',
    color: '#5D009F',
    fontWeight: '600',
    textAlign: 'center',
    margin: 0,
  },
  companySection: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  sectionHeading: {
    fontSize: '1.5rem',
    fontWeight: '500',
    color: '#333',
    marginBottom: '20px',
  },
  companyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  companyCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    border: '2px solid purple',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  companyName: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#000',
    margin: '10px 0',
  },
  verifiedText: {
    fontSize: '1rem',
    color: '#28a745',
    marginTop: '5px',
  },
  noCompanies: {
    fontSize: '1.1rem',
    color: '#6c757d',
    textAlign: 'center',
  },
};

export default RegisteredCompanies;