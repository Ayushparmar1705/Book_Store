import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export default function Listbooks() {
  const [bookData, setBookData] = useState([]);
  const [bookname, setBookName] = useState("");
  const [reset, setReset] = useState(false);
  const [search, setSearch] = useState(true);
  const [newdata , setNewData] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  async function Allbooks() {
    const URL = "http://localhost:8080/admin/bookslist/undefined";
    const data = await fetch(URL);
    const result = await data.json();
    setBookData(result);
    setBookName("");
    setReset(false);
    setSearch(true);
    setNewData(result);
  }

  useEffect(() => {
    Allbooks();
  }, []);

  async function SearchBookByName() {
    console.log(bookname);
    if(bookname === "")
    {
      setBookData(newdata)
    }
    else
    {
      const URL = `http://localhost:8080/search/${bookname}`;
    const data = await fetch(URL);
    setReset(true);
    setSearch(false);
    const result = await data.json();
    setBookData(result);
    setCurrentPage(1); // Reset to page 1 on search
    }
  }

  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstItems = indexOfLastItems - itemsPerPage;
  const currentItems = bookData.slice(indexOfFirstItems , indexOfLastItems);
  const totalPages = Math.ceil(bookData.length / itemsPerPage)
  return (
    <div className='bg-white text-center'>
      <h1 className='border-b-[2px]'>ALL BOOKS</h1><br />
      <div>
        <input
          value={bookname}
          onChange={(e) => setBookName(e.target.value)}
          type='search'
          className='border-[2px] outline-none border-gray-100 rounded-[10px] hover:outline-none w-[300px] p-[10px]'
          placeholder='Search book by name'
          onKeyDown={(e)=>{
            if(e.key === "Enter")
            {
              SearchBookByName();
            }
          }}
        />
   
      </div>
          
      <div className='text-center overflow-x-scroll max-[900px]:overflow-x-scroll max-[900px]:w-[100%]'>
        <table className='m-auto mt-[10px]'>
          <thead>
            <tr className='bg-gray-50 p-[20px] border-t-[2px] border-gray-100 border-b-[2px]'>
              <th className='p-[10px] text-center'>Isbn-10</th>
              <th className='p-[10px] text-center'>Isbn-13</th>
              <th className='p-[10px] text-center'>Name</th>
              <th className='p-[10px] text-center'>Category</th>
            
              <th className='p-[10px] text-center'>Price</th>
              <th className='p-[10px] text-center'>In Stock</th>
              <th className='p-[10px] text-center'>Pages</th>
              <th className='p-[10px] text-center'>Author</th>
              <th className='p-[10px] text-center'>Publisher</th>
        
    
              <th className='p-[10px] text-center'>Cover</th>
              <th colSpan={2} className='p-[10px] text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((data, idx) => (
              <tr key={idx} className='hover:bg-gray-50'>
                <td className='p-[20px] text-center'>{data.isbn10}</td>
                <td className='p-[20px] text-center'>{data.isbn13}</td>
                <td className='p-[20px] text-center'>{data.name}</td>
                <td className='p-[20px] text-center'><p className='bg-sky-100 w-[150px] rounded-[500px]'>{data.category}</p></td>
             
                <td className='p-[20px] text-center'>{data.price}</td>
                <td className='p-[20px] text-center '><p className='bg-green-200 rounded-[500px] w-[50px]'>{data.quantity}</p></td>
                <td className='p-[20px] text-center'>{data.pages}</td>
                <td className='p-[20px] text-center'>{data.author}</td>
                <td className='p-[20px] text-center'>{data.publisher}</td>
 

                <td><img className='h-[100px] w-[100px]' src={data.image} alt='NoImage' /></td>
                <td className='p-[20px] text-center'><Link to={`/dashboard/deletebook/${data.id}`}><i class='fas fa-trash-alt'></i></Link></td>
                <td className='p-[20px] text-center'><Link to={`/dashboard/onebook/${data.id}`}><i class="fa fa-edit" ></i></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
  );
}
