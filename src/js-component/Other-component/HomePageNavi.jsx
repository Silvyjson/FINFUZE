import { getAuth, signOut } from "firebase/auth";
import { useNavigate, useLocation } from 'react-router-dom';
import { Menubar } from "./Navigation";

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

    const navigate = useNavigate();
    const auth = getAuth();

    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate("/login-page");
            })
            .catch((error) => console.log(error));
    };

    const togglehomepageNav = () => {
        const menuIcon = document.querySelector(`.homepageNav-menu-icon`);
        const homePageMenu = document.querySelector(`.homePageMenu_section`);
        const homePageMenuLogo = document.querySelector(`.homepageNavLogo_section`);

        menuIcon.classList.toggle("open");

        homePageMenuLogo.classList.toggle("homepage-logo")

        homePageMenu.classList.toggle("get-menu");
    }

    return (
        <>
            <div className="homepageNavLogo_section">
                <Menubar
                    onClick={togglehomepageNav}
                    className="homepageNav-menu-icon"
                />
                <h1 className="homepageNavLogo">Finfuze.</h1>
            </div>
            <section className="homePageMenu_section">
                <span className="homePageMenu_centainer">
                    <h1 className="homepageNav--Logo">Finfuze.</h1>
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
                        selectedSrc="./image/book-04 1.png"
                        nav="/finacialCourse-page"
                    />
                    <div className="homePageMenu_content" onClick={userSignOut}>
                        <img src="./image/logout-03.png" alt="signout" />
                        <h3 className="signOutH3">Sign Out</h3>
                    </div>
                </span>
            </section>
        </>
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
