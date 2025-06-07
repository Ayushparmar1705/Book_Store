import React, { useEffect, useState } from 'react';
import { } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
;

export default function Dashboard() {
  const [bookData, setBookData] = useState([]);
  const [Totalbooks, setTotalbooks] = useState([]);
  const [TotalUsers, setTotalusers] = useState("");
  const [totalOrder, setTotalOrders] = useState([]);


  useEffect(() => {
    async function fetchEverything() {
      const [books, users, orders] = await Promise.all([
        fetch("http://localhost:8080/admin/bookslist/undefined"),
        fetch("http://localhost:8080/getusers"),
        fetch("http://localhost:8080/admin/getallorders"),

      ])
      const [getBooks, getUsers, getOrders] = await Promise.all([
        books.json(),
        users.json(),
        orders.json(),

      ])
      setBookData(getBooks);
      setTotalbooks(getBooks);
      setTotalusers(getUsers.length);
      setTotalOrders(getOrders);

    }

    fetchEverything();
  }, [])
  useEffect(() => {
    console.log(totalOrder);
  })
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Book Prices',
        font: {
          size: 18
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstItems = indexOfLastItems - itemsPerPage;
  const currentItems = bookData.slice(indexOfFirstItems, indexOfLastItems);

  const totalPages = Math.ceil(bookData.length / itemsPerPage)
  const barData = {
    labels: currentItems.map((data) => { return data.name }),
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
  const getOrderBardata = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Price",
        data: totalOrder.map((data) => { return data.amount }),
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        borderRadius: 10,
        hoverBackgroundColor: "rgba(99, 102, 241, 0.9)",
      },
    ]
  };

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <h1 className='text-3xl font-bold text-gray-800 mb-8'>Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <div className='bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h2 className='text-gray-500 text-sm font-medium'>Total Books</h2>
              <p className='text-2xl font-bold text-gray-800'>{Totalbooks.length}</p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-blue-100 text-blue-600 mr-4'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h2 className='text-gray-500 text-sm font-medium'>Total Users</h2>
              <p className='text-2xl font-bold text-gray-800'>{TotalUsers}</p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-green-100 text-green-600 mr-4'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h2 className='text-gray-500 text-sm font-medium'>Total Orders</h2>
              <p className='text-2xl font-bold text-gray-800'>{totalOrder.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className='bg-white rounded-xl shadow-md p-6 mb-8  flex gap-20'>
 
        <div className='h-100 w-150 p-[10px]'>
          <Bar data={barData} options={options} />
        </div>
        <div className='h-100 w-150'>
          <Line data={getOrderBardata} options={options} />
        </div>

      </div>

      {/* Books Table */}
      <div className='bg-white rounded-xl shadow-md overflow-hidden'>
        <div className='p-6'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4'>Book Inventory</h2>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Price</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>In Stock</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Pages</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Author</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Publisher</th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {currentItems.map((data) => (
                  <tr key={data.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{data.name}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>₹{data.price}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{data.quantity}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{data.pages}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{data.author}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{data.publisher}</td>
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
    </div>
  );
}