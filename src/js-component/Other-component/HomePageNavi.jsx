import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const HomePageNavItem = (props) => {
    const { title, src, selectedSrc, nav } = props;
    const navigate = useNavigate();
    const location = useLocation();

    const isSelected = location.pathname === nav;

    const toggleNavigate = () => {
        navigate(nav);
    }

    return (
        <section className="homePageMenu_content" onClick={toggleNavigate}>
            <img src={isSelected ? selectedSrc : src} alt="icon" />
            <h3 className={isSelected ? 'selected' : 'notSelected'}>{title}</h3>
        </section>
    );
}

function HomePageNav() {
    return (
        <section className="homePageMenu_section">
            <span>
                <h1>Finfuze.</h1>
                <HomePageNavItem
                    title="Dashboard"
                    src="./image/menu-square.png"
                    selectedSrc="./image/menu-square1.png"
                    nav="/home-page"
                />
                <HomePageNavItem
                    title="Profile Update"
                    src="./image/user.png"
                    selectedSrc="./image/user1.png"
                    nav="/profile-settings-page"
                />
                <HomePageNavItem
                    title="Bank Information"
                    src="./image/bank.png"
                    selectedSrc="./image/bank1.png"
                    nav="/addBankInfoPage-page"
                />
                <HomePageNavItem
                    title="Financial literacy"
                    src="./image/book-04.png"
                    selectedSrc="./image/book-04.png"
                />
            </span>
        </section>
    );
}

export const NotificationBell = () => {
    return (
        <div className="notification-bell">
            <img src="./image/notification.png" alt="notification-bell" />
        </div>
    );
}

export default HomePageNav;
