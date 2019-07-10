import React from 'react'
import StepInstructions from '../../../molecules/step_instructions/StepInstructions'
import SubjectAdd from '../../../molecules/subject_add/SubjectAdd'
const step2 = (props) => {
    return (
        <div>
            <StepInstructions headerText={props.headerText} subText={props.subText}/>
            <SubjectAdd subjectName={props.subjectName} handleChange={props.handleChange}/>
        </div>
    )
}

export default step2
