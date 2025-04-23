// import React, { useState, useEffect } from "react";
// import { 
//   FaUserCircle, 
//   FaCheck, 
//   FaTimes, 
//   FaSignOutAlt, 
//   FaHome, 
//   FaBuilding, 
//   FaInfoCircle,
//   FaCog,
//   FaSpinner
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import {Link} from 'react-router-dom';
// import "react-toastify/dist/ReactToastify.css";

// function AdminDashboard() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [registeredCompanies, setRegisteredCompanies] = useState([]);
//   const [newRequests, setNewRequests] = useState([]);
//   const [selectedCompany, setSelectedCompany] = useState(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLoadingDetails, setIsLoadingDetails] = useState(false);

//   // Fetch data from backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const [registeredRes, requestsRes] = await Promise.all([
//           axios.get("http://localhost:5000/api/admin/registered-companies"),
//           axios.get("http://localhost:5000/api/admin/pending-requests")
//         ]);
        
//         setRegisteredCompanies(registeredRes.data);
//         setNewRequests(requestsRes.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         toast.error("Failed to fetch data");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Approve a company request
//   const acceptCompany = async (id) => {
//     try {
//       const response = await axios.post(`http://localhost:5000/api/admin/approve-request/${id}`);
//       const approvedCompany = response.data;

//       setRegisteredCompanies(prev => [...prev, approvedCompany]);
//       setNewRequests(prev => prev.filter(c => c._id !== id));
//       setShowDetails(false);
      
//       toast.success("Company approved successfully");
//     } catch (error) {
//       console.error("Error approving company:", error);
//       toast.error("Failed to approve company");
//     }
//   };

//   // Reject a company request
//   const rejectCompany = async (id) => {
//     try {
//       await axios.post(`http://localhost:5000/api/admin/reject-request/${id}`);
//       setNewRequests(prev => prev.filter(c => c._id !== id));
//       setShowDetails(false);
      
//       toast.success("Company rejected successfully");
//     } catch (error) {
//       console.error("Error rejecting company:", error);
//       toast.error("Failed to reject company");
//     }
//   };

//   // View company details
//   const viewCompanyDetails = async (id) => {
//     try {
//       setIsLoadingDetails(true);
//       const response = await axios.get(`http://localhost:5000/api/admin/company/${id}`);
//       setSelectedCompany(response.data);
//       setShowDetails(true);
//     } catch (error) {
//       console.error("Error fetching company details:", error);
//       toast.error("Failed to load company details");
//     } finally {
//       setIsLoadingDetails(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     navigate("/adminlogin");
//   };

