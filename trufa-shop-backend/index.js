require('dotenv').config({ path: '../.env.producao' })

const https = require('https')
const fs = require('fs')
const app = require('./app')
const { createWebhook } = require('./lib/pix')

const options = {
  //tls
  key: fs.readFileSync(
    '/etc/letsencrypt/live/api-trufashop.leonardo-dev.tech/privkey.pem'
  ),
  cert: fs.readFileSync(
    '/etc/letsencrypt/live/api-trufashop.leonardo-dev.tech/fullchain.pem'
  ),

  // mtls
  ca: fs.readFileSync('./ca-gerencianet.crt'), // gerencianet
  minVersion: 'TLSv1.2',
  requestCert: true,
  rejectUnauthorized: false,
}

const server = https.createServer(options, app)
server.listen(443, () => {
  console.log('server running...')
  console.log('creating webhook for pix')
  createWebhook().then(() => {
    console.log('webhook created.')
  })
})
