import React, { Component } from 'react'
import TSelectEntry from './TSelectEntry';
import { Grid } from '@material-ui/core';
export default class StudentEntryView extends Component {
    state = {
        numStudents: 0
    }
    handleChange = e =>{
        this.setState({[e.target.name]: e.target.value})
    }
    render() {
        return (
            <div>
                <Grid spacing={12}>
                    <Grid item>
                        <TSelectEntry numStudents={this.state.numStudents} handleChange={this.handleChange}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
