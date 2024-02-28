import { HomePageButton } from "../Other-component/FormProps";
import HomePageNav, { NotificationBell } from "../Other-component/HomePageNavi";

const FinancialCourseProps = (props) => {
    const { src, heading, article, button } = props;

    return (
        <div className="financialTipProps">
            <img src={src} alt="img" />
            <h1>{heading}</h1>
            <p>{article}</p>
            {button}
        </div>
    );
}

function FinancialCourse() {


    return (
        <>
            <HomePageNav />
            <NotificationBell />
            <div className="main_section">
                <div className="financialTipsSection">
                    <span className="financialTipsSection--header">
                        <h1 className="financialTipsSection--header-h1">Featured Topics</h1>
                        <picture>
                            <p>See more</p>
                            <img src="./image/arrow-right-02.png" alt="arrow" />
                        </picture>
                    </span>
                    <div className="financialTipsSection--content">
                        <FinancialCourseProps
                            src="./image/Rectangle 497.png"
                            heading="Budgeting Basics"
                            article="Learn how to create and stick to a budget that aligns with your financial goals."
                        />
                        <FinancialCourseProps
                            src="./image/Rectangle 498.png"
                            heading="Investing Insights"
                            article="Dive into the world of investments, from stocks to mutual funds, and understand how to grow your wealth."
                        />
                        <FinancialCourseProps
                            src="./image/Rectangle 499.png"
                            heading="Credit Score Mastery"
                            article="Discover the factors that influence your credit score and tips for maintaining a healthy credit history."
                        />
                    </div>
                    <h1 className="financialTipsSection--header-h1">Interactive Learning</h1>
                    <div className="financialTipsSection--content">
                        <FinancialCourseProps
                            src="./image/Rectangle 500.png"
                            heading="Financial Quizzes"
                            article="Test your financial knowledge with our interactive quizzes. Fun and educational!"
                            button={<HomePageButton
                                label="Take a test"
                            />}
                        />
                        <FinancialCourseProps
                            src="./image/Rectangle 501.png"
                            heading="Video Tutorials"
                            article="Dive into the world of investments, from stocks to mutual funds, and understand how to grow your wealth."
                            button={<HomePageButton
                                label="Watch a video"
                            />}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default FinancialCourse;
