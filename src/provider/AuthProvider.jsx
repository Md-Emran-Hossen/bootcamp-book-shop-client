/* eslint-disable no-undef */

import { createContext, useEffect, useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    signInWithPopup
} from "firebase/auth";
import app from "../firebase/firebase.init";

export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const [loading, setLoading] = useState(true);

    const createUser = async (email, password, name, phone, photo, address) => {
        setLoading(true);

        try {
            const userCredintial = await createUserWithEmailAndPassword(auth, email, password);

            const newUser = userCredintial.user;

            const response = await fetch("https://bootcamp-book-shop-server-psi.vercel.app/users",
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(
                        {
                            //  inputObj
                            userId: newUser.uid,
                            email: newUser.email,
                            displayName: name,
                            photoUrl: photo,
                            phone: phone,
                            address: address,
                            isAdmin: false,
                        }),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to register user data.");
            }
            return newUser;
        }
        catch (error) {
            console.error("Registration failed:", error.message);
            throw error; // Re-throw error for further handling if needed
        }
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    const githubSignIn = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    const updateUserProfile = (profile) => {
        setLoading(true);
        return updateProfile(auth.currentUser, profile);
    };

    const logOut = () => {
        setLoading(true);
        console.log("Sign Out Function Found");
        return signOut(auth);
    };

    // useEffect(() => {
    //     const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         console.log(currentUser);
    //         setUser(currentUser);
    //         setLoading(false);
    //     });

    //     return () => {
    //         unSubscribe();
    //     };
    // }, [])

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            
            if (currentUser) {
                try {
                    const response = await fetch(`https://bootcamp-book-shop-server-psi.vercel.app/user/${currentUser.uid}`);

                    if (!response.ok) {
                        throw new error("Failed to fetch");
                    }
                    const data = await response.json();
                    setUser(data);
                } catch (error) {
                    console.error("Error fetching user data:", error.message);
                }
            } else {
                setUser(null);
            }

            setLoading(false);
        });

        return () => {
            unSubscribe();
        };

    }, [auth]);

    const authInfo = {
        user,
        loading,
        createUser,
        // registerWithEmail,
        // createProducts,
        signIn,
        googleSignIn,
        githubSignIn,
        updateUserProfile,
        logOut
    };
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    )
};

export default AuthProvider;