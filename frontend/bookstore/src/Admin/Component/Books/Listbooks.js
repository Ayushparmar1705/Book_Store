import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export default function Listbooks() {
  const [bookData, setBookData] = useState([]);
  const [bookname, setBookName] = useState("");
  const [reset, setReset] = useState(false);
  const [search, setSearch] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  async function Allbooks() {
    const URL = "http://localhost:8080/admin/bookslist";
    const data = await fetch(URL);
    const result = await data.json();
    setBookData(result);
    setBookName("");
    setReset(false);
    setSearch(true);
  }

  useEffect(() => {
    Allbooks();
  }, []);

  async function SearchBookByName() {
    const URL = `http://localhost:8080/search/${bookname}`;
    const data = await fetch(URL);
    setReset(true);
    setSearch(false);
    const result = await data.json();
    setBookData(result);
    setCurrentPage(1); // Reset to page 1 on search
  }

  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstItems = indexOfLastItems - itemsPerPage;
  const currentItems = bookData.slice(indexOfFirstItems , indexOfLastItems);
  const totalPages = Math.ceil(bookData.length / itemsPerPage)
  return (
    <div className='bg-white text-center'>
      <h1 className='border-b-[2px]'>ALL BOOKS</h1><br />
      <div className='flex justify-center items-center'>
        <input
          value={bookname}
          onChange={(e) => setBookName(e.target.value)}
          type='search'
          className='border-[2px] w-[300px] p-[10px]'
          placeholder='Search book by name'
        />
        {reset && <input onClick={Allbooks} type='reset' value="Reset" />}
        {search && <img onClick={SearchBookByName} src='/images/search.png' className='h-[50px] w-[50px]' alt='no' />}
      </div>

      <div className='text-center overflow-x-scroll max-[900px]:overflow-x-scroll max-[900px]:w-[100%]'>
        <table className='m-auto'>
          <thead>
            <tr>
              <th className='p-[10px] text-center'>Isbn-10</th>
              <th className='p-[10px] text-center'>Isbn-13</th>
              <th className='p-[10px] text-center'>Name</th>
              <th className='p-[10px] text-center'>Category</th>
              <th className='p-[10px] text-center'>Description</th>
              <th className='p-[10px] text-center'>Price</th>
              <th className='p-[10px] text-center'>Quantity</th>
              <th className='p-[10px] text-center'>Pages</th>
              <th className='p-[10px] text-center'>Author</th>
              <th className='p-[10px] text-center'>Publisher</th>
              <th className='p-[10px] text-center'>Publish date</th>
              <th className='p-[10px] text-center'>Language</th>
              <th className='p-[10px] text-center'>Image</th>
              <th colSpan={2} className='p-[10px] text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((data, idx) => (
              <tr key={idx} className='hover:bg-pink-50'>
                <td className='p-[30px] text-center'>{data.isbn10}</td>
                <td className='p-[30px] text-center'>{data.isbn13}</td>
                <td className='p-[30px] text-center'>{data.name}</td>
                <td className='p-[30px] text-center'>{data.category}</td>
                <td className="p-[30px] text-center max-w-xs overflow-x-auto whitespace-nowrap">{data.description}</td>
                <td className='p-[30px] text-center'>{data.price}</td>
                <td className='p-[30px] text-center'>{data.quantity}</td>
                <td className='p-[30px] text-center'>{data.pages}</td>
                <td className='p-[30px] text-center'>{data.author}</td>
                <td className='p-[30px] text-center'>{data.publisher}</td>
                <td className='p-[30px] text-center'>{data.publish_date}</td>
                <td className='p-[30px] text-center'>{data.language}</td>
                <td><img className='h-[100px] w-[100px]' src={`/${data.image}`} alt='NoImage' /></td>
                <td className='p-[30px] text-center'><Link to={`/dashboard/deletebook/${data.id}`}>Delete</Link></td>
                <td className='p-[30px] text-center'><Link to={`/dashboard/onebook/${data.id}`}>Update</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className='mt-4 flex justify-center gap-4'>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className='p-2 border rounded disabled:opacity-50'
        >
          Prev
        </button>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className='p-2 border rounded disabled:opacity-50'
        >
          Next
        </button>
      </div>
    </div>
  );
}