//   // Styles
//   const styles = {
//     adminContainer: {
//       display: 'flex',
//       minHeight: '100vh',
//       backgroundColor: '#f5f7fa',
//       color: '#333'
//     },
//     sidebar: {
//       width: '280px',
//       backgroundColor: '#5D009F',
//       color: 'white',
//       padding: '25px 0',
//       display: 'flex',
//       flexDirection: 'column',
//       transition: 'all 0.3s ease'
//     },
//     adminProfile: {
//       textAlign: 'center',
//       padding: '0 20px 30px',
//       borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
//     },
//     adminAvatar: {
//       fontSize: '70px',
//       color: '#ecf0f1',
//       marginBottom: '15px'
//     },
//     sidebarMenu: {
//       padding: '20px',
//       flexGrow: 1,
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '5px'
//     },
//     menuItem: {
//       backgroundColor: 'transparent',
//       border: 'none',
//       color: '#ecf0f1',
//       padding: '12px 15px',
//       borderRadius: '5px',
//       cursor: 'pointer',
//       textAlign: 'left',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '12px',
//       fontSize: '15px',
//       transition: 'all 0.3s ease'
//     },
//     activeMenuItem: {
//       backgroundColor: '#3498db',
//       color: 'white'
//     },
//     dashboardContent: {
//       flexGrow: 1,
//       padding: '30px',
//       overflowY: 'auto'
//     },
//     dashboardHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '30px',
//       paddingBottom: '20px',
//       borderBottom: '1px solid #e0e0e0'
//     },
//     logoutBtn: {
//       backgroundColor: '#e74c3c',
//       color: 'white',
//       border: 'none',
//       padding: '10px 20px',
//       borderRadius: '5px',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       fontSize: '14px',
//       transition: 'all 0.3s ease',
//       '&:hover': {
//         backgroundColor: '#c0392b'
//       }
//     },
//     loadingText: {
//       textAlign: 'center',
//       padding: '20px',
//       fontSize: '18px',
//       color: '#666'
//     },
//     companySection: {
//       backgroundColor: 'white',
//       padding: '25px',
//       borderRadius: '8px',
//       boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
//       marginBottom: '30px'
//     },
//     companyGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
//       gap: '20px'
//     },
//     companyCard: {
//       backgroundColor: 'white',
//       padding: '20px',
//       borderRadius: '8px',
//       boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//       borderLeft: '4px solid #2ecc71',
//       transition: 'all 0.3s ease',
//       '&:hover': {
//         transform: 'translateY(-3px)'
//       }
//     },
//     pendingCompanyCard: {
//       borderLeftColor: '#f39c12'
//     },
//     actionButtons: {
//       display: 'flex',
//       gap: '10px',
//       marginTop: '15px'
//     },
//     detailsBtn: {
//       backgroundColor: '#3498db',
//       color: 'white',
//       padding: '8px 12px',
//       borderRadius: '4px',
//       border: 'none',
//       cursor: 'pointer',
//       fontSize: '13px',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '5px',
//       transition: 'all 0.3s ease',
//       '&:hover': {
//         backgroundColor: '#2980b9'
//       }
//     },
//     approveBtn: {
//       backgroundColor: '#2ecc71',
//       color: 'white',
//       padding: '8px 12px',
//       borderRadius: '4px',
//       border: 'none',
//       cursor: 'pointer',
//       fontSize: '13px',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '5px',
//       transition: 'all 0.3s ease',
//       '&:hover': {
//         backgroundColor: '#27ae60'
//       }
//     },
//     rejectBtn: {
//       backgroundColor: '#e74c3c',
//       color: 'white',
//       padding: '8px 12px',
//       borderRadius: '4px',
//       border: 'none',
//       cursor: 'pointer',
//       fontSize: '13px',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '5px',
//       transition: 'all 0.3s ease',
//       '&:hover': {
//         backgroundColor: '#c0392b'
//       }
//     },
//     modalOverlay: {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: 'rgba(0, 0, 0, 0.7)',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       zIndex: 1000
//     },
//     modalContent: {
//       backgroundColor: 'white',
//       padding: '30px',
//       borderRadius: '8px',
//       width: '600px',
//       maxWidth: '95%',
//       maxHeight: '90vh',
//       overflowY: 'auto',
//       boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)'
//     },
//     detailsGrid: {
//       display: 'grid',
//       gridTemplateColumns: '1fr',
//       gap: '15px',
//       marginBottom: '25px'
//     },
//     detailItem: {
//       display: 'grid',
//       gridTemplateColumns: '150px 1fr',
//       alignItems: 'center',
//       padding: '10px 0',
//       borderBottom: '1px solid #f0f0f0'
//     },
//     detailLabel: {
//       fontWeight: '600',
//       color: '#7f8c8d'
//     },
//     detailValue: {
//       color: '#2c3e50',
//       wordBreak: 'break-word'
//     },
//     docLink: {
//       color: '#8d4689',
//       textDecoration: 'none',
//       fontWeight: '500',
//       '&:hover': {
//         textDecoration: 'underline'
//       }
//     },
//     modalActions: {
//       display: 'flex',
//       justifyContent: 'flex-end',
//       gap: '15px',
//       marginTop: '25px',
//       paddingTop: '15px',
//       borderTop: '1px solid #eee'
//     },
//     closeBtn: {
//       backgroundColor: '#95a5a6',
//       color: 'white',
//       padding: '10px 20px',
//       borderRadius: '4px',
//       border: 'none',
//       cursor: 'pointer',
//       fontWeight: '500',
//       transition: 'all 0.3s ease',
//       '&:hover': {
//         backgroundColor: '#7f8c8d'
//       }
//     },
//     spinner: {
//       animation: 'spin 1s linear infinite',
//       marginRight: '8px'
//     }
//   };

//   return (
//     <div style={styles.adminContainer}>
//       {/* Sidebar */}
//       <aside style={styles.sidebar}>
//         <div style={styles.adminProfile}>
//           <FaUserCircle style={styles.adminAvatar} />
//           <h3>Admin Panel</h3>
//           <p>admin@example.com</p>
//         </div>
        
//         <nav style={styles.sidebarMenu}>
//           <button 
//             style={{
//               ...styles.menuItem,
//               ...(activeTab === "dashboard" && styles.activeMenuItem)
//             }}
//             onClick={() => setActiveTab("dashboard")}
//           >
//             <FaHome /> Dashboard
//           </button>
          
//           <button 
//             style={{
//               ...styles.menuItem,
//               ...(activeTab === "companies" && styles.activeMenuItem)
//             }}
//             onClick={() => setActiveTab("companies")}
//           >
//             <FaBuilding /> Companies
//           </button>
          
//           <button 
//             style={{
//               ...styles.menuItem,
//               ...(activeTab === "settings" && styles.activeMenuItem)
//             }}
//             onClick={() => setActiveTab("settings")}
//           >
//             <FaCog /> Settings
//           </button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main style={styles.dashboardContent}>
//         <header style={styles.dashboardHeader}>
//           <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
//           <button style={styles.logoutBtn} onClick={handleLogout}>
//             <FaSignOutAlt /> Logout
//           </button>
//         </header>

