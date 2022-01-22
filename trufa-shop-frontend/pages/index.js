import Prismic from 'prismic-javascript'

const Index = (props) => {
  return (
    <div>
      <h1>Trufa Shop</h1>
      <p>Olá!</p>
      <pre>{JSON.stringify(props, null, 2)}</pre>
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
