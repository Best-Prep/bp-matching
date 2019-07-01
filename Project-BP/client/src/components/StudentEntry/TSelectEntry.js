import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { Grid } from '@material-ui/core';
import Dropdown from '../Dropdown/Dropdown';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const TSelectEntry = (props) => {
    //TODO : write onChange logic once backend is done
    //TODO : props.teachers will be the array of teachers, change menuItems to this
    const classes = useStyles();
    return (
        <div>
            <Grid>
                <Grid container item spacing={2}>
                    <Grid item xs={6}>
                        <Dropdown name="Teachers" id="teacher-dropdown" menuItems={["Bob","Joe","John"]}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                          name="numStudents"
                          label="# of Students"
                          className={classes.textField}
                          value={props.numStudents}
                          onChange={props.handleChange}
                          margin="normal"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default TSelectEntry

