import React from 'react'
import { Button } from './ui/button'
import { ShoppingCart } from 'lucide-react'

const Header = ({ currentPage, setCurrentPage, cartItems }) => {
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="header-bg text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-montserrat font-bold">Preta Doces e Salgados</h1>
        <nav className="flex space-x-2">
          <Button 
            variant={currentPage === 'home' ? 'secondary' : 'ghost'} 
            className="nav-btn font-open-sans"
            onClick={() => setCurrentPage('home')}
          >
            Início
          </Button>
          <Button 
            variant={currentPage === 'menu' ? 'secondary' : 'ghost'} 
            className="nav-btn font-open-sans"
            onClick={() => setCurrentPage('menu')}
          >
            Cardápio
          </Button>
          <Button 
            variant={currentPage === 'contact' ? 'secondary' : 'ghost'} 
            className="nav-btn font-open-sans"
            onClick={() => setCurrentPage('contact')}
          >
            Contato
          </Button>
          <Button 
            variant={currentPage === 'cart' ? 'secondary' : 'ghost'} 
            className="nav-btn font-open-sans relative"
            onClick={() => setCurrentPage('cart')}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Carrinho
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemCount}
              </span>
            )}
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default Header

