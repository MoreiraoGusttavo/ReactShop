import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../styles/Login.css'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Por favor, preencha todos os campos')
      return
    }

    if (!email.includes('@')) {
      setError('Por favor, insira um e-mail válido')
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      return
    }

    const success = login(email, password)
    if (success) {
      navigate('/')
    } else {
      setError('Erro ao fazer login. Tente novamente.')
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Bem-vindo à ShopReact</h1>
        <p className="subtitle">Faça login para continuar</p>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>

          <button type="submit" className="login-btn">
            Entrar
          </button>
        </form>

        <div className="login-info">
          <p>📝 Para testar, use qualquer e-mail e senha com mais de 6 caracteres</p>
          <p>Exemplo: test@email.com / senha123</p>
        </div>
      </div>
    </div>
  )
}
