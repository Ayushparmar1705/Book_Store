import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Edituser() {
    const { id } = useParams();

    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    function getValue(e) {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    }

    useEffect(() => {
        async function fetchUser() {
            const URL = `http://localhost:8080/admin/edituser/${id}`;
            const res = await fetch(URL);
            const result = await res.json();
            const userInfo = result[0];
            setUserData({
                id : id,
                firstname: userInfo.firstname,
                lastname: userInfo.lastname,
                email: userInfo.email,

            });
        }
        fetchUser();
    }, [id]);

    async function Edituser() {
        const URL = `http://localhost:8080/admin-edituser/${id}`;
        const data = await fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });
        const result = await data.json();
        if(data.ok)
        {
            alert(result.message);
        }
        else
        {
            alert(result.message);
        }
    }

    return (
        <div className='p-[10px]'>
            <p className='text-center text-[20px]'>Update User</p>
            <div className='bg-grawhite shadow-xl w-[500px] p-[20px] m-[auto]'>
                <form onSubmit={(e) => e.preventDefault()}>
                    <table className='m-[auto] p-[20px]'>
                        <tbody>
                            <tr>
                                <td className='p-[10px]'><label>First Name</label></td>
                                <td className='p-[10px]'>
                                    <input
                                  
                                        name="firstname"
                                        value={userData.firstname}
                                        onChange={getValue}
                                        type='text'
                                        placeholder='Enter first name'
                                        className='border-[2px] border-black p-[10px] outline-none border-gray-100 hover:outline-none'
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className='p-[10px]'><label>Last Name</label></td>
                                <td className='p-[10px]'>
                                    <input
                                        name="lastname"
                                        value={userData.lastname}
                                        onChange={getValue}
                                        type='text'
                                        placeholder='Enter last name'
                                          className='border-[2px] border-black p-[10px] outline-none border-gray-100 hover:outline-none'
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className='p-[10px]'><label>Email</label></td>
                                <td className='p-[10px]'>
                                    <input
                                        name="email"
                                        value={userData.email}
                                        onChange={getValue}
                                        type='email'
                                        placeholder='Enter email'
                                          className='border-[2px] border-black outline-none p-[10px] border-gray-100 hover:outline-none ' 
                                    />
                                </td>
                            </tr>
                           
                        </tbody>
                    </table>
                </form>
                <button
                    className='w-[300px] block m-[auto] bg-slate-300 text-black hover:bg-black hover:text-white rounded-[10px] p-[10px]'
                    onClick={Edituser}
                >
                    Update User
                </button>
            </div>
        </div>
    );
}
