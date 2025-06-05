import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import validator from "validator";

export default function Userlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validEmail, setValidEmail] = useState("");

  const navigate = useNavigate();

  function validateEmail(e) {
    setEmail(e.target.value);
    if (validator.isEmail(e.target.value)) {
      setValidEmail("Email is valid");
    } else {
      setValidEmail("Email is not valid");
    }
  }

  async function handleLogin(e) {
    e.preventDefault();

    if (email === "") {
      alert("Provide valid email");
    } else if (password === "") {
      alert("Provide valid password");
    } else {
      const URL = "http://localhost:8080/login";
      try {
        setLoading(true);
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        console.log(result);
        if (response.ok) {
          localStorage.setItem("token", result.tocken);
          navigate("/home");
        } else {
          alert(result.message || "Login failed");
        }
      } catch (err) {
        alert("Run time error");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  }

  
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex justify-center items-center">
          <div className='p-[30px] h-[auto]  w-[450px] rounded-[6px] bg-skyblue-200 text-center shadow-lg'>
            <h1 className='font-bold text-[20px]'>Login</h1>
            <form onSubmit={handleLogin}>
              <table className='w-full p-[10px]'>
                <tbody>
                  <tr className='p-[10px]'>
                    <td className='p-[10px]'>
                      <input
                        onChange={validateEmail}
                        className='w-[300px] transition focus:scale-110  p-[10px] border-b-[2px] focus:outline-none focus:border-rose-400 transition duration-300 ease-in-out'
                        type='email'
                        placeholder='Enter your email'
                      />
                      <p>{validEmail}</p>
                    </td>
                  </tr>
                  <tr className='p-[10px]'>
                    <td className='p-[10px]'>
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-[300px] transition focus:scale-110  p-[10px] border-b-[2px] focus:outline-none focus:border-rose-400 transition duration-300 ease-in-out'
                        type='password'
                        placeholder='Enter your password'
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                type="submit"
                className='bg-black text-white hover:bg-rose-400 w-[200px] p-[5px] rounded-[4px] shadow-xl mt-4'
              >
                Login
              </button>
            </form>

          

            <div className='mt-4'>
              <span className='font-bold'>Not a member? </span>
              <Link className='font-bold border-b-[2px]' to="/users/signup">Sign Up</Link>
            
            </div>
         
          </div>
        </div>
      )}
    </>
  );
}
