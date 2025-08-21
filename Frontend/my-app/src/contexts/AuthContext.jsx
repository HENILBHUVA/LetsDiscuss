import { createContext, useContext, useState } from "react"; // ✅ Import necessary hooks
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import axios from "axios"; // ✅ Import axios for API requests
import httpStatus from "http-status"; // ✅ Import httpStatus (or replace with status codes)

export const AuthContext = createContext({}); // ✅ Create AuthContext

// ✅ Fix: Added "http://" to the base URL
const client = axios.create({
    baseURL: "http://localhost:8000/api/v1/users"
});

export const AuthProvider = ({ children }) => { // ✅ Fix: Changed "Children" to "children" (correct prop name)
    const [userData, setUserData] = useState(null); // ✅ Fix: Initialize state with "null" instead of an undefined variable

    const router = useNavigate(); // ✅ Fix: Moved useNavigate inside the function

    // ✅ Function to handle user registration
    const handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name: name,
               username: username,
                password: password
            });

            if (request.status === httpStatus.CREATED) { //Replaced httpStatus.CREATED with 201
                return request.data.messages;
            }
        } catch (err) {
            throw err;
        }
    };

    const handleLogin = async(username, password)=>{
        try{
            let request = await client.post("/login", {
                username: username,
                password: password
            });
            if (request.status === httpStatus.OK){
                localStorage.setItem("token", request.data.token);
                router("/home")
            }
            
        }catch (err) {
            throw err;
        }
    }

    const getHistoryOfUser = async () => {
        try {
            let request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token")
                }
            });
            return request.data
        } catch
         (err) {
            throw err;
        }
    }

    const addToUserHistory = async (meetingCode) => {
        try {
            let request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request
        } catch (e) {
            throw e;
        }
    }


    const data = {
        userData,
        setUserData, getHistoryOfUser, addToUserHistory,
        handleRegister, handleLogin
    };

    return (
        <AuthContext.Provider value={data}>
            {children} 
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext)