//         {isLoading ? (
//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
//             <FaSpinner style={styles.spinner} />
//             <p>Loading dashboard data...</p>
//           </div>
//         ) : (
//           <>
//             {/* Dashboard Content */}
//             {activeTab === "dashboard" && (
//               <div style={{ display: 'grid', gap: '30px' }}>
//                 {/* Stats Cards */}
//                 <div> <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
//                   <div style={styles.companyCard}>
//                     <h3>Registered Companies</h3>
//                     <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#2c3e50' }}>
//                       {registeredCompanies.length}
//                     </p>
//                   </div>
//                   <div style={styles.companyCard}>
//                     <h3>Pending Requests</h3>
//                     <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#2c3e50' }}>
//                       {newRequests.length}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div style={{
//       backgroundColor: 'white',
//       padding: '25px',
//       borderRadius: '8px',
//       boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
//       marginTop: '30px'
//     }}>
//       <h2 style={{
//         marginBottom: '20px',
//         color: '#2c3e50',
//         fontSize: '20px'
//       }}>Recent Activity</h2>
//       <div style={{
//         display: 'grid',
//         gap: '15px'
//       }}>
//         <div style={{
//           padding: '15px',
//           borderLeft: '3px solid #3498db',
//           backgroundColor: '#f8f9fa',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center'
//         }}>
//           <p>New company registration request from Tesla</p>
//           <span style={{
//             fontSize: '13px',
//             color: '#7f8c8d'
//           }}>2 hours ago</span>
//         </div>
//         <div style={{
//           padding: '15px',
//           borderLeft: '3px solid #3498db',
//           backgroundColor: '#f8f9fa',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center'
//         }}>
//           <p>Microsoft updated their profile</p>
//           <span style={{
//             fontSize: '13px',
//             color: '#7f8c8d'
//           }}>1 day ago</span>
//         </div>
//         <div style={{
//           padding: '15px',
//           borderLeft: '3px solid #3498db',
//           backgroundColor: '#f8f9fa',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center'
//         }}>
//           <p>Google's verification was approved</p>
//           <span style={{
//             fontSize: '13px',
//             color: '#7f8c8d'
//           }}>2 days ago</span>
//         </div>
        
//       </div>
//     </div>
//   </div>
//             )}

//             {/* Companies Tab */}
//             {activeTab === "companies" && (
//               <>
//                 {/* Registered Companies */}
//                 <section style={styles.companySection}>
//                   <h2>Registered Companies</h2>
//                   {registeredCompanies.length > 0 ? (
//                     <div style={styles.companyGrid}>
//                       {registeredCompanies.map((company) => (
//                         <div key={company._id} style={styles.companyCard}>
//                           <h3>{company.organizationName}</h3>
//                           <p style={{ fontSize: '13px', color: '#7f8c8d' }}>ID: {company.registrationNumber}</p>
//                           <p style={{ color: '#2ecc71', fontSize: '14px', fontWeight: '500' }}>✔ Approved & Verified</p>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p style={{ textAlign: 'center', color: '#95a5a6', fontStyle: 'italic', padding: '20px' }}>
//                       No registered companies.
//                     </p>
//                   )}
//                 </section>

//                 {/* New Requests */}
//                 <section style={styles.companySection}>
//                   <h2>New Requests ({newRequests.length})</h2>
//                   {newRequests.length > 0 ? (
//                     <div style={styles.companyGrid}>
//                       {newRequests.map((company) => (
//                         <div key={company._id} style={{ ...styles.companyCard, ...styles.pendingCompanyCard }}>
//                           <h3>{company.organizationName}</h3>
//                           <p style={{ fontSize: '13px', color: '#7f8c8d' }}>ID: {company.registrationNumber}</p>
//                           <p style={{ color: '#f39c12', fontSize: '14px', fontWeight: '500', marginBottom: '15px' }}>
//                             Pending Approval
//                           </p>
//                           <div style={styles.actionButtons}>
//                             <button 
//                               style={styles.detailsBtn} 
//                               onClick={() => viewCompanyDetails(company._id)}
//                             >
//                               <FaInfoCircle /> Details
//                             </button>
//                             <button 
//                               style={styles.approveBtn} 
//                               onClick={() => acceptCompany(company._id)}
//                             >
//                               <FaCheck /> Approve
//                             </button>
//                             <button 
//                               style={styles.rejectBtn} 
//                               onClick={() => rejectCompany(company._id)}
//                             >
//                               <FaTimes /> Reject
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p style={{ textAlign: 'center', color: '#95a5a6', fontStyle: 'italic', padding: '20px' }}>
//                       No new company requests.
//                     </p>
//                   )}
//                 </section>
//               </>
//             )}

