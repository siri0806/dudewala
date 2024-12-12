import React from 'react'
import './Signupform.css'
import { Link} from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

<style>
  @import url('https://fonts.googleapis.com/css2?family=Caveat&display=swap');
</style>

export default function Signupform() {
    const navigate=useNavigate();
    
    
    const [Credentials, setCredentials] = useState({ name: "", email: "", apartmentName: "", blockNumber: "", floorNumber: "", roomNumber: "", contactNumber: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("https://dudewalaservices.onrender.com/api/CreateUser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: Credentials.name,
              email: Credentials.email,
              apartmentName: Credentials.apartmentName,
              blockNumber: Credentials.blockNumber,
              floorNumber: Credentials.floorNumber,
              roomNumber: Credentials.roomNumber,
              contactNumber: Credentials.contactNumber,
              password: Credentials.password
            })
          }
          );
           
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const json = await response.json();
          console.log(json);
          if (!json.success) {
            alert("Something went wrong");
          }
          if (json.success) {
            navigate('/login');
          }
        } catch (error) {
          console.error('Error:', error);
          alert("An error occurred. Please try again.");
        }
      
        
      };
    
    const onChange = (event) => {
        setCredentials({ ...Credentials, [event.target.name]: event.target.value })
    }

    return (
        <>
            <div className='container' style={{ height: '650px', width: '1000px', alignItems: "center", justifyContent: "center", marginTop: '70px' }}>
                <div >
                    <form onSubmit={handleSubmit} >
                    <h2 style={{ fontSize: '35px', textAlign: 'center',marginBottom:'10px' ,fontFamily: "Caveat,cursive"}}>Signup Form</h2>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control requi" name="name" value={Credentials.name} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control requi" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={Credentials.email} onChange={onChange} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="apartmentName" className="form-label">Apartment Name</label>
                            <select className="form-control requi" name="apartmentName" value={Credentials.apartmentName} onChange={onChange}>
                                <option value="">Select an apartment</option>
                                <option value="rolling hills">rolling hills</option>
                                <option value="meenakshi towers">meenakshi towers</option>
                                <option value="meghan towers">meghan towers</option>
                            </select>
                        </div>
                        <div className="mb-3 d-flex">
                            <div className="flex-grow-1 mr-3">
                                <label htmlFor="blockNumber" className="form-label">Block Number</label>
                                <select className="form-control" name="blockNumber" value={Credentials.blockNumber} onChange={onChange}>
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
                                <label htmlFor="floorNumber" className="form-label">Floor Number</label>
                                <input type="number" className="form-control" name="floorNumber" value={Credentials.floorNumber} onChange={onChange} />
                            </div>
                            <div className="flex-grow-1">
                                <label htmlFor="roomNumber" className="form-label">Room Number</label>
                                <input type="number" className="form-control" name="roomNumber" value={Credentials.roomNumber} onChange={onChange} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                            <input type="tel" className="form-control requi" name="contactNumber" value={Credentials.contactNumber} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control requi" id="exampleInputPassword1" name="password" value={Credentials.password} onChange={onChange} />
                        </div>
                       
				
                        <div className="button-container">
                            <button type="submit" className="btn btn-shadow">Submit</button>
                            <Link className="btn  btn-shadow align-right" to="/login" role="button">Already a user?</Link>
                        </div>
                    </form>
                </div>
            </div>


        </>
    )
}
