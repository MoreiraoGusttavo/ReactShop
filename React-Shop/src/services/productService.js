import axios from 'axios'
import dummyData from '../data/dummyApi.json'

const API_URL = 'https://fakestoreapi.com/products'
const USE_DUMMY_API = true // Set to true to use dummy data instead of real API

export const productService = {
  // Obter todos os produtos
  getAllProducts: async () => {
    try {
      if (USE_DUMMY_API) {
        return dummyData.products
      }
      const response = await axios.get(API_URL)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
      // Fallback para dados dummy em caso de erro
      return dummyData.products
    }
  },

  // Obter produto por ID
  getProductById: async (id) => {
    try {
      if (USE_DUMMY_API) {
        return dummyData.products.find(p => p.id === parseInt(id))
      }
      const response = await axios.get(`${API_URL}/${id}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar produto:', error)
      // Fallback para dados dummy em caso de erro
      return dummyData.products.find(p => p.id === parseInt(id))
    }
  },

  // Obter todas as categorias
  getCategories: async () => {
    try {
      if (USE_DUMMY_API) {
        return dummyData.categories
      }
      const response = await axios.get(`${API_URL}/categories`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar categorias:', error)
      // Fallback para dados dummy em caso de erro
      return dummyData.categories
    }
  },

  // Obter produtos por categoria
  getProductsByCategory: async (category) => {
    try {
      if (USE_DUMMY_API) {
        return dummyData.products.filter(p => p.category === category)
      }
      const response = await axios.get(`${API_URL}/category/${category}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar produtos por categoria:', error)
      // Fallback para dados dummy em caso de erro
      return dummyData.products.filter(p => p.category === category)
    }
  },

  // Obter usuário (para login)
  getUser: async (email, password) => {
    try {
      if (USE_DUMMY_API) {
        const user = dummyData.users.find(u => u.email === email && u.password === password)
        if (user) {
          const { password: _, ...userWithoutPassword } = user
          return userWithoutPassword
        }
        return null
      }
      // Em produção, isso seria feito pelo backend
      return null
    } catch (error) {
      console.error('Erro ao buscar usuário:', error)
      return null
    }
  },

  // Obter pedidos do usuário
  getUserOrders: async (userId) => {
    try {
      if (USE_DUMMY_API) {
        return dummyData.orders.filter(o => o.userId === userId)
      }
      return []
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error)
      return []
    }
  },

  // Obter reviews de um produto
  getProductReviews: async (productId) => {
    try {
      if (USE_DUMMY_API) {
        return dummyData.reviews.filter(r => r.productId === productId)
      }
      return []
    } catch (error) {
      console.error('Erro ao buscar reviews:', error)
      return []
    }
  },

  // Criar pedido
  createOrder: async (orderData) => {
    try {
      if (USE_DUMMY_API) {
        const newOrder = {
          id: Math.max(...dummyData.orders.map(o => o.id)) + 1,
          ...orderData,
          date: new Date().toISOString().split('T')[0],
          status: 'processing'
        }
        dummyData.orders.push(newOrder)
        return newOrder
      }
      // Em produção, isso seria feito pelo backend
      return { id: Math.random().toString(36).substring(2, 9).toUpperCase() }
    } catch (error) {
      console.error('Erro ao criar pedido:', error)
      throw error
    }
  },

  // Validar cupom de desconto
  validateCoupon: async (couponCode) => {
    try {
      if (USE_DUMMY_API) {
        const coupon = dummyData.coupons.find(c => c.id === couponCode)
        if (coupon) {
          const today = new Date().toISOString().split('T')[0]
          if (today >= coupon.validFrom && today <= coupon.validTo) {
            return coupon
          }
        }
        return null
      }
      return null
    } catch (error) {
      console.error('Erro ao validar cupom:', error)
      return null
    }
  }
}
