import {createContext,useState} from "react";
export const UserContext=createContext({});
export function UserContextProvider({children}){
    const [userinfo,setUserInfo]=useState({});
    return (
        <UserContextProvider value={{userinfo,setUserInfo}}>               {children}
        </UserContextProvider>

    )
}