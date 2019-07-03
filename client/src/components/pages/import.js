import React, { useState } from 'react'

import Swal from 'sweetalert2'
import axios from 'axios'
import SheetsForm from '../organisms/sheets_link_form/sheets_link_form'


const Import = (props) => {
    const [sheetLink, setSheetLink] = useState("")
    const handleChange = event => {
        setSheetLink(event.target.value);
    }
    const handleSubmit = (event) => {
        //TODO: add functionality to actually submit to the express server / mongo
        axios.post('/api/spreadsheets/importSheet', {
            sheetLink: sheetLink,
          })
          .then(function (response) {
            Swal.fire({
                type: 'success',
                title: 'Success!',
                text: 'The spreadsheet you have linked has been submitted:  ' + response.data.id,
                footer: 'Note: this is a demo, no upload has actually taken place',
                onClose: () => {
                    props.history.push('/Override')
                }
            })
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    
    return (
        <div>
            <SheetsForm handleChange={handleChange} sheetsLink={sheetLink} handleSubmit={handleSubmit}/>
        </div>
    )
}

export default Import
