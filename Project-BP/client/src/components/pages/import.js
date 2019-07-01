import React, { useState } from 'react'

import SheetsForm from '../organisms/sheets_link_form/sheets_link_form'
import Swal from 'sweetalert2'

const Import = (props) => {
    const [sheetLink, setSheetLink] = useState("")
    const handleChange = event => {
        setSheetLink(event.target.value);
    }
    const handleSubmit = (event) => {
        //TODO: add functionality to actually submit to the express server / mongo
        Swal.fire({
            type: 'success',
            title: 'Success!',
            text: 'The spreadsheet you have linked has been submitted',
            footer: 'Note: this is a demo, no upload has actually taken place',
            onClose: () => {
                props.history.push('/Override')
            }
        })
    }
    
    return (
        <div>
            <SheetsForm handleChange={handleChange} sheetsLink={sheetLink} handleSubmit={handleSubmit}/>
        </div>
    )
}

export default Import
