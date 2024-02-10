import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomePageNav, { NotificationBell } from "../Other-component/HomePageNavi";
import { HomePageButton, Input } from "../Other-component/Form";
import SelectBankName from "./SelectBankName";

const firestore = getFirestore();
const auth = getAuth();

function GetBankInfoForm() {
    const navigate = useNavigate();
    const [bankName, setBankName] = useState("");
    const [accountHolderName, setAccountHolderName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [logoSrc, setLogoSrc] = useState("");
    const [error, setError] = useState("");
    const [accountNumberError, setAccountNumberError] = useState("");

    const getBankLogo = (bankName) => {
        if (bankName) {
            const formattedBankName = bankName.toLowerCase().replace(/ /g, '');
            return `./image/logos/${formattedBankName}Logo.png`;
        }
        return './path/to/defaultLogo.png';
    };
    

    const uploadUserBankDetails = async () => {
        try {
            setUploading(true);

            if (!bankName.trim() || !accountNumber.trim()) {
                setError("All fields are required");
                return;
            }else{
                setError("");
            }

            if (accountNumber.trim().length !== 10) {
                setAccountNumberError("Account number must be 10 digits");
                return;
            } else {
                setAccountNumberError("");
            }

            const updates = {};

            if (bankName.trim()) {
                updates.bankName = bankName;
            }

            if (accountHolderName.trim()) {
                updates.accountHolderName = accountHolderName;
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
                navigate("/addBankInfoPage-page");
            }

            setLogoSrc(getBankLogo(bankName));
            setBankName("");
            setAccountHolderName("");
            setAccountNumber("");
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
                    console.log("bank details have been added");
                    setLoading(false);
                }
            });
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        setLogoSrc(getBankLogo(bankName));
    }, [bankName]);

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
                            {error && <p className="error-message">{error}</p>}
                            <SelectBankName
                                label="Bank Name"
                                htmlFor="bankName"
                                id="bankName"
                                type="text"
                                value={bankName}
                                onChange={(e) => { setBankName(e.target.value); }}
                            />
                            <Input
                                label="Account Holder Name"
                                htmlFor="accountHolderName"
                                id="accountHolderName"
                                type="text"
                                value={accountHolderName}
                                onChange={(e) => { setAccountHolderName(e.target.value); }}
                                disabled
                            />
                            <div>
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
                                            setAccountNumberError("");
                                        } else {
                                            setAccountNumberError("Invalid account number");
                                        }
                                    }}
                                />
                                {accountNumberError && <p className="error-message">{accountNumberError}</p>}
                            </div>
                            <HomePageButton
                                label={uploading ? "Uploading..." : "Add"}
                                onClick={uploadUserBankDetails}
                                disabled={uploading || !accountNumber || !bankName || accountNumberError}
                            />
                        </span>
                    </div>
                </section>
            )}
        </>
    );
}

export default GetBankInfoForm;
