import { useState, useEffect } from 'react'
import { ProductCard } from '../components/ProductCard'
import { productService } from '../services/productService'
import '../styles/Home.css'

export const Home = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('none')

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [productsData, categoriesData] = await Promise.all([
          productService.getAllProducts(),
          productService.getCategories(),
        ])
        setProducts(productsData)
        setCategories(categoriesData)
        setError(null)
      } catch {
        setError('Erro ao carregar produtos')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category)
    if (category !== 'all') {
      try {
        setLoading(true)
        const filteredProducts = await productService.getProductsByCategory(category)
        setProducts(filteredProducts)
      } catch {
        setError('Erro ao filtrar produtos')
      } finally {
        setLoading(false)
      }
    }
  }

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'ascending') {
      return a.price - b.price
    } else if (sortOrder === 'descending') {
      return b.price - a.price
    } else if (sortOrder === 'az') {
      return a.title.localeCompare(b.title)
    } else if (sortOrder === 'za') {
      return b.title.localeCompare(a.title)
    }
    return 0
  })

  return (
    <main className="home-page">
      <section className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="categories-filter">
          <h3>Categorias</h3>
          <div className="category-buttons">
            <button
              className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={async () => {
                try {
                  setLoading(true)
                  const allProducts = await productService.getAllProducts()
                  setProducts(allProducts)
                  setSelectedCategory('all')
                  setError(null)
                } catch {
                  setError('Erro ao carregar produtos')
                } finally {
                  setLoading(false)
                }
              }}
            >
              Todos
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="sort-filter">
          <label htmlFor="sort">Ordenar por:</label>
          <select 
            id="sort"
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-select"
          >
            <option value="none">Nenhum</option>
            <option value="ascending">Preço: Menor para Maior</option>
            <option value="descending">Preço: Maior para Menor</option>
            <option value="az">Nome: A-Z</option>
            <option value="za">Nome: Z-A</option>
          </select>
        </div>
      </section>

      <section className="products-section">
        <div className="payment-methods-banner">
          <div className="payment-method-item">
            <span className="payment-icon">💳</span>
            <span className="payment-text">Cartão de Crédito em até 12x</span>
          </div>
          <div className="payment-method-item">
            <span className="payment-icon">💳</span>
            <span className="payment-text">Cartão de Débito</span>
          </div>
          <div className="payment-method-item">
            <span className="payment-icon">📱</span>
            <span className="payment-text">Pix com Desconto</span>
            
          </div>
        </div>

        {loading ? (
          <div className="loading">⏳ Carregando produtos...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : filteredProducts.length === 0 ? (
          <div className="no-products">❌ Nenhum produto encontrado</div>
        ) : (
          <div className="products-grid">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
