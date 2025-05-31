import React, { useEffect, useState } from 'react';
import { } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
export default function Dashboard() {
  const [bookData, setBookData] = useState([]);
  const [Totalbooks, setTotalbooks] = useState("");
  const [TotalUsers, setTotalusers] = useState("");
  const [totalOrder, setTotalOrders] = useState([]);
  useState(() => {
    async function Listbooks() {
      const URL = "http://localhost:8080/admin/bookslist";
      const data = await fetch(URL);
      const result = await data.json();

      setBookData(result);
      setTotalbooks(result.length)
    }
    Listbooks();
    async function TotalUsers() {
      const URL = "http://localhost:8080/getusers";
      const data = await fetch(URL);
      const result = await data.json();
      setTotalusers(result.length);

    }
    TotalUsers();
    async function UserOrders() {
      const URL = "http://localhost:8080/admin/getallorders";
      const data = await fetch(URL);
      const result = await data.json();
      setTotalOrders(result);
    }
    UserOrders();

  }, [TotalUsers.length])
  useEffect(() => {
    console.log(totalOrder)
  })



  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50,
        }
      }
    }
  }
  const chartdata = totalOrder.map((data) => ({
    date: data.date,
    amount: data.amount,
  }))


  return (
    <div className='p-4'>
      <div className='flex justify-center gap-5  max-[900px]:flex max-[900px]:flex-col max-[900px]:items-center'>
        <div className='bg-gradient-to-r from-blue-500 to-teal-400 hover:scale-110 p-6 w-[300px] h-[100px] text-center shadow-xl rounded-[10px] max-[900px]:w-[300PX] '>
          <h1 className='text-[20px] font-bold'>Total Books</h1>
          <p className='text-[20px] font-bold'>{Totalbooks}</p>
        </div>
        <div className=' bg-gradient-to-r from-pink-200 to-purple-600 p-6 w-[300px] h-[100px] hover:scale-110 text-center shadow-xl rounded-[10px] max-[900px]:w-[300PX]'>
          <h1 className='text-[20px] font-bold'>Total Users</h1>
          <p className='text-[20px] font-bold'>{TotalUsers}</p>
        </div>
        <div className='bg-linear-65 from-orange-500 to-pink-400 p-6 w-[300px] h-[100px] hover:scale-110 text-center shadow-xl rounded-[10px] max-[900px]:w-[300PX]'>
          <h1 className='text-[20px] font-bold'>Total Orders</h1>
          <p className='text-[20px] font-bold'>5</p>
        </div>
      </div>
      <div className='flex'>

        <div className='w-[600px]'>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartdata}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />       {/* X-axis uses 'date' */}
              <YAxis />                      {/* Y-axis uses 'amount' automatically */}
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"              // Line uses 'amount'
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className='w-[600px]'>
          <Bar data={{
            labels: bookData.map((data) => { return data.name }),
            datasets: [
              {
                label: "total price",

                data: bookData.map((data) => { return data.price }),
                backgroundColor: [
                  "rgba(106, 255, 213, 0.93)",


                ],
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                borderRadius: 10,
                hoverBackgroundColor: "rgba(71, 255, 181, 0.7)",

              },
            ]
          }} options={options} />
        </div>
      </div>

    </div>

  );
}
