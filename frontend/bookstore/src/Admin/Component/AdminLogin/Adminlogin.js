import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Adminlogin() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    function handleAdminLogin(e)
    {
        e.preventDefault();
        if(email === "admin@gmail.com")
        {
            if(password === "admin")
            {
                localStorage.setItem("username","admin");
                navigate("./Dashboard")
            }
            else
            {
                alert("Invalid password");
            }
        }
        else
        {
            alert("Invalid email");
        }
    }

    return (

        <div className='w-full h-screen bg-[url(https://images.unsplash.com/photo-1519389950473-47ba0277781c)] bg-cover bg-center flex items-center justify-center align-center'>
        

            <div className='text-center h-[300px]   w-[500px] bg-white bg-opacity-60 p-[30px] shadow-md shadow-cyan-100 rounded-[10px] '>
            <h1 className='font-bold-[10px]'>Login</h1>
                <form >
                    <table className='m-auto  w-[100%] text-center'>
                        <tr>
                            <td><input className='border-gray-500 p-2 border-2 w-[300px] focus:outline-none focus:border-sky-500 ' type='text' placeholder='Admin Email' onChange={(e)=>{setEmail(e.target.value)}}></input></td>

                        </tr>
                        <tr>
                            <td><input type='password' className='border-gray-500 p-2 w-[300px]  border-2 focus:outline-none focus:border-sky-500 mt-10' placeholder='Admin Password' onChange={(e)=>{setPassword(e.target.value)}}></input></td>
                        </tr>
                    </table>
                    <button onClick={handleAdminLogin} className='w-[140px] bg-indigo-400 block m-auto mt-[20px] h-[40px] rounded-[10px] hover:bg-indigo-500'>Login</button>
                </form>
            </div>
        </div>
    )
}
