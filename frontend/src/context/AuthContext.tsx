import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface User {
    _id: string;
    fullName: string;
    username: string;
    email: string;
    profileImg?: string;
    coverImg?: string;
    bio?: string;
    link?: string;
    followers: string[];
    following: string[];
}

interface AuthContextType {
    authUser: User | null;
    isCheckingAuth: boolean;
    isLoggingIn: boolean;
    isSigningUp: boolean;
    login: (data: any) => Promise<void>;
    signup: (data: any) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authUser, setAuthUser] = useState<User | null>(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);

    const checkAuth = async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            if (res.data.status === "success") {
                setAuthUser(res.data.data);
            } else {
                setAuthUser(null);
            }
        } catch (error) {
            console.log("Error in checkAuth:", error);
            setAuthUser(null);
        } finally {
            setIsCheckingAuth(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const signup = async (data: any) => {
        setIsSigningUp(true);
        try {
            const res = await axiosInstance.post("/auth/register", data);
            if (res.data.status === "success") {
                setAuthUser(res.data.data);
                toast.success("Account created successfully");
            }
        } catch (error: any) {
            let message = "An error occurred during signup";
            if (!error.response) {
                message = "Network error. Please check if the server is running.";
            } else {
                const errors = error.response?.data?.errors;
                message = Array.isArray(errors) ? errors[0] : error.response?.data?.message || message;
            }
            toast.error(message);
        } finally {
            setIsSigningUp(false);
        }
    };

    const login = async (data: any) => {
        setIsLoggingIn(true);
        try {
            const res = await axiosInstance.post("/auth/login", data);
            if (res.data.status === "success") {
                setAuthUser(res.data.data);
                toast.success("Logged in successfully");
            }
        } catch (error: any) {
            let message = "An error occurred during login";
            if (!error.response) {
                message = "Network error. Please check if the server is running.";
            } else {
                const errors = error.response?.data?.errors;
                message = Array.isArray(errors) ? errors[0] : error.response?.data?.message || message;
            }
            toast.error(message);
        } finally {
            setIsLoggingIn(false);
        }
    };

    const logout = async () => {
        try {
            const res = await axiosInstance.post("/auth/logout");
            if (res.data.status === "success") {
                setAuthUser(null);
                toast.success("Logged out successfully");
            }
        } catch (error: any) {
            let message = "An error occurred during logout";
            if (!error.response) {
                message = "Network error. Please check if the server is running.";
            } else {
                const errors = error.response?.data?.errors;
                message = Array.isArray(errors) ? errors[0] : error.response?.data?.message || message;
            }
            toast.error(message);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                authUser,
                isCheckingAuth,
                isLoggingIn,
                isSigningUp,
                login,
                signup,
                logout,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
