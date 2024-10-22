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

    // const createUser = async (email, password, name, phone, photo, address) => {
    const createUser = async (email, password, name, phone, photo, address) => {
        setLoading(true);

        try {
            const userCredintial = await createUserWithEmailAndPassword(auth, email, password);

            // console.log(userCredintial.user);
            const newUser = userCredintial.user;

            // const inputObj = {
            //     userId: newUser.uid,
            //     email: newUser.email,
            //     displayName: name,
            //     photoUrl: photo,
            //     phone: phone,
            //     address: address,
            //     isAdmin: false,
            // }

            const response = await fetch("http://localhost:5001/users",
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
            // console.log(response);
            // return userCredintial;
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

    // const createProducts = async (email, password, name, photo) => {
    //     setLoading(true);

    //     try{
    //         const userCredintial = await createUserWithEmailAndPassword(auth, email, password);

    //         console.log(userCredintial.user);
    //         const newUser = userCredintial.user;


    //         const response = await fetch("http://localhost:5001/productList",
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     "content-type": "application/json",
    //                 },
    //                 body: JSON.stringify(
    //                     {
    //                         email: newUser.email,
    //                         displayName: name,
    //                         photoUrl: photo,
    //                         userId: newUser.uid,
    //                         isAdmin: false,
    //                     }
    //                 )
    //             }

    //         )
    //         console.log(response);

    //         return userCredintial

    //     }
    //     catch(error){
    //         console.error(error);
    //     }
    // };


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
            console.log("Current User from firebase", currentUser, "User ID", currentUser.uid);

            if (currentUser) {
                try {
                    const response = await fetch(`http://localhost:5001/user/${currentUser.uid}`);

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