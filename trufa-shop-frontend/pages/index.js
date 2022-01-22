import Prismic from 'prismic-javascript'

const Index = (props) => {
  const { products } = props
  return (
    <div className='h-screen bg-gray-100'>
      <h1>Trufa Shop</h1>
      <main class='flex flex-row flex-wrap space-y-2 space-x-2'>
        {products.map((product) => (
          <section class='flex flex-col md:flex-row py-10 px-5 bg-white rounded-md shadow-lg w-1/3'>
            <div class='text-indigo-500 flex flex-col justify-between'>
              <img src={product.data.image.url} alt='' />
            </div>
            <div class='text-indigo-500'>
              <small class='uppercase'>Trufados</small>
              <h3 class='uppercase text-black text-2xl font-medium'>
                {product.data.name}
              </h3>
              <h3 class='text-2xl font-semibold mb-7'>
                R$ {product.data.price}
              </h3>
              <div class='flex gap-0.5 mt-4'>
                <button
                  id='addToCartButton'
                  class='bg-indigo-600 hover:bg-indigo-500 focus:outline-none transition text-white uppercase px-8 py-3'
                >
                  Adicionar no Carrinho
                </button>
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
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
