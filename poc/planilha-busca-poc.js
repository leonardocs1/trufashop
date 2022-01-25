require('dotenv').config({ path: '../.env.homologacao' })
const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciais = require('../credenciais.json')

const doc = new GoogleSpreadsheet(
  '1beFlGzcCtXBKgq0gePQFknqSsp9MDkf-z2mbum6XKMU'
)

const run = async () => {
  await doc.useServiceAccountAuth({
    client_email: process.env.EMAIL_GOOGLE_API,
    private_key: credenciais.private_key,
  })
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[1]
  const maxRows = sheet.rowCount
  await sheet.loadCells('A1:A' + maxRows - 1)
  await sheet.loadCells('H1:H' + maxRows - 1)
  const validIndex = [...Array(maxRows).keys()]

  const orderId = 123
  const status = 'Pago com Pix'

  for await (const i of validIndex) {
    const cell = await sheet.getCell(i, 0)
    if (cell.value) {
      if (cell.value === orderId) {
        const statusCell = await sheet.getCell(i, 7)
        statusCell.value = status
      }
    } else {
      break
    }
  }
  await sheet.saveUpdatedCells()
}
run()
