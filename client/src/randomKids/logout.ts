import { Dispatch, SetStateAction } from "react";
import api from "../config/api";
import axios from "axios";
import { User } from "../data/User";

export default async function logout(setUser: Dispatch<SetStateAction<User | null>>){
    try{
        const response = await api.post("/api/auth/logout")

        if(response.status == 200){
            console.log("Logged Out")
            setUser(null)

        }else{
            console.log(response)
        }
    }catch(err){
        if(axios.isAxiosError(err)){
            console.log("Axios Error: ",err)
        }else{
            console.log(err)
        }
    }
}