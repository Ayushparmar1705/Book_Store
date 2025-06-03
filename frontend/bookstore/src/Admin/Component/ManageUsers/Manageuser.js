import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Manageuser() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function ShowUsers() {
            const URL = "http://localhost:8080/getusers";
            const data = await fetch(URL);
            const result = await data.json();
            setUsers(result);
        }
        ShowUsers();
    }, [])
    return (
        <div className='w-[100%]'>
            <div className='w-[100%] text-center p-[20px]'>
                <p className='border-b-[2px] '>ALL USERS</p>
                <table className='text-center m-[auto] mt-[10px]'>
                    <tr className='p-[20px] bg-gray-50 border-b-[2px] border-gray-50 border-t-[2px] '>
                        <td className='p-[20px]'>First Name</td>
                        <td className='p-[20px]'>Last Name</td>
                        <td className='p-[20px]'>Email</td>
                        <td className='p-[20px]' colSpan={2}>Action</td>

                    </tr>
                    {users.map((data) => (
                        <tr className='p-[20px]'>
                            <td className='p-[20px]'>{data.firstname}</td>
                            <td className='p-[20px]'>{data.lastname}</td>
                            <td className='p-[20px]'>{data.email}</td>
                            <td className='p-[20px]'><Link to={`/admin/deleteuser/${data.id}`}>Delete</Link></td>
                            <td className='p-[20px]'><Link  to={`/admin/edituser/${data.id}`}>Update</Link></td>

                        </tr>
                    ))}
                </table>
                
            </div>
        </div>
    )
}
