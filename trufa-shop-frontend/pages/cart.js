import Head from 'next/head'
import Prismic from 'prismic-javascript'
import { useCart } from '../components/CartContex'
import Header from '../components/Header'
import Product from '../components/Product'
import { useFormik } from 'formik'

const Index = ({ products }) => {
  const cart = useCart()
  const form = useFormik({
    initialValues: {
      cpf: '',
      nome: '',
      telefone: '',
    },
    onSubmit: async (values) => {
      console.log(values)
    },
  })
  const remove = (id) => () => {
    cart.removeFromCart(id)
  }
  const changeQuantity = (id) => (evt) => {
    cart.changeQuantity(id, Number(evt.target.value))
  }
  const itemsCount = Object.keys(cart.cart).reduce((prev, curr) => {
    return prev + cart.cart[curr].quantity
  }, 0)
  const total = Object.keys(cart.cart).reduce((prev, curr) => {
    return Number(
      prev + cart.cart[curr].quantity * cart.cart[curr].product.data.price
    )
      .toFixed(2)
      .replace('.', ',')
  }, 0)
  return (
    <>
      <Head>
        <title>Carrinho TrufaShop</title>
      </Head>
      <Header />

      <div class='flex justify-center my-6'>
        <div class='flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5'>
          <div class='flex-1'>
            <table class='w-full text-sm lg:text-base' cellspacing='0'>
              <thead>
                <tr class='h-12 uppercase'>
                  <th class='hidden md:table-cell'></th>
                  <th class='text-left'>Produto</th>
                  <th class='lg:text-right text-left pl-5 lg:pl-0'>
                    <span class='lg:hidden' title='Quantity'>
                      Qtd
                    </span>
                    <span class='hidden lg:inline'>Quantidade</span>
                  </th>
                  <th class='hidden text-right md:table-cell'>
                    Preço unitário
                  </th>
                  <th class='text-right'>Preço total</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(cart.cart).map((key) => {
                  const { product, quantity } = cart.cart[key]
                  return (
                    <tr key={key}>
                      <td class='hidden pb-4 md:table-cell'>
                        <a href='#'>
                          <img
                            src={product.data.image.url}
                            class='w-20 rounded'
                            alt={product.data.name}
                          />
                        </a>
                      </td>
                      <td>
                        <p class='mb-2 md:ml-4'>{product.data.name}</p>
                        <button
                          type='submit'
                          class='text-gray-700 md:ml-4'
                          onClick={remove(key)}
                        >
                          <small>(Remover item)</small>
                        </button>
                      </td>
                      <td class='justify-center md:justify-end md:flex mt-6'>
                        <div class='w-20 h-10'>
                          <div class='relative flex flex-row w-full h-8'>
                            <input
                              type='number'
                              defaultValue={quantity}
                              onBlur={changeQuantity(key)}
                              class='w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black'
                            />
                          </div>
                        </div>
                      </td>
                      <td class='hidden text-right md:table-cell'>
                        <span class='text-sm lg:text-base font-medium'>
                          R${' '}
                          {Number(product.data.price)
                            .toFixed(2)
                            .replace('.', ',')}
                        </span>
                      </td>
                      <td class='text-right'>
                        <span class='text-sm lg:text-base font-medium'>
                          R${' '}
                          {Number(product.data.price * quantity)
                            .toFixed(2)
                            .replace('.', ',')}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <hr class='pb-6 mt-6' />
            <div class='my-4 mt-6 -mx-2 lg:flex'>
              <div class='lg:px-2 lg:w-1/2'>
                <div class='p-4 bg-gray-100 rounded-full'>
                  <h1 class='ml-2 font-bold uppercase'>Seus dados</h1>
                </div>
                <div class='p-4'>
                  <p class='mb-4 italic'>
                    Por favor, informe seus dados abaixo para concluir.
                  </p>
                  <div class='justify-center'>
                    <form onSubmit={form.handleSubmit}>
                      <div class='my-1 flex items-center w-full h-13 pl-3 bg-white bg-gray-100 border rounded-full'>
                        <label className='w-1/4'>Seu nome</label>
                        <input
                          type='text'
                          name='nome'
                          id='nome'
                          value={form.values.nome}
                          onChange={form.handleChange}
                          class='w-3/4 p-4 outline-none appearance-none focus:outline-none active:outline-none bg-gray-100 border rounded-full'
                        />
                      </div>
                      <div class='my-1 flex items-center w-full h-13 pl-3 bg-white bg-gray-100 border rounded-full'>
                        <label className='w-1/4'>Seu CPF</label>
                        <input
                          type='text'
                          name='cpf'
                          id='cpf'
                          value={form.values.cpf}
                          onChange={form.handleChange}
                          class='w-3/4 p-4 outline-none appearance-none focus:outline-none active:outline-none bg-gray-100 border rounded-full'
                        />
                      </div>
                      <div class='my-1 flex items-center w-full h-13 pl-3 bg-white bg-gray-100 border rounded-full'>
                        <label className='w-1/4'>Seu telefone</label>
                        <input
                          type='text'
                          name='telefone'
                          id='telefone'
                          value={form.values.telefone}
                          onChange={form.handleChange}
                          class='w-3/4 p-4 outline-none appearance-none focus:outline-none active:outline-none bg-gray-100 border rounded-full'
                        />
                      </div>
                      <button class='flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none'>
                        <svg
                          aria-hidden='true'
                          data-prefix='far'
                          data-icon='credit-card'
                          class='w-8'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 576 512'
                        >
                          <path
                            fill='currentColor'
                            d='M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z'
                          />
                        </svg>
                        <span class='ml-2 mt-5px'>Concluir pedido</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div class='lg:px-2 lg:w-1/2'>
                <div class='p-4 bg-gray-100 rounded-full'>
                  <h1 class='ml-2 font-bold uppercase'>Seu pedido</h1>
                </div>
                <div class='p-4'>
                  <div class='flex justify-between border-b'>
                    <div class='lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800'>
                      Quantidade de trufas
                    </div>
                    <div class='lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900'>
                      {itemsCount}
                    </div>
                  </div>
                  <div class='flex justify-between pt-4 border-b'>
                    <div class='lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800'>
                      Total
                    </div>
                    <div class='lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900'>
                      R$ {total}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export async function getServerSideProps({ res }) {
  const client = Prismic.client('https://mytrufashop.prismic.io/api/v2')
  const products = await client.query(
    Prismic.Predicates.at('document.type', 'product')
  )
  return {
    props: {
      date: Date.now(),
      products: products.results,
    },
  }
}
export default Index
