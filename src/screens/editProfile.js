import React from 'react'
import { useState } from 'react'

export default function EditUserProfile({ userData }) {
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [Credentials, setCredentials] = useState({ name:userData.name, apartmentName: userData.apartmentName, blockNumber: userData.blockNumber, floorNumber: userData.floorNumber, roomNumber: userData.roomNumber, contactNumber: userData.contactNumber })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("https://dudewalaservices.onrender.com/api/updateUser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: Credentials.name,
              email: localStorage.getItem('userEmail'),
              apartmentName: Credentials.apartmentName,
              blockNumber: Credentials.blockNumber,
              floorNumber: Credentials.floorNumber,
              roomNumber: Credentials.roomNumber,
              contactNumber: Credentials.contactNumber,
              
            })
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const json = await response.json();
          console.log(json);
          if (!json.success) {
            alert("Something went wrong");
          }
          if (json.success) {
            
            setUpdateSuccess(true);
          }

        } catch (error) {
          console.error('Error:', error);
          alert("An error occurred. Please try again.");
        }
      };
    const onChange = (event) => {
        setCredentials({ ...Credentials, [event.target.name]: event.target.value })
    }
    if (updateSuccess) {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>
              <h2 style={{ color: 'white', fontSize: '35px', textAlign: 'center', marginBottom: '10px', fontFamily: 'Caveat,cursive' }}>Update Successful!</h2>
            </div>
          </div>
        );
      }
    
  return (
            <>
    <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div >
            <form onSubmit={handleSubmit} >
            <h2 style={{color:'white', fontSize: '35px', textAlign: 'center',marginBottom:'10px' ,fontFamily: "Caveat,cursive"}}>Update your info</h2>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label text-white">Name</label>
                    <input type="text" style={{fontWeight:'600'}} className="form-control requi" name="name" value={Credentials.name} onChange={onChange} />
                </div>
            
                <div className="mb-3">
                    <label htmlFor="apartmentName" className="form-label text-white">Apartment Name</label>
                    <select style={{fontWeight:'600'}} className="form-control " name="apartmentName" value={Credentials.apartmentName} onChange={onChange}>
                        <option value="">Select an apartment</option>
                        <option value="rolling hills">rolling hills</option>
                        <option value="meenakshi towers">meenakshi towers</option>
                        <option value="meghan towers">meghan towers</option>
                    </select>
                </div>
                <div className="mb-3 d-flex">
                    <div className="flex-grow-1 mr-3">
                        <label htmlFor="blockNumber" className="form-label text-white">Block Number</label>
                        <select style={{fontWeight:'600'}} className="form-control" name="blockNumber" value={Credentials.blockNumber} onChange={onChange}>
                            <option value="">Select a block number</option>
                            <option value="A">A</option>
                            <option value="B-1">B-1</option>
                            <option value="B-2">B-2</option>
                            <option value="C">c</option>
                            <option value="D">D</option>
                            <option value="E">E</option>

                        </select>
                    </div>
                    <div className="flex-grow-1 mr-3">
                        <label htmlFor="floorNumber" className="form-label text-white">Floor Number</label>
                        <input type="number" style={{fontWeight:'600'}} className="form-control" name="floorNumber" value={Credentials.floorNumber} onChange={onChange} />
                    </div>
                    <div className="flex-grow-1">
                        <label htmlFor="roomNumber" className="form-label text-white">Room Number</label>
                        <input type="number" style={{fontWeight:'600'}} className="form-control" name="roomNumber" value={Credentials.roomNumber} onChange={onChange} />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="contactNumber" className="form-label text-white">Contact Number</label>
                    <input type="tel" style={{fontWeight:'600'}} className="form-control requi" name="contactNumber" value={Credentials.contactNumber} onChange={onChange} />
                </div>
                <div style={{ justifyContent:'center',display:'flex',allignItems:'center'}}>
                <button type="submit" className="btn btn-primary btn-shadow">update info</button>
                </div>

            </form>
        </div>
    </div>
</>
  )
}
