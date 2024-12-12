import React from 'react';
import Navbar from '../components/navbar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function MyOrders() {
  const [orderData, setorderData] = useState({});


  async function fetchMyOrder() {
    await fetch('https://dudewalaservices.onrender.com/api/myOrderData', {
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
        await setorderData(response);

      });
  }

  useEffect(() => {
    fetchMyOrder();
  }, []);



  return (
    <>
      <div>
        <Navbar />
      </div>

      <div >
        {orderData !== {} ? (
          Array(orderData).map((data, index) => {
            return data.orderData ? (
              data.orderData.order_data
                .slice(0)
                .reverse()
                .map((item) => {
                  return item.map((arrayData, innerIndex) => {
                    return (
                      <div key={index + innerIndex} style={{ margin: '10px' }}>
                        {arrayData.Order_date ? (
                          <div className='fs-2' style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {(data = arrayData.Order_date)}
                            <hr style={{ width: '40000px', margin: '0', border: 'none', borderTop: '2px solid black' }}></hr>
                          </div>
                        ) : arrayData.orderprice ? (
                          <h3 className='fs-4'>Total orderPrice: <span className='fs-3'>{arrayData.orderprice}</span></h3>
                        ) : (

                          <div style={{ display: 'flex', alignItems: 'center' }}>

                            <img src={arrayData.image} alt={arrayData.description} style={{ maxHeight: '10rem', objectFit: 'contain', backgroundColor: 'white' }} />
                            <div style={{ marginLeft: '10px' }}>
                              <h3>{arrayData.name}</h3>
                              <p>Brand: {arrayData.brand}</p>
                              <p>Quantity: {arrayData.selectedQuantity}</p>
                              <p>Total Price: {arrayData.totalPrice}</p>
                            </div>

                          </div>
                        )}
                      </div>
                    );
                  });
                })
            ) : (
              <>
              <h1 className="m-5 text-center fs-2 bold" style={{ justifyContent:'center',color: 'black', fontFamily: 'Caveat,cursive', margin: '0',marginTop:'600px' }}>
                No Orders found
              </h1>
              <div style={{ justifyContent:'center',display:'flex'}}>
              <Link className="btn btn-primary me-3"to="/orders">
                   order now
              </Link>
              </div>
            </>
            );
          })
        ) : (" "
        )}
      </div>



    </>
  );
}