import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

function ProtectedRoute() {
    const [isUser, setIsUser] = useState()
    const [isAdmin, setIsAdmin] = useState()
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')) || null)

    const role = JSON.parse(localStorage.getItem("role"))
    useEffect(() => {

        if (userData != null) {
            const token = userData.token;
            const decodedToken = jwt_decode(token, { complete: true });
            const websiteRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            localStorage.setItem("role", JSON.stringify(websiteRole));

            if (role != "" && typeof role != "string") {
                for (let i = 0; i <= role.length; i++) {
                    if (role[i] === "admin" || role[i] === "seller") {
                        setIsUser(false)
                        setIsAdmin(true)
                    } else if (role[i] === "user" || role[i] === "seller") {
                        setIsUser(true)
                        setIsAdmin(false)
                    } else if (role[i] === "admin" || role[i] === "buyer") {
                        setIsUser(false)
                        setIsAdmin(true)
                    } else if (role[i] === "user" || role[i] === "buyer") {
                        setIsUser(true)
                        setIsAdmin(false)
                    }
                }
            } else if (role != "" && typeof role == "string") {
                if (role === "admin") {
                    setIsUser(false)
                    setIsAdmin(true)
                } else if (role === "user") {
                    setIsUser(true)
                    setIsAdmin(false)
                } else if (role === "seller") {
                    setIsUser(true)
                    setIsAdmin(false)
                } else if (role === "buyer") {
                    setIsUser(true)
                    setIsAdmin(false)
                }
            } else if (!role) {
                setIsUser(false)
                setIsAdmin(false)
            }
        } else {
            setIsAdmin(false)
            setIsUser(false)
        }
    }, [role, userData])

    return [isUser, isAdmin, userData]
}

export default ProtectedRoute;