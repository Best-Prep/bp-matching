import React from 'react'

const subTextStyle = {
    color: '#706f6f'
}
const headerTextStyle = {
    color: '#363636'
}
const StepInstructions = (props) => {
    return (
        <div>
            <h1 style={headerTextStyle}>{props.headerText}</h1>
            <h4 style={subTextStyle}>{props.subText}</h4>
        </div>
    )
}

export default StepInstructions
