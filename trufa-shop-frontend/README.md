# Trufashop

Este projeto foi construído durante a Formação Fullstack Master do [DevPleno](https://devpleno.com).

Um sistema simples em que o usuário é capaz de realizar um pedido e pagar-lo com PIX através de um QRCode que é gerado na tela.

Ao realizar o pedido, o mesmo é salvo em uma planilha online do Google e nessa planilha o vendedor consegue acompanhar os pedidos, bem como o status de pagamento.

Este sistema foi integrado a API de pagamentos da empresa [Gerencianet](https://sistema.gerencianet.com.br/).

![cap1](https://user-images.githubusercontent.com/31082603/152617667-45e50668-58bf-44e2-a016-0cd11efcf401.png)

## Início

### Pré-requisitos:

Você precisa do NodeJS e NPM e instalados em sua máquina.

Backend:

```
npm install
node index-dev.js
```

Frontend:

```
npm install
npm run dev
```

É necessário criar as variáveis de ambiente para configurar o acesso as planilhas do Google:

```
SHEET_CLIENT_EMAIL=client email do service credential
SHEET_PRIVATE_KEY=private key do service credential - lembrar de substituir \n por quebras de linha e de codificar em base 64
SHEET_DOC_ID=id da planilha
```

É necessário as chaves de acesso no site da [Gerencianet](https://sistema.gerencianet.com.br/) de a documentação disponível em [Documentação](https://dev.gerencianet.com.br/docs/api-pix-introducao).

```
GN_ENV=producao | homologacao
GN_CLIENT_ID=<Gerencianet ClientID>
GN_CLIENT_SECRET=<Gerencianet ClientSecret>
GN_CERTIFICADO=developer1232.p12
CHAVE_pix=aaa
EMAIL_GOOGLE_API=trufashop@trufa-shop-339300.iam.gserviceaccount.com
```

## Construído com:

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Next](https://nextjs.org/) - The React Framework
  for Production.
- [Express](https://expressjs.com/pt-br/) - Express is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications.
- [Tailwindcss](https://tailwindcss.com/) - Rapidly build modern websites without ever leaving your HTML.

## Como contribuir para o projeto:

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`
   > Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](./CONTRIBUTING.md)

## Author:

- **Tulio Faria** - [LinkedIn](https://www.linkedin.com/in/tuliofaria/)

- **Leonardo Costa** - [LinkedIn](https://www.linkedin.com/in/leonardocostasantos/)

## Licença

Este projeto é licenciado sobre a licença MIT - veja [LICENSE.md](LICENSE.md) para mais informações.

## Acknowledgments

- Este projeto foi construído durante a formação Fullstack Master do [DevPleno](https://devpleno.com).
