import React, { useState, useEffect } from "react";
import { getAuth as getFirebaseAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomePageNav, { NotificationBell } from "../Other-component/HomePageNavi";

export const HomePageQuickNav = (props) => {
    const { title, nav, src, explore, className } = props

    const navigate = useNavigate();

    const toggleNavigate = () => {
        navigate(nav);
    }

    return (
        <section onClick={toggleNavigate} className={`quickLink ${className}`}>
            <span>
                <div className="image-icon"><img src={src} alt="icon" /></div>
                <h1>{title}</h1>
                <div className="explore">
                    <p>{explore}</p>
                    {explore && <img src="./image/arrow-right-01.png" />}
                </div>
            </span>
        </section>
    );
}

function HomePage() {
    const auth = getFirebaseAuth();
    const firestore = getFirestore();
    const [photoURL, setPhotoURL] = useState("./image/Ellipse 39.png");
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null)
    const [internetError, setInternetError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const { uid } = user;
                    const userDoc = await getDoc(doc(firestore, "users", uid));

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUserData(userData);
                    }
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setInternetError("Unable to fetch user data. Check your internet connection and try again.")
            }
        };

        auth.onAuthStateChanged(fetchData);
    }, []);


    useEffect(() => {
        const user = auth.currentUser;

        if (user) {
            const { photoURL } = user;
            setPhotoURL(photoURL || "./image/Ellipse 39.png");
        }
    }, [auth.currentUser]);

    return (
        <>
            {loading ? (
                <div className="loading-spinner">
                    <FontAwesomeIcon icon="fa-solid fa-spinner" spin size="3x" />
                </div>
            ) : (
                <section>
                    {internetError ? (
                        <div className="loading-spinner internetError">
                            <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" />
                            <h1>{internetError}</h1>
                        </div>
                    ) : (
                        <section>
                            <HomePageNav />
                            <NotificationBell />
                            <div className="main_section">
                                <div className="page-content">
                                    <span className="userImage">
                                        <img src={photoURL} alt="userIcon" />
                                        {userData && <p>Hello, {userData.firstName}!</p>}
                                    </span>
                                    <h1 className="QA">Quick Action </h1>
                                    <span className="homePage-content">
                                        <HomePageQuickNav
                                            title="Update Profile"
                                            src="./image/user.png"
                                            explore="Edit"
                                            nav="/profile-settings-page"
                                            className="default"
                                        />
                                        <HomePageQuickNav
                                            title="Add Bank Information"
                                            src="./image/bank.png"
                                            explore="Add"
                                            nav="/addBankInfoPage-page"
                                            className="bank"
                                        />
                                        <HomePageQuickNav
                                            title="Explore Financial Tips"
                                            src="./image/book-04.png"
                                            explore="Explore"
                                            nav=""
                                            className="tips"
                                        />
                                        <HomePageQuickNav
                                            title="Do More With Finfuze (Coming Soon)"
                                            src="./image/loading-01.png"
                                            className="coming-soon"
                                        />
                                    </span>
                                </div>
                            </div>
                        </section>
                    )}
                </section>
            )}
        </>
    );
}

export default HomePage;
