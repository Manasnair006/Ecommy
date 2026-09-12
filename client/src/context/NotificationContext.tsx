import { createContext, ReactNode, useContext, useState } from "react";
import Notification from "../components/Notification";

export interface NotificationProps {
    type: "success" | "error";
    message: string;
}

interface NotificationContextType{
    notification: NotificationProps | null;
    notify: (notification:NotificationProps) => void;
    clearNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType| undefined>(undefined)

export function NotificationProvider({children}:{children: ReactNode}){

    const [notification, setNotification] = useState<NotificationProps | null>(null)

    const notify = (notification:NotificationProps) =>{
        setNotification(notification)

        setTimeout(()=>{
            setNotification(null)
        },5000)
    }

    const clearNotification = () =>{
        setNotification(null)
    }

    return(
        <NotificationContext.Provider value={{notification, notify, clearNotification}}>
            {children}

            {notification && 
                <Notification {...notification}/>
            }
        </NotificationContext.Provider>
    )
}

export default function useNotification(){
    const context = useContext(NotificationContext)

    if(!context){
        throw new Error(" Notification must be used inside notification provider")
    }

    return context;
}