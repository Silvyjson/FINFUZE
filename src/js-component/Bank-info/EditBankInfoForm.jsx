import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomePageNav, { NotificationBell } from "../Other-component/HomePageNavi";
import { HomePageButton, Input } from "../Other-component/Form";
import SelectBankName from "./SelectBankName";

const firestore = getFirestore();
const auth = getAuth();

function EditBankInfoForm() {
    const navigate = useNavigate();
    const location = useLocation();
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
        return './path/to/defaultLogo.png';
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

            if (bankName === "") {
                setError("All fields are required");
            } else {
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

                const userBankDetails = existingData.bankDetails || [];
                const editedBankDetails = userBankDetails.map((detail) => {
                    if (detail.bankName === location.state?.editBankDetails.bankName) {
                        return { ...detail, ...updates };
                    }
                    return detail;
                });

                await setDoc(doc(firestore, "users", auth.currentUser.uid), {
                    ...existingData,
                    bankDetails: editedBankDetails,
                });

                navigate("/addBankInfoPage-page", { state: { editedBankDetail: updates } });
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

                            const userBankDetails = userData.bankDetails || [];

                            const selectedBankDetail = location.state?.editBankDetails;

                            if (selectedBankDetail) {
                                setBankName(selectedBankDetail.bankName || "");
                                setAccountNumber(selectedBankDetail.accountNumber || "");
                            } else {
                                const [firstBankDetail] = userBankDetails;
                                setBankName(firstBankDetail?.bankName || "");
                                setAccountNumber(firstBankDetail?.accountNumber || "");
                            }
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
    }, [location.state]);

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
                    {internetError ? (
                        <div className="loading-spinner internetError">
                            <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" />
                            <h1>{internetError}</h1>
                        </div>
                    ) : (
                        <section>
                            <HomePageNav />
                            <NotificationBell />
                            <div className="main_section bankInfo BDForm">
                                <span>
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
                                            {accountNumberError && <p className="error">{accountNumberError}</p>}
                                        </div>
                                        <HomePageButton
                                            label="Update"
                                            onClick={uploadUserBankDetails}
                                            disabled={loading || !accountNumber || !bankName || accountNumberError}
                                        />
                                    </span>
                                </span>
                            </div>
                        </section>
                    )}
                </section>
            )}
        </>
    );
}

export default EditBankInfoForm;
