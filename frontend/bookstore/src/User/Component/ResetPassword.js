import React, { useState } from 'react'
import { data, useParams } from 'react-router-dom';

export default function ResetPassword() {
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const getdata = {
    email,
    password,
  }
  async function resetpassword() {
    const URL = "http://localhost:8080/reset-password";
    const data = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getdata),
    })
    const result = await data.json();
    if (data.ok) {
      alert(result.message);
    }
    else {
      alert(result.message);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Your Password</h2>

        <form onSubmit={resetpassword}>
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full p-2 mb-4 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full p-2 mb-4 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}
