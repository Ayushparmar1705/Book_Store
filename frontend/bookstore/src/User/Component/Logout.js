import React from 'react'

export default function Logout() {
    function LogoutFunction() {

        localStorage.removeItem("token");
        window.location.href = "/users/login"


    }
    LogoutFunction();
    return (
        <div>

        </div>
    )
}
