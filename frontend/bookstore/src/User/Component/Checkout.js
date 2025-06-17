import { loadStripe } from '@stripe/stripe-js';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import {useLocation } from 'react-router-dom';

export default function Checkout() {
    const [result, setResult] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneno, setPhono] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [address, setAddress] = useState("");
    const [block, setBlock] = useState("");

    const stripePromise = loadStripe('pk_test_51RLM7sELedKMrQykEwa8tL7CMg0Ggl1EDL23gjszm8F6TZQ4hnzJd9bj4LJAl1OjRzzgpS5rof89XS9izOYuu8l5006DPMCwam');

    const location = useLocation();

    useEffect(() => {
        function getCart() {
            const data = location.state;
            setResult(data["cartdata"]);
            
        }
        getCart();
    }, [location.state]);

    // Calculate total amount dynamically based on the cart data
    const totalAmount = result.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const token = localStorage.getItem("token");
    const decoded_token = jwtDecode(token).id;
    const Allcustomerdata = {
        "id": decoded_token,
        "firstname": firstName,
        "lastname": lastName,
        "email": email,
        "phono": phoneno,
        "country": country,
        "state": state,
        "address": address,
        "blockno": block,
        "products": result,

    }

    async function getCheckout() {
     
        setTimeout(async () => {
            const URL = `http://localhost:8080/removecart/${decoded_token}`;
            const data = await fetch(URL, {
                method: "DELETE",
            });
            const finalresult = await data.json();
        
            console.log("delete cart = ",finalresult);
        }, 1000)
        try {
            const response = await fetch('http://localhost:8080/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: totalAmount,
                    currency: "INR",
                    data: Allcustomerdata,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const { id } = await response.json(); // Get the session ID
            console.log(id);
           
            // Use Stripe's redirectToCheckout method
            const stripe = await stripePromise;
            sessionStorage.setItem("session_id", id);
            const { error } = await stripe.redirectToCheckout({ sessionId: id });

            if (error) {
                console.error('Error redirecting to checkout:', error);
            }





        } catch (error) {
            console.error('Error during fetch:', error);
        }
    

    }

    return (
        <div className="w-[900px] shadow-xl mt-[10px] m-auto p-[20px]">
            <p className='text-center'>CHECKOUT</p>
            <div className='flex'>
                <div className=''>
                    <form>
                        <div className='p-[10px]'>
                            <input required onChange={(e) => { setFirstName(e.target.value) }} className='p-[10px] border-[2px]  border-gray-100  w-[400px] focus:outline-none rounded-[10px] focus:border-[2px] focus:border-red-100' type='text' placeholder='Enter First name' />
                        </div>
                        <div className='p-[10px]'>
                            <input required onChange={(e) => { setLastName(e.target.value) }} className='p-[10px] border-[2px] w-[400px] rounded-[10px] border-gray-100 border-gray-100  w-[400px] focus:outline-none rounded-[10px] focus:border-[2px] focus:border-red-100' type='text' placeholder='Enter Last name' />
                        </div>
                        <div className='p-[10px]'>
                            <input required onChange={(e) => { setEmail(e.target.value) }} className='p-[10px] border-[2px] w-[400px] rounded-[10px] border-gray-100 border-gray-100  w-[400px] focus:outline-none rounded-[10px] focus:border-[2px] focus:border-red-100' type='text' placeholder='Enter Email name' />
                        </div>
                        <div className='p-[10px]'>
                            <input required onChange={(e) => { setPhono(e.target.value) }} className='p-[10px] border-[2px] w-[400px] rounded-[10px] border-gray-100 border-gray-100  w-[400px] focus:outline-none rounded-[10px] focus:border-[2px] focus:border-red-100' type='text' placeholder='Enter Phone number' />
                        </div>
                        <div className='flex items-center'>
                            <div className='p-[10px]'>
                                <select required name='country' onChange={(e) => { setCountry(e.target.value) }} className='w-[100px] border-[2px] border-gray-100 p-[10px] rounded-[10px]'>
                                    <option selected disabled>Select Country</option>
                                    <option value="IND">India</option>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="GB">United Kingdom</option>
                                    <option value="AU">Australia</option>
                                    <option value="DE">Germany</option>
                                    <option value="FR">France</option>
                                    <option value="JP">Japan</option>
                                    <option value="CN">China</option>
                                    <option value="BR">Brazil</option>
                                </select>
                            </div>
                            <div className=''>
                                <input required onChange={(e) => { setState(e.target.value) }} className='p-[10px] border-[2px] w-[200px] rounded-[10px] border-gray-100 border-gray-100 focus:outline-none rounded-[10px] focus:border-[2px] focus:border-red-100' type='text' placeholder='Enter your state' />
                            </div>
                        </div>
                        <div className='p-[10px]'>
                            <input required onChange={(e) => { setAddress(e.target.value) }} className='p-[10px] border-[2px] w-[400px] rounded-[10px] border-gray-100 border-gray-100  w-[400px] focus:outline-none rounded-[10px] focus:border-[2px] focus:border-red-100' type='text' placeholder='Enter Home Address' />
                        </div>
                        <div className='p-[10px]'>
                            <input required onChange={(e) => { setBlock(e.target.value) }} className='p-[10px] border-[2px] w-[400px] rounded-[10px] border-gray-100 border-gray-100  w-[400px] focus:outline-none rounded-[10px] focus:border-[2px] focus:border-red-100' type='text' placeholder='Enter block number' />
                        </div>
                    </form>
                    <div className='p-[10px]'>
                        <button onClick={getCheckout} className='bg-blue-500 p-[10px] w-[200px] rounded-[10px]'>Pay </button>
                    </div>
                </div>
                <div className='shadow-xl w-[100%] p-[10px] text-center rounded-[10px]'>
                    <p className='font-bold text-[20px]'>Your Orders</p>
                    {result.map((data) => (
                        <div key={data.id} className='text-center'>
                            <p>{data.name}</p>
                            <p>{data.price}</p>
                            <img className='m-auto block w-[100px] h-[150px]' src={data.image} alt='no' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
