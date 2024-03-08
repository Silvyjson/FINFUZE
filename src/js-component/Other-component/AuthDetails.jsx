import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AuthDetails = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
                navigate("/login-page");
            }

            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, [navigate]);

    if (loading) {
        return (
            <div className="loading-spinner">
                <FontAwesomeIcon icon="fa-solid fa-spinner" spin size="3x" />
            </div>
        );
    }

    if (!authenticated) {
        return null;
    }
};

export default AuthDetails;
