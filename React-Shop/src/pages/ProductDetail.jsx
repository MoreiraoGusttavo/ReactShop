import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productService } from '../services/productService'
import { useCart } from '../contexts/CartContext'
import '../styles/ProductDetail.css'

export const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        const data = await productService.getProductById(id)
        setProduct(data)
        // If product has sizes, don't set a default one to force user selection
      } catch {
        setError('Erro ao carregar produto')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      alert('Por favor, selecione um tamanho')
      return
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize)
    }
    alert(`${quantity} produto(s) adicionado(s) ao carrinho!`)
    navigate('/')
  }

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x400?text=Produto'
  }

  if (loading) return <div className="loading">⏳ Carregando...</div>
  if (error) return <div className="error">{error}</div>
  if (!product) return <div className="not-found">❌ Produto não encontrado</div>

  return (
    <main className="product-detail-page">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Voltar
      </button>

      <div className="product-detail-container">
        <div className="product-image-section">
          <img src={product.image} alt={product.title} className="product-detail-image" onError={handleImageError} />
        </div>

        <div className="product-detail-info">
          <h1>{product.title}</h1>
          
          <div className="rating">
            <span className="stars">{'⭐'.repeat(Math.round(product.rating?.rate || 4))}</span>
            <span className="rate-info">
              {product.rating?.rate || 4}/5 ({product.rating?.count || 0} avaliações)
            </span>
          </div>

          <div className="category-badge">{product.category}</div>

          <p className="description">{product.description}</p>

          <div className="price-section">
            <span className="price">R$ {product.price.toFixed(2)}</span>
          </div>

          {product.sizes && (
            <div className="size-section">
              <label>Escolha o tamanho:</label>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="quantity-section">
            <label htmlFor="quantity">Quantidade:</label>
            <div className="quantity-control">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="qty-btn"
              >
                −
              </button>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="qty-input"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="qty-btn"
              >
                +
              </button>
            </div>
          </div>

          <button onClick={handleAddToCart} className="add-to-cart-btn-detail">
            🛒 Adicionar ao Carrinho
          </button>

          <div className="product-benefits">
            <h3>✅ Benefícios</h3>
            <ul>
              <li>✓ Entrega rápida</li>
              <li>✓ Garantia do vendedor de 90 dias</li>
              <li>✓ Devolução grátis</li>
              <li>✓ Compra segura</li>
              <li>✓ Atendimento especializado 24hrs</li>
              <li>✓ Qualidade garantida</li>
              <li>✓ Opções de pagamento flexíveis</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
