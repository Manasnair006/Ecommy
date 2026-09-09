import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import api from "../config/api";
import axios from "axios";
import { User } from "../data/User";

type AuthContextValue = {
    user: User |null;
    setUser: Dispatch<SetStateAction<User | null>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) =>{
    const [user, setUser] = useState<User| null>(null)
    const [loading, setLoading] = useState(true)

    const checkAuth = async ()=>{
        try{
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

    useEffect(()=>{
        checkAuth()
    },[])

    return(
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }} >
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