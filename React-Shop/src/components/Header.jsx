import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import '../styles/Header.css'

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const { getTotalItems } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>🛍️ Bem-Vindo à sua loja virtual!</h1>
        </Link>

        <nav className="nav">
          <Link to="/">Produtos</Link>
          <Link to="/cart">
            Carrinho <span className="cart-badge">{getTotalItems()}</span>
          </Link>

          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-name">Olá, {user?.name}!</span>
              <button onClick={handleLogout} className="logout-btn">
                Sair
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-link">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
