import { useToast } from "@chakra-ui/react"
import { useCallback } from "react"
const useShowToast=()=>{
    const toast=useToast()
    const showToast=useCallback((title,description,status)=>{
       
        return toast({
            description:description,
            title:title,
            status:status,
            duration:2000,
            isClosable:true
        })
    },
    [toast]
    )
    return showToast
}
export default useShowToast;