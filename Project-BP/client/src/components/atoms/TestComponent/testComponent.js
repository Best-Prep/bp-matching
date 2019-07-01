import React from 'react'

const TestComponent = (props) => {
    return(
        <div>
            <p>The number doubled is: {props.number * 2}</p>
        </div>
    )
}

export default TestComponent;