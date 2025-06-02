import React, { useState } from 'react'

export default function Addcategory() {
   
    const [category , setCategory] = useState("");
    const handleAddcategory = async (e)=>{
        e.preventDefault();
        const URL = "http://localhost:8080/admin/addcategory";
        const data = await fetch(URL,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({"name":category}),
            
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
        <div>
            <div className='w-[500px] p-[20px]  bg-gray-50 shadow text-center m-auto mt-[100px] md:max-lg:bg-black'>
            <p>Add Category</p>
                <form onSubmit={handleAddcategory}>
                    <table>
                        <tr>
                            <td className='p-[20px]'><label>Enter category</label></td>
                            <td className='p-[20px]'><input className='rounded-[10px] p-[10px] border-[2px] border-gray-100 focus:outline-none focus:border-gray-200 focus:transition  duration-300 ease-in-out' type='text' placeholder='Enter book category' onChange={(e)=>{setCategory(e.target.value)}}></input></td>
                        </tr>
                    </table>
                    <button className='w-[300px] bg-slate-300 text-black hover:bg-black hover:text-white rounded-[10px] p-[10px]' type='submit'>Add Category</button>
                </form>
            </div>
        </div>
    )
}
