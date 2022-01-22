require('dotenv').config({ path: '../.env.homologacao' })

const https = require('https')
const axios = require('axios')
const fs = require('fs')

const apiProduction = 'https://api-pix.gerencianet.com.br'
const apiStaging = 'https://api-pix-h.gerencianet.com.br'

const baseUrl = process.env.GN_ENV === 'producao' ? apiProduction : apiStaging

const getToken = async () => {
  const certificado = fs.readFileSync('../' + process.env.GN_CERTIFICADO)
  const credenciais = {
    client_id: process.env.GN_CLIENT_ID,
    client_secret: process.env.GN_CLIENT_SECRET,
  }
  const data = JSON.stringify({ grant_type: 'client_credentials' })
  const dataCredenciais =
    credenciais.client_id + ':' + credenciais.client_secret
  const auth = Buffer.from(dataCredenciais).toString('base64')

  const agent = new https.Agent({
    pfx: certificado,
    passphrase: '',
  })

  const config = {
    method: 'POST',
    url: baseUrl + '/oauth/token',
    headers: {
      Authorization: 'Basic ' + auth,
      'Content-type': 'application/json',
    },
    httpsAgent: agent,
    data: data,
  }
  const result = await axios(config)
  return result.data
}

const createCharge = async (accessToken, chargeData) => {
  const certificado = fs.readFileSync('../' + process.env.GN_CERTIFICADO)
  const data = JSON.stringify(chargeData)

  const agent = new https.Agent({
    pfx: certificado,
    passphrase: '',
  })

  const config = {
    method: 'POST',
    url: baseUrl + '/v2/cob',
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-type': 'application/json',
    },
    httpsAgent: agent,
    data: data,
  }
  const result = await axios(config)
  return result
}

const run = async () => {
  const token = await getToken()
  const accessToken = token.access_token

  const cob = {
    calendario: {
      expiracao: 3600,
    },
    devedor: {
      cpf: '12345678909',
      nome: 'Leonardo Costa Santos',
    },
    valor: {
      original: '130.50',
    },
    chave: '000',
    solicitacaoPagador: 'Cobranca dos serviços prestados',
  }

  const cobranca = await createCharge(accessToken, cob)
}
run()
