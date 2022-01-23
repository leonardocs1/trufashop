import { createContext, useContext, useState } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({})
  const addToCart = (product) => {
    setCart((old) => {
      let quantity = 0
      if (old[product.id]) {
        quantity = old[product.id].quantity
      }
      return {
        ...old,
        [product.id]: {
          quantity: quantity + 1,
          product,
        },
      }
    })
  }
  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}
export const useCart = () => {
  const cart = useContext(CartContext)
  return cart
}
