import React, { useState, useCallback } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'

// Função para formatação de moeda brasileira
const formatCurrency = (value) => {
  return value.toFixed(2).replace('.', ',')
}

const CartPage = ({ cartItems, removeFromCart, getTotalPrice, generateWhatsAppMessage }) => {
  const [customerName, setCustomerName] = useState('')
  const [pickupDate, setPickupDate] = useState('')
  const [pickupTime, setPickupTime] = useState('')

  // Handlers com useCallback para evitar re-renders
  const handleNameChange = useCallback((e) => {
    setCustomerName(e.target.value)
  }, [])

  const handleDateChange = useCallback((e) => {
    setPickupDate(e.target.value)
  }, [])

  const handleTimeChange = useCallback((e) => {
    setPickupTime(e.target.value)
  }, [])

  const handleWhatsAppOrder = () => {
    if (!customerName || !pickupDate || !pickupTime) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    const message = generateWhatsAppMessage(customerName, pickupDate, pickupTime)
    window.open(`https://wa.me/5561992552565?text=${message}`, '_blank')
  }

  // Gerar horários de 30 em 30 minutos
  const timeSlots = []
  for (let hour = 8; hour < 18; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`)
    if (hour < 17) {
      timeSlots.push(`${hour.toString().padStart(2, '0')}:30`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-montserrat font-bold text-center mb-8 text-gray-800">
          Seu Carrinho
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 font-open-sans mb-4">
              Seu carrinho está vazio
            </p>
            <p className="text-gray-500 font-open-sans">
              Adicione alguns produtos deliciosos ao seu carrinho!
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Itens do carrinho */}
            <div className="space-y-4 mb-8">
              {cartItems.map((item, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-montserrat font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600 font-open-sans">{item.description}</p>
                      <p className="text-sm text-gray-500 font-open-sans">
                        Quantidade: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-montserrat font-semibold">
                        R$ {formatCurrency(item.unit === 'cento' ? (item.price * item.quantity / 100) : (item.price * item.quantity))}
                      </p>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeFromCart(index)}
                        className="mt-2"
                      >
                        Remover
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Informações para retirada */}
            <Card className="p-6 mb-8">
              <h2 className="text-2xl font-montserrat font-bold mb-6">
                Informações para Retirada
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome do Cliente:</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={handleNameChange}
                    placeholder="Seu nome completo"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Data de Retirada:</label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={handleDateChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Horário de Retirada:</label>
                  <select
                    value={pickupTime}
                    onChange={handleTimeChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Selecione o horário</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>

            {/* Total e finalização */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-montserrat font-semibold">Total:</span>
                <span className="text-2xl font-montserrat font-bold price-text">
                  R$ {formatCurrency(getTotalPrice())}
                </span>
              </div>
              <Button 
                className="btn-primary w-full font-open-sans text-lg py-3"
                onClick={handleWhatsAppOrder}
              >
                Finalizar Pedido via WhatsApp
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage

