import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import api from "../config/api";
import axios from "axios";
import { User } from "../data/User";

type AuthContextValue = {
    user: User |null;
    setUser: Dispatch<SetStateAction<User | null>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    login: ({email, password}:{email: string, password: string})=> Promise<{success: boolean; message: any;}>
    logout: ()=> Promise<{success: boolean; message: any;}>
    register: ({name, email, password}:{name: string, email: string, password: string})=> Promise<{success: boolean; message: any;}>
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) =>{
    const [user, setUser] = useState<User| null>(null)
    const [loading, setLoading] = useState(true)

    const checkAuth = async ()=>{
        try{
            setLoading(true)
            const response = await api.get("/api/auth/me")
            if(response.status == 200){
                setUser(response.data.user)
            }else{
                setUser(null)
            }
        }catch(err){
            if(axios.isAxiosError(err)){
                console.log("Axios Error: ", err)
            }else{
                console.error(err)
            }
            setUser(null)
        }finally{
            setLoading(false)
        }
    }

    const login = async({email, password}:{email: string, password: string}) :Promise<{
        success: boolean;
        message: any;
    }>  =>{
        try{
            setLoading(true)
            const response = await api.post("/api/auth/login",{
                email: email,
                password: password
            });

            console.log("Login successful")
            setUser(response.data.user)
            return({
                success: true,
                message: "Login successful"
            })
        }catch(err: any){
            console.log(err)
            setUser(null)
            return({
                success: false,
                message: err.response?.data?.message || "Login Failed"
            })
        }finally{
            setLoading(false)
        }
    }

    const logout = async():Promise<{
        success: boolean;
        message: any;
    }> =>{
        try{
            setLoading(true)
            await api.post("/api/auth/logout")

            console.log("Logged Out")
            setUser(null)
            return({
                success: true,
                message: "Logged Out Successfully"
            })
            
        }catch(err:any){
            console.log(err)
            return({
                success: false,
                message: err.response?.data?.message || "Logout Failed"
            })
        }finally{
            setLoading(false)
        }
    }

    const register = async({name, email, password}:{name: string, email: string, password: string}):Promise<{
        success: boolean;
        message: any;
    }> => {
        try{
            setLoading(true)
            const response = await api.post("/api/auth/register",{
                name: name,
                email: email,
                password: password
            })
            console.log("Registration Successful")
            setUser(response.data.user)
            return({
                success: true,
                message: "User Registered Successfully"
            })
        }catch(err: any){
            console.log(err)
            return({
                success: false,
                message: err.response?.data?.message || "User Registration Failed"
            })
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        checkAuth()
    },[])

    return(
        <AuthContext.Provider value={{ user, setUser, loading, setLoading, login, logout, register }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};