import React from 'react'
import './Signupform.css'
import { Link, useNavigate,} from 'react-router-dom'
import { useState } from 'react'
<style>
  @import url('https://fonts.googleapis.com/css2?family=Caveat&display=swap');
</style>
export default function Loginform() {
    let navigate= useNavigate(); 
    const [Credentials, setCredentials] = useState({  email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("https://dudewalaservices.onrender.com/api/LoginUser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              
              email: Credentials.email,
              password: Credentials.password
            })
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const json = await response.json();
          if (!json.success) {
            alert("Something went wrong");
          }
          if (json.success) {
            localStorage.setItem("userEmail",Credentials.email)
            localStorage.setItem("authToken",json.authToken);
            navigate('/')
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
                    <form onSubmit={handleSubmit} className='formlogin' style={{"width":"400px"}}>
                    <h2 style={{ fontSize: '35px', textAlign: 'center',marginBottom:'30px' ,fontFamily: "Caveat,cursive"}}>Login Form</h2>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control requi" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={Credentials.email} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control requi" id="exampleInputPassword1" name="password" value={Credentials.password} onChange={onChange} />
                        </div>
                        <div className="button-container">
                            <button type="submit" className="btn btn-shadow">Submit</button>
                            <Link className="btn  btn-shadow align-right" to="/signup" role="button">New user?</Link>
                        </div>
                    </form>
                </div>
            </div>


        </>
    )
}
