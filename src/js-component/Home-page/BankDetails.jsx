import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomePageNav, { NotificationBell } from "../Other-component/HomePageNavi";
import { HomePageButton } from "../Other-component/Form";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import jsPDF from 'jspdf';

const firestore = getFirestore();
const auth = getAuth();

function AddBankInfoPage() {
    const navigate = useNavigate();
    const [bankInfo, setBankInfo] = useState({
        bankName: "",
        accountHolderName: "",
        accountNumber: "",
    });
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    const getBankLogo = (bankName) => {
        if (bankName) {
            const formattedBankName = bankName.toLowerCase().replace(/ /g, '');
            return `./image/logos/${formattedBankName}Logo.png`;
        }
        return './path/to/defaultLogo.png';
    };
    
    const [logoSrc, setLogoSrc] = useState(getBankLogo(bankInfo.bankName));

    useEffect(() => {
        setLogoSrc(getBankLogo(bankInfo.bankName));
    }, [bankInfo.bankName]);

    useEffect(() => {
        const fetchBankInfo = async () => {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    try {
                        const userDoc = await getDoc(doc(firestore, "users", auth.currentUser.uid));
                        if (userDoc.exists()) {
                            const userData = userDoc.data();
                            setBankInfo({
                                bankName: userData.bankName,
                                accountHolderName: userData.accountHolderName,
                                accountNumber: userData.accountNumber,
                            });
                        }
                        setLoading(false);
                    } catch (error) {
                        console.error("Error fetching bank information:", error);
                        setLoading(false);
                    }
                } else {
                    console.log("User profile is updated");
                    setLoading(false);
                }
            });
        };

        fetchBankInfo();
    }, []);

    const copyBankDetails = () => {
        const bankDetailsText = `Bank Name: ${bankInfo.bankName}\nAccount Holder: ${bankInfo.accountHolderName}\nAccount Number: ${bankInfo.accountNumber}`;

        navigator.clipboard.writeText(bankDetailsText)
            .then(() => {
                console.log('Bank details copied to clipboard');
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 4000);
            })
            .catch((error) => {
                console.error('Error copying bank details to clipboard:', error);
            });
    };

    const shareBankDetails = () => {
        const pdf = new jsPDF();

        pdf.setTextColor(255, 255, 255);

        pdf.setFontSize(22);

        const imgData = './image/Visa Card 3 (Ocean Blue).png';

        const imgWidth = 180;
        const imgHeight = 120;

        const xPos = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
        const yPos = (pdf.internal.pageSize.getHeight() - imgHeight) / 2;

        pdf.setFillColor(255, 255, 255);

        pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), 'F');

        pdf.addImage(imgData, 'PNG', xPos, yPos, imgWidth, imgHeight);

        const textXPos = xPos + 15;
        const textYPos = yPos + 80;

        const bankDetailsText = `Bank Name: ${bankInfo.bankName}\nAccount Holder: ${bankInfo.accountHolderName}\nAccount Number: ${bankInfo.accountNumber}`;
        pdf.text(bankDetailsText, textXPos, textYPos);

        pdf.save('bank_details.pdf');
    };

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
                        <HomePageButton
                            label="Add"
                            onClick={() => navigate("/getBankInfoForm-page")}
                        />
                        <span>
                            {bankInfo?.bankName && (
                                <div className="bankDatails-card">
                                    <img src="./image/Visa Card 3 (Ocean Blue).png" alt="card" className="backGroundImg"/>
                                    <div className="bank-details-container">
                                        <span className="bank-logo-section">
                                            <img src={logoSrc} alt="bank-logo" className="bank-logo"/>
                                            <span>
                                                <img src="./image/edit-02.png" alt="icon" className="icon"/>
                                                <img src="./image/delete-02.png" alt="icon" className="icon"/>
                                            </span>
                                        </span>
                                        <span className="bank-datails">
                                            <p className="acnName">{bankInfo.accountHolderName}</p>
                                            <div className="acnNumber-icon">
                                                <p className="acnNumber">{bankInfo.accountNumber}</p>
                                                <span>
                                                    <img src={copied ? "./image/copied-tick.png" : "./image/copy-01.png" } alt="icon" onClick={copyBankDetails} className="icon"/>
                                                    <img src="./image/share-01.png" alt="icon" onClick={shareBankDetails} className="icon"/>
                                                </span>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            )}
                        </span>
                    </div>
                </section>
            )}
        </>
    );
}

export default AddBankInfoPage;
