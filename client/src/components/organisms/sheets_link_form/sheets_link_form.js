import React from 'react';

import {Button, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
      // display: 'flex',
      margin: theme.spacing(1),
      // flexWrap: 'wrap',
    },
    formControl: {
      minWidth: 120,
    },
    button: {
      margin: theme.spacing(1.5),
    },
  }));
const SheetForm = (props) => {
    const classes = useStyles();
    return (
      <div>
            <TextField
                name="sheetsLink"
                label="Link to spreadsheet"
                className={classes.textField}
                value={props.sheetLink}
                onChange={props.handleChange}
                margin=""
            />
            <Button variant="contained" color="primary" className={classes.button} onClick={props.handleSubmit}>
              Submit
            </Button>
      </div>
    )
}

export default SheetForm
