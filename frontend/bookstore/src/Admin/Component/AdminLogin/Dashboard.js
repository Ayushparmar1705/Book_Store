import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Label } from 'recharts';
import React, { useEffect, useState } from 'react'
import { Legend, Tooltip } from 'recharts';
import { Bar } from 'react-chartjs-2';

import { } from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [getBooks, setGetBooks] = useState([]);
  const [getOrders, setGetOrders] = useState([])
  const [getUsers, setGetUsers] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    if (!localStorage.getItem("username")) {
      alert("Please Login First")
      navigate("/")

    }
    async function getAlldetails() {
      const [books, users, orders] = await Promise.all([
        fetch("http://localhost:8080/admin/bookslist/undefined"),
        fetch("http://localhost:8080/getusers"),
        fetch("http://localhost:8080/admin/getgraphorder"),
      ]);
      const [pbooks, pusers, porders] = await Promise.all([
        books.json(),
        users.json(),
        orders.json(),
      ])
      setGetBooks(pbooks);
      setGetUsers(pusers);
      setGetOrders(porders);

    }
    getAlldetails();
  }, [getBooks.length, getUsers.length, getOrders.length])
  console.log(getOrders);
  const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const sales = getOrders.map((data) => ({
    month: monthName[data.month - 1],
    sales: data.total_sales,
  }))
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstItems = indexOfLastItems - itemsPerPage;
  const currentItems = getBooks.slice(indexOfFirstItems, indexOfLastItems);
  const totalPages = Math.ceil(getBooks.length / itemsPerPage)

  const barData = {
    labels: currentItems.map((data) => ( data.name.length>15 ? data.name.slice(0,15)+"...":data.name )),
    datasets: [
      {
        label: "Price",
        data: currentItems.map((data) => { return data.price }),
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        borderRadius: 10,
        hoverBackgroundColor: "rgba(99, 102, 241, 0.9)",
      },
    ]
  };
  return (
    <div>
      <div className='bg-[#5e72e4] p-[10px] flex h-[200px] gap-10 justify-center items-center'>
        <div className='h-[100px] p-[10px] bg-[#ffffff] w-[300px] font-bold text-gray-500 text-center rounded-[10px]'>
          <p>Total Books</p>
          <p>{getBooks.length}</p>
        </div>
        <div className='h-[100px] p-[10px] bg-[#ffffff] w-[300px] font-bold text-gray-500 text-center rounded-[10px]'>
          <p>Total Users</p>
          <p>{getUsers.length}</p>
        </div>
        <div className='h-[100px] p-[10px] bg-[#ffffff] w-[300px] font-bold text-gray-500 text-center rounded-[10px]'>
          <p>Total Orders</p>
          <p>{getOrders.length}</p>
        </div>
      </div>

      <div className='flex'>
        <div className='w-[1000px]'>
          <Bar data={barData}></Bar>
        </div>
        <div className='w-[1000px]'>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={sales} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>


      </div>
      <div className='w-[100%]'>
        <div className='flex justify-end rounded shadow p-[10px]'>
          <table>
            <thead>
              <tr className='bg-gray-50 p-[20px] border-t-[2px] border-gray-100 border-b-[2px]'>
                <th className='p-[10px] text-center'>Isbn-10</th>
                <th className='p-[10px] text-center'>Isbn-13</th>
                <th className='p-[10px] text-center'>Name</th>
                <th className='p-[10px] text-center'>Category</th>

                <th className='p-[10px] text-center'>Price</th>
                <th className='p-[10px] text-center'>In Stock</th>
                <th className='p-[10px] text-center'>Pages</th>
                <th className='p-[10px] text-center'>Author</th>
                <th className='p-[10px] text-center'>Publisher</th>



              </tr>
            </thead>
            <tbody>
              {currentItems.map((data, idx) => (
                <tr key={idx} className='hover:bg-gray-50'>
                  <td className='p-[20px] text-center'>{data.isbn10}</td>
                  <td className='p-[20px] text-center'>{data.isbn13}</td>
                  <td className='p-[20px] text-center'>{data.name}</td>
                  <td className='p-[20px] text-center'><p>{data.category}</p></td>

                  <td className='p-[20px] text-center'>{data.price}</td>
                  <td className='p-[20px] text-center '><p>{data.quantity}</p></td>
                  <td className='p-[20px] text-center'>{data.pages}</td>
                  <td className='p-[20px] text-center'>{data.author}</td>
                  <td className='p-[20px] text-center'>{data.publisher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex justify-end gap-10'>
          <button className='bg-gray-100 p-[10px] w-[100px]' onClick={() => {
            setCurrentPage(prev => prev - 1);
          }} disabled={currentPage === 1}>Previous</button>
          <button >{currentPage} of {totalPages}</button>

          <button className='bg-gray-100 p-[10px] w-[100px]' onClick={() => {

            setCurrentPage(prev => prev + 1)
          }} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>
  )
}
