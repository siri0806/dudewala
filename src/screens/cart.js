import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { useState ,useEffect} from 'react';
<style>
  @import url('https://fonts.googleapis.com/css2?family=Caveat&display=swap');
</style>
export default function Cart() {
  const [defaultOrderExists, setDefaultOrderExists] = useState(false);
  const data = useCart();
  const dispatch = useDispatchCart();

  useEffect(() => {
    const checkDefaultOrder = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        const response = await fetch('https://dudewalaservices.onrender.com/api/CheckDefaultOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userEmail,
          }),
        });

        if (response.status === 200) {
          const result = await response.json();
          setDefaultOrderExists(result.exists);
        } else {
          console.error('Failed to check default order:', response.status);
        }
      } catch (error) {
        console.error('Error checking default order:', error);
      }
    };

    checkDefaultOrder();
  }, []);
  if (data.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '500px' }}>
      <h1 className='m-5 text-center fs-2 bold' style={{ color: 'whitesmoke', fontFamily: "Caveat,cursive", margin: '0' }}>The Cart is Empty!</h1>
    </div>
    )
  }
  const handleCheckOut = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      console.log(userEmail);
      const response = await fetch('https://dudewalaservices.onrender.com/api/OrderData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });
  
      if (response.status === 200) {
        
        dispatch({ type: 'DROP' });
      } else {
        
        console.error('Failed to check:', response.status);
      }
    } catch (error) {

      console.error('Error during checkout:', error);
    }
  };
  const handleCreateDefault = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      console.log(userEmail);
      const response = await fetch('https://dudewalaservices.onrender.com/api/DefaultOrderdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toLocaleDateString(),
        }),
      });
  
      if (response.status === 200) {
        setDefaultOrderExists(true);
        dispatch({ type: 'DROP' });
      } else {
        setDefaultOrderExists(false);
        console.error('Failed to check:', response.status);
      }
    } catch (error) {

      console.error('Error during checkout:', error);
    }
  };


  const totalPrice = data.reduce((total, food) => total + food.totalPrice, 0);

  return (
    <div>
     <h1 className='fs-2' style={{color:'whitesmoke',fontFamily: "Caveat,cursive",textAlign:'center',marginBottom:'20px'}} >your cart</h1>   
    <table className='table table-hover'>
      <thead className='text-success fs-5'>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Name</th>
          <th scope='col'>Quantity</th>
          <th scope='col'>Amount</th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody>
        {data.map((food, index) => (
          <tr key={index}>
            <th scope='row'>{index + 1}</th>
            <td className='fs-5' style={{fontWeight:'600'}}>{food.name}</td>
            <td className='fs-5' style={{fontWeight:'600'}}>{food.selectedQuantity}</td>
            <td className='fs-5' style={{fontWeight:'600'}}>{food.totalPrice}</td>
            <td ><button type="button" className="btn p-0" style={{ height: '30px', width: '30px', border: 'none', background: 'none', padding: 0 }}  onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>
              <img src="https://imgur.com/rUAxV0S.png" alt='delete' style={{
                maxWidth: '100%', 
                maxHeight: '100%' 
              }} />
              </button> </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div >
        <h1 className='fs-3' style={{color:'whitesmoke',fontFamily: "Caveat,cursive"}} >Total Price: {totalPrice}/-</h1>
        <button className='btn btn-primary mt-3 me-3' onClick={handleCheckOut}>
          Check Out
        </button>
        {!defaultOrderExists && (
          <button className='btn btn-primary mt-3 me-3' onClick={handleCreateDefault} disabled={defaultOrderExists}>
            Set as Default
          </button>
        )}
      </div>
  </div>
  );
}
