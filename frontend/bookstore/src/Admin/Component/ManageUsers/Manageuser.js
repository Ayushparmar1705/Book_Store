import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Manageuser() {
    const [users, setUsers] = useState([]);
    const usersPerPage = 5;

    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;

    useEffect(() => {
        async function ShowUsers() {
            const URL = "http://localhost:8080/getusers";
            const data = await fetch(URL);
            const result = await data.json();
            setUsers(result);
        }
        ShowUsers();
    }, [])
    const totalPages = Math.ceil(users.length / usersPerPage);
    let currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    return (
        <div className='w-[100%] max-[900px]:w-[100%]'>
            <div className='w-[100%] text-center p-[20px] max-[900px]:w-[100%] max-[900px]:m-[0px]  max-[900px]:overflow-scroll'>
                <p className='border-b-[2px] '>ALL USERS</p>
                <table className='text-center m-[auto] mt-[10px] w-[100%] max-[900px]:w-[100%]  max-[900px]:m-[0px]'>
                    <tr className='bg-gray-50 border-t-[2px] border-b-[2px] border-gray-100 px-6 py-8 max-[900px]:w-[100%] max-[900px]:p-[0px] max-[900px]:m-[0px]'>

                        <td className='p-[20px] '>First Name</td>
                        <td className='p-[20px] '>Last Name</td>
                        <td className='p-[20px] '>Email</td>
                        <td className='p-[20px] ' colSpan={2}>Action</td>

                    </tr>
                    {currentUsers.map((data, idx) => (
                        <tr key={idx} className='hover:bg-gray-50 p-[20px] border-b-[2px] border-gray-50 max-[900px]:w-[100%] max-[900px]:m-[0px]'>

                            <td className='p-[20px]'><p>{data.firstname}</p></td>
                            <td className='p-[20px]'><p>{data.lastname}</p></td>
                            <td className='p-[20px]'><p>{data.email}</p></td>
                            <td className='p-[20px]'><Link to={`/admin/deleteuser/${data.id}`}><i class='fas fa-trash-alt'></i></Link></td>
                            <td className='p-[20px]'><Link to={`/admin/edituser/${data.id}`}><i class="fa fa-edit" ></i></Link></td>

                        </tr>
                    ))}
                </table>
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
