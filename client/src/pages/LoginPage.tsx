import React, { useState } from "react"
import api from "../config/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginData{
    email: string;
    password: string;
}

export default function LoginPage(){

    const [loginData, setLoginData] = useState<LoginData>({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        const { name, value } = e.target
        setLoginData(prev=>({
            ...prev,
            [name] : value
        }))
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setError("")
        try{
            setLoading(true)

            console.log("Sending login req.....")
            const response = await api.post("/api/auth/login", {
                email: loginData.email,
                password: loginData.password
            })
            console.log("Login response: ", response.data)
            const respon2 = await api.get("/api/auth/me")
            console.log("Authenticated User: ", respon2.data)
            navigate("/home")
        }catch(err){
            if(axios.isAxiosError(err)){
                setError( 
                    err.response?.data?.message ||
                    "Login Unsuccessful. Please Try Again!")
                console.log(err)
            }else{
                console.error(err)
                setError("Server Error. Try Again")
            }
        }finally{
            setLoading(false)
        }
        
    }


    return(
        <>
            <header className="navbar">
                <div className="container navbar-inner">
                    <div className="nav-brand">
                        <a href="/home" className="text-white text-[1.6rem] font-semibold">ECOMMY</a>
                    </div>
                    <a href="/register" className="nav-action-btn">Sign Up Free →</a>
                </div>
            </header>

            <main className="page-wrapper">
                <div className="container">
                
                <div className="auth-card">
                    <div className="auth-header">
                        <h1 className="text-[1.6rem] font-semibold text-ink" >Welcome Back</h1>
                        <p className="text-[0.9rem] text-muted mt-1">Sign in to manage your orders & profile</p>
                    </div>

                    <form action="profile.html" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input type="email" 
                                placeholder="name@example.com" 
                                className="form-control" 
                                name="email"
                                value={loginData.email}
                                onChange={handleChange}
                                required />
                        </div>

                        <div className="form-group">
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="form-label mb-0" >Password</label>
                                <a href="#" className="text-[0.8rem] text-ink">Forgot?</a>
                            </div>
                            <input type="password" 
                                placeholder="••••••••" 
                                className="form-control"
                                name="password"
                                value={loginData.password}
                                onChange={handleChange} 
                                required />
                        </div>

                        <div className="flex items-center gap-2 mb-5">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember" className="text-[0.85rem] text-muted">Keep me signed in</label>
                        </div>
                        {
                            error && (
                                <p className="text-red-600 text-[0.85rem] mb-4">
                                    {error}
                                </p>
                            )
                        }

                        <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
                            {loading?
                                 "Signing In..."
                                : "Sign In to Account"}</button>
                    </form>

                    <div className="text-center mt-5 text-[0.85rem] text-muted">
                        Don't have an account? <a href="/register" className="text-ink font-semibold">Create one here</a>
                    </div>
                </div>

                </div>
            </main>

            <footer className="footer">
                <div className="container footer-bottom">
                &copy; 2026 ECOMMY Inc. All rights reserved.
                </div>
            </footer>
        </>
    )
}