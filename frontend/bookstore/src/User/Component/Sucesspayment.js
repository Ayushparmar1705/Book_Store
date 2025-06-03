import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'


export default function Sucesspayment() {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");
  const id = jwtDecode(token).id;
  useEffect(() => {
    async function getOrders() {
      const URL = `http://localhost:8080/order-history/${id}`;
      const data = await fetch(URL);
      const result = await data.json();
      if (result) {
        setOrders(result)
        if (orders.length > 0) {
          setItems(JSON.parse(result[0]["items"]));

        }
      }

    }
    getOrders();
  }, [orders.length])




  return (
    <div className='mt-[10px]'>
      <div>
        {!orders.length > 0 && <div className='bg-green-300 p-[10px] text-center'> <a className='color-green-400' href='/shop'>Order Now</a></div>}
        {orders.map((data, index) => (

          <div key={index} className='shadow-xl h-[400px] w-[900px] text-center m-[auto]'>

            <div className='p-[10px]  text-center  w-[100%] border-[2px] border-gray-50 '>
              <table className='p-[10px] text-center  w-[100%]'>

                <tr className='text-center'>
                  <td>Order Place</td>
                  <td className='text-center p-[20px]'>Order Id</td>
                  <td className='text-center p-[20px]'>Total Amount</td>
                </tr>
                <tr >
                  <td>{data["date"]}</td>
                  <td className='text-center p-[20px]'>{data["oid"]}</td>
                  <td className='text-center p-[20px]'>{data["amount"]}</td>
                </tr>
              </table>

            </div>
            <div className='p-[10px] w-[100%] h-[500px] text-center'>
              <p className='p-[10px] text-[20px] font-bold'>Order Details</p>

              {
                items.map((data) => (
                  <>

                    <div className='p-[10px] bg-lightgreen-50 rounded-[10px] flex items-center text-left'>
                      <img src={data.image} alt='No found' className='h-[100px] w-[100px]'></img>

                      <div>
                        <p className='p-[10px]'>Name : {data.name}</p>
                        <p className='p-[10px]'>Quantity : {data.quantity}</p>
                        <p className='p-[10px]'>Price : {data.price}</p>
                      </div>

                    </div>
                  </>



                ))
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
