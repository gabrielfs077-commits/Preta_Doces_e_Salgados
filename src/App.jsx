import React, { useState, useCallback } from 'react'
import Header from './components/Header'
import HomePage from './components/HomePage'
import MenuPage from './components/MenuPage'
import CartPage from './components/CartPage'
import ContactPage from './components/ContactPage'
import './styles/App.css'

// Função para formatação de moeda brasileira
const formatCurrency = (value) => {
  return value.toFixed(2).replace('.', ',')
}

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [cartItems, setCartItems] = useState([])

  // Função para adicionar item ao carrinho
  const addToCart = useCallback((item, quantity) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(cartItem => cartItem.id === item.id)
      
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      } else {
        return [...prevItems, { ...item, quantity }]
      }
    })
  }, [])

  // Função para remover item do carrinho
  const removeFromCart = useCallback((index) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index))
  }, [])

  // Função para calcular o preço total
  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => {
      if (item.unit === 'cento') {
        return total + (item.price * item.quantity / 100)
      }
      return total + (item.price * item.quantity)
    }, 0)
  }, [cartItems])

  // Função para gerar mensagem do WhatsApp
  const generateWhatsAppMessage = useCallback((customerName = '', pickupDate = '', pickupTime = '') => {
    let message = '*Pedido - Preta Doces e Salgados*\n\n'
    
    if (customerName) {
      message += `*Cliente:* ${customerName}\n`
    }
    
    if (pickupDate) {
      message += `*Data de Retirada:* ${pickupDate}\n`
    }
    
    if (pickupTime) {
      message += `*Horário de Retirada:* ${pickupTime}\n\n`
    }
    
    message += '*Itens do Pedido:*\n'
    
    cartItems.forEach(item => {
      const unitText = item.unit === 'cento' ? 'unidades' : item.unit
      const itemTotal = item.unit === 'cento' ? (item.price * item.quantity / 100) : (item.price * item.quantity)
      
      message += `• ${item.name}\n`
      message += `  Quantidade: ${item.quantity} ${unitText}\n`
      message += `  Subtotal: R$ ${formatCurrency(itemTotal)}\n\n`
      
      if (item.description && !item.description.includes('Folhado') && !item.description.includes('tradicional')) {
        message += `  ${item.description}\n`
      }
    })
    
    message += `\n*Total: R$ ${formatCurrency(getTotalPrice())}*`
    
    return encodeURIComponent(message)
  }, [cartItems, getTotalPrice])

  // Renderizar página atual
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />
      case 'menu':
        return (
          <MenuPage 
            cartItems={cartItems}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            getTotalPrice={getTotalPrice}
            generateWhatsAppMessage={generateWhatsAppMessage}
          />
        )
      case 'cart':
        return (
          <CartPage 
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            getTotalPrice={getTotalPrice}
            generateWhatsAppMessage={generateWhatsAppMessage}
          />
        )
      case 'contact':
        return <ContactPage />
      default:
        return <HomePage setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div className="App">
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartItems={cartItems}
      />
      {renderCurrentPage()}
      
      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="font-open-sans">
            © 2024 Preta Doces e Salgados - Feito com ❤️ pela família
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App

