import React, { useEffect, useState } from 'react'
export default function Addbooks() {
    const [categoryList, setCategoryList] = useState([]);
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
            const URL = "http://localhost:8080/admin/listcategory";
            try {
                const data = await fetch(URL);
                const result = await data.json();

                console.log("List result = ", result);
                setCategoryList(result);

            }
            catch {
                console.log("Error");
            }
        }
        Getcategory();
    }, [])
    async function AddBooks() {
        const formData = new FormData();
        formData.append("isbn10", isbn10);
        formData.append("isbn13", isbn13);
        formData.append("name", name);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("pages", page);
        formData.append("author", author);
        formData.append("publisher", publisher);
        formData.append("langauge", langauge);
        formData.append("image", image);

        const URL = "http://localhost:8080/admin/addproduct";
        try {
            const data = await fetch(URL, {
                method: "POST",
                body: formData,
            });
            const result = await data.json();
            if (data.ok) {
                alert(result.message);
            }
            else {
                alert(result.message);
            }
        }
        catch {
            console.log("Run time error");
        }
        console.log(category);
    }
    return (
        <div>

            <div className='w-[700px] bg-white shadow-lg mt-[10px] m-auto text-center max-[900px]:flex flex-col max-[900px]:w-[100%] '>
                <h1>ADD BOOK</h1>
                <form>
                    <table className='m-auto text-left max-[900px]:w-[100%] '>
                        <tbody>

                            <tr className='max-[900px]:flex flex-col'>
                                <td className='p-[10px]'><label>Book Name</label></td>
                                <td className='p-[10px]'><input required onChange={(e) => { setName(e.target.value) }} className='w-[250px] rounded-[10px] p-[10px] border-[2px] border-gray-300 focus:outline-none focus:border-fuchsia-500 focus:transition  duration-300 ease-in-out' type='text' placeholder='Enter book name' /></td>
                            </tr>
                            <tr className='max-[900px]:flex flex-col'>
                                <td className='p-[10px]'><label>Book Category</label></td>
                                <td className='p-[10px]'>
                                    <select required onChange={(e) => { setCategory(e.target.value) }} className='w-[250px] rounded-[10px] p-[10px] border-[2px] focus:outline-none border-gray-300 focus:border-fuchsia-500 focus:transition  duration-300 ease-in-out' defaultValue="">
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
                                <td className='p-[10px]'><textarea required onChange={(e) => { setDescription(e.target.value) }} className='w-[250px] rounded-[10px] p-[10px] border-gray-300 border-[2px] focus:outline-none focus:border-fuchsia-500 focus:transition  duration-300 ease-in-out' placeholder='Enter book description'></textarea></td>
                            </tr>
                            <tr className='max-[900px]:flex flex-col'>
                                <td className='p-[10px]'><label>Book Price</label></td>
                                <td className='p-[10px]'><input required onChange={(e) => { setPrice(e.target.value) }} min={0} className='w-[250px] rounded-[10px] p-[10px] border-[2px] border-gray-300 focus:outline-none focus:border-fuchsia-500 focus:transition  duration-300 ease-in-out' type='number' placeholder='Enter book price' /></td>
                            </tr>
                            <tr className='max-[900px]:flex flex-col'>
                                <td className='p-[10px]'><label>Book Quantity</label></td>
                                <td className='p-[10px]'><input required onChange={(e) => { setQuantity(e.target.value) }} min={0} max={200} className='w-[250px] rounded-[10px] border-gray-300 p-[10px] border-[2px] focus:outline-none focus:border-fuchsia-500 focus:transition  duration-300 ease-in-out' type='number' placeholder='Enter book quantity' /></td>
                            </tr>
                            <tr className='max-[900px]:flex flex-col'>
                                <td className='p-[10px]'><label>Book Pages</label></td>
                                <td className='p-[10px]'><input onChange={(e) => { setPage(e.target.value) }} className='w-[250px] rounded-[10px] p-[10px] border-[2px] border-gray-300 focus:outline-none focus:border-fuchsia-500 focus:transition  duration-300 ease-in-out' type='number' placeholder='Enter book pages' /></td>
                            </tr>
                            <tr className='max-[900px]:flex flex-col'>
                                <td className='p-[10px]'><label>Book Author</label></td>
                                <td className='p-[10px]'><input required onChange={(e) => { setAuthor(e.target.value) }} className='w-[250px] rounded-[10px] p-[10px] border-[2px] border-gray-300 focus:outline-none focus:border-fuchsia-500 focus:transition  duration-300 ease-in-out' type='text' placeholder='Enter book author' /></td>
                            </tr>
                            <tr className='max-[900px]:flex flex-col'>
                                <td className='p-[10px]'><label>Book Publisher</label></td>
                                <td className='p-[10px]'><input required onChange={(e) => { setPublisher(e.target.value) }} className='w-[250px] rounded-[10px] p-[10px] border-[2px] border-gray-300 focus:outline-none focus:border-fuchsia-500 focus:transition  duration-300 ease-in-out' type='text' placeholder='Enter book publisher' /></td>
                            </tr>
                            <tr className='max-[900px]:flex flex-col'>
                                <td className='p-[10px]'><label>Book Isbn-10</label></td>
                                <td className='p-[10px]'><input onChange={(e) => { setIsbn10(e.target.value) }} className='w-[250px] rounded-[10px] p-[10px] border-[2px] border-gray-300  focus:outline-none focus:border-fuchsia-500 focus:transition  duration-300 ease-in-out' type='text' placeholder='Enter book isbn-10' /></td>
                            </tr>
                            <tr className='max-[900px]:flex flex-col'>
                                <td className='p-[10px]'><label>Book Isbn-13</label></td>
                                <td className='p-[10px]'><input onChange={(e) => { setIsbn13(e.target.value) }} className='w-[250px] rounded-[10px] p-[10px] border-[2px] border-gray-300 focus:outline-none focus:border-fuchsia-500 focus:transition  duration-300 ease-in-out' type='text' placeholder='Enter book isbn-13' /></td>
                            </tr>
                            <tr className='max-[900px]:flex flex-col'>
                                <td className='p-[10px]'><label>Publish Langauge</label></td>
                                <td className='p-[10px]'><input required onChange={(e) => { setLangauge(e.target.value) }} className='w-[250px] rounded-[10px] p-[10px] border-[2px] border-gray-300 focus:outline-none focus:border-fuchsia-500 focus:transition  duration-300 ease-in-out' type='text' placeholder='Enter Book publish Langauge' /></td>
                            </tr>

                            <tr className='max-[900px]:flex flex-col'>
                                <td><label className='p-[10px]'>Book Image</label></td>
                                <td><input required onChange={(e) => { setImage(e.target.files[0]) }} className='p-[10px]' type='file' ></input></td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={AddBooks} className='w-[300px] bg-slate-300 text-black hover:bg-black hover:text-white rounded-[10px] p-[10px]' type='submit'>Add Book</button>
                </form>
            </div>

        </div>
    )
}
