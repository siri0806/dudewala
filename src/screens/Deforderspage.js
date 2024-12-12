import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';

export default function Deforderspage() {
 
  const [orderData, setOrderData] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [daysDiff, setDaysDiff] = useState(0);
  const fetchMyOrder = async () => {
    await fetch('https://dudewalaservices.onrender.com/api/DisplayDefaultOrderdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: localStorage.getItem('userEmail'),
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          let data = await res.json();
          setOrderData(data.extractedData);
          setFromDate(data.fromDate);
          setToDate(data.toDate);
          setDaysDiff(data.daysDiff);
          
        } else if (res.status === 404) {
          setOrderData([]);
        } else {
          throw new Error('Internal server error');
        }
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  const totalPrice = orderData?.reduce((total, food) => total + food.totalPrice, 0) ?? 0;

  const handledropOrder = async () => {
    await fetch('https://dudewalaservices.onrender.com/api/DropDefaultOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: localStorage.getItem('userEmail'),
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log('Drop order successful');
          setOrderData([]);
          setFromDate('');
          setToDate('');
          setDaysDiff(0);
        } else {
          throw new Error('Error dropping order');
        }
      })
      .catch((error) => {
        console.error('Error dropping order:', error);
      });
  };


  return (
    <>
      <div>
        <Navbar />
      </div>


      {orderData === null ? (
            " "
      ) : orderData.length === 0 ? (
        <>
          <h1 className="m-5 text-center fs-2 bold" style={{ justifyContent:'center',color: 'black', fontFamily: 'Caveat,cursive', margin: '0',marginTop:'600px' }}>
            No default Orders found
          </h1>
          <div style={{ justifyContent:'center',display:'flex'}}>
          <Link className="btn btn-primary me-3"to="/orders">
            Create your default order now
          </Link>
          </div>
        </>
      ) : (
        <>
          <h1 className="fs-2" style={{  fontFamily: 'Caveat,cursive',fontWeight: '600', background: 'transparent', fontSize: '14px', textAlign: 'center', marginTop: '30px', marginBottom: '20px' }}>
            Your Default Orders
          </h1>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px', marginBottom: '20px' }}>
            <div className="fs-5 primary" style={{ fontWeight: '600', marginLeft: '100px' }}>
              start date: <span className="fs-4">{fromDate}</span>
            </div>
            <div className="fs-5" style={{ fontWeight: '600' }}>
              end date(till today): <span className="fs-4">{toDate}</span>
            </div>
            <div className="fs-5" style={{ fontWeight: '600', marginRight: '100px' }}>
              total days(till today): <span className="fs-4">{daysDiff}</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <table className="table table-hover">
              <thead className="text-success fs-5">
                <tr>
                  <th scope="col" style={{ textAlign: 'center' }}>
                    #
                  </th>
                  <th scope="col" style={{ textAlign: 'center' }}>
                    Name
                  </th>
                  <th scope="col" style={{ textAlign: 'center' }}>
                    Product Company
                  </th>
                  <th scope="col" style={{ textAlign: 'center' }}>
                    Quantity
                  </th>
                  <th scope="col" style={{ textAlign: 'center' }}>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderData.map((order, index) => (
                  <tr key={index}>
                    <th scope="row" className="fs-5" style={{ textAlign: 'center', fontWeight: '600', background: 'transparent', fontSize: '14px' }}>
                      {index + 1}
                    </th>
                    <td className="fs-5" style={{ textAlign: 'center', fontWeight: '600', background: 'transparent', fontSize: '14px' }}>
                      {order.name}
                    </td>
                    <td className="fs-5" style={{ textAlign: 'center', fontWeight: '600', background: 'transparent', fontSize: '14px' }}>
                      {order.brand}
                    </td>
                    <td className="fs-5" style={{ textAlign: 'center', fontWeight: '600', background: 'transparent', fontSize: '14px' }}>
                      {order.selectedQuantity}
                    </td>
                    <td className="fs-5" style={{ textAlign: 'center', fontWeight: '600', background: 'transparent', fontSize: '14px' }}>
                      {order.totalPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="fs-5" style={{ fontWeight: '600', textAlign: 'right', marginRight: '100px' }}>
            daily price: <span className="fs-4">{totalPrice}</span>
          </div>
          <div className="fs-5" style={{ fontWeight: '600', textAlign: 'right', marginRight: '100px' }}>
            total bill till today: <span className="fs-4">{totalPrice * daysDiff}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', marginRight: '90px' }}>
            <button className="btn btn-primary me-3"  onClick={handledropOrder}>Drop your daily order</button>
          </div>
        </>
      )}
    </>
  );
}
