import React from "react";

const CardContent = (props) => {
    const { description, src, article } = props;

    return (
        <section className="card-content">
            <div className="card-img-text">
                <p>{description}</p>
                <img src={src} alt="img" />
            </div>
            <article>{article}</article>
        </section>
    );
}

function About() {
    return (
        <section className="aboutSection">

            <CardContent
                description={<>Make <span className="blue-bubble">seamless</span> transactions </>}
                src="./image/wepik-export-202401250713417UHH 1.png"
                article={<><span className="highlighted-text">Seamless transactions:</span> where every click connects you to convenience and efficiency. Experience a smoother way to transact.</>}
            />

            <CardContent
                description={<><span className="blue-bubble">Knowledge</span> is key to financial success.</>}
                src="./image/wepik-export-202401271607507697 1.png"
                article={<><span className="highlighted-text">Learn:</span> Knowledge is key to financial success. With FinFuze, empower yourself with valuable insights and education about personal finance. Learn smart strategies, tips, and tricks to make informed decisions and take control of your financial future.</>}
            />

            <CardContent
                description={<><span className="blue-bubble">Saving</span> made simple and effective.</>}
                src="./image/wepik-export-20240127162547WpxA 1.png"
                article={<><span className="highlighted-text">Save:</span> Saving made simple and effective. FinFuze helps you save money effortlessly. Whether it's through automated savings plans, smart budgeting, or personalized tips, discover easy ways to grow your savings and achieve your financial goals.</>}
            />
        </section>
    );
}

export default About;
