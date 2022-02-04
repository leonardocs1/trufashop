const express = require('express')
const cors = require('cors')
const { saveOrder, updateOrder, getOrder } = require('./lib/spreadsheet')
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
app.get('/order/:txid', async (req, res) => {
  const status = await getOrder(req.params.txid)
  res.send({ ok: req.params.txid, status })
})
app.post('/webhook/pix*', async (req, res) => {
  console.log('webhook received')
  const { pix } = req.body
  if (!req.client.authorized) {
    return res.status(401).send('Invalid client certificate.')
  }
  if (pix) {
    for await (const order of pix) {
      await updateOrder(order.txid, 'Pago com PIX')
    }
  }
  res.send({ ok: 1 })
})
module.exports = app
