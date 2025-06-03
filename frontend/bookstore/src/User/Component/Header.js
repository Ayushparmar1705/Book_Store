import React, { useEffect, useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUserName] = useState("");
  const [token, setToken] = useState(null);

  function Logoutfunc() {
    window.location.href = "/user-logout";
  }

  useEffect(() => {
    async function getUserName() {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setToken("");
        return;
      }

      setToken(storedToken);

      try {
        const URL = "http://localhost:8080/users/profile";
        const data = await fetch(URL, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (data.ok) {
          const response = await data.json();
          setUserName(response.firstname);
        }
      } catch (err) {
        console.error("Error fetching user profile", err);
      }
    }

    getUserName();
  }, [navigate]);

  return (
    <header className="border-b-2 border-gray-100 px-4 sm:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
       <img src='/images/download.png' alt='No found' className='h-20 w-20 w-auto'></img>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        <Link to="/home" className="hover:border-b-2 border-black">Home</Link>
        <Link to="/shop" className="hover:border-b-2 border-black">Shop</Link>
        <Link to="/contact" className="hover:border-b-2 border-black">Contact</Link>
        <Link to="/about" className="hover:border-b-2 border-black">About</Link>
      </nav>

      {/* Profile / Auth */}
      
      {username.length>0 ? (  <div
        className="rounded-full bg-gradient-to-br from-sky-200 via-blue-400 to-indigo-900 w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <p className="text-white font-medium transition-2">{username[0]?.toUpperCase()}</p></div>):(
           <div className='p-[10px] m-[0px] flex'>
             <Link to="/users/login" className="block p-[10px] hover:bg-gray-100  rounded">Login</Link>
                <Link to="/users/signup" className="bg-blue-100 p-[10px] block hover:bg-gray-100  rounded ml-[10px]">Signup</Link>
           </div>
      )}

        {open && (
          <div className="absolute right-0 top-20 w-[200px] bg-white p-4 rounded-md shadow-lg z-20 text-center rounded-[5px]">
            {token && (
              <>
                <p className="text-sm">Signin as a <span className='text-blue-900'>{username}</span></p>

                <div className='flex items-center p-[5px]'>
                  <i className='fas fa-user w-[50px]'></i>
                  <Link to="/profile" className="block w-[full]">Profile</Link>
                </div>
                <div className='flex items-center  p-[5px]'>
                  <i className='fas fa-shopping-cart w-[50px]'></i>
                  <Link to="/user-cart" className="block w-[full]">Cart</Link>
                </div>
                <div className='flex items-center  p-[5px]'>
                  <i className='fas fa-clipboard-list  w-[50px]'></i>
                  <Link to="/success" className="block w-[full]">Your Orders</Link>
                </div><hr></hr>
                <div className='flex items-center  p-[5px]'>
                  <i className='fas fa-sign-out w-[50px]'></i>
                  <button onClick={Logoutfunc} className="block w-[full]">Logout</button>
                </div>

              </>
            )}
          </div>
        )}

        {/* Hamburger Icon */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
   

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[90px] left-0 w-full bg-white flex flex-col items-center gap-4 py-4 z-10 shadow-md md:hidden">
          <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        </div>
      )}
    </header>
  );
}