//             {/* Settings Tab */}
//             {activeTab === "settings" && (
//               <div style={styles.companySection}>
//                 <h2>System Settings</h2>
//                 <form style={{ maxWidth: '600px' }}>
//                   <div style={{ marginBottom: '20px' }}>
//                     <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#2c3e50' }}>
//                       System Name
//                     </label>
//                     <input 
//                       type="text" 
//                       defaultValue="Company Portal Admin" 
//                       style={{
//                         width: '100%',
//                         padding: '10px 15px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '15px'
//                       }}
//                     />
//                   </div>
//                   <div style={{ marginBottom: '20px' }}>
//                     <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#2c3e50' }}>
//                       Admin Email
//                     </label>
//                     <input 
//                       type="email" 
//                       defaultValue="admin@example.com" 
//                       style={{
//                         width: '100%',
//                         padding: '10px 15px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '15px'
//                       }}
//                     />
//                   </div>
//                   <button 
//                     type="submit" 
//                     style={{
//                       backgroundColor: '#2ecc71',
//                       color: 'white',
//                       border: 'none',
//                       padding: '12px 25px',
//                       borderRadius: '4px',
//                       cursor: 'pointer',
//                       fontSize: '15px',
//                       transition: 'all 0.3s ease'
//                     }}
//                   >
//                     Save Settings
//                   </button>
//                 </form>
//               </div>
//             )}

//             {/* Company Details Modal */}
//             {showDetails && (
//               <div style={styles.modalOverlay}>
//                 <div style={styles.modalContent}>
//                   {isLoadingDetails ? (
//                     <div style={{ textAlign: 'center', padding: '40px' }}>
//                       <FaSpinner style={{ ...styles.spinner, fontSize: '24px', marginBottom: '15px' }} />
//                       <p>Loading company details...</p>
//                     </div>
//                   ) : selectedCompany ? (
//                     <>
//                       <h3>{selectedCompany.organizationName} - Registration Details</h3>
//                       <div style={styles.detailsGrid}>
//                         <div style={styles.detailItem}>
//                           <span style={styles.detailLabel}>Company Name:</span>
//                           <span style={styles.detailValue}>{selectedCompany.organizationName}</span>
//                         </div>
                        
//                         <div style={styles.detailItem}>
//                           <span style={styles.detailLabel}>Registration Number:</span>
//                           <span style={styles.detailValue}>{selectedCompany.registrationNumber}</span>
//                         </div>
                        
//                         <div style={styles.detailItem}>
//                           <span style={styles.detailLabel}>Email:</span>
//                           <span style={styles.detailValue}>{selectedCompany.email}</span>
//                         </div>
                        
//                         <div style={styles.detailItem}>
//                           <span style={styles.detailLabel}>Address:</span>
//                           <span style={styles.detailValue}>{selectedCompany.address}</span>
//                         </div>
                        
//                         <div style={styles.detailItem}>
//                           <span style={styles.detailLabel}>Phone:</span>
//                           <span style={styles.detailValue}>{selectedCompany.phone || 'Not provided'}</span>
//                         </div>
                        
//                         <div style={styles.detailItem}>
//                           <span style={styles.detailLabel}>Status:</span>
//                           <span style={{
//                             ...styles.detailValue,
//                             color: selectedCompany.status === 'approved' ? '#2ecc71' : 
//                                   selectedCompany.status === 'rejected' ? '#e74c3c' : '#f39c12',
//                             fontWeight: 'bold'
//                           }}>
//                             {selectedCompany.status.charAt(0).toUpperCase() + selectedCompany.status.slice(1)}
//                           </span>
//                         </div>
                        
//                         {selectedCompany.businessDocument && (
//                           <div style={styles.detailItem}>
//                             <span style={styles.detailLabel}>Business Document:</span>
//                             <a 
//                               href={`http://localhost:5000${selectedCompany.businessDocument.url}`}
//                               target="_blank" 
//                               rel="noopener noreferrer"
//                               style={styles.docLink}
//                             >
//                               {selectedCompany.businessDocument.filename}
//                             </a>
//                           </div>
//                         )}
//                       </div>
                      
//                       <div style={styles.modalActions}>
//                         {selectedCompany.status === 'pending' && (
//                           <>
//                             <button 
//                               style={{
//                                 ...styles.approveBtn,
//                                 padding: '10px 20px',
//                                 fontWeight: '500'
//                               }} 
//                               onClick={() => acceptCompany(selectedCompany._id)}
//                             >
//                               <FaCheck /> Approve Registration
//                             </button>
//                             <button 
//                               style={{
//                                 ...styles.rejectBtn,
//                                 padding: '10px 20px',
//                                 fontWeight: '500'
//                               }} 
//                               onClick={() => rejectCompany(selectedCompany._id)}
//                             >
//                               <FaTimes /> Reject Registration
//                             </button>
//                           </>
//                         )}
//                         <button 
//                           style={styles.closeBtn}
//                           onClick={() => setShowDetails(false)}
//                         >
//                           Close
//                         </button>
//                       </div>
//                     </>
//                   ) : (
//                     <div style={{ textAlign: 'center', padding: '40px' }}>
//                       <p>Failed to load company details</p>
//                       <button 
//                         style={{
//                           ...styles.closeBtn,
//                           marginTop: '20px'
//                         }}
//                         onClick={() => setShowDetails(false)}
//                       >
//                         Close
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </main>
//     </div>
//   );
// }

