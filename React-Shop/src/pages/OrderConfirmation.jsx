import { Link } from 'react-router-dom'
import '../styles/OrderConfirmation.css'

export const OrderConfirmation = () => {
  const orderNumber = Math.random().toString(36).substring(2, 9).toUpperCase()
  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 7)

  return (
    <main className="confirmation-page">
      <div className="confirmation-container">
        <div className="success-icon">✅</div>
        
        <h1>Pedido Confirmado!</h1>
        
        <p className="confirmation-message">
          Obrigado por sua compra! Seu pedido foi recebido com sucesso.
        </p>

        <div className="order-details">
          <div className="detail-row">
            <span className="label">Número do Pedido:</span>
            <span className="value">{orderNumber}</span>
          </div>
          
          <div className="detail-row">
            <span className="label">Status:</span>
            <span className="value status">🚚 Em Processamento</span>
          </div>
          
          <div className="detail-row">
            <span className="label">Entrega Estimada:</span>
            <span className="value">{deliveryDate.toLocaleDateString('pt-BR')}</span>
          </div>

          <div className="detail-row">
            <span className="label">Confirmação enviada para:</span>
            <span className="value">seu@email.com</span>
          </div>
        </div>

        <div className="next-steps">
          <h3>📬 Próximos Passos</h3>
          <ul>
            <li>✓ Você receberá um e-mail de confirmação em breve</li>
            <li>✓ Acompanhe seu pedido na sua conta</li>
            <li>✓ O rastreamento será enviado quando o pedido for despachado</li>
            <li>✓ Você tem 30 dias para devolver se não estiver satisfeito</li>
          </ul>
        </div>

        <div className="action-buttons">
          <Link to="/" className="continue-btn">
            Continuar Comprando
          </Link>
          <Link to="/orders" className="track-btn">
            Acompanhar Pedidos
          </Link>
        </div>
      </div>
    </main>
  )
}
