import React, { useState, useEffect, useRef } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HomePageButton, Input } from "../Other-component/FormProps";
import HomePageNav, { NotificationBell } from "../Other-component/HomePageNavi";

function ProfileSettings() {
    const navigate = useNavigate();

    const auth = getAuth();
    const storage = getStorage();
    const firestore = getFirestore();
    const [photoURL, setPhotoURL] = useState("./image/Ellipse 39.png");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [existImageFile, setExistImageFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [internetError, setInternetError] = useState("");
    const [userDataUploaded, setUserDataUploaded] = useState(false);
    const fileInputRef = useRef(null);
    const deleteFile = useRef();

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleSelectFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setMessage("Only image files are allowed");
                return;
            }
            
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPhotoURL(reader.result);
            };
            reader.readAsDataURL(file);

            if (!imageFile) {
                setMessage("");
            }
        }
    };

    const handleDelete = async () => {
        setPhotoURL("");
        setImageFile(null);
        setMessage("no file selected");
    };

    const handleUpload = async () => {
        setLoading(true);

        try {
            if (imageFile || firstName.trim() !== "" || lastName.trim() !== "") {

                if (!firstName.trim() ||
                    !lastName.trim() ||
                    !dateOfBirth.trim() ||
                    !phoneNumber.trim() ||
                    !address.trim()
                ) {
                    setError("All fields are required");
                    return;
                } else {
                    setError("");
                }
                const updates = {};

                if (imageFile) {
                    const storageRef = ref(storage, `profile_pictures/${auth.currentUser.uid}`);
                    await uploadBytes(storageRef, imageFile);

                    const downloadURL = await getDownloadURL(storageRef);

                    updates.photoURL = downloadURL;
                    setExistImageFile(true);
                } else {
                    const storageRef = ref(storage, `profile_pictures/${auth.currentUser.uid}`);

                    const existingImageRef = await getDownloadURL(storageRef).catch(() => null);

                    if (existingImageRef) {
                        await deleteObject(storageRef);
                        updates.photoURL = "";
                        setExistImageFile(false)
                    } else {
                        updates.photoURL = "";
                    }
                }

                if (firstName.trim() !== "") {
                    updates.firstName = firstName;
                }

                if (lastName.trim() !== "") {
                    updates.lastName = lastName;
                }

                if (dateOfBirth.trim() !== "") {
                    updates.dateOfBirth = dateOfBirth;
                }

                if (phoneNumber.trim() !== "") {
                    updates.phoneNumber = phoneNumber;
                }

                if (address.trim() !== "") {
                    updates.address = address;
                }

                await updateProfile(auth.currentUser, updates);

                await setDoc(doc(firestore, "users", auth.currentUser.uid), {
                    firstName: updates.firstName || "",
                    lastName: updates.lastName || "",
                    dateOfBirth: updates.dateOfBirth || "",
                    phoneNumber: updates.phoneNumber || "",
                    address: updates.address || "",
                });

                setPhotoURL(updates.photoURL || photoURL);
                setUserDataUploaded(true);
                navigate("/home-page");
            }

        } catch (error) {
            setError("Error uploading profile data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    try {
                        const { uid } = auth.currentUser;
                        const userDoc = await getDoc(doc(firestore, "users", uid));
                        setLoading(false);

                        if (userDoc.exists()) {
                            const userData = userDoc.data();
                            setFirstName(userData.firstName || "");
                            setLastName(userData.lastName || "");
                            setDateOfBirth(userData.dateOfBirth || "");
                            setPhoneNumber(userData.phoneNumber || "");
                            setAddress(userData.address || "");

                            setUserDataUploaded(true);
                        }

                        const { photoURL, email } = auth.currentUser;
                        setPhotoURL(photoURL || "./image/user-profile-icon.webp");
                        setEmail(email || "");

                    } catch (error) {
                        setInternetError("Unable to fetch user data. Check your internet connection and try again.")
                        setLoading(false);
                    }
                } else {
                    setLoading(false);
                }
            });
        };

        fetchData();
    }, []);

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
                            {userDataUploaded ? <HomePageNav /> : <h1 className="logo">Finfuze.</h1>}
                            <NotificationBell />
                            <div className={`main_section profileSettings ${!userDataUploaded ? 'userDataUploaded' : ''}`}>
                                <span className="page-content">
                                    <span className="uploadImage-section">
                                        <span className="uploadImage">
                                            <img src="./image/file upload states.png" alt="Upload your picture" />
                                            <div>
                                                <h2>Upload your picture</h2>
                                                <span>file format  Max. 5MB
                                                    {(imageFile || existImageFile) &&
                                                        <div onClick={handleDelete} ref={deleteFile}>
                                                            <FontAwesomeIcon icon="fa-regular fa-circle-xmark" />
                                                        </div>
                                                    }
                                                </span>
                                                {message && <p style={{ color: "red" }}>{message}</p>}
                                            </div>
                                        </span>
                                        <HomePageButton
                                            label="Upload"
                                            onClick={handleUploadClick}
                                        />
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: "none" }}
                                            onChange={handleSelectFile}
                                        />
                                    </span>
                                    <div className="error-message-container">
                                        {error && <p className="error-message">
                                            <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" />
                                            {error}
                                        </p>}
                                    </div>
                                    <span className="updateProfileForm">
                                        <div>
                                            <Input
                                                label="First name"
                                                htmlFor="firstName"
                                                id="firstName"
                                                type="text"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                        <Input
                                            label="Last name"
                                            htmlFor="lastName"
                                            id="lastName"
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                        <Input
                                            label="Date of Birth"
                                            htmlFor="dateOfBirth"
                                            id="dateOfBirth"
                                            type="date"
                                            value={dateOfBirth}
                                            onChange={(e) => setDateOfBirth(e.target.value)}
                                        />
                                        <Input
                                            label="Phone Number"
                                            htmlFor="phoneNumber"
                                            id="phoneNumber"
                                            type="text"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                        <Input
                                            label="Address"
                                            htmlFor="address"
                                            id="address"
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                        <Input
                                            label="Email"
                                            htmlFor="email"
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled
                                        />
                                        <HomePageButton
                                            label="Save changes"
                                            className="entryFormButton"
                                            onClick={handleUpload}
                                            disabled={loading}
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

export default ProfileSettings;
