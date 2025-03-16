import React, { useState, useEffect } from "react";
import { FaUserCircle, FaCheck, FaTimes, FaSignOutAlt, FaHome, FaBuilding } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Admindashboard() {
  const navigate = useNavigate();

  // State for registered companies and new requests
  const [registeredCompanies, setRegisteredCompanies] = useState([]);
  const [newRequests, setNewRequests] = useState([]);

  // Fetch registered companies and new requests from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch registered companies
        const registeredResponse = await axios.get("http://localhost:5000/api/admin/registered-companies");
        setRegisteredCompanies(registeredResponse.data);

        // Fetch new requests
        const requestsResponse = await axios.get("http://localhost:5000/api/admin/pending-requests");
        setNewRequests(requestsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  // Approve a company request
  const acceptCompany = async (id) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/admin/approve-request/${id}`);
      const approvedCompany = response.data;

      // Add the approved company to the registeredCompanies list
      setRegisteredCompanies((prevCompanies) => [...prevCompanies, approvedCompany]);

      // Remove the approved company from the newRequests list
      setNewRequests((prevRequests) => prevRequests.filter((req) => req._id !== id));

      toast.success("Company approved successfully");
    } catch (error) {
      console.error("Error approving request:", error);
      toast.error("Failed to approve company");
    }
  };

  // Reject a company request
  const rejectCompany = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/admin/reject-request/${id}`);
      setNewRequests((prevRequests) => prevRequests.filter((req) => req._id !== id));
      toast.success("Company rejected successfully");
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.error("Failed to reject company");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#F8F9FA", color: "#333", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside style={{ width: "260px", background: "linear-gradient(145deg, black, #5D009F)", padding: "25px", display: "flex", flexDirection: "column", textAlign: "center", color: "white", minHeight: "100vh" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "30px" }}>
          <FaUserCircle style={{ fontSize: "65px", marginBottom: "12px" }} />
          <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>Admin Panel</h3>
          <p style={{ fontSize: "14px", color: "#ddd" }}>System Administrator</p>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "18px", marginTop: "20px" }}>
          <Link
            to="/admin"
            style={{ textDecoration: "none", color: "white", background: "rgba(255, 255, 255, 0.2)", padding: "14px", borderRadius: "6px", transition: "0.3s", display: "flex", alignItems: "center", gap: "12px" }}
          >
            <FaHome /> Dashboard
          </Link>
          <nav
            style={{ background: "rgba(255, 255, 255, 0.2)", color: "white", textDecoration: "none", paddingBottom:"14px",paddingTop:"14px", borderRadius: "6px", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer", border: "none", transition: "background 0.3s ease" }}
            onClick={() => navigate("/registered-companies", { state: { registeredCompanies } })}
          >
            <FaBuilding /> Registered Companies
          </nav>
        </nav>
      </aside>

      {/* Main Dashboard */}
      <main style={{ flexGrow: 1, padding: "30px", overflowY: "auto", background: "white" }}>
        <header style={{fontSize:"17px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(145deg, black, #5D009F)", color: "white", padding: "18px 24px", borderRadius: "10px", marginTop: "-16px" }}>
          <h2>Admin Dashboard</h2>
          <button style={{ background: "white", border: "none", padding: "10px 15px", color: "black", cursor: "pointer", borderRadius: "6px", display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", transition: "0.3s" }}>
            <FaSignOutAlt /> Logout
          </button>
        </header>

        {/* Registered Companies */}
        <section style={{ marginTop: "30px", background: "#f9f9f9", padding: "25px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <h2 style={{ marginBottom: "20px", fontSize: "22px", color: "#5D009F", fontWeight: "bold" }}>Registered Companies</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {registeredCompanies.map((company, index) => (
              <div key={index} style={{ background: "white", padding: "18px", borderRadius: "8px", textAlign: "center", border: "1px solid #ddd", transition: "0.3s", boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.08)" }}>
                <h3 style={{ marginBottom: "8px", color: "#333", fontWeight: "600" }}>{company.organizationName}</h3>
                <p style={{ fontSize: "14px", color: "green", fontWeight: "bold" }}>✔ Approved & Verified</p>
              </div>
            ))}
          </div>
        </section>

        {/* New Requests */}
        <section style={{ marginTop: "30px", background: "#f9f9f9", padding: "25px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <h2 style={{ marginBottom: "20px", fontSize: "22px", color: "#5D009F", fontWeight: "bold" }}>New Requests</h2>
          {newRequests.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
              {newRequests.map((company, index) => (
                <div key={index} style={{ background: "#fafafa", padding: "18px", borderRadius: "8px", textAlign: "center", border: "1px solid #5D009F", transition: "0.3s", boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.08)" }}>
                  <h3 style={{ marginBottom: "8px", color: "#333", fontWeight: "600" }}>{company.organizationName}</h3>
                  <p style={{ color: "#5D009F", fontWeight: "bold" }}>Pending Approval</p>
                  <div style={{ display: "flex", justifyContent: "space-around", marginTop: "12px" }}>
                    <button
                      style={{ padding: "10px 14px", borderRadius: "6px", color: "white", cursor: "pointer", fontWeight: "bold", border: "none", background: "#10b981" }}
                      onClick={() => acceptCompany(company._id)}
                    >
                      <FaCheck /> Accept
                    </button>
                    <button
                      style={{ padding: "10px 14px", borderRadius: "6px", color: "white", cursor: "pointer", fontWeight: "bold", border: "none", background: "#ef4444" }}
                      onClick={() => rejectCompany(company._id)}
                    >
                      <FaTimes /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "#9ca3af", fontStyle: "italic" }}>No new company requests.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default Admindashboard;