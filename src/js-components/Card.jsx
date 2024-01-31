import Image from "./Image";
import Description from "./Description";
import Bubble from "./Bubble";

function Card ({Person, Text, Text2, Gender, BubbleContent}){
    return(
        <div className={`card ${Gender == "Female" ? "" : "switch-positions"}`}>
            <Image PersonImg={Person} Bubble={Bubble} Gender={Gender} BubbleContent={BubbleContent}/>
            <Description TextScript={Text} TextBody={Text2} />
        </div>
    )
}

export default Card;