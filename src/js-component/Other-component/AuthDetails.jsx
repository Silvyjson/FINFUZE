import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "../../firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from 'react-router-dom';


export const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const userSignOut = () => {
        signOut(authUser)
            .then(() => {
                console.log("Sign out successful");
            })
            .catch((error) => console.log(error));
    };

    const navigateToAnotherPage = () => {
        navigate('/home-page');
    };

    return (
        <div>
            {authUser ? (
                <>
                    <p>{`signed in as ${authUser.email}`}</p>
                    <button onClick={userSignOut}>Sign out</button>
                    <button onClick={navigateToAnotherPage}>Go to Another Page</button>
                </>
            ) : (
                <p>signed out</p>
            )}
        </div>
    );
};

export default AuthDetails;