// export default AdminDashboard;
import React, { useState, useEffect } from "react";
import { 
  FaUserCircle, 
  FaCheck, 
  FaTimes, 
  FaSignOutAlt, 
  FaHome, 
  FaBuilding, 
  FaInfoCircle,
  FaCog,
  FaSpinner,
  FaChartLine,
  FaFileAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {Link} from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [registeredCompanies, setRegisteredCompanies] = useState([]);
  const [newRequests, setNewRequests] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [registeredRes, requestsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/admin/registered-companies"),
          axios.get("http://localhost:5000/api/admin/pending-requests")
        ]);
        
        setRegisteredCompanies(registeredRes.data);
        setNewRequests(requestsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Approve a company request
  const acceptCompany = async (id) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/admin/approve-request/${id}`);
      const approvedCompany = response.data;

      setRegisteredCompanies(prev => [...prev, approvedCompany]);
      setNewRequests(prev => prev.filter(c => c._id !== id));
      setShowDetails(false);
      
      toast.success("Company approved successfully");
    } catch (error) {
      console.error("Error approving company:", error);
      toast.error("Failed to approve company");
    }
  };

  // Reject a company request
  const rejectCompany = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/admin/reject-request/${id}`);
      setNewRequests(prev => prev.filter(c => c._id !== id));
      setShowDetails(false);
      
      toast.success("Company rejected successfully");
    } catch (error) {
      console.error("Error rejecting company:", error);
      toast.error("Failed to reject company");
    }
  };

  // View company details
  const viewCompanyDetails = async (id) => {
    try {
      setIsLoadingDetails(true);
      const response = await axios.get(`http://localhost:5000/api/admin/company/${id}`);
      setSelectedCompany(response.data);
      setShowDetails(true);
    } catch (error) {
      console.error("Error fetching company details:", error);
      toast.error("Failed to load company details");
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/adminlogin");
  };

  // Styles
  const styles = {
    adminContainer: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      color: '#333'
    },
    sidebar: {
      width: '280px',
      background: 'linear-gradient(145deg, #5D009F, #3a0061)',
      color: 'white',
      padding: '25px 0',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
    },
    adminProfile: {
      textAlign: 'center',
      padding: '0 20px 30px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    },
    adminAvatar: {
      fontSize: '70px',
      color: 'rgba(255,255,255,0.9)',
      marginBottom: '15px'
    },
    sidebarMenu: {
      padding: '20px',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    menuItem: {
      background: 'transparent',
      border: 'none',
      color: 'rgba(255,255,255,0.8)',
      padding: '12px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '15px',
      transition: 'all 0.3s ease',
      '&:hover': {
        background: 'rgba(255,255,255,0.1)',
        color: 'white'
      }
    },
    activeMenuItem: {
      background: 'rgba(255,255,255,0.15)',
      color: 'white',
      fontWeight: '500'
    },
    dashboardContent: {
      flexGrow: 1,
      padding: '30px',
      overflowY: 'auto',
      background: '#f8f9fa'
    },
    dashboardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      paddingBottom: '20px',
      borderBottom: '1px solid #e0e0e0'
    },
    logoutBtn: {
      background: 'linear-gradient(145deg, #ff4757, #e84118)',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
      }
    },
    loadingText: {
      textAlign: 'center',
      padding: '20px',
      fontSize: '18px',
      color: '#666'
    },
    companySection: {
      background: 'white',
      padding: '25px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
      marginBottom: '30px'
    },
    companyGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px'
    },
    companyCard: {
      background: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 3px 10px rgba(0, 0, 0, 0.08)',
      borderLeft: '4px solid #5D009F',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
      }
    },
    pendingCompanyCard: {
      borderLeftColor: '#FFA500'
    },
    actionButtons: {
      display: 'flex',
      gap: '10px',
      marginTop: '15px'
    },
    detailsBtn: {
      background: 'linear-gradient(145deg, #5D009F, #7b2cbf)',
      color: 'white',
      padding: '8px 15px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '13px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      '&:hover': {
        background: 'linear-gradient(145deg, #4a0080, #6a1b9a)',
        transform: 'translateY(-2px)'
      }
    },
    approveBtn: {
      background: 'linear-gradient(145deg, #2ecc71, #27ae60)',
      color: 'white',
      padding: '8px 15px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '13px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      '&:hover': {
        background: 'linear-gradient(145deg, #27ae60, #219653)',
        transform: 'translateY(-2px)'
      }
    },
    rejectBtn: {
      background: 'linear-gradient(145deg, #e74c3c, #c0392b)',
      color: 'white',
      padding: '8px 15px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '13px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      '&:hover': {
        background: 'linear-gradient(145deg, #c0392b, #a5281b)',
        transform: 'translateY(-2px)'
      }
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    modalContent: {
      background: 'white',
      padding: '30px',
      borderRadius: '12px',
      width: '700px',
      maxWidth: '95%',
      maxHeight: '90vh',
      overflowY: 'auto',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
    },
    detailsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '15px',
      marginBottom: '25px'
    },
    detailItem: {
      display: 'grid',
      gridTemplateColumns: '150px 1fr',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid #f0f0f0'
    },
    detailLabel: {
      fontWeight: '600',
      color: '#5D009F'
    },
    detailValue: {
      color: '#333',
      wordBreak: 'break-word'
    },
    docLink: {
      color: '#5D009F',
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      '&:hover': {
        color: '#7b2cbf',
        textDecoration: 'underline'
      }
    },
    modalActions: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '15px',
      marginTop: '25px',
      paddingTop: '20px',
      borderTop: '1px solid #eee'
    },
    closeBtn: {
      background: 'linear-gradient(145deg, #6c757d, #495057)',
      color: 'white',
      padding: '10px 25px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      '&:hover': {
        background: 'linear-gradient(145deg, #495057, #343a40)',
        transform: 'translateY(-2px)'
      }
    },
    spinner: {
      animation: 'spin 1s linear infinite',
      marginRight: '8px'
    },
    statsCard: {
      background: 'white',
      padding: '25px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
      borderTop: '4px solid #5D009F',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
      }
    },
    activityItem: {
      padding: '18px',
      borderLeft: '4px solid #5D009F',
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateX(5px)'
      }
    }
  };

  return (
    <div style={styles.adminContainer}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.adminProfile}>
          <FaUserCircle style={styles.adminAvatar} />
          <h3 style={{ marginBottom: '5px', color: 'white' }}>Admin Panel</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>admin@companyportal.com</p>
        </div>
        
        <nav style={styles.sidebarMenu}>
          <button 
            style={{
              ...styles.menuItem,
              ...(activeTab === "dashboard" && styles.activeMenuItem)
            }}
            onClick={() => setActiveTab("dashboard")}
          >
            <FaHome /> Dashboard
          </button>
          
          <button 
            style={{
              ...styles.menuItem,
              ...(activeTab === "companies" && styles.activeMenuItem)
            }}
            onClick={() => setActiveTab("companies")}
          >
            <FaBuilding /> Companies
          </button>
          
          <button 
            style={{
              ...styles.menuItem,
              ...(activeTab === "settings" && styles.activeMenuItem)
            }}
            onClick={() => setActiveTab("settings")}
          >
            <FaCog /> Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.dashboardContent}>
        <header style={styles.dashboardHeader}>
          <h1 style={{ color: '#5D009F', margin: 0 }}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </header>

        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <FaSpinner style={{ ...styles.spinner, fontSize: '24px', marginRight: '15px' }} />
            <p style={{ color: '#5D009F' }}>Loading dashboard data...</p>
          </div>
        ) : (
          <>
            {/* Dashboard Content */}
            {activeTab === "dashboard" && (
              <div style={{ display: 'grid', gap: '30px' }}>
                {/* Stats Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
                  <div style={styles.statsCard}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                      <div style={{ background: 'rgba(93, 0, 159, 0.1)', padding: '12px', borderRadius: '8px', color: '#5D009F' }}>
                        <FaBuilding size={20} />
                      </div>
                      <h3 style={{ margin: 0, color: '#333' }}>Registered Companies</h3>
                    </div>
                    <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#5D009F', margin: 0 }}>
                      {registeredCompanies.length}
                    </p>
                    <p style={{ color: '#6c757d', fontSize: '14px', marginTop: '5px' }}>Total approved companies</p>
                  </div>
                  
                  <div style={styles.statsCard}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                      <div style={{ background: 'rgba(255, 165, 0, 0.1)', padding: '12px', borderRadius: '8px', color: '#FFA500' }}>
                        <FaFileAlt size={20} />
                      </div>
                      <h3 style={{ margin: 0, color: '#333' }}>Pending Requests</h3>
                    </div>
                    <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#FFA500', margin: 0 }}>
                      {newRequests.length}
                    </p>
                    <p style={{ color: '#6c757d', fontSize: '14px', marginTop: '5px' }}>Awaiting approval</p>
                  </div>
                  
                  <div style={styles.statsCard}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                      <div style={{ background: 'rgba(46, 204, 113, 0.1)', padding: '12px', borderRadius: '8px', color: '#2ecc71' }}>
                        <FaChartLine size={20} />
                      </div>
                      <h3 style={{ margin: 0, color: '#333' }}>Active Today</h3>
                    </div>
                    <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#2ecc71', margin: 0 }}>
                      {Math.floor(registeredCompanies.length * 0.3)}
                    </p>
                    <p style={{ color: '#6c757d', fontSize: '14px', marginTop: '5px' }}>Companies active</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div style={styles.companySection}>
                  <h2 style={{ color: '#5D009F', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaInfoCircle /> Recent Activity
                  </h2>
                  <div>
                    <div style={styles.activityItem}>
                      <div>
                        <p style={{ margin: 0, fontWeight: '500' }}>New company registration request from Tesla</p>
                        <p style={{ margin: '5px 0 0', fontSize: '13px', color: '#6c757d' }}>Request ID: TSLA2023</p>
                      </div>
                      <span style={{ fontSize: '13px', color: '#6c757d', whiteSpace: 'nowrap' }}>2 hours ago</span>
                    </div>
                    
                    <div style={styles.activityItem}>
                      <div>
                        <p style={{ margin: 0, fontWeight: '500' }}>Microsoft updated their profile</p>
                        <p style={{ margin: '5px 0 0', fontSize: '13px', color: '#6c757d' }}>Updated contact information</p>
                      </div>
                      <span style={{ fontSize: '13px', color: '#6c757d', whiteSpace: 'nowrap' }}>1 day ago</span>
                    </div>
                    
                    <div style={styles.activityItem}>
                      <div>
                        <p style={{ margin: 0, fontWeight: '500' }}>Google's verification was approved</p>
                        <p style={{ margin: '5px 0 0', fontSize: '13px', color: '#6c757d' }}>By admin: John Doe</p>
                      </div>
                      <span style={{ fontSize: '13px', color: '#6c757d', whiteSpace: 'nowrap' }}>2 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Companies Tab */}
            {activeTab === "companies" && (
              <>
                {/* Registered Companies */}
                <section style={styles.companySection}>
                  <h2 style={{ color: '#5D009F', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaCheck /> Registered Companies
                  </h2>
                  {registeredCompanies.length > 0 ? (
                    <div style={styles.companyGrid}>
                      {registeredCompanies.map((company) => (
                        <div key={company._id} style={styles.companyCard}>
                          <h3 style={{ marginTop: 0, color: '#5D009F' }}>{company.organizationName}</h3>
                          <p style={{ fontSize: '14px', color: '#6c757d', margin: '5px 0' }}>ID: {company.registrationNumber}</p>
                          <p style={{ color: '#2ecc71', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <FaCheck /> Approved & Verified
                          </p>
                          <p style={{ fontSize: '13px', color: '#6c757d', marginTop: '10px' }}>
                            Registered on: {new Date(company.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#6c757d' }}>
                      <FaBuilding size={40} style={{ marginBottom: '15px', color: '#dee2e6' }} />
                      <p style={{ fontStyle: 'italic' }}>No registered companies found</p>
                    </div>
                  )}
                </section>

                {/* New Requests */}
                <section style={styles.companySection}>
                  <h2 style={{ color: '#5D009F', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaInfoCircle /> New Requests ({newRequests.length})
                  </h2>
                  {newRequests.length > 0 ? (
                    <div style={styles.companyGrid}>
                      {newRequests.map((company) => (
                        <div key={company._id} style={{ ...styles.companyCard, ...styles.pendingCompanyCard }}>
                          <h3 style={{ marginTop: 0, color: '#FFA500' }}>{company.organizationName}</h3>
                          <p style={{ fontSize: '14px', color: '#6c757d', margin: '5px 0' }}>ID: {company.registrationNumber}</p>
                          <p style={{ color: '#FFA500', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '15px' }}>
                            <FaInfoCircle /> Pending Approval
                          </p>
                          <div style={styles.actionButtons}>
                            <button 
                              style={styles.detailsBtn} 
                              onClick={() => viewCompanyDetails(company._id)}
                            >
                              <FaInfoCircle /> Details
                            </button>
                            <button 
                              style={styles.approveBtn} 
                              onClick={() => acceptCompany(company._id)}
                            >
                              <FaCheck /> Approve
                            </button>
                            <button 
                              style={styles.rejectBtn} 
                              onClick={() => rejectCompany(company._id)}
                            >
                              <FaTimes /> Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#6c757d' }}>
                      <FaFileAlt size={40} style={{ marginBottom: '15px', color: '#dee2e6' }} />
                      <p style={{ fontStyle: 'italic' }}>No new company requests</p>
                    </div>
                  )}
                </section>
              </>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div style={styles.companySection}>
                <h2 style={{ color: '#5D009F', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaCog /> System Settings
                </h2>
                <form style={{ maxWidth: '600px' }}>
                  <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#5D009F' }}>
                      System Name
                    </label>
                    <input 
                      type="text" 
                      defaultValue="Company Portal Admin" 
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '15px',
                        transition: 'all 0.3s ease',
                        '&:focus': {
                          borderColor: '#5D009F',
                          boxShadow: '0 0 0 3px rgba(93, 0, 159, 0.1)',
                          outline: 'none'
                        }
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#5D009F' }}>
                      Admin Email
                    </label>
                    <input 
                      type="email" 
                      defaultValue="admin@companyportal.com" 
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '15px',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#5D009F' }}>
                      System Theme Color
                    </label>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '8px',
                        background: 'linear-gradient(145deg, #5D009F, #3a0061)',
                        border: '3px solid #5D009F',
                        cursor: 'pointer'
                      }}></div>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '8px',
                        background: 'linear-gradient(145deg, #3498db, #2980b9)',
                        border: '3px solid #e0e0e0',
                        cursor: 'pointer'
                      }}></div>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '8px',
                        background: 'linear-gradient(145deg, #2ecc71, #27ae60)',
                        border: '3px solid #e0e0e0',
                        cursor: 'pointer'
                      }}></div>
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    style={{
                      background: 'linear-gradient(145deg, #5D009F, #7b2cbf)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 30px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '15px',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 10px rgba(93, 0, 159, 0.2)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 15px rgba(93, 0, 159, 0.3)'
                      }
                    }}
                  >
                    Save Settings
                  </button>
                </form>
              </div>
            )}

            {/* Company Details Modal */}
            {showDetails && (
              <div style={styles.modalOverlay}>
                <div style={styles.modalContent}>
                  {isLoadingDetails ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                      <FaSpinner style={{ ...styles.spinner, fontSize: '24px', marginBottom: '15px' }} />
                      <p>Loading company details...</p>
                    </div>
                  ) : selectedCompany ? (
                    <>
                      <h3 style={{ color: '#5D009F', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaBuilding /> {selectedCompany.organizationName} - Registration Details
                      </h3>
                      <div style={styles.detailsGrid}>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Company Name:</span>
                          <span style={styles.detailValue}>{selectedCompany.organizationName}</span>
                        </div>
                        
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Registration Number:</span>
                          <span style={styles.detailValue}>{selectedCompany.registrationNumber}</span>
                        </div>
                        
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Email:</span>
                          <span style={styles.detailValue}>{selectedCompany.email}</span>
                        </div>
                        
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Address:</span>
                          <span style={styles.detailValue}>{selectedCompany.address}</span>
                        </div>
                        
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Phone:</span>
                          <span style={styles.detailValue}>{selectedCompany.phone || 'Not provided'}</span>
                        </div>
                        
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Status:</span>
                          <span style={{
                            ...styles.detailValue,
                            color: selectedCompany.status === 'approved' ? '#2ecc71' : 
                                  selectedCompany.status === 'rejected' ? '#e74c3c' : '#FFA500',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}>
                            {selectedCompany.status === 'approved' ? <FaCheck /> : 
                             selectedCompany.status === 'rejected' ? <FaTimes /> : <FaInfoCircle />}
                            {selectedCompany.status.charAt(0).toUpperCase() + selectedCompany.status.slice(1)}
                          </span>
                        </div>
                        
                        {selectedCompany.businessDocument && (
                          <div style={styles.detailItem}>
                            <span style={styles.detailLabel}>Business Document:</span>
                            <a 
                              href={`http://localhost:5000${selectedCompany.businessDocument.url}`}
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={styles.docLink}
                            >
                              <FaFileAlt style={{ marginRight: '5px' }} />
                              {selectedCompany.businessDocument.filename}
                            </a>
                          </div>
                        )}
                      </div>
                      
                      <div style={styles.modalActions}>
                        {selectedCompany.status === 'pending' && (
                          <>
                            <button 
                              style={{
                                ...styles.approveBtn,
                                padding: '12px 25px',
                                fontWeight: '500'
                              }} 
                              onClick={() => acceptCompany(selectedCompany._id)}
                            >
                              <FaCheck /> Approve Registration
                            </button>
                            <button 
                              style={{
                                ...styles.rejectBtn,
                                padding: '12px 25px',
                                fontWeight: '500'
                              }} 
                              onClick={() => rejectCompany(selectedCompany._id)}
                            >
                              <FaTimes /> Reject Registration
                            </button>
                          </>
                        )}
                        <button 
                          style={styles.closeBtn}
                          onClick={() => setShowDetails(false)}
                        >
                          Close
                        </button>
                      </div>
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                      <p>Failed to load company details</p>
                      <button 
                        style={{
                          ...styles.closeBtn,
                          marginTop: '20px'
                        }}
                        onClick={() => setShowDetails(false)}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;

