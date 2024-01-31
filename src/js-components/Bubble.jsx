import React from 'react';

function Bubble({BubbleContent}) {
    const {titleName, titleSpan, lastText} = BubbleContent
    return (  
        <p className='title-name'>
        <span className='title-span'>{titleName}</span>
        <span>{titleSpan}
        </span> {lastText}
        </p>
    );
}

export default Bubble;