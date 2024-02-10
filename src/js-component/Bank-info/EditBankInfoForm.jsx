import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomePageNav, { NotificationBell } from "../Other-component/HomePageNavi";
import { HomePageButton, Input, SelectBankName } from "../Other-component/Form";

const firestore = getFirestore();
const auth = getAuth();

function GetBankInfoForm() {
    const navigate = useNavigate();
    const [bankName, setBankName] = useState("");
    const [accountHolderName, setAccountHolderName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formValid, setFormValid] = useState(false);
    const [uploading, setUploading] = useState(false);

    const uploadUserBankDetails = async () => {
        try {
            setUploading(true);

            if (bankName.trim() === "" || accountNumber.trim() === "") {
                setError("All fields are required.");
                return;
            } else {
                setError(null);
            }

            const updates = {};

            if (bankName.trim()) {
                updates.bankName = bankName;
            }
            if (accountNumber.trim()) {
                updates.accountNumber = accountNumber;
            }

            const userDoc = await getDoc(doc(firestore, "users", auth.currentUser.uid));

            if (userDoc.exists()) {
                const existingData = userDoc.data();

                await setDoc(doc(firestore, "users", auth.currentUser.uid), {
                    ...existingData,
                    ...updates,
                });
            }

            setBankName("");
            setAccountNumber("");
            setFormValid(false);
        } catch (error) {
            console.error("Error uploading bank details:", error);
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    try {
                        const userDoc = await getDoc(doc(firestore, "users", auth.currentUser.uid));

                        if (userDoc.exists()) {
                            const userData = userDoc.data();
                            setUserData(userData);
                            setAccountHolderName(`${userData.firstName} ${userData.lastName}`);
                        }
                        setLoading(false);

                    } catch (error) {
                        console.error("Error fetching user data:", error);
                        setLoading(false);
                    }
                } else {
                    console.log("bank details has been Added");
                    setLoading(false);
                }
            });
        };

        fetchUserData();
    }, []);

    return (
        <>
            {loading ? (
                <div className="loading-spinner">
                    <FontAwesomeIcon icon="fa-solid fa-spinner" spin size="3x" />
                </div>
            ) : (
                <section>
                    <HomePageNav />
                    <NotificationBell />
                    <div className="main_section bankInfo">
                        <h1>Bank Information</h1>

                        <span className="updateProfileForm">
                            <div>
                                {error && <p className="error-message">{error}</p>}
                                <SelectBankName
                                    label="Bank Name"
                                    htmlFor="bankName"
                                    id="bankName"
                                    type="text"
                                    value={bankName}
                                    onChange={(e) => {
                                        setBankName(e.target.value);
                                        setFormValid(false);
                                    }}
                                />
                            </div>
                            <Input
                                label="Account Holder Name"
                                htmlFor="accountHolderName"
                                id="accountHolderName"
                                type="text"
                                value={accountHolderName}
                                onChange={(e) => {
                                    setAccountHolderName(e.target.value);
                                    setFormValid(false);
                                }}
                                disabled
                            />

                            <Input
                                label="Account Number"
                                htmlFor="accountNumber"
                                id="accountNumber"
                                type="text"
                                value={accountNumber}
                                onChange={(e) => {
                                    const inputVal = e.target.value;
                                    if (/^\d{0,10}$/.test(inputVal)) {
                                        setAccountNumber(inputVal);
                                        setFormValid(false);
                                    }
                                }}
                            />
                            <HomePageButton
                                label={uploading ? "Uploading..." : "Add"}
                                onClick={() => {
                                    if (!formValid) {
                                        setFormValid(true);
                                    } else {
                                        uploadUserBankDetails();
                                    }
                                }}
                                disabled={uploading}
                            />
                        </span>
                    </div>
                </section>
            )}
        </>
    );
}

export default GetBankInfoForm;
