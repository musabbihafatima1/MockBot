
/*import React, { useState, useEffect } from 'react';
import './Userprofile.css';

const Userprofile = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    technicalField: '',
    university: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/auth/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUserInfo(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // Handle save/update
  // Handle save/update
const handleSave = async () => {
  // Validation: Check if any field is empty
  if (!userInfo.username || !userInfo.email || !userInfo.university || !userInfo.technicalField) {
    alert('All fields are required. Please fill in all fields before saving.');
    return;
  }

  try {
    setLoading(true);
    const response = await fetch('http://localhost:5000/api/auth/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();
    if (response.ok) {
      setIsEditing(false);
      alert('Profile updated successfully');
    } else {
      console.error(data.message);
      alert('Error updating profile');
    }
  } catch (error) {
    console.error('Error saving profile:', error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-circle">
            {userInfo.username[0]?.toUpperCase()}
          </div>
          <h2 className="profile-name">{userInfo.username}</h2>
          <p className="profile-role">{userInfo.technicalField}</p>
          <p className="profile-university">{userInfo.university}</p>
        </div>
        <a href="#!" className="profile-link">View Public Profile</a>
      </div>

      <div className="settings-card">
        <div className="tabs">
          <button className="tab active">Account Settings</button>
        </div>
        <div className="form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={userInfo.username}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>University Name</label>
            <input
              type="text"
              name="university"
              value={userInfo.university}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Technical Field</label>
            <input
              type="text"
              name="technicalField"
              value={userInfo.technicalField}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          {isEditing ? (
            <button onClick={handleSave} className="edit-button">
              {loading ? 'Saving...' : 'Save'}
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="edit-button">
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Userprofile;*/
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Userprofile.css';

;

const Userprofile = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    technicalField: '',
    university: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
const navigate = useNavigate()
  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/auth/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUserInfo(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // Handle save/update
  const handleSave = async () => {
    // Validation: Check if any field is empty
    if (!userInfo.username || !userInfo.email || !userInfo.university) {
      alert('All fields are required. Please fill in all fields before saving.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userInfo),
      });

      const data = await response.json();
      if (response.ok) {
        setIsEditing(false);
        alert('Profile updated successfully');
      } else {
        console.error(data.message);
        alert('Error updating profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
       
      <div className="profile-card">

        <div className="profile-header">
          <div className="profile-circle">
            {userInfo.username[0]?.toUpperCase()}
          </div>
          <h2 className="profile-name">{userInfo.username}</h2>
          <p className="profile-role">{userInfo.technicalField}</p>
          <p className="profile-university">{userInfo.university}</p>
        </div>
        <a href="#!" className="profile-link">View Public Profile</a>
        <button className='back' style={{bottom:'0px', margin:'20px', padding:"5px", width:"100px", background:"#5D009F", color:"white", borderRadius:"5px" }}>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/userpage'>back</Link></button>
      </div>

      <div className="settings-card">
        <div className="tabs">
          <button className="tab active">Account Settings</button>
        </div>
        <div className="form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={userInfo.username}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>University Name</label>
            <input
              type="text"
              name="university"
              value={userInfo.university}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Technical Field</label>
            <input
              type="text"
              name="technicalField"
              value={userInfo.technicalField}
              onChange={handleChange}
              disabled={true} // Always non-editable
            />
          </div>
          {isEditing ? (
            <button onClick={handleSave} className="edit-button">
              {loading ? 'Saving...' : 'Save'}
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="edit-button">
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
