import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminHeader() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdown, setDropdown] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('auth');
        navigate('/');
    };

    const toggleDropdown = (menu) => {
        setDropdown(dropdown === menu ? null : menu);
    };

    return (
        <header className="bg-white shadow-md px-6 py-4 flex max-[900px]:flex max-[900px]:flex-col">
            <div className="flex justify-between items-center">
                <div className="text-xl font-bold text-blue-700"><Link to="/Dashboard"><img src='/images/download.png' alt='No found' className='h-20 w-20 w-auto'></img></Link></div>
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>
            </div>

            <nav className={`mt-4 md:mt-0 md:flex md:items-center ${menuOpen ? '' : 'hidden'}`}>
                <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                >
                    Dashboard
                </Link>

                {/* Dropdowns */}
                {[
                    {
                        label: 'Books', menu: 'books', items: [
                            { to: '/dashboard/addbooks', text: 'Add Books' },
                            { to: '/dashboard/bookslist', text: 'Manage Books' },
                        ]
                    },
                    {
                        label: 'Category', menu: 'category', items: [
                            { to: '/dashboard/addcategory', text: 'Add Category' },
                            { to: '/dashboard/listcategory', text: 'Manage Category' },
                        ]
                    },
                    {
                        label: 'Users', menu: 'users', items: [
                            { to: '/admin/all-users', text: 'Users' },
                            { to: '/dashboard/userorders', text: 'Orders' },
                        ]
                    },
                ].map(({ label, menu, items }) => (
                    <div key={menu} className="relative group">
                        <button
                            onClick={() => toggleDropdown(menu)}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600"
                        >
                            {label} ▾
                        </button>
                        {(dropdown === menu || menuOpen) && (
                            <div className="md:absolute left-0 mt-1 bg-white border shadow rounded z-10 w-40">
                                {items.map(({ to, text }) => (
                                    <Link
                                        key={to}
                                        to={to}
                                        className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                                        onClick={() => {
                                            setMenuOpen(false);
                                            setDropdown(null);
                                        }}
                                    >
                                        {text}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="block mt-2 md:mt-0 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition duration-200 md:ml-4"
                >
                    Logout
                </button>
            </nav>
        </header>
    );
}
