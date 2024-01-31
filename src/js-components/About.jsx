import Card from "./Card";
import Girl from '../images/wepik-export-202401250713417UHH 1.png';
import Guy from '../images/wepik-export-202401271607507697 1.png';
import Last from '../images/wepik-export-20240127162547WpxA 1.png';
import Bubble from './Bubble';

function About (){

  const cards = [
    {
      image: Girl,
      text: "Seamless transactions:",
      text2: "where every click connects you to convenience and efficiency. Experience a smoother way to transact.",
      gender: "Female",
      bubble: {
        titleName: "Make",
        titleSpan: " seamless",
        lastText: "transactions."
      }
    },
    {
      image: Guy,
      text: "Learn:",
      text2: "Knowledge is key to financial success. With FinFuze, empower yourself with valuable insights and education about personal finance. Learn smart strategies, tips, and tricks to make informed decisions and take control of your financial future.",
      gender: "Male",
      bubble: {
        titleName: "Knowledge",
        titleSpan: " is key to",
        lastText: "financial success."
      }
    },
    {
      image: Last,
      text: "Save:",
      text2: "Saving made simple and effective. FinFuze helps you save money effortlessly. Whether it's through automated savings plans, smart budgeting, or personalized tips, discover easy ways to grow your savings and achieve your financial goals.",
      gender: "Female",
      bubble: {
        titleName: "Saving",
        titleSpan: " made simple",
        lastText: "and effective."
      }
    }
  ]
    return (
      <div className="about">
        {cards.map(card=><Card Person={card.image} 
        Text={card.text} 
        Text2={card.text2} 
        Gender={card.gender}
        BubbleContent={card.bubble}/>)}
      </div>
    );
}

export default About;