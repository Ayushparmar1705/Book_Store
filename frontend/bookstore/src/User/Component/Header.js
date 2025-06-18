import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const location = useLocation();


  const storedToken = localStorage.getItem("token");
  useEffect(() => {
    async function getUserName() {
      if (!storedToken) {
        return;
      }


      try {
        const URL = "http://localhost:8080/users/profile";
        const data = await fetch(URL, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        if (data.ok) {
          const response = await data.json();
          setUsername(response.firstname);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getUserName();
  }, [storedToken]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleUserDropdown = () => setUserDropdown(!userDropdown);

  const navLinks = (
    <>
      <Link
        to="/home"
        className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === "/home" ? "text-blue-500" : "text-gray-700"
          } hover:text-blue-600`}
        onClick={() => setMenuOpen(false)}
      >
        Home
      </Link>
      <Link
        to="/shop"
        className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === "/shop" ? "text-blue-500" : "text-gray-700"
          } hover:text-blue-600`}
        onClick={() => setMenuOpen(false)}
      >
        Shop
      </Link>
      <Link
        to="/contact"
        className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === "/contact" ? "text-blue-500" : "text-gray-700"
          } hover:text-blue-600`}
        onClick={() => setMenuOpen(false)}
      >
        Contact
      </Link>
      <Link
        to="/about"
        className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === "/about" ? "text-blue-500" : "text-gray-700"
          } hover:text-blue-600`}
        onClick={() => setMenuOpen(false)}
      >
        About
      </Link>
    </>
  );

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/home">
              <img
                src="/images/download.png"
                alt="Logo"
                className="h-[60px] w-[100px]"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          {storedToken ? (
            <nav className="hidden md:flex space-x-6 items-center">
              {navLinks}

              {/* User dropdown */}
              <div className="relative">
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="User menu"
                  aria-expanded={userDropdown}
                >
                  {username ? username[0].toUpperCase() : "U"}
                </button>
                {userDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-20">
                    <p className="text-gray-700 text-center">Welcome {username}</p>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                      onClick={() => setUserDropdown(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/user-cart"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                      onClick={() => setUserDropdown(false)}
                    >
                      Cart
                    </Link>
                    <Link
                      to="/success"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                      onClick={() => setUserDropdown(false)}
                    >
                      Orders
                    </Link>
                    <hr className="border-gray-200" />
                    <Link
                      to="/user-logout"
                      className="block px-4 py-2 text-red-600 hover:bg-red-100"
                      onClick={() => setUserDropdown(false)}
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          ) : (
            // Desktop for non-auth users
            <nav className="hidden md:flex space-x-6 items-center">
              <Link
                to="/users/login"
                className={`text-base font-medium ${location.pathname === "/users/login"
                  ? "text-blue-500"
                  : "text-gray-700"
                  } hover:text-blue-600`}
              >
                Login
              </Link>
              <Link
                to="/users/signup"
                className={`text-base font-medium ${location.pathname === "/users/signup"
                  ? "text-blue-500"
                  : "text-gray-700"
                  } hover:text-blue-600`}
              >
                Sign Up
              </Link>
              <Link
                to="/home"
                className={`text-base font-medium ${location.pathname === "/home"
                  ? "text-blue-500"
                  : "text-gray-700"
                  } hover:text-blue-600`}
              >
                Home
              </Link>
            </nav>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-label="Main menu"
              aria-expanded={menuOpen}
            >
              {/* Hamburger icon */}
              <svg
                className={`${menuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${menuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks}
            {storedToken ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/user-cart"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Cart
                </Link>
                <Link
                  to="/success"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Orders
                </Link>
                <hr className="border-gray-200 my-1" />
                <Link
                  to="/user-logout"
                  className="block px-3 py-2 rounded-md text-red-600 hover:bg-red-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/users/login"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/users/signup"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
