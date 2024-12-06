import { createContext, useState } from 'react';

export const UserContext = createContext(null);  // default value can be null

export function UserContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState(null); // Initially set to null

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    );
}
