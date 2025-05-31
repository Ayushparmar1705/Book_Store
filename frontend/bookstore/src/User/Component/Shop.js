import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loading from './Loading';
export default function Shop() {

    const [books, setBooks] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectedCheckbox, setSelectedCheckbox] = useState("coding")
    const [isOpen, setIsOpen] = useState(false);
    const [bookname, setBookName] = useState("");
    const [Allbooks, setAlbooks] = useState([]);
    const [sorting, setSorting] = useState("");
    const [loading, setLoading] = useState(false);
    const [startPrice, setStartPrice] = useState(0);
    const [endPrice, setEndPrice] = useState(0);
    const [clearFilter , setClearFilter] = useState(false);
    async function Sorting(e) {
        setSorting(e.target.value)
        setLoading(true);
        const URL = `http://localhost:8080/sort-by/${sorting}`;
        try {
            const data = await fetch(URL);
            const result = await data.json();
            setBooks(result);
            console.log(books);
        }
        catch {
            console.log("Error");
            setLoading(false);
        }
        setLoading(false);
        setClearFilter(true);
    }


    useEffect(() => {

        async function Shop() {
            const URL = "http://localhost:8080/admin/bookslist";
            setLoading(true);
            const data = await fetch(URL);
            const result = await data.json();
            setBooks(result);
            setAlbooks(result);
            setLoading(false);

        }


        Shop();
        async function AllCategory() {
            const URL = "http://localhost:8080/admin/listcategory";
            try {
                const data = await fetch(URL);
                const result = await data.json();


                setCategory(result);

            }
            catch {
                console.log("Error");
            }
        }
        AllCategory();


    }, [])

    async function searchBook(e) {
        setBookName(e.target.value);
        setClearFilter(true);
        console.log(bookname.length)
        if (bookname.length === 1) {
            console.log(books);
            setBooks(Allbooks);
        }
        else {

            const URL = `http://localhost:8080/search/${bookname}`;
            const data = await fetch(URL);
            const result = await data.json();
            setBooks(result);
        }


    }
    function isChecked(e) {
        const selectedValue = e.target.value;
        const isALredyChecked = selectedCheckbox === selectedValue;
        const newSelectedCheckbox = isALredyChecked ? null : selectedValue;
        setSelectedCheckbox(newSelectedCheckbox);

        console.log(e.target.value)

        setClearFilter(true);


        if (isALredyChecked) {
            setBooks(Allbooks);
        }
        else {
            let filterBooks = books.filter((result) => {
                if (result["category"] === e.target.value) {
                        return result;
                }
                return 0;


            })
            setBooks(filterBooks);
        }


    }
    function isOpenfunction() {
        setIsOpen(!isOpen);
    }


    async function FilterByPrice(e) {
        setClearFilter(true);
        if (parseInt(startPrice) === 0 && parseInt(endPrice) === 0) {
            alert("Invalid start and end price");
        }
        else {
            const URL = `http://localhost:8080/filter-by-price/${startPrice}/${endPrice}`;
            const data = await fetch(URL);
            const result = await data.json();
            console.log(result);
            if (result) {
                setBooks(result);

            }
            else {
                setBooks(Allbooks);

            }
        }
    }
    return (
        <div className='h-[100vh]'>


            <h1 className='text-center text-[30px]'>Shop</h1>
            <div className='text-center flex justify-center gap-[10px] max-[900px]:flex max-[900px]:flex-wrap max-[900px]:'>
                <form onChange={searchBook}>
                    <input className='border-[2px] p-[10px] w-[400px] max-[900px]:w-[200px] border-gray-100 focus:outline-none '  type='search' placeholder='Search book by book name' ></input>

                </form>
                <div className='font-bold'>
                    <select className='p-[10px]' onChange={Sorting}>
                        <option value="" disabled>Default</option>
                        <option value='ASC'>Sort by high price</option>
                        <option value='DESC'>Sort by low price</option>

                    </select>
                </div>
            </div>

            <div className='mt-[50px] flex w-[100%] max-[900px]:flex max-[900px]:flex-wrap max-[900px]:justify-center  gap-[20px]'>
                <div className='p-[20px] w-[400px]'>
                    <div onClick={isOpenfunction} className='cursor-pointer w-[150px] flex justify-center m-[auto] items-center'>
                        <img className='h-[50px] w-[50px] m-auto' src='./images/lines.jpeg' alt='No'></img>
                        <p>Filter Option</p>
                    </div>

                    {isOpen && (
                        <div className='w-[300px] bg-white shadow-xl p-[20px]  border-[2px] border-yellow-100'>

                        
                            <p className='border-b-[2px] text-center'>By Category</p>
                            {
                                
                                category.map((data) => (

                                    <div className='cursor-pointer   flex  p-[10px]' key={data.id}>
                                        <input

                                            className='h-[20px] w-[20px] bg-black '
                                            type="checkbox"
                                            value={data.category_name}
                                            checked={selectedCheckbox === data.category_name}
                                            onChange={isChecked}
                                        />


                                        <p>{data.category_name}</p>
                                    </div>
                                ))
                            }
                            <p className='border-b-[2px] text-center'>By Price</p>
                            <div className='flex  mt-[10px]  gap-[2px] items-center'>
                                <p>Start</p>
                                <input  value={startPrice} onChange={(e) => { setStartPrice(e.target.value) }} type='number' min={1} className='border-[3px] w-[100px] p-[10px] border-gray-50 '></input>
                                <p>End</p>
                                <input value={endPrice} onChange={(e) => { setEndPrice(e.target.value) }} type='number' min={1} className='border-[3px] w-[100px] p-[10px] border-gray-50 '></input>

                            </div>
                            <button className='w-[100%]' onClick={FilterByPrice}>Filter</button>
                        </div>
                    )}

                </div>
                {loading ? (

                    <Loading />

                ) : (<div className='flex gap-[20px] flex-wrap'>
                    {books.map((data) => (
                        <div key={data.id} className='mt-[10px] shadow-lg text-center  transition hover:scale-104 h-[300px] w-[300px] text-wrap rounded-[10px] p-[10px]'>
                            <Link to={`/bookdetail/${data.id}`}><img className='rounded-[10px] h-[200px] w-[200px] m-[auto]' src={`http://localhost:3000/${data.image}`} alt='Noimg'></img></Link>
                            <p className='break-words font-bold'>{data.name}</p>

                            <p className='font-bold'>₹ {data.price}</p>
                        </div>
                    ))

                    }
                </div>)


                }
            </div>

        </div>


    )
}
