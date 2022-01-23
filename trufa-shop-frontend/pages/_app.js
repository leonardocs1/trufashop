import 'tailwindcss/tailwind.css'
import { CartProvider } from '../components/CartContex'

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp
