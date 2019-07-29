import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    paper: {
        margin: theme.spacing(4),
    },
    button: {
        margin: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
}));

const SubjectCard = (props) => {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
                <TextField
                    name="name"
                    label="Subject"
                    value={props.subjectName}
                    onChange={(event) => props.handleChange(event, props.index)}
                    
                />
                <TextField
                    name="seats"
                    label="Seats"
                    placeholder= "0"
                    value={props.seats}
                    InputProps={{ inputProps: { type: 'number', min:0 } }}
                    onChange={(event) => props.handleChange(event, props.index)}
                    
                />
        </Paper>
    )
}

export default SubjectCard
