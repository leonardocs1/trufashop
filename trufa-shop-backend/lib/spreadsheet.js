require('dotenv').config({ path: '../.env.producao' })

const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciais = require('../../credenciais.json')

const doc = new GoogleSpreadsheet(
  '1beFlGzcCtXBKgq0gePQFknqSsp9MDkf-z2mbum6XKMU'
)

const saveOrder = async (order) => {
  await doc.useServiceAccountAuth({
    client_email: process.env.EMAIL_GOOGLE_API,
    private_key: credenciais.private_key,
  })
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[1]
  const orderId = order.id
  const total = order.items.reduce((prev, curr) => {
    return prev + curr.price * curr.quantity
  }, 0)
  const rows = order.items.map((item) => {
    const row = {
      'Pedido:': orderId,
      'Nome Cliente:': order.nome,
      'Telefone Cliente:': order.telefone,
      'Produto:': item.name,
      'Valor unitário:': item.price,
      'Quantidade:': item.quantity,
      'Subtotal:': item.price * item.quantity,
      'Total Pedido:': total,
      'Status:': 'Aguardando Pagamento',
      CPF: order.cpf,
    }
    return row
  })
  await sheet.addRows(rows)
}

const updateOrder = async (orderId, status) => {
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

module.exports = {
  saveOrder,
  updateOrder,
}
