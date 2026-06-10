import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      try {
        return JSON.parse(storedCart)
      } catch (error) {
        console.error('Failed to parse cart:', error)
        return []
      }
    }
    return []
  })

  // Salva carrinho no localStorage quando muda
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, selectedSize = null) => {
    // Generate a unique ID for each entry in the cart to allow duplicates
    const cartEntry = {
      ...product,
      cartId: Date.now() + Math.random().toString(36).substring(2, 9),
      quantity: 1,
      selectedSize: selectedSize
    }
    setCartItems(prevItems => [...prevItems, cartEntry])
  }

  const removeFromCart = (cartId) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartId !== cartId))
  }

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId)
    } else {
      setCartItems(prevItems => prevItems.map(item =>
        item.cartId === cartId ? { ...item, quantity } : item
      ))
    }
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider')
  }
  return context
}
