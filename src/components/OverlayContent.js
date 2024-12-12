import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function OverlayContent() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    await fetch('https://dudewalaservices.onrender.com/api/todaysorders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: localStorage.getItem('userEmail'),
        
      }),
    })
      .then(async (res) => {
        let response = await res.json();
        setOrderData(response.orderData);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  };

    
  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
  <>
   {(localStorage.getItem("authToken")) ? ( 
    <>
      {orderData.length === 0 ? (
        <>
        <h1 className="fs-3" style={{ fontWeight: '600', color: 'white', background: 'transparent', fontSize: '14px',marginBottom:'40px' }}>No orders found for Tomorrow.</h1>
        <Link className="btn btn-light fs-5 me-3" to="/orders" >OrderNow</Link>
        </>
      ) : (
        <>
        <h1>Your Orders for Tomorrow</h1>
        <table className="table table-hover">
          <thead className="text-success fs-5">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Amount</th>
              
            </tr>
          </thead>
          <tbody>
            {orderData.map((order, index) => (
              <tr key={index}>
                <th scope="row"  className="fs-5" style={{ fontWeight: '600', color: 'white', background: 'transparent', fontSize: '14px' }}>{index + 1}</th>
                <td className="fs-5" style={{ fontWeight: '600', color: 'white', background: 'transparent', fontSize: '14px' }}>{order.name}</td>
                <td className="fs-5" style={{ fontWeight: '600', color: 'white', background: 'transparent', fontSize: '14px' }}>{order.selectedQuantity}</td>
                <td className="fs-5" style={{ fontWeight: '600', color: 'white', background: 'transparent', fontSize: '14px' }}>{order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
      )}
    </>
    ) : (
        <>
        <h1 className="fs-3" style={{ fontWeight: '600', color: 'white', background: 'transparent', fontSize: '14px',marginBottom:'40px' }}>Please log in to view the content</h1>
        <Link className="btn btn-light fs-5 " to="/login">Login</Link>
        </>

    )}
    </> 
  );
}
