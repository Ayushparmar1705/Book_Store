import React, { useEffect, useState } from 'react'
import { data } from 'react-router-dom';

export default function Manageuser_orders() {
  const [order, setOrder] = useState([]);
  const [items , setItems] = useState([]);
  useEffect(() => {
    async function fetchOrders() {
      const URL = `http://localhost:8080/admin/getallorders`;
      const data = await fetch(URL);
      const result = await data.json();
      setOrder(result);
    }
    fetchOrders();
  }, [order.length,items.length])
 
  
  return (
   
    <div>
    {/* {console.log("Get items = ", ...items,items)} */}
      <div className='w-[100%]'>
        <table className='p-[10px] w-[100%]'>
          <tbody>
            <tr className='border-b-[2px] border-gray-50'>
              <th className='p-[10px] text-center bg-gray-50'>Order Id</th>
              <th className='p-[10px] text-center bg-gray-50'>Customer Name</th>
              <th className='p-[10px] text-center bg-gray-50'>Email</th>
              <th className='p-[10px] text-center bg-gray-50'>Items</th>
              <th className='p-[10px] text-center bg-gray-50'>Total</th>
              <th className='p-[10px] text-center bg-gray-50'>Date</th>
            </tr>
            {order.map((data, ind) => {

                const items = JSON.parse(data.items || []);
              return(
              <tr key={ind} className='hover:bg-gray-50'>
                <td className='p-[10px] text-center '>{data.oid}</td>
                <td className='p-[10px] text-center '>{data.firstname}{data.lastname}</td>
                <td className='p-[10px] text-center '>{data.email}</td>
                <td className='p-[10px] text-center '>{items.map((data , ind) => (
                  <div key={ind}>
                 
                    <p>{data.name} * {data.quantity}</p>
                    
                  </div>
                ))}</td>
                <td className='p-[10px] text-center '>{data.amount}</td>
                <td className='p-[10px] text-center '>{data.date}</td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
