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
  await sheet.addRows([
    {
      'Pedido:': 123,
      'Nome Cliente:': 'Tulio Faria POC',
      'Telefone Cliente:': '55 66666666',
      'Produto:': 'Trufa Uva',
      'Quantidade:': 5,
      'Subtotal:': 5,
      'Total Pedido:': 5,
      'Status:': 'Aguardando Pagamento',
    },
  ])
}
run()
