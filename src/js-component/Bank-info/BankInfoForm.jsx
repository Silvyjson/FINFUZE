import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomePageNav, { NotificationBell } from "../Other-component/HomePageNavi";
import { HomePageButton, Input } from "../Other-component/FormProps";
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
    const [logoSrc, setLogoSrc] = useState("");
    const [error, setError] = useState("");
    const [internetError, setInternetError] = useState("");
    const [accountNumberError, setAccountNumberError] = useState("");

    const getBankLogo = (bankName) => {
        if (bankName) {
            const formattedBankName = bankName.toLowerCase().replace(/ /g, '');
            return `./image/logos/${formattedBankName}Logo.png`;
        }
        return './image/logos/defaultLogo.png';
    };

    const uploadUserBankDetails = async () => {
        try {
            setLoading(true);

            if (!bankName.trim() || !accountNumber.trim()) {
                setError("All fields are required");
                return;
            } else {
                setError("");
            }

            if (accountNumber.trim().length !== 10) {
                setAccountNumberError("Account number must be 10 digits");
                return;
            } else {
                setAccountNumberError("");
            }

            const userDoc = await getDoc(doc(firestore, "users", auth.currentUser.uid));

            if (userDoc.exists()) {
                const existingData = userDoc.data();

                const userBankDetails = existingData.bankDetails || [];

                const newBankDetail = {
                    bankName: bankName.trim(),
                    accountHolderName: accountHolderName.trim(),
                    accountNumber: accountNumber.trim(),
                };

                const updatedBankDetails = [...userBankDetails, newBankDetail];

                await setDoc(doc(firestore, "users", auth.currentUser.uid), {
                    ...existingData,
                    bankDetails: updatedBankDetails,
                });

                navigate("/addBankInfoPage-page");
            }

            setLogoSrc(getBankLogo(bankName));
            setBankName("");
            setAccountHolderName("");
            setAccountNumber("");
        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
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
                        setLoading(false);
                        setInternetError("Unable to fetch user data. Check your internet connection and try again.")
                    }
                } else {
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
                <>
                    {internetError ? (
                        <div className="loading-spinner internetError">
                            <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" />
                            <h1>{internetError}</h1>
                        </div>
                    ) : (
                        <>
                            <HomePageNav />
                            <NotificationBell />
                            <div className="main_section bankInfo BDForm">
                                <span className="page-content">
                                    <h1>Bank Information</h1>
                                    <div className="error-message-container">
                                        {error && <p className="error-message">
                                            <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" />
                                            {error}
                                        </p>}
                                    </div>
                                    <span className="updateProfileForm bankdetailForm">
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
                                        <div className="inputErrorContainer">
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
                                            {accountNumberError && <p className="error">{accountNumberError}</p>}
                                        </div>
                                        <HomePageButton
                                            label={
                                                <div>
                                                    Add <img src="./image/Vector.png" alt="Alt Text" />
                                                </div>
                                            }
                                            onClick={uploadUserBankDetails}
                                            disabled={loading || !accountNumber || !bankName || accountNumberError}
                                        />
                                    </span>
                                </span>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );
}

export default GetBankInfoForm;
