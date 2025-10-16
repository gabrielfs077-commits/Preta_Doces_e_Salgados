import React from 'react'
import { Button } from './ui/button'
import { ShoppingCart } from 'lucide-react'

const Header = ({ currentPage, setCurrentPage, cartItems }) => {
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  // Badges numerados para cada página
  const pageBadges = {
    home: { number: 1, color: 'bg-green-500' },
    menu: { number: 2, color: 'bg-blue-500' },
    contact: { number: 3, color: 'bg-orange-500' },
    cart: { number: 4, color: 'bg-pink-500' }
  }

  return (
    <header className="bg-slate-700 text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-montserrat font-bold">Preta Doces e Salgados</h1>
        <nav className="flex space-x-2">
          <Button 
            variant={currentPage === 'home' ? 'secondary' : 'ghost'} 
            className={`nav-btn font-open-sans relative ${currentPage === 'home' ? 'bg-white text-slate-700' : 'text-white hover:bg-slate-600'}`}
            onClick={() => setCurrentPage('home')}
          >
            Início
            <span className={`absolute -top-2 -right-2 ${pageBadges.home.color} text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold`}>
              {pageBadges.home.number}
            </span>
          </Button>
          <Button 
            variant={currentPage === 'menu' ? 'secondary' : 'ghost'} 
            className={`nav-btn font-open-sans relative ${currentPage === 'menu' ? 'bg-white text-slate-700' : 'text-white hover:bg-slate-600'}`}
            onClick={() => setCurrentPage('menu')}
          >
            Cardápio
            <span className={`absolute -top-2 -right-2 ${pageBadges.menu.color} text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold`}>
              {pageBadges.menu.number}
            </span>
          </Button>
          <Button 
            variant={currentPage === 'contact' ? 'secondary' : 'ghost'} 
            className={`nav-btn font-open-sans relative ${currentPage === 'contact' ? 'bg-white text-slate-700' : 'text-white hover:bg-slate-600'}`}
            onClick={() => setCurrentPage('contact')}
          >
            Contato
            <span className={`absolute -top-2 -right-2 ${pageBadges.contact.color} text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold`}>
              {pageBadges.contact.number}
            </span>
          </Button>
          <Button 
            variant={currentPage === 'cart' ? 'secondary' : 'ghost'} 
            className={`nav-btn font-open-sans relative ${currentPage === 'cart' ? 'bg-white text-slate-700' : 'text-white hover:bg-slate-600'}`}
            onClick={() => setCurrentPage('cart')}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Carrinho
            <span className={`absolute -top-2 -right-2 ${pageBadges.cart.color} text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold`}>
              {cartItemCount > 0 ? cartItemCount : pageBadges.cart.number}
            </span>
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default Header

