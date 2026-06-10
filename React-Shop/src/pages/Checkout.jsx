import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import '../styles/Checkout.css'

export const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, getTotalPrice, clearCart } = useCart()
  const { user } = useAuth()

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    cep: '',
    address: '',
    number: '',
    complement: '',
    city: '',
    state: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    installments: '1',
  })

  const [paymentMethod, setPaymentMethod] = useState('card')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds

  useEffect(() => {
    let timer
    if (paymentMethod === 'pix' && !orderPlaced) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [paymentMethod, orderPlaced])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validação básica
    const isCard = paymentMethod === 'card'
    const basicFields = formData.fullName && formData.email && formData.phone && 
                        formData.address && formData.city && formData.state

    if (!basicFields) {
      alert('Por favor, preencha todos os campos de entrega')
      return
    }

    if (isCard && (!formData.cardName || !formData.cardNumber)) {
      alert('Por favor, preencha as informações do cartão')
      return
    }

    // Simula processamento do pedido
    setOrderPlaced(true)
    setTimeout(() => {
      clearCart()
      navigate('/order-confirmation')
    }, 2000)
  }

  const total = getTotalPrice() + 10 - 5

  if (cartItems.length === 0) {
    return (
      <div className="checkout-error">
        <h1>Seu carrinho está vazio</h1>
        <button onClick={() => navigate('/')}>Voltar para Produtos</button>
      </div>
    )
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <h1>📋 Checkout</h1>

        {orderPlaced && (
          <div className="success-message">
            ✅ Pedido processando... Redirecionando...
          </div>
        )}

        <form onSubmit={handleSubmit} className="checkout-form">
          {/* Seção de Endereço */}
          <section className="form-section">
            <h2>📍 Endereço de Entrega</h2>

            <div className="form-group">
              <label htmlFor="fullName">Nome Completo *</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="Seu nome completo"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail *</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefone *</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="(11) 99999-9999"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cep">CEP</label>
              <input
                id="cep"
                type="text"
                name="cep"
                placeholder="12345-678"
                value={formData.cep}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address">Endereço *</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  placeholder="Rua, Avenida..."
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="number">Número *</label>
                <input
                  id="number"
                  type="text"
                  name="number"
                  placeholder="123"
                  value={formData.number}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="complement">Complemento</label>
              <input
                id="complement"
                type="text"
                name="complement"
                placeholder="Apto, Sala..."
                value={formData.complement}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">Cidade *</label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  placeholder="São Paulo"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">Estado *</label>
                <input
                  id="state"
                  type="text"
                  name="state"
                  placeholder="SP"
                  value={formData.state}
                  onChange={handleInputChange}
                  maxLength="2"
                  required
                />
              </div>
            </div>
          </section>

          {/* Seção de Pagamento */}
          <section className="form-section">
            <h2>💳 Método de Pagamento</h2>
            
            <div className="payment-method-selector">
              <label className={`method-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Cartão de Débito/Crédito</span>
              </label>

              <label className={`method-option ${paymentMethod === 'pix' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="pix"
                  checked={paymentMethod === 'pix'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Pix</span>
              </label>
            </div>

            {paymentMethod === 'card' ? (
              <div className="card-info fade-in">
                <div className="form-group">
                  <label htmlFor="cardName">Nome no Cartão *</label>
                  <input
                    id="cardName"
                    type="text"
                    name="cardName"
                    placeholder="Seu nome como está no cartão"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required={paymentMethod === 'card'}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cardNumber">Número do Cartão *</label>
                  <input
                    id="cardNumber"
                    type="text"
                    name="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    maxLength="19"
                    required={paymentMethod === 'card'}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cardExpiry">Validade *</label>
                    <input
                      id="cardExpiry"
                      type="text"
                      name="cardExpiry"
                      placeholder="MM/AA"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      maxLength="5"
                      required={paymentMethod === 'card'}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cardCVC">CVC *</label>
                    <input
                      id="cardCVC"
                      type="text"
                      name="cardCVC"
                      placeholder="123"
                      value={formData.cardCVC}
                      onChange={handleInputChange}
                      maxLength="3"
                      required={paymentMethod === 'card'}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="installments">Parcelas *</label>
                  <select
                    id="installments"
                    name="installments"
                    className="installments-select"
                    value={formData.installments}
                    onChange={handleInputChange}
                    required={paymentMethod === 'card'}
                  >
                    {[...Array(12)].map((_, i) => {
                      const count = i + 1
                      const installmentValue = (total / count).toFixed(2)
                      return (
                        <option key={count} value={count}>
                          {count}x de R$ {installmentValue} {count === 1 ? 'à vista' : 'sem juros'}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>
            ) : (
              <div className="pix-info fade-in">
                <div className="pix-qr-container">
                  <div className="qr-code-placeholder">
                    {/* Simplified QR Code placeholder */}
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ShopReactPayment" alt="Pix QR Code" />
                  </div>
                  <div className="pix-instructions">
                    <p>Escaneie o QR Code acima para pagar via Pix</p>
                    <div className="pix-timer">
                      O código expira em: <strong>{formatTime(timeLeft)}</strong>
                    </div>
                    {timeLeft === 0 && <p className="timer-expired">O tempo expirou. Por favor, atualize a página.</p>}
                  </div>
                </div>
                <div className="pix-copy-paste">
                  <label>Ou copie o código Pix:</label>
                  <div className="copy-box">
                    <code>00020126580014BR.GOV.BCB.PIX013663a87...</code>
                    <button type="button" onClick={() => alert('Código copiado!')}>Copiar</button>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Resumo do Pedido */}
          <section className="order-summary">
            <h2>Resumo do Pedido</h2>
            <div className="summary-items">
              {cartItems.map(item => (
                <div key={item.cartId} className="summary-item">
                  <div className="summary-item-info">
                    <span>{item.title}</span>
                    {item.selectedSize && <small>Tamanho: {item.selectedSize}</small>}
                  </div>
                  <span>x{item.quantity}</span>
                  <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>R$ {getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Frete:</span>
                <span>R$ 10,00</span>
              </div>
              <div className="total-row discount">
                <span>Desconto:</span>
                <span>-R$ 5,00</span>
              </div>
              <div className="total-row final">
                <span>Total:</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>
          </section>

          <button type="submit" className="submit-btn" disabled={orderPlaced || (paymentMethod === 'pix' && timeLeft === 0)}>
            {orderPlaced ? '✅ Processando...' : 'Finalizar Pedido'}
          </button>
        </form>
      </div>
    </main>
  )
}

