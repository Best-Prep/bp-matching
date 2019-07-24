import React from 'react'
import SheetForm from '../sheets_link_form/sheets_link_form';
import StepInstructions from '../../molecules/step_instructions/StepInstructions';

const step1 = (props) => {
    return (
        <div>
            <StepInstructions headerText={props.instructionHeader} subText={props.instructions}/>
            <SheetForm handleChange={props.handleChange} sheetsLink={props.sheetLink} periods={props.periods} handleSubmit={props.handleSubmit}/>
        </div>
    )
}

export default step1
