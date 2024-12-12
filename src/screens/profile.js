import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Modal from "../Modal";
import EditUserProfile from './editProfile';
import ResetPassword from './ResetPassword';

export default function Profile() {
  const [userData, setUserData] = useState({});
  const [edituser, setedituser] = useState(false);
  const [editProfile, seteditProfile] = useState(false)
  useEffect(() => {
    const fetchMyOrder = async () => {
      try {
        const response = await fetch('https://dudewalaservices.onrender.com/api/userprofile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: localStorage.getItem('userEmail'),
          }),
        });
        const data = await response.json();
        setUserData(data.userData);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchMyOrder();
  }, []);
  const loadCart = () => {
    setedituser(true)
  }
  const loadrespass = () => {
    seteditProfile(true)
  }
  return (
    <div >
      <div>
        <Navbar />
      </div>
      <h1 className="fs-2" style={{ fontFamily: 'Caveat,cursive', fontWeight: '600', background: 'transparent', fontSize: '14px', textAlign: 'center', marginTop: '40px', marginBottom: '30px' }}>User Detail</h1>
      <table
        style={{
          borderCollapse: 'collapse',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '50px'
        }}
      >
        <tbody>
          <tr>
            <td className="fs-5" style={{ fontWeight: '600', marginRight: '100px', margin: '10px' }}>Name:</td>
            <td className="fs-4" style={{ fontWeight: '600', marginRight: '100px', margin: '10px' }}>{userData.name}</td>
          </tr>
          <tr>
            <td className="fs-5" style={{ fontWeight: '600', marginRight: '100px', margin: '10px' }}>Email:</td>
            <td className="fs-4" style={{ fontWeight: '600', marginRight: '100px', margin: '10px' }}>{userData.email}</td>
          </tr>
          <tr>
            <td className="fs-5" style={{ fontWeight: '600', marginRight: '100px', margin: '10px' }}>Apartment Name:</td>
            <td className="fs-4" style={{ fontWeight: '600', marginRight: '100px', margin: '10px' }}>{userData.apartmentName}</td>
          </tr>
          <tr>
            <td className="fs-5" style={{ fontWeight: '600', marginRight: '100px', margin: '10px' }}>Block Number:</td>
            <td className="fs-4" style={{ fontWeight: '600', marginRight: '100px', margin: '10px' }}>{userData.blockNumber}</td>
          </tr>
          <tr>
            <td className="fs-5" style={{ fontWeight: '600', marginRight: '100px', margin: '10px' }}>Floor Number:</td>
            <td className="fs-4" style={{ fontWeight: '600', marginRight: '100px', margin: '10px' }}>{userData.floorNumber}</td>
          </tr>
          <tr>
            <td className="fs-5" style={{ fontWeight: '600', marginRight: '100px', margin: '10px' }}>Room Number:</td>
            <td className="fs-4" style={{ fontWeight: '600', marginRight: '100px', margin: '10px' }}>{userData.roomNumber}</td>
          </tr>
          <tr>
            <td className="fs-5" style={{ fontWeight: '600', marginRight: '100px', margin: '10px' }}>Contact Number:</td>
            <td className="fs-4" style={{ fontWeight: '600', marginRight: '100px', margin: '10px' }}>{userData.contactNumber}</td>
          </tr>
        </tbody>

      </table>
      <div style={{ justifyContent: 'center', display: 'flex', allignItems: 'center', marginTop: '20px' }}>
        <div className="btn btn-primary fs-5 me-3 " onClick={loadCart}  >
          editProfile{" "}
        </div>
        <div className="btn btn-primary fs-5 " onClick={loadrespass}  >
          Reset Password{" "}
        </div>
      </div>
      {edituser ? <Modal onClose={() => setedituser(false)}><EditUserProfile userData={userData}></EditUserProfile></Modal> : ""}
      {editProfile ? <Modal onClose={() => seteditProfile(false)}><ResetPassword ></ResetPassword></Modal> : ""}
    </div>
  );
}
