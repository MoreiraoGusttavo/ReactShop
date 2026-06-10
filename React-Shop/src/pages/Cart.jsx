import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import '../styles/Cart.css'

export const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Você precisa fazer login para continuar')
      navigate('/login')
      return
    }
    navigate('/checkout')
  }

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="empty-cart">
          <h1>🛒 Carrinho Vazio</h1>
          <p>Seu carrinho está vazio. Que tal adicionar alguns produtos?</p>
          <Link to="/" className="continue-shopping-btn">
            Continuar Comprando
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        <h1>🛒 Seu Carrinho</h1>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.cartId} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="item-details">
                  <h3>{item.title}</h3>
                  {item.selectedSize && (
                    <p className="item-size">Tamanho: <strong>{item.selectedSize}</strong></p>
                  )}
                  <p className="item-price">R$ {item.price.toFixed(2)}</p>
                </div>

                <div className="item-quantity">
                  <button
                    onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                    className="qty-btn"
                  >
                    −
                  </button>
                  <span className="qty-display">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>

                <div className="item-total">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => removeFromCart(item.cartId)}
                  className="remove-btn"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Resumo do Pedido</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>R$ {getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Frete:</span>
              <span>R$ 10,00</span>
            </div>
            <div className="summary-row discount">
              <span>Desconto:</span>
              <span>-R$ 5,00</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>R$ {(getTotalPrice() + 10 - 5).toFixed(2)}</span>
            </div>
            <button onClick={handleCheckout} className="checkout-btn">
              Ir para Checkout
            </button>
            <Link to="/" className="continue-shopping-btn">
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
