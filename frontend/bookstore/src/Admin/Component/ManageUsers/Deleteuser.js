import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Deleteuser() {
    const id = useParams().id;
    useEffect(() => {
        async function deleteUser() {
            const URL = `http://localhost:8080/delete-user-account/${id}`;
            const data = await fetch(URL, {
                method: "DELETE",
            });

            const result = await data.json();
            console.log(result);
            if (data) {
                alert(result.message);
            }
            else {
                alert(result.message);
            }
        }
        deleteUser();
    })
    return (
        <div>

        </div>
    )
}
