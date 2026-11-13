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
    // Synchronously initialize from localStorage so there is ZERO delay or flicker
    const [user, setUser] = useState<User | null>(() => {
        try {
            const saved = localStorage.getItem("user");
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    // Only set loading to true if there is an existing session to validate.
    // Unauthenticated visitors start with loading = false immediately!
    const [loading, setLoading] = useState<boolean>(() => {
        try {
            return Boolean(localStorage.getItem("token") || localStorage.getItem("user"));
        } catch {
            return false;
        }
    });

    const checkAuth = async ()=>{
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        // If there's neither a saved token nor user, visitor is not logged in
        if (!token && !storedUser) {
            setUser(null);
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-sec safety timeout

        try{
            const response = await api.get("/api/auth/me", {
                signal: controller.signal,
            });
            if(response.status == 200 && response.data.user){
                setUser(response.data.user);
                localStorage.setItem("user", JSON.stringify(response.data.user));
            }else{
                setUser(null);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        }catch(err: any){
            if(axios.isAxiosError(err)){
                if(err.response?.status === 401 || err.response?.status === 403){
                    setUser(null);
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                }else if(err.code === "ECONNABORTED" || err.name === "CanceledError"){
                    console.warn("Auth check timed out, keeping cached session");
                }
            }else{
                console.error("Auth check error:", err);
            }
        }finally{
            clearTimeout(timeoutId);
            setLoading(false);
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
            if(response.data.token){
                localStorage.setItem("token", response.data.token);
            }
            if(response.data.user){
                setUser(response.data.user);
                localStorage.setItem("user", JSON.stringify(response.data.user));
            }
            return({
                success: true,
                message: "Login successful"
            })
        }catch(err: any){
            console.log(err)
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
            await api.post("/api/auth/logout").catch(() => {});
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null)
            return({
                success: true,
                message: "Logged Out Successfully"
            })
        }catch(err:any){
            console.log(err)
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
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
            if(response.data.token){
                localStorage.setItem("token", response.data.token);
            }
            if(response.data.user){
                setUser(response.data.user);
                localStorage.setItem("user", JSON.stringify(response.data.user));
            }
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

    // Sync any user updates into localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

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