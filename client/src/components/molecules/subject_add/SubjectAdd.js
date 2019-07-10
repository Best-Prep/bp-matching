import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const SubjectAdd = (props) => {
    return (
        <Paper>
            <TextField
                label="Subject"
                value={props.subjectName}
                onChange={props.handleChange(props.index)}
                margin="normal"
            />
        </Paper>
    )
}

export default SubjectAdd
