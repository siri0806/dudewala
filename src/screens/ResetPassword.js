import React, { useState } from 'react';

export default function ResetPassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isOldPasswordCorrect, setIsOldPasswordCorrect] = useState(false);
  const [isPasswordResetSuccessful, setIsPasswordResetSuccessful] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://dudewalaservices.onrender.com/api/validateOldPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail'),
          oldPassword: oldPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsOldPasswordCorrect(true);
      } else {
        setIsOldPasswordCorrect(false);
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      // Handle error response
    }
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://dudewalaservices.onrender.com/api/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail'),
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsPasswordResetSuccessful(true);
      } else {
        setIsPasswordResetSuccessful(false);
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      // Handle error response
    }
  };

  return (
    <div  style={{  display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      {isOldPasswordCorrect ? (
        isPasswordResetSuccessful ? (
          <div className="text-white fs-1" >Password reset was successful.</div>
        ) : (
          <form onSubmit={handleResetPassword}>
            <label htmlFor="exampleInputPassword1" className="form-label text-white fs-6">
              New Password:
              <input type="password" className="form-control text-white" value={newPassword} onChange={handleNewPasswordChange} />
            </label>
            <div style={{ justifyContent:'center',display:'flex',allignItems:'center'}}>
                <button type="submit" className="btn btn-primary btn-shadow">Reset Password</button>
                </div>
          </form>
        )
      ) : (
        <div>
          <label htmlFor="exampleInputPassword1" className="form-label text-white fs-6">
            Old Password:
            <input type="password" className="form-control requi" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
          </label>
          <div style={{ justifyContent:'center',display:'flex',allignItems:'center'}}>
                <button type="submit" className="btn btn-primary btn-shadow" onClick={handleSubmit}>submit</button>
                </div>
        </div>
      )}
    </div>
  );
}
