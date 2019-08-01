import React from 'react'
import StepInstructions from '../../molecules/step_instructions/StepInstructions'
import SubjectAdd from '../../molecules/subject_card/SubjectCard'
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { Hidden } from '@material-ui/core';

//TODO: styling and also create a local variable to hold the values of the subject cards, that way the screen doesnt have to rerender every time
//TODO: Add uniq id to subject when new one is added
const UseStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(4),
    },
  }));

//Step Instructions takes in 2 props, headerText (Instruction Header) and subText (Instructions)
const step2 = (props) => {
    const classes = UseStyles();
    return (
        <div>
            <StepInstructions headerText={props.instructionHeader} subText={props.instructions}/>
            {props.subjects.map((subject, index) => {
                return(
                    <SubjectAdd
                        key={subject + index}
                        subjectName={subject.name}
                        seats={subject.seats}
                        index={index}
                        handleChange={props.handleChange}
                    />
                )
            })}
        </div>
    )
}

export default step2
