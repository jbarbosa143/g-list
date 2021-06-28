import React from 'react'

function Button({buttonName, func = ()=>{}, id}) {
    return (
        <React.Fragment>
            <button onClick={()=>func()} id={id}>{buttonName}</button>
        </React.Fragment>
    )
}

export default Button;