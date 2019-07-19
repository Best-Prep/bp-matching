# Table of Contents
- [Table of Contents](#Table-of-Contents)
  - [**Route: /api/import/getSheetData**](#Route-apiimportgetSheetData)
  - [Expected Request Parameters (JSON)](#Expected-Request-Parameters-JSON)
  - [Environmental Variables](#Environmental-Variables)
  - [Response](#Response)
  - [Usage](#Usage)
  - [Packages Used](#Packages-Used)

## **Route:  /api/import/getSheetData**

## Expected Request Parameters (JSON)
    - body
      - sheetLink
      - careerDayDate : String mm/dd/yyyy
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
