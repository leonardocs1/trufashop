import Prismic from 'prismic-javascript'
import { useCart } from '../components/CartContex'
import Header from '../components/Header'
import Product from '../components/Product'

const Index = ({ products }) => {
  const cart = useCart()
  return (
    <>
      <Header />
      <div className='mt-6'>
        <main class='grid grid-flow-col grid-cols-3 gap-2'>
          {products.map((product) => (
            <Product product={product} />
          ))}
        </main>
      </div>
      <pre>{JSON.stringify(cart.cart, null, 2)}</pre>
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
