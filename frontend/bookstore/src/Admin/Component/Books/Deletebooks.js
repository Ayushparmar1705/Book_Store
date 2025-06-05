import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Deletebooks() {
    const {id} = useParams();
    async function deleteOneBook()
    {
        const URL = `http://localhost:8080/admin/deletebooks/${id}`;
        const data = await fetch(URL,{
            method : "DELETE",
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
    deleteOneBook();
  return (
    <div>
        <Link to="/dashboard/bookslist">List Books</Link>
    </div>
  )
}
