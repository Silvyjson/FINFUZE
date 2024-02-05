import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from 'react-router-dom';

export const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userSignIn = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
                navigate('/home-page');
            } else {
                setAuthUser(null);
            }
        });

        return () => {
            userSignIn();
        };
    }, [navigate]);

    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("Sign out successful");
                navigate("/login-page");
            })
            .catch((error) => console.log(error));
    };

    return (
        <div style={{ fontSize: '20px', textAlign: 'center' }}>
            {authUser ? (
                <>
                    <p>{`Signed in as ${authUser.email}`}</p>
                    <p>{`Welcome, ${authUser.displayName || '...'}`}</p>
                    <button onClick={userSignOut}>Sign out</button>
                </>
            ) : (
                null
            )}
        </div>
    );
};

export default AuthDetails;
