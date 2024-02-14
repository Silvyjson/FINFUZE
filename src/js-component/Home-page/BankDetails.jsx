import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomePageNav, { NotificationBell } from "../Other-component/HomePageNavi";
import { HomePageButton } from "../Other-component/Form";
import jsPDF from 'jspdf';

const firestore = getFirestore();
const auth = getAuth();
const storage = getStorage();
const storageRef = ref(storage, 'bankDetailsPDFs');


function AddBankInfoPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [bankDetails, setBankDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [internetError, setInternetError] = useState("");

    useEffect(() => {
        const fetchBankInfo = async () => {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    try {
                        const userDoc = await getDoc(doc(firestore, "users", auth.currentUser.uid));
                        if (userDoc.exists()) {
                            const userData = userDoc.data();
                            const userBankDetails = userData.bankDetails || [];
                            setBankDetails(userBankDetails);

                            const editedBankDetail = location.state?.editedBankDetail;
                            if (editedBankDetail) {
                                const updatedBankDetails = userBankDetails.map(detail => {
                                    return detail.bankName === editedBankDetail.bankName ? editedBankDetail : detail;
                                });
                                setBankDetails(updatedBankDetails);
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

        fetchBankInfo();
    }, [location.state]);

    const getBankLogo = (bankName) => {
        if (bankName) {
            const formattedBankName = bankName.toLowerCase().replace(/ /g, '');
            return `./image/logos/${formattedBankName}Logo.png`;
        }
        return './path/to/defaultLogo.png';
    };

    const deleteBankDetails = async (index) => {
        const updatedBankDetails = [...bankDetails];
        const deletedBankDetail = updatedBankDetails.splice(index, 1)[0]; // Remove the item and get the deleted item
        setLoading(true)
        try {
            const userDoc = doc(firestore, "users", auth.currentUser.uid);
            await setDoc(userDoc, { bankDetails: updatedBankDetails }, { merge: true });
            setBankDetails(updatedBankDetails);

            const pdfFileName = `${deletedBankDetail.bankName}_details.pdf`;
            const pdfRef = ref(storageRef, pdfFileName);
            await deleteObject(pdfRef);
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    };

    const editBankDetails = (index) => {
        const bankDetailToEdit = bankDetails[index];
        const path = `/editBankInfoForm-page?index=${index}`;
        navigate(path, { state: { editBankDetails: bankDetailToEdit } });
    };

    const copyBankDetails = (index) => {
        const bankDetailToCopy = bankDetails[index];
        const textToCopy = `Bank Name: ${bankDetailToCopy.bankName}\nAccount Holder: ${bankDetailToCopy.accountHolderName}\nAccount Number: ${bankDetailToCopy.accountNumber}`;

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setCopiedIndex(index);
                setTimeout(() => {
                    setCopiedIndex(null);
                }, 2000);
            })
            .catch((error) => {
                console.log(error)
            });
    };

    const generateBankDetailsPDF = async (bankInfo) => {
        return new Promise(async (resolve, reject) => {
            const pdf = new jsPDF();

            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(22);

            const logoSrc = getBankLogo(bankInfo.bankName);

            const backgroundImage = './image/Visa Card 3 (Ocean Blue).png';

            const imgWidth = 180;
            const imgHeight = 120;

            const xPos = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
            const yPos = (pdf.internal.pageSize.getHeight() - imgHeight) / 2;

            pdf.setFillColor(255, 255, 255);
            pdf.setFontSize(18);

            pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), 'F');

            pdf.addImage(backgroundImage, 'PNG', xPos, yPos, imgWidth, imgHeight);

            const logoWidth = 50;
            const logoHeight = 30;

            const logoXPos = xPos + 15;
            const logoYPos = yPos + 5;

            pdf.addImage(logoSrc, 'PNG', logoXPos, logoYPos, logoWidth, logoHeight);

            const textXPos = xPos + 15;
            const textYPos = yPos + 80;

            const bankDetailsText = `Bank Name: ${bankInfo.bankName}\nAccount Holder: ${bankInfo.accountHolderName}\nAccount Number: ${bankInfo.accountNumber}`;
            pdf.text(bankDetailsText, textXPos, textYPos);

            const pdfBlob = pdf.output('blob', { type: 'application/pdf' });

            try {
                const pdfFileName = `${bankInfo.bankName}_details.pdf`;
                const pdfRef = ref(storageRef, pdfFileName);

                await uploadBytes(pdfRef, pdfBlob);

                const downloadURL = await getDownloadURL(pdfRef);

                resolve(downloadURL);
            } catch (error) {
                reject(error);
            }
        });
    };

    const shareBankDetails = async (bankInfo) => {
        setLoading(true)
        try {
            const downloadURL = await generateBankDetailsPDF(bankInfo);

            if (navigator.share) {
                await navigator.share({
                    title: 'Bank Detail PDF',
                    text: `Download ${bankInfo.bankName} Bank Details PDF`,
                    url: downloadURL,
                });
                setLoading(false)
            } else {
                console.log("Web Share API not supported");
                setLoading(false)
            }
        } catch (error) {
            console.error("Error sharing bank details:", error);
            setLoading(false)
        }
    };


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
                            <div className="main_section bankInfo">
                                <div className="page-content">
                                    <h1>Bank Information</h1>
                                    <HomePageButton
                                        label={
                                            <div>
                                                Add <img src="./image/Vector.png" alt="Alt Text" />
                                            </div>
                                        }
                                        onClick={() => navigate("/getBankInfoForm-page")}
                                    />
                                    <span className="bankDatails-card--container">
                                        {bankDetails.length > 0 && bankDetails.map((bankInfo, index) => (
                                            <div key={index} className="bankDatails-card">
                                                <img src="./image/Visa Card 3 (Ocean Blue).png" alt="card" className="backGroundImg" />
                                                <div className="bank-details-container">
                                                    <span className="bank-logo-section">
                                                        <img src={getBankLogo(bankInfo.bankName)} alt="bank-logo" className="bank-logo" />
                                                        <span>
                                                            <img src="./image/edit-02.png" alt="icon" className="icon" onClick={() => editBankDetails(index)} />
                                                            <img src="./image/delete-02.png" alt="icon" className="icon" onClick={() => deleteBankDetails(index)} />
                                                        </span>
                                                    </span>
                                                    <span className="bank-datails">
                                                        <p className="acnName">{bankInfo.accountHolderName}</p>
                                                        <div className="acnNumber-icon">
                                                            <p className="acnNumber">{bankInfo.accountNumber}</p>
                                                            <span>
                                                                <img src={copiedIndex === index ? "./image/copied-tick.png" : "./image/copy-01.png"} alt="icon" onClick={() => copyBankDetails(index)} className="icon" />
                                                                <img src="./image/share-01.png" alt="icon" onClick={() => shareBankDetails(bankInfo)} className="icon" />
                                                            </span>
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
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

export default AddBankInfoPage;
