import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
export default function Usersignup() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        gsap.to(".box", {
            x: -50,
            duration: 2,

        })
        gsap.to(".form", {
            y: 10,
            duration: 1,
        }
        )
    })
    async function handlesignup(e) {
        e.preventDefault();
        const fnrexgex = /^[A-Za-z]+$/;
        const lnregex = /^[A-Za-z]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (firstname === "" || !fnrexgex.test(firstname)) {
            alert('Enter the Valid First Name');
        }
        else if (lastname === "" || !lnregex.test(lastname)) {
            alert("Enter the Valid Last Name");
        }
        else if (email === "") {
            alert("Enter Valid Email")
        }
        else if (password === "" || !passwordRegex.test(password)) {
            alert("Password must be contains 8 digit long , including letters , a number , and a speical character");
        }
        else {
            console.log(firstname, lastname, email, password)
            const URL = "http://localhost:8080/usersignup";
            const data = await fetch(URL, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({ firstname, lastname, email, password })
            });
            const result = await data.json();
            console.log(result);
            if (data.ok) {
                alert(result.message);
                
            }
            else {
                alert(result.message);
            }

        }
    }
    return (
        <div className="w-full h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex  items-center max-[900px]:w-[100%] max-[900px]:flex-col max-[900px]:flex max-[900px]:justify-right ">

            <div className=' form p-[30px] h-[400px] w-[450px]  rounded-[6px] bg-skyblue-200  n text-center shadow-lg ml-[100px] max-[900px]:justify-right'>
                <h1 className='font-bold text-[20px]'>Sign Up</h1>
                <form onSubmit={handlesignup}>
                    <table className='p-[10px]  w-full'>
                        <tr className='p-[10px]'>
                            <td className='p-[10px]'><input onChange={(e) => { setFirstName(e.target.value) }} className='w-[300px]  p-[10px] border-b-[2px]  focus:outline-none focus:bor der-purple-900 focus:transition  duration-300 ease-in-out transition focus:scale-110' type='text' placeholder='Enter your firstname'></input></td>
                        </tr>
                        <tr className='p-[10px]'>
                            <td className='p-[10px]'><input onChange={(e) => { setLastname(e.target.value) }} className='w-[300px]  p-[10px] border-b-[2px] focus:outline-none focus:border-purple-900 focus:transition  duration-300 ease-in-out transition focus:scale-110' type='text' placeholder='Enter your lastname'></input></td>
                        </tr>
                        <tr className='p-[10px]'>
                            <td className='p-[10px]'><input onChange={(e) => { setEmail(e.target.value) }} className='w-[300px]  p-[10px] border-b-[2px] focus:outline-none focus:border-purple-900 focus:transition  duration-300 ease-in-out transition focus:scale-110' type='email' placeholder='Enter your email'></input></td>
                        </tr>
                        <tr className='p-[10px]'>
                            <td className='p-[10px]'><input onChange={(e) => { setPassword(e.target.value) }} className='w-[300px]  p-[10px] border-b-[2px] focus:outline-none focus:border-purple-900 focus:transition  duration-300 ease-in-out transition focus:scale-110' type='password' placeholder='Enter your password'></input></td>
                        </tr>
                    </table>
                    <button className='bg-black text-white hover:bg-rose-400 w-[200px] p-[5px] rounded-[4px] shadow-xl'>Sign Up</button>
                </form>
                <span className='font-bold'>Already have an account ? </span>
                <Link className='font-bold border-b-[2px]' to="/users/login">Login</Link>
            </div>
            <div className='box w-[500px] h-[400px] ml-[200px]    p-[10px] rounded-[6px] flex flex-col justify-center align-center text-center'>
                <h1 className='text-purple-700 font-bold text-[20px]'>Every New Friends is a new advanture</h1>
                <p className='text-[20px]'>Let's get connected</p>


            </div>
        </div>
    )
}
