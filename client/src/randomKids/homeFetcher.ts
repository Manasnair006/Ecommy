import axios from "axios";
import api, { ApiResponse } from "../config/api";
import { HomeData } from "../pages/HomePage";

export default async function fetchHome(){
    try{
        const response: ApiResponse<HomeData> = await api.get<HomeData>("/api/home")
        console.log(response)
        return response.data;
    }catch(error){
        if(axios.isAxiosError(error)){
            console.error("Axios Error: ", error.message)
        }else{
            console.error("Unexpected Error: ", error)
        }
        throw error;
    }
}