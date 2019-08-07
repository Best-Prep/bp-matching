# Table of Contents
- [Table of Contents](#table-of-contents)
  - [**Route: /api/careerDay/getSheetData**](#route-apicareerdaygetsheetdata)
  - [Expected Request Parameters (JSON)](#expected-request-parameters-json)
  - [Environmental Variables](#environmental-variables)
  - [Response](#response)
  - [Usage](#usage)
  - [Packages Used](#packages-used)

## **Route:  /api/careerDay/getSheetData**
Is 
## Expected Request Parameters (JSON)
    - body
      - sheetLink
      - careerDayDate : String yyyy-mm-dd
## Environmental Variables
    - DOCS_CLIENT_URL : String
    - DOCS_PRIVATE_KEY : String
## Response
    - Type: JSON
    - Format:
       {
           "message": String,
           "careerDay": {<Career Day Object, empty subjects and sessions object>},
           "registeringClasses": [{<RegisteringClass Object>}],
           "schools": [{<School Object>}],
       }

## Usage

## Packages Used
- [google-spreadsheet](https://www.npmjs.com/package/google-spreadsheet "google-spreadsheet's NPM Page")
- [Promisify](https://www.npmjs.com/package/promisify "Promisify's NPM Page")
- [uniqid](https://www.npmjs.com/package/promisify "uniqid's NPM Page")
