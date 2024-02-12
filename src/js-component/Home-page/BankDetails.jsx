import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomePageNav, { NotificationBell } from "../Other-component/HomePageNavi";
import { HomePageButton } from "../Other-component/Form";
import jsPDF from 'jspdf';

const firestore = getFirestore();
const auth = getAuth();
const storage = getStorage();

const ShareOptionImg = (props) => {
    const { src, onClick } = props;
    return (
        <section className="shareOptionImgContent">
            <div>
                <img src={src} alt="shareOptionImg" onClick={onClick} />
            </div>
        </section>
    );
}

function AddBankInfoPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [bankDetails, setBankDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [shareIndex, setShareIndex] = useState(null);
    const [isShareOptionVisible, setShareOptionVisibility] = useState(false);
    const [error, setError] = useState(null);
    const [internetError, setInternetError] = useState("");
    const [shareError, setShareError] = useState(null);

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

        try {
            const userDoc = doc(firestore, "users", auth.currentUser.uid);
            await setDoc(userDoc, { bankDetails: updatedBankDetails }, { merge: true });
            setBankDetails(updatedBankDetails);

        } catch (error) {
            setError("Unable to delete bank details, try agin")
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
                setError("Unable to copy bank details to clipboard")
            });
    };

    const generateBankDetailsPDF = async (bankInfo) => {
        return new Promise((resolve, reject) => {
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

            resolve(pdf.output('blob', { type: 'application/pdf' }));
        });
    };

    const savePDFDownloadURL = async (index, downloadURL) => {
        const updatedBankDetails = [...bankDetails];
        updatedBankDetails[index] = { ...updatedBankDetails[index], pdfDownloadURL: downloadURL };

        try {
            const userDoc = doc(firestore, "users", auth.currentUser.uid);
            await setDoc(userDoc, { bankDetails: updatedBankDetails }, { merge: true });
            setBankDetails(updatedBankDetails);
        } catch (error) {
            console.error('Error updating PDF download URL:', error);
        }
    };

    const downloadPDF = async (index) => {
        try {
            const bankInfo = bankDetails[index];
            const pdfBlob = await generateBankDetailsPDF(bankInfo);

            const blobUrl = URL.createObjectURL(pdfBlob);

            const anchor = document.createElement('a');

            anchor.href = blobUrl;

            anchor.download = `BankDetails_${index}.pdf`;

            document.body.appendChild(anchor);

            anchor.click();

            document.body.removeChild(anchor);

            setShareOptionVisibility(false);

            await savePDFDownloadURL(index, blobUrl)
        } catch (error) {
            setShareError("Download failed!!")
        }
    };

    const shareWhatsapp = (url) => {
        const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(url)}`;
        try {
            window.open(whatsappUrl);
        } catch (error) {
            setShareError("Error opening WhatsApp")
        }
    };

    const shareTwitter = (url) => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(url)}`;
        try {
            window.open(twitterUrl);
        } catch (error) {
            setShareError("Error opening Twitter")
        }
    };

    const shareTelegram = (url) => {
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}`;
        try {
            window.open(telegramUrl);
        } catch (error) {
            setShareError("Error opening Telegram")
        }
    };

    const shareMail = (url) => {
        const mailtoUrl = `mailto:?subject=Bank Details&body=${encodeURIComponent(url)}`;
        try {
            window.open(mailtoUrl);
        } catch (error) {
            setShareError("Error opening Email")
        }
    };

    const shareMessage = async (url) => {
        const messageShareUrl = `sms:?body=${encodeURIComponent(url)}`;

        if (window.navigator.share) {
            try {
                const messageWindow = window.open(messageShareUrl, '_blank');

                if (messageWindow) {
                    setTimeout(() => {
                        messageWindow.close();
                    }, 3000);
                    setShareError("Error opening Message App")
                } else {
                    await window.navigator.share({
                        title: 'Share via Message',
                        text: 'Check out this PDF',
                        url: url,
                    });
                }
            } catch (error) {
                await window.navigator.share({
                    title: 'Share via Message',
                    text: 'Check out this PDF',
                    url: url,
                });
            }
        } else {
            window.open(messageShareUrl);
        }
    };

    const shareWindow = async (url) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Bank Details',
                    text: 'Check out these bank details',
                    url: url,
                });
            } catch (error) {
                console.error('Error sharing through Web Share API:', error);
            }
        } else {
            setShareError("Web Share API not supported")
        }
    };

    const shareBankDetails = (index) => {
        setShareOptionVisibility(true);
        setShareIndex(index);
    };

    const handleRemove = () => {
        setShareOptionVisibility(false);
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
                                <div>
                                    <h1>Bank Information</h1>
                                    <HomePageButton
                                        label={
                                            <div>
                                                Add <img src="./image/Vector.png" alt="Alt Text" />
                                            </div>
                                        }
                                        onClick={() => navigate("/getBankInfoForm-page")}
                                    />
                                    <div className="error-message-container">
                                        {error && <p className="error-message">
                                            <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" />
                                            {error}
                                        </p>}
                                    </div>
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
                                                                <img src="./image/share-01.png" alt="icon" onClick={() => shareBankDetails(index)} className="icon" />
                                                            </span>
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </span>
                                </div>
                            </div>
                            {isShareOptionVisible && (
                                <div className='shareBankDetail'>
                                    {shareError && <p className="error-message">
                                        <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" />
                                        {shareError}</p>}
                                    <div className='shareBankDetailOpt'>
                                        <span className='removeShareOpt'>
                                            <p>Share with</p>
                                            <div onClick={handleRemove}>
                                                <FontAwesomeIcon icon="fa-regular fa-circle-xmark" />
                                            </div>
                                        </span>
                                        <span className="shareOptionImgContainer">
                                            <ShareOptionImg
                                                src="./image/download-icon.png"
                                                onClick={() => downloadPDF(shareIndex)}
                                            />
                                            <ShareOptionImg
                                                src="./image/whatsapp.png"
                                                onClick={() => shareWhatsapp(bankDetails[shareIndex]?.pdfDownloadURL)}
                                            />
                                            <ShareOptionImg
                                                src="./image/new-twitter.png"
                                                onClick={() => shareTwitter(bankDetails[shareIndex]?.pdfDownloadURL)}
                                            />
                                            <ShareOptionImg
                                                src="./image/telegram.png"
                                                onClick={() => shareTelegram(bankDetails[shareIndex]?.pdfDownloadURL)}
                                            />
                                            <ShareOptionImg
                                                src="./image/mail-validation-01.png"
                                                onClick={() => shareMail(bankDetails[shareIndex]?.pdfDownloadURL)}
                                            />
                                            <ShareOptionImg
                                                src="./image/bubble-chat.png"
                                                onClick={() => shareMessage(bankDetails[shareIndex]?.pdfDownloadURL)}
                                            />
                                            <ShareOptionImg
                                                src="./image/share-08.png"
                                                onClick={() => shareWindow(bankDetails[shareIndex]?.pdfDownloadURL)}
                                            />
                                        </span>
                                    </div>
                                </div>
                            )}
                        </section>
                    )}
                </section>
            )}
        </>
    );
}

export default AddBankInfoPage;
