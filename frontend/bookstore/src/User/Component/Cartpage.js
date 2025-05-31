import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Cartpage() {


    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;
    console.log("Cart data = ", data);
    const CartObj = {
        "id": data["id"],
        "name": data["name"],
        "price": data["price"],
        "quantity": data["quantity"],
        "image": data["image"],
        "total": data["total"],
    };
    useEffect(() => {
        console.log("Add Cart page")
        const stringyfyData = JSON.stringify(CartObj);

        async function getUserdata() {

     
                const URL = "http://localhost:8080/addcart";
                const data = await fetch(URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: stringyfyData
                });

                const result = await data.json();
                if (data.ok) {
                    alert(result.message);
                    navigate("/shop")
                }
                else {
                    alert(result.message);
                    navigate("/shop")
                }

                
            
          

        }

        getUserdata();
    }, [])

    return (
        <div>

        </div>
    )
}
