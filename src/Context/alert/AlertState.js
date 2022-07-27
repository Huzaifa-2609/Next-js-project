import AlertContext from "./AlertContext";
import toast from "react-hot-toast"



const AlertState= (props)=>{
    const successToast= (msg,toastHandler=toast)=>{
        toastHandler.success(msg, {style:{background:"white", color:"black"}})
    }
    const failToast= (msg,toastHandler=toast)=>{
        toastHandler.error(msg, {style:{background:"white", color:"black"}})
    }
   



 return(
     <AlertContext.Provider value={{successToast,failToast}}>
    {props.children}
    </AlertContext.Provider> 
        )
}
export default AlertState;