import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import '../styles/ProductCard.css'

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventestault()
    addToCart(product)
    alert('Produto adicionado ao carrinho!')
  }

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/200x200?text=Produto'
  }

  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <article className="product-card">
        <div className="product-image">
          <img src={product.image} alt={product.title} onError={handleImageError} />
        </div>
        <div className="product-info">
          <h3>{product.title}</h3>
          <p className="category">{product.category}</p>
          <div className="rating">
            <span className="stars">{'⭐'.repeat(Math.round(product.rating?.rate || 4))}</span>
            <span className="rate-value">({product.rating?.count || 0})</span>
          </div>
          <div className="price-section">
            <span className="price">R$ {product.price.toFixed(2)}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="add-to-cart-btn"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </article>
    </Link>
  )
}
