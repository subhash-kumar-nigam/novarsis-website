import React from 'react'

function Button(props) {
    const { text, className, onclickfun, disabled = false } = props

    // const returnFunction = (e)=>{
    //     e.preventDefault();
    //     let timer;
    //     clearTimeout(timer);

    //     // Set a new timer to trigger the action after a delay
    //     timer = setTimeout(() => {
    //       // Action to perform after the delay (e.g., showing an alert)
    //       return onclickfun(e)
    //     }, 3000);


    // }
    return (
        <button 
            className={className} 
            onClick={(e) => onclickfun(e)}
            disabled={disabled}
        >
            { disabled ?  'Loading.....' : text}
        </button>
    )
}

export default Button;