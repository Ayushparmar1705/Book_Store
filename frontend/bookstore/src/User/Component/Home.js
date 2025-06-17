import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Footer from './Footer';
import Loading from './Loading';
export default function Home() {
    const [bookList, setBookList] = useState([]);
    const [category, setCategory] = useState([]);
    const [filterCategory, setFilterCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 100;







    useEffect(() => {

        async function fetchEverything() {
            setLoading(true);
            try {
                const [books, category] = await Promise.all([
                    fetch(`http://localhost:8080/admin/bookslist/${itemsPerPage}`),
                    fetch("http://localhost:8080/admin/listcategory"),

                ])
                const [getBooks, getCategory] = await Promise.all([
                    books.json(),
                    category.json(),
                ])
                setBookList(getBooks);
                setCategory(getCategory);
                setLoading(false);
                setFilterCategory(getBooks);

            }
            catch (e) {

                setLoading(false);
            }
        }
        fetchEverything();

    }, []);


    function FilterBooks(e) {

        const selected = e.target.value;
        if (selected === "All") {
            setFilterCategory(bookList);
        } else {
            const filtered = bookList.filter(book => book.category === selected);
            setFilterCategory(filtered);
        }
    }


    return (

        <div className='mt-[20px] w-[100%]'>

            <motion.div className='flex w-full items-center justify-center  m-[0px] shadow-xl max-[900px]:w-[100%] max-[900px]:flex max-[900px]:flex-col'>
                <div className='w-[500px] text-center max-[900px]:w-[100%]'>
                    <motion.p
                        initial={{ opacity: 0, x: 0, }}
                        whileInView={{ opacity: 1, y: 30 }}
                        transition={{ duration: 1 }}
                        className='p-[10px] text-[30px] text-black font-mono font-bold'>BUY YOUR BEST BOOKS</motion.p>
                    <motion.p
                        initial={{ opacity: 0, x: 0, }}
                        whileInView={{ opacity: 1, y: 30 }}
                        transition={{ duration: 1 }}
                        className='p-[10px]'>Discover the book that's captivating readers worldwide with its compelling story and beautiful prose.</motion.p>
                </div>
                <div className='p-[10px] max-[900px]:mt-[10px] max-[900px]:w-[100%] max-[900px]:border-box'>
                    <motion.img initial={{ opacity: 0, x: 0 }}
                        whileInView={{ opacity: 1, x: 10 }} transition={{ duration: 1 }} className='h-[400px] w-[300px] rounded-[10px] max-[900px]:w-[100%] max-[900px]:m-[0px]' src='./images/Newbook.jpg' alt='NoImage'></motion.img>
                </div>
            </motion.div>

            <div className='flex flex-wrap justify-center gap-4 p-5 text-center text-[20px] max-[900px]:overflow-x-auto'>
                <button
                    onClick={FilterBooks}
                    value="All"
                    className='font-bold text-sm bg-black text-white w-[100px] px-4 py-2 rounded-lg'
                >
                    All
                </button>
                {
                    category.map((cat) => (
                        <button
                            key={cat.id}
                            value={cat.category_name}
                            onClick={FilterBooks}

                            className='font-bold text-sm bg-white hover:bg-gray-50 shadow-sm px-4 py-2 rounded-lg'
                        >
                            {cat.category_name}
                        </button>
                    ))
                }
            </div>

            {loading ? (
               <Loading/>
            ) : (
                <div className='overflow-x-auto h-[500px] w-full'>
                    <div className='flex gap-5 h-[500px] px-4'>
                        {filterCategory.length > 0 ? (
                            filterCategory.map((book) => (
                                <div key={book.id} className='shadow-lg  hover:scale-105 transition-transform duration-300 rounded-lg text-center p-4 h-[400px] w-[300px] flex-shrink-0'>
                                    <Link to={`/bookdetail/${book.id}`}>
                                        <img
                                            src={`http://localhost:3000/${book.image}`}
                                            alt={book.name}
                                            className='w-full h-48 object-contain mx-auto rounded-lg h-[300px] w-[300px] mx-auto object-contain '
                                        />
                                      

                                    </Link>
                                    <p>{book.category}</p>
                                    <p className='font-bold mt-2'>{book.name}</p>
                                    <p className='font-bold text-gray-700'>₹ {book.price}</p>
                                </div>
                            ))
                        ) : (
                            <div className='w-[100%] text-center'><p className='text-black font-bold  text-[20px]'>No Books Found</p></div>

                        )}
                    </div>
                </div>
            )}

            <div className='w-full max-w-screen-xl mx-auto my-10 bg-pink-50 rounded-2xl flex max-[900px]:flex-col items-center justify-center p-6'>
                <motion.div
                    className='w-[300px] h-[400px] max-[900px]:w-full'
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <img
                        src='./images/newbook.png'
                        alt='Featured Book'
                        className='rounded-2xl w-full h-full object-cover max-[900px]:w-auto max-[900px]:m-auto'
                    />
                </motion.div>

                <motion.div
                    className='text-center p-6 max-[900px]:w-full max-[900px]:mt-[100px]'
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className='text-pink-500 font-bold text-xl'>Featured Book</h1>
                    <p className='text-2xl text-pink-400 font-bold'>Great Big Beautiful Life</p>
                    <p className='my-4 text-gray-700'>
                        "A heartfelt journey of hope, healing, and finding beauty in the midst of life's greatest challenges..."
                    </p>
                    <div className='flex justify-center gap-4'>

                        <a href='https://www.goodreads.com/book/show/58020466-great-big-beautiful-life' target='_blank' rel='noopener noreferrer' className='bg-black text-white px-6 py-2 rounded-lg font-bold'>Read More</a>
                    </div>
                </motion.div>
            </div>
            <div className='grid grid-cols-12 p-[10px] gap-[40px] max-[900px]:flex max-[900px]:flex-col max-[900px]:w-[100%]'>
                <div className='rounded-[10px] flex flex-col justify-center  items-center col-span-4 border-[2px] border-gray-100 h-[100px] p-[10px] text-center shadow-xl'>
                    <p className='font-bold ]'>Free Delivery</p>
                    <p>Free Delivery Upto order ₹ 2000</p>
                </div>
                <div className='rounded-[10px] flex flex-col justify-center col-span-4 border-[2px] border-gray-100 h-[100px] p-[10px] text-center shadow-xl'>
                    <p className='font-bold'>Secure Payment</p>
                    <p>Provide 100% Secure Payment Service</p>
                </div>
                <div className='rounded-[10px]  flex-col justify-center col-span-4 border-[2px] border-gray-100 h-[100px] p-[10px] text-center shadow-xl'>
                    <p className='font-bold'>Money Back</p>
                    <p>Refund the Money within 2 days</p>
                </div>
            </div>
            <div className='flex justify-center items-center gap-50 bg-white  shadow w-[90%] m-auto p-[10px]  mt-[10px] max-[900px]:flex max-[900px]:flex-col max-[900px]:w-[100%] max-[900px]:justify-right max-[900px]:m-[0px] max-[900px]:text-center'>
                <div>
                    <p className='font-bold text-[40px]'>GET 20% DISCOUNT</p>
                    <button className='bg-black text-white p-[10px] rounded-[5px] w-[120px] mt-[10px]'>Buy Now</button>
                </div>
                <div className='w-[500px] p-[10px] flex flex-col justify-center max-[900px]:w-[100%]'>
                    <img className='block h-[400px] w-[400px] max-[900px]:w-[100%]' src='./images/Newbook.jpg' alt='Nofound'></img>
                </div>
            </div>

            <Footer />
        </div>
    );
}
