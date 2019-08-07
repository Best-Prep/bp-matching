import React from 'react';

import {Button, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/styles';
const useStyles = makeStyles(theme => ({
    container: {
      // display: 'flex',
      margin: theme.spacing(1),
      // flexWrap: 'wrap',
    },
    textField:{
      margin: theme.spacing(2)
    },
    formControl: {
      minWidth: 120,
    },
    button: {
      margin: theme.spacing(1.5),
    },
  }));
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1)
var dd = String(tomorrow.getDate()).padStart(2, '0');
var mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = tomorrow.getFullYear();
tomorrow = yyyy + '-' + mm + '-' + dd;
let careerDayDate = tomorrow
const SheetForm = (props) => {
    const classes = useStyles();
    return (
      <div>
            <TextField
              id="date"
              label="Date of Career Day"
              type="date"
              defaultValue={tomorrow}
              onChange={event => careerDayDate = event.target.value}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
                name="sheetsLink"
                label="Link to spreadsheet"
                className={classes.textField}
                value={props.sheetLink}
                onChange={props.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
            />
            <TextField
              id="period"
              label="Periods"
              type="number"
              defaultValue={1}
              value={props.periods}
              className={classes.textField}
              onChange={props.handleChange}
              InputProps={{ inputProps: { type: 'number', min:1 } }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button variant="contained" color="primary" className={classes.button} onClick={(event) => props.handleSubmit(careerDayDate)}>
              Submit
            </Button>
      </div>
    )
}

export default withTheme(SheetForm)
