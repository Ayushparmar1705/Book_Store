import React, { useEffect, useState } from 'react'

export default function Manageuser_orders() {
  const [order, setOrder] = useState([]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function fetchOrders() {
      const URL = `http://localhost:8080/admin/manageorder`;
      const data = await fetch(URL);
      const result = await data.json();
      setOrder(result);
      console.log(result);
      order.map((data) => (
        setItems(JSON.parse(data["items"]))
      ))

    }
    fetchOrders();
  }, [order.length])
  useEffect(() => {
    console.log("Items =", items);
  }, [items.length])
  return (
    <div >
      <div className='w-[100%]'>
        <table className='p-[10px] w-[100%]'>
          <tbody>
            <tr className='border-b-[2px]'>
              <th className='p-[10px] text-center bg-gray-50'>Order Id</th>
              <th className='p-[10px] text-center bg-gray-50'>Customer Name</th>
              <th className='p-[10px] text-center bg-gray-50'>Email</th>
              <th className='p-[10px] text-center bg-gray-50'>Items</th>
              <th className='p-[10px] text-center bg-gray-50'>Total</th>
              <th className='p-[10px] text-center bg-gray-50'>Date</th>
            </tr>
            {order.map((data, ind) => (

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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
