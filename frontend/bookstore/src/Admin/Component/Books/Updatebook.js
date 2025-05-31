import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Updatebook() {
    const id = useParams().id;
    const [categoryList, setCategoryList] = useState([]);
    const [result, setResult] = useState("");
    const [isbn10, setIsbn10] = useState("");
    const [isbn13, setIsbn13] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [page, setPage] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [langauge, setLangauge] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        async function Getcategory() {
            console.log(result , image)
            const URL = "http://localhost:8080/admin/listcategory";
            try {
                const data = await fetch(URL);
                const result = await data.json();


                setCategoryList(result);

            }
            catch {
                console.log("Error");
            }
        }

        async function getOneBook() {
            try {
                const URL = `http://localhost:8080/admin/getonebooks/${id}`;
                const data = await fetch(URL);
                const result = await data.json();
                setIsbn10(result.isbn10);
                setIsbn13(result.isbn13);
                setName(result.name);
                setAuthor(result.author);
                setPublisher(result.publisher);
                setPrice(result.price);
                setQuantity(result.quantity);
                setPage(result.pages);
                setDescription(result.description);
                setCategory(result.category);
                setLangauge(result.langauge);
                setImage(result.image);
                setResult(result);
            }
            catch {
                console.log("Invalid error ");
            }

        }
        getOneBook();
        Getcategory();
    }, [id])
    async function updateBooks() {
        const updateBookdata = {
            "isbn10" : isbn10,
            "isbn13" : isbn13,
            "name" : name,
            "category" : category,
            "description" : description,
            "price" : price,
            "quantity" : quantity,
            "pages" : page,
            "author" : author,
            "publisher" : publisher,
            "langauge" : langauge,
        }
        const finaldata = JSON.stringify(updateBookdata);
        const URL = `http://localhost:8080/admin/updatebooks/${id}`;
        const data = await fetch(URL,
            {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : finaldata
            }
        );
        const result = await data.json();
        if (data.ok) {
            alert(result.message);
        } else {
            alert(result.message);
        }
    }

    return (
        <div>
            <div className='w-[700px] bg-stone-50 mt-[10px] m-auto text-center max-[900px]:flex flex-col max-[900px]:w-[100%] '>
                <h1>UPDATE BOOKS</h1>
                <form onSubmit={updateBooks}>
                    <table className='m-auto max-[900px]:w-[100%] '>
                        <tbody>
                            <tr className='max-[900px]:flex flex-col'>
                                <td className='p-[10px]'><label>Book Isbn-10</label></td>
                                <td className='p-[10px]'><input onChange={(e) => { setIsbn10(e.target.value) }} className='w-[250px] rounded-[10px] p-[10px] border-[2px] focus:outline-none focus:border-fuchsia-500 focus:transition  duration-300 ease-in-out' type='text' value={isbn10} placeholder='Enter book isbn' /></td>
                            </tr>
                            <tr className='max-[900px]:flex flex-col'>
                                <td className='p-[10px]'><label>Book Isbn-13</label></td>
                                <td className='p-[10px]'><input onChange={(e) => { setIsbn13(e.target.value) }} className='w-[250px] rounded-[10px] p-[10px] border-[2px] focus:outline-none focus:border-fuchsia-500 focus:transition  duration-300 ease-in-out' type='text' value={isbn13} placeholder='Enter book isbn' /></td>
                            </tr>
                            <tr className='max-[900px]:flex flex-col'>
                                <td className='p-[10px]'><label>Book Name</label></td>
                                <td className='p-[10px]'><input value={name} onChange={(e) => { setName(e.target.value) }} className='w-[250px] rounded-[10px] p-[10px] border-[2px] focus:outline-none focus:border-fuchsia-500 focus:transition  duration-300 ease-in-out' type='text' placeholder='Enter book name' /></td>
                            </tr>
                            <tr className='max-[900px]:flex flex-col'>
                                <td className='p-[10px]'><label>Book Category</label></td>
                                <td className='p-[10px]'>
                                    <select onChange={(e) => { setCategory(e.target.value) }} className='w-[250px] rounded-[10px] p-[10px] border-[2px] focus:outline-none focus:border-fuchsia-500 focus:transition  duration-300 ease-in-out' defaultValue="">
                                        <option value="" disabled>Select Category</option>
                                        {
                                            categoryList.map((data, index) => (
                                                <option key={index} value={data.category_name}>{data.category_name}</option>
                                            ))
                                        }
                                    </select></td>
                            </tr>

                            <tr className='max-[900px]:flex flex-col'>
                                <td className='p-[10px]'><label>Book Description</label></td>
                                <td className='p-[10px]'><textarea value={description} onChange={(e) => { setDescription(e.target.value) }} className='w-[250px] rounded-[10px] p-[10px] border-[2px] focus:outline-none focus:border-fuchsia-500 focus:transition  duration-300 ease-in-out' placeholder='Enter book description'></textarea></td>
                            </tr>
                            <tr className='max-[900px]:flex flex-col'>
                                <td className='p-[10px]'><label>Book Price</label></td>
                                <td className='p-[10px]'><input value={price} onChange={(e) => { setPrice(e.target.value) }} min={0} className='w-[250px] rounded-[10px] p-[10px] border-[2px] focus:outline-none focus:border-fuchsia-500 focus:transition  duration-300 ease-in-out' type='number' placeholder='Enter book price' /></td>
                            </tr>
                            <tr className='max-[900px]:flex flex-col'>
                                <td className='p-[10px]'><label>Book Quantity</label></td>
                                <td className='p-[10px]'><input value={quantity} onChange={(e) => { setQuantity(e.target.value) }} min={0} max={200} className='w-[250px] rounded-[10px] p-[10px] border-[2px] focus:outline-none focus:border-fuchsia-500 focus:transition  duration-300 ease-in-out' type='number' placeholder='Enter book quantity' /></td>
                            </tr>
                            <tr className='max-[900px]:flex flex-col'>
                                <td className='p-[10px]'><label>Book Pages</label></td>
                                <td className='p-[10px]'><input value={page} onChange={(e) => { setPage(e.target.value) }} className='w-[250px] rounded-[10px] p-[10px] border-[2px] focus:outline-none focus:border-fuchsia-500 focus:transition  duration-300 ease-in-out' type='number' placeholder='Enter book pages' /></td>
                            </tr>
                            <tr className='max-[900px]:flex flex-col'>
                                <td className='p-[10px]'><label>Book Author</label></td>
                                <td className='p-[10px]'><input value={author} onChange={(e) => { setAuthor(e.target.value) }} className='w-[250px] rounded-[10px] p-[10px] border-[2px] focus:outline-none focus:border-fuchsia-500 focus:transition  duration-300 ease-in-out' type='text' placeholder='Enter book author' /></td>
                            </tr>
                            <tr className='max-[900px]:flex flex-col'>
                                <td className='p-[10px]'><label>Book Publisher</label></td>
                                <td className='p-[10px]'><input value={publisher} onChange={(e) => { setPublisher(e.target.value) }} className='w-[250px] rounded-[10px] p-[10px] border-[2px] focus:outline-none focus:border-fuchsia-500 focus:transition  duration-300 ease-in-out' type='text' placeholder='Enter book publisher' /></td>
                            </tr>
                            <tr className='max-[900px]:flex flex-col'>
                                <td className='p-[10px]'><label>Book Langauge</label></td>
                                <td className='p-[10px]'><input value={langauge} onChange={(e) => { setLangauge(e.target.value) }} className='w-[250px] rounded-[10px] p-[10px] border-[2px] focus:outline-none focus:border-fuchsia-500 focus:transition  duration-300 ease-in-out' type='text' placeholder='Enter book Langauge' /></td>
                            </tr>
                            <tr className='max-[900px]:flex flex-col'>
                                <td><label className='p-[10px]'>Book Image</label></td>
                                <td><input onChange={(e) => { setImage(e.target.files[0]) }} className='p-[10px]' type='file' ></input></td>
                            </tr>
                        </tbody>
                    </table>
                    <button className='w-[300px] bg-slate-300 text-black hover:bg-black hover:text-white rounded-[10px] p-[10px]' type='submit'>UPDATE Book</button>
                </form>
            </div>
        </div>
    )
}
