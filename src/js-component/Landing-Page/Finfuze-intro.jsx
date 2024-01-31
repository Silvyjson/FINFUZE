import React from "react";

const IntroComponent = (props) => {
    const { title, body, src } = props;

    return (
        <div className="finfuze_intro">
            <div>
            <img src={src} alt="logo" />
            </div>
            <h3>{title}</h3>
            <p>{body}</p>
        </div>
    );
}

function FinfuzeIntro() {

    return (
        <section className="finfuzeArticle-section">
            <h1>Why FinFuze?</h1>
            <span className="finfuzeArticle">
                <IntroComponent
                    src="./image/analytics-up.png"
                    title="Streamlined Financial Management:"
                    body="Easily and securely store your bank details in one place with advanced security features, ensuring your financial information is protected."
                />

                <IntroComponent
                    src="./image/book-02.png"
                    title="Enhanced Financial Literacy:"
                    body="Access a range of interactive financial courses covering budgeting, investment, and financial planning. Progress tracking and certifications provided upon course completion."
                />

                <IntroComponent
                    src="./image/wallet-02.png"
                    title="Digital Wallet for Swift Transactions:"
                    body="Make secure and fast transactions using our versatile digital wallet, seamlessly integrated with various merchant accounts for flexibility."
                />
                
                <IntroComponent
                    src="./image/invoice-01.png"
                    title="Bill Payments Made Easy:"
                    body="Pay bills directly through FinFuze, with integration with a diverse range of billers, automated reminders, and a user-friendly interface."
                />
            </span>
        </section>
    );
}

export default FinfuzeIntro;