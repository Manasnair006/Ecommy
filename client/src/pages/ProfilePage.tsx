import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../config/api";
import axios from "axios";
import MinimalFooter from "../components/MinimalFooter";
import ProfileLoader from "../components/ProfileLoader";

type active = 
    | "info"
    |"security"

interface ProfileData {
    name:string;
    email: string;
    phone: string;
    address: string;
}

interface SecurityData {
    currentPassword:string;
    newPassword:string;
    confirmNewPassword:string;  
}

export default function ProfilePage(){


    let { user, logout, setUser, loading } = useAuth()
    const [profileData, setProfileData] = useState<ProfileData>({name:"", email:"", phone:"", address:""})
    const [securityData, setSecurityData] = useState<SecurityData>({currentPassword:"", newPassword:"", confirmNewPassword:""})
    const [ submitting, setSubmitting ] = useState(false)
    const [ success, setSuccess ] = useState(false)
    const [ error, setError ]= useState("")
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const [active, setActive] = useState<active>("info")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        let name = e.target.name
        let value = e.target.value
        if (name === "firstName" || name === "lastName" || name === 'email' || name === "phone" || name === "address"){
            if (e.target.name === "firstName"){
            name = "name"
            value = value+ " " + profileData.name.split(" ").slice(1,)
            }else if(e.target.name === "lastName"){
                name = 'name'
                value = profileData.name.split(" ")[0] +" "+ value
            }
            setProfileData((prev)=>({
                ...prev,
                [name] : value
            }))
        }else{
            setSecurityData(prev =>({
                ...prev,
                [name] : value
            }))
        }
        
    }

    const handleSubmit = async(e: React.SubmitEvent<HTMLFormElement>) =>{
        try{
            e.preventDefault()
            setSubmitting(true)
            if(e.target.name == "profile"){
                const response = await api.patch("/api/user/updateDetails", {
                    newName: profileData.name, 
                    newPhone: profileData.phone, 
                    newEmail: profileData.email, 
                    newAddress: profileData.address
                })
                if(response.status == 200){
                    setUser(response.data.user)
                    setSuccess(true)
                    setTimeout(()=>{
                        setSuccess(false)
                    },5000)
                    
                }
            }else if(e.target.name === "security"){
                if( securityData.confirmNewPassword != securityData.newPassword){
                    setError("Passwords Dont Match")
                }else{
                    const response = await api.patch("/api/user/updatePassword",{
                        currentPassword: securityData.currentPassword,
                        newPassword: securityData.newPassword
                    })
                    if(response.status==200){
                        setSecurityData({currentPassword:"", newPassword:"", confirmNewPassword:""})
                    }
                }  
            }
        }catch(err){
            if(axios.isAxiosError(err)){
                console.log("Axios Error: ", err)
            }else{
                console.log(err)
            }
            setError("Server Error. Try Again")
        }finally{
            setSubmitting(false)
        }  
    }

    useEffect(() => {
        if (loading || !user) return;

        let cancelled = false;

        const loadProfileData = async () => {
            try {
                const response = await api.get("/api/user/");

                if (!cancelled && response.status === 200) {
                    setProfileData(response.data.user);
                }
            } catch (err) {
                if (!cancelled) {
                    console.error("Failed to load profile:", err);
                    setError("Unable to load your profile details. Please try again.");
                }
            }
        };

        loadProfileData();

        return () => {
            cancelled = true;
        };
    }, [loading, user]);

    const handleLogout = async() =>{
        await logout();
        setShowLogoutModal(false)
    }

    if (loading) {
        return (
            <ProfileLoader />
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }
    const navigate = useNavigate()

    return(
        <>
            <NavBar />

            <main className="page-wrapper">
                <div className="container">
                
                <div className="card p-6 mb-7 flex items-center gap-5">
                    <div className="w-18 h-18 bg-black text-white border-r-[50%] flex items-center justify-center font-bold text-[2rem]" >
                        {user.name[0].toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-[1.5rem] font-extrabold" >{loading?"Loading...":user.name}</h1>
                        <p className="text-[0.9rem] text-muted" >{loading?"Loading...":user.email}</p>
                    </div>
                </div>

                <div className="profile-layout">
                    
                    <div className="profile-nav-card">
                        <a href="#" className={`profile-nav-item ${active === "info"? "active" : ""}`} onClick={()=>{setActive("info")}} data-tab-target="tab-info">👤 Personal Info</a>
                        <button onClick={()=>{navigate("/orders")}} className="profile-nav-item">📦 Order History</button>
                        <a href="#" className={`profile-nav-item ${active === "security"? "active" : ""}`} onClick={()=>{setActive("security")}} data-tab-target="tab-security">🔒 Security Settings</a>
                        <a className="profile-nav-item text-red-800 mt-70" onClick={()=>{setShowLogoutModal(true)}}>🚪 Sign Out</a>
                    </div>

                    {showLogoutModal &&
                        <div className="logout-modal-overlay">
                            <div className="logout-modal">
                                <div className="logout-modal-icon">
                                    !
                                </div>

                                <h2>Are you sure?</h2>

                                <p>
                                    You are about to log out of your account.
                                </p>

                                <div className="logout-modal-actions">
                                    <button
                                        className="btn btn-outline"
                                        onClick={()=>{setShowLogoutModal(false)}}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        className="btn btn-accent"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    }

                    <div className="card p-7">
                    
                        <div id="tab-info" className={`tab-pane ${ active === "info"? "active" : "hidden"}`}>
                            <h2 className="text-[1.3rem] font-bold mb-5" >Personal Information</h2>
                            <form name="profile" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-4" >
                                    <div className="form-group">
                                        <label className="form-label">First Name</label>
                                        <input type="text" 
                                            value={profileData.name.split(" ")[0]} 
                                            name="firstName"
                                            onChange={handleChange}
                                            className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Last Name</label>
                                        <input type="text" 
                                            value={profileData.name.split(" ").length>1 
                                                ? profileData.name.split(" ").slice(1,).join(" ")
                                                : "" 
                                            }
                                            name="lastName"
                                            onChange={handleChange} 
                                            className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email Address</label>
                                    <input type="email" 
                                        value={profileData.email} 
                                        name="email" 
                                        onChange={handleChange} 
                                        className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone Number</label>
                                    <input type="tel" 
                                        value={profileData.phone} 
                                        name="phone" 
                                        onChange={handleChange} 
                                        className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Delivery address</label>
                                    <input type="text" 
                                        value={profileData.address} 
                                        name="address" 
                                        onChange={handleChange} 
                                        className="form-control" />
                                </div>
                                <button className="btn btn-primary"
                                    type="submit" disabled={submitting}> 
                                    {submitting
                                        ?"Submitting..."
                                        :"Save Changes"
                                    }
                                </button>
                                { success && (
                                        <p className="text-green-600 text-[0.85rem] mb-4">
                                            Profile Details updated successfully
                                        </p>
                                    )
                                }
                                { error && (
                                        <p className="text-red-600 text-[0.85rem] mb-4">
                                            {error}
                                        </p>
                                    )
                                }
                            </form>
                        </div>

                        <div id="tab-security" className={`tab-pane ${ active === "security"? "active" : "hidden"}`}>
                            <h2 className="text-[1.3rem] mb-5 font-bold" >Security & Password</h2>
                            <form name="security" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label">Current Password</label>
                                    <input type="password" 
                                        placeholder="••••••••" 
                                        name="currentPassword"
                                        value={securityData.currentPassword}
                                        onChange={handleChange}
                                        className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">New Password</label>
                                    <input type="password" 
                                        placeholder="••••••••" 
                                        value={securityData.newPassword}
                                        name="newPassword"
                                        onChange={handleChange}
                                        className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label"> Confirm New Password</label>
                                    <input type="password" 
                                        placeholder="••••••••" 
                                        value={securityData.confirmNewPassword}
                                        name="confirmNewPassword"
                                        onChange={handleChange}
                                        className="form-control" />
                                </div>
                                <button className="btn btn-primary" 
                                    type="submit"
                                    disabled={submitting}>
                                        {submitting
                                            ?"Changing Passwords..."
                                            :"Update Password"}
                                </button>
                                { success && (
                                        <p className="text-green-600 text-[0.85rem] mb-4">
                                            Passwords updated successfully.
                                        </p>
                                    )
                                }
                                { error && (
                                        <p className="text-red-600 text-[0.85rem] mb-4">
                                            {error}
                                        </p>
                                    )
                                }
                            </form>
                        </div>

                    </div>

                </div>

                </div>
            </main>

            <MinimalFooter />
        </>
    )
}