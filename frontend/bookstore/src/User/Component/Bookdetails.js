import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import Message from './Message';

export default function Bookdetails() {
  const [bookdata, setBookData] = useState({});
  const [quantity, setQuantity] = useState(0);

  const id = useParams();
  const token = localStorage.getItem("token");
  let decoded_token;
  if (token) {
    decoded_token = jwtDecode(token).id;
  }

  useEffect(() => {

    async function getDescription() {
      const URL = `http://localhost:8080/book/details/${id.id}`;
      const data = await fetch(URL);
      const response = await data.json();

      setBookData(response[0]);

    }
    getDescription();

  }, [id.id])
  const navigate = useNavigate();
  const cartData = {
    "name": bookdata["name"],
    "price": bookdata["price"],
    "quantity": quantity,
    "id": decoded_token,
    "image": bookdata["image"],
    "total": bookdata["price"] * quantity,
  }

  async function AddCart() {
    if (decoded_token === undefined) {
      alert("Please Login");
      navigate("/users/login")
    }
    else {
      if (quantity > 0 && quantity != null && quantity !== "") {
        const URL = `http://localhost:8080/users-cart/${decoded_token}`;
        const data = await fetch(URL);
        const result = await data.json();
        console.log(result);
        navigate("/add-cart", { state: cartData })
      }
      else {
        alert("Invalid quantity");
      }
    }



  }


  return (
    <>
      <div className='flex p-[10px] justify-center aign-center shadow-xl max-[900px]:flex max-[900px]:flex-col'>
        {/* 
        <img
          src={`http://localhost:3000/${bookdata.image}`}
          alt={bookdata.name}
          className="h-[500px] w-[500px]"

        /> */}
        <img className='rounded-[10px] h-[300px] w-[200px] m-[auto]' src={bookdata.image} alt='Noimg'></img>





        <div className='p-[40px] '>
          <Link to='/home' className='text-blue-500'>{bookdata.category}</Link>
          <p className='font-bold text-[20px]'>{bookdata.name}</p>
          <p className=''>{bookdata.description}</p><br></br>

          <p className='font-bold text-[20px]'>₹{bookdata.price}</p><br></br>
          <div className='border-[2px] border-gray-50 p-[10px] w-[500px] shadow-sm text-center max-[900px]:w-[100%]'>
            <p className='text-center font-bold text-[20px] border-[2px] border-gray-50'>Book details</p><br></br>
            <p>Isbn 10 {bookdata.isbn10}</p><br></br>
            <p>Isbn 13 {bookdata.isbn13}</p><br></br>
            <p>Author {bookdata.author}</p><br></br>
            <p>Publisher {bookdata.publisher}</p><br></br>
            <a href="#booksdetail" className='border-b-[2px]'>Show All details</a>
          </div>
          <div className='mt-[10px] max-[900px]:w-[100%] max-[900px]:text-center'>
            <input onChange={(e) => { setQuantity(e.target.value) }} className='w-[200px] border-[2px] p-[10px]  border-gray-200 focus:border-gray-200' type='number' placeholder='Enter quantity'></input>
            <button className='ml-[10px] max-[900px]:m-[0px] max-[900px]:mt-[10px] w-[200px] transition rounded-[10px] bg-white border-[2px] hover:bg-black hover:text-white p-[10px] font-bold' onClick={AddCart}>Add Cart</button>
          </div>
        </div>
        <div>

        </div>


      </div>
      <div id='booksdetail' className='shadow-sm  border-[2px] border-[2px] border-gray-50 w-[900px] max-[900px]:w-[100%] p-[20px] m-auto mt-[20px] rounded-[10px] '>
        <p className='text-center font-bold text-[20px] border-[2px] border-[2px] border-gray-50 '>Book details</p><br></br>
        <div className='flex max-[900px]:flex-col max-[900px]:w-[100%] '>
          <div className=' p-[10px] w-[500px] max-[900px]:w-[100%] '>

            <p>Isbn 10 {bookdata.isbn10}</p><br></br>
            <p>Isbn 13 {bookdata.isbn13}</p><br></br>
            <p>Author {bookdata.author}</p><br></br>
            <p>Publisher {bookdata.publisher}</p><br></br>
            <p>Pages {bookdata.pages}</p>

          </div>

          <div>

            <p>Category {bookdata.category}</p><br></br>
            <p>Quantity {bookdata.quantity}</p><br></br>
            <p>Publish date {bookdata.publish_date}</p><br></br>
            <p>Langauge {bookdata.langauge}</p><br></br>
            <p>₹ {bookdata.price}</p>

          </div>
        </div>
      </div>

    </>
  )
}