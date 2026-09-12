import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import MinimalFooter from "../components/MinimalFooter";
import { useAuth } from "../context/AuthContext";


interface FormData{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}


export default function RegisterPage(){

    const { user, loading, register } = useAuth()

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const { name, value} = e.target;
        setFormData((prev)=>({
            ...prev,
            [name]: value,
        }));
    };

    if(user){
        navigate("/home")
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setError("")

        if (formData.password !== formData.confirmPassword){
            setError("Passwords don't match")
            return;
        }

        if(formData.password.length<8){
            setError("Password should contain at least 8 characters.")
            return;
        }
        
        console.log("Sending registration request...", formData.email)
        const response = await register({
            name: formData.name, 
            email: formData.email,
            password: formData.password
        })

        if(response.success){
            navigate("/home")
        }else{
            setError(response.message)
        }
        
    }

    return(
        <>
            <header className="navbar">
                <div className="container navbar-inner">
                <div className="nav-brand">
                    <a href="home" className="text-white text-[1.6rem] font-extrabold">ECOMMY</a>
                </div>
                <a href="login" className="nav-action-btn">Already have an account? Login</a>
                </div>
            </header>

            <main className="page-wrapper">
                <div className="container">
                
                <div className="auth-card">
                    <div className="auth-header">
                        <h1 className="text-[1.6rem] font-extrabold text-mauve-950">Create Your Account</h1>
                        <p className="text-[0.9rem] text-muted mt-1" >Join Ecommy for exclusive deals and order tracking</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input type="text" 
                                placeholder="John Doe" 
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange} 
                                required />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input type="email" 
                                placeholder="name@example.com" 
                                className="form-control" 
                                required 
                                name="email"
                                value={formData.email}
                                autoComplete="email"
                                onChange={handleChange}/>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input type="password" 
                                placeholder="Minimum 8 characters" 
                                className="form-control" 
                                required 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}/>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Confirm Password</label>
                            <input type="password" 
                                placeholder="Repeat password" 
                                className="form-control"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange} 
                                required />
                        </div>
                        {
                            error && (
                                <p className="text-red-600 text-[0.85rem] mb-4">
                                    {error}
                                </p>
                            )
                        }
                        <div className="flex items-center gap-2 mb-5" >
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms" className="text-[0.85rem] text-muted" >I agree to the <a href="#" className="text-ink" >Terms of Service</a> & <a href="#" className="text-ink" >Privacy Policy</a></label>
                        </div>

                        <button type="submit" 
                            className="btn btn-primary btn-block btn-lg"
                            disabled={loading} >
                                {loading?
                                    "Creating Account....."
                                    : "Create Ecommy Account"}
                        </button>
                    </form>

                    <div className="text-center mt-5 text-[0.85rem] text-muted" >
                    Already registered? <a href="login" className="text-ink font-semibold" >Sign in here</a>
                    </div>
                </div>

                </div>
            </main>

            <MinimalFooter />
        </>
    )
}