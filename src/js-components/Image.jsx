function Image ({PersonImg, Bubble, BubbleContent}){
    // const Bubble = Bubble

    return(
        <div className='image'>
            <div className="bubble-class">
                <Bubble BubbleContent={BubbleContent}/>
            </div>
            <img src={PersonImg} className="person-img"/>
            {/* <div className="trial"> */}
                
            {/* </div> */}
        </div>
    )
}


export default Image;