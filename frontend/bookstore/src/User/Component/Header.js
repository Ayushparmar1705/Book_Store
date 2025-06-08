import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
export default function Header() {

  const [username, setUsername] = useState("");
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const [token, setToken] = useState("");
  useEffect(() => {
    async function getUserName() {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        return;
      }
      else {
        setToken(storedToken);
      }
      try {
        const URL = "http://localhost:8080/users/profile";
        const data = await fetch(URL, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });
        if (data.ok) {
          const response = await data.json();
          setUsername(response.firstname)
        }

      }
      catch (e) {
        console.log(e);
      }
    }
    getUserName();
  }, [])



  const dropdown = () => {
    setToggle(!toggle);
  }
  console.log("token = ", token);
  return (
    <div className='flex items-center w-full'>
      <div>
        <Link to="/home"><img src='/images/download.png' alt='No found' className='h-[150px] w-[150px]'></img></Link>
      </div>
      {token ? (
        <div className='flex ml-[100px] w-full justify-end'>
          <Link to="/home" className={`${location.pathname === '/home' ? "text-blue-500" : "text-black"} p-[10px]`}>Home</Link>
          <Link to="/shop" className={`${location.pathname === '/shop' ? "text-blue-500" : "text-black"} p-[10px]`}>Shop</Link>
          <Link to="/contact" className={`${location.pathname === '/contact' ? "text-blue-500" : "text-black"} p-[10px]`}>Contact</Link>
          <Link to="/about" className={`${location.pathname === '/about' ? "text-blue-500" : "text-black"} p-[10px]`}>About</Link>
          <div className='relative'>
            <div onClick={dropdown} className='cursor-pointer height-[100px]  flex justify-center items-center rounded-[100%]  bg-blue-500 w-[50px] h-[50px]'>
              <p>{username[0]}</p>

            </div>
            {toggle && (
              <div className='absolute right-[10px] w-[150px] shadow rounded-[10px] flex flex-col p-[10px]'>
                <div className='p-[10px]'><i className='fas fa-user'> </i> <Link to="/profile" className='p-[10px]'>Profile</Link></div>
                <div className='p-[10px]'><i className='fas fa-shopping-cart'> </i> <Link to="/user-cart" className='p-[10px]'>Cart</Link></div>
                <div className='p-[10px]'><i className='fas fa-box'> </i> <Link to="/success" className='p-[10px]'>Orders</Link></div><hr></hr>
                <div className='p-[10px]'><i className='fas fa-sign-out-alt'> </i> <Link to="/user-logout" className='p-[10px]'>Logout</Link></div>
              </div>
            )}
          </div>

        </div>
      ) : (
        <div className='flex'>
          <Link to="/users/login" className={`${location.pathname === "/users/login" ? "text-blue-500" : "text-black"} p-[10px]`}>Login</Link>
          <Link to="/users/signup" className={`${location.pathname === "/users/signup" ? "text-blue-500" : "text-black"} p-[10px]`}>Sign Up</Link>
          <Link to="/home" className={`${location.pathname === '/home' ? "text-blue-500" : "text-black"} p-[10px]`}>Home</Link>

        </div>
      )}
    </div>
  )
}
