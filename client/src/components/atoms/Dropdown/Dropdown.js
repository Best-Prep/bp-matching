import React from 'react'
import { Select, MenuItem } from '@material-ui/core';

//<Dropdown name="teachers" id="teacher-dropdown" menuItems=["Bob","Joe", "John Doe"] handleChange = this.handleChange value = some_value_in_state

//TODO: Possibly add the ability to provide a width prop

const Dropdown = (props) => {
    return (
        <div>
            <Select
                value={props.value}
                onChange={(e) => props.handleChange(props.studentIndex,props.classIndex,e)}
            >
                <MenuItem value={props.value}>
                    {props.value}
                </MenuItem>
                {props.menuItems.map((item,index) => (
                    <MenuItem value={item} key={item+index} >{item}</MenuItem>
                ))}
        </Select>
        </div>
    )
}

export default Dropdown
