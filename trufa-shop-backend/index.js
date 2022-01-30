const express = require('express')
const cors = require('cors')
const { saveOrder } = require('./lib/spreadsheet')
const { createPixCharge } = require('./lib/pix')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send({ ok: true })
})
app.post('/create-order', async (req, res) => {
  const pixCharge = await createPixCharge(req.body)
  const { qrcode, cobranca } = pixCharge
  await saveOrder({ ...req.body, id: cobranca.txid })
  res.send({ ok: 1, qrcode, cobranca })
})

app.listen(3001, (err) => {
  if (err) {
    console.log('Servidor não iniciado.')
    console.log(err)
  } else {
    console.log('Servidor do TrufaShop rodando na porta: 3001')
  }
})
