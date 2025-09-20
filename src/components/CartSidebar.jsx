import React from 'react'
import { Button } from './ui/button'
import { ShoppingCart } from 'lucide-react'

// Função para formatação de moeda brasileira
const formatCurrency = (value) => {
  return value.toFixed(2).replace('.', ',')
}

const CartSidebar = ({ cartItems, removeFromCart, getTotalPrice, generateWhatsAppMessage }) => {
  return (
    <div className="w-80 bg-white p-6 rounded-lg shadow-md h-fit sticky top-32">
      <div className="flex items-center mb-4">
        <ShoppingCart className="w-5 h-5 mr-2" />
        <h3 className="text-lg font-montserrat font-semibold">Seu Carrinho</h3>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingCart className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 font-open-sans">Seu carrinho está vazio</p>
          <p className="text-sm text-gray-400 font-open-sans">
            Adicione alguns produtos deliciosos!
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {cartItems.map((item, index) => (
              <div key={index} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-montserrat font-semibold text-sm">{item.name}</h4>
                    <p className="text-xs text-muted-foreground font-open-sans">
                      Quantidade: {item.quantity} {item.unit === 'cento' ? 'unidades' : item.unit}
                    </p>
                    {item.description && (
                      <p className="text-xs text-muted-foreground font-open-sans">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="text-right ml-2">
                    <p className="font-montserrat font-semibold text-sm">
                      R$ {formatCurrency(item.unit === 'cento' ? (item.price * item.quantity / 100) : (item.price * item.quantity))}
                    </p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromCart(index)}
                      className="text-red-500 hover:text-red-700 p-1 h-auto"
                    >
                      Remover
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-montserrat font-semibold">Total:</span>
              <span className="text-xl font-montserrat font-bold text-primary">
                R$ {formatCurrency(getTotalPrice())}
              </span>
            </div>
            <Button 
              className="w-full btn-primary font-open-sans"
              onClick={() => {
                const message = generateWhatsAppMessage()
                window.open(`https://wa.me/5561992552565?text=${message}`, '_blank')
              }}
            >
              Finalizar Pedido
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartSidebar

