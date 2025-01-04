import { createContext , useContext , useState } from "react";
import VinglePreloader from "./preloader";

const LoadingContext = createContext();

export const useLoading = ()=> useContext(LoadingContext)


export const LoadingProvider = ({children})=>{
    const [isLoading, setLoading] = useState(false)


    let Content  = isLoading ? <VinglePreloader/> : children



    return(
        <LoadingContext.Provider value={{isLoading, setLoading}}>
            {Content}
             </LoadingContext.Provider>
    )
}