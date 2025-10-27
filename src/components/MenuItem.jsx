import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Plus, Minus } from 'lucide-react'



// Função para formatação de moeda brasileira
const formatCurrency = (value) => {
  return value.toFixed(2).replace('.', ',')
}

const MenuItem = ({ item, addToCart }) => {
  const getInitialQuantity = () => {
    if (item.unit === 'cento') return 25
    if (item.unit === 'unidade') return 1
    return 1
  }
  const [quantity, setQuantity] = useState(getInitialQuantity())
  const step = item.unit === 'cento' ? 25 : 1
  
  const handleQuantityChange = (newQuantity) => {
    if (item.unit === 'cento') {
      // Múltiplos de 25, mínimo 25
      if (newQuantity >= 25) {
        setQuantity(Math.round(newQuantity / 25) * 25)
      } else {
        setQuantity(25)
      }
    } else {
      // Mínimo 1
      setQuantity(Math.max(1, newQuantity))
    }
  }
  
  return (
    <Card key={item.id} className="card-hover h-full flex flex-col">
      <CardHeader>
        <img src={item.image} alt={item.name} className="product-image w-full h-32" />
      </CardHeader>
      <CardContent className="flex-grow">
        <CardTitle className="font-montserrat text-base">{item.name}</CardTitle>
        <CardDescription className="font-open-sans text-xs mb-2">
          {item.description}
        </CardDescription>
        <p className="price-text text-lg font-montserrat">
          R$ {formatCurrency(item.price)} / {item.unit}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-center mt-auto">
        <div className="flex items-center space-x-1 mb-2">
          <Button 
            size="sm" 
            className="quantity-btn"
            onClick={() => handleQuantityChange(quantity - step)}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="quantity-display font-montserrat text-sm w-8 text-center">
            {quantity}
          </span>
          <Button 
            size="sm" 
            className="quantity-btn"
            onClick={() => handleQuantityChange(quantity + step)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <Button 
          className="btn-primary w-full font-open-sans"
          onClick={() => addToCart(item, quantity)}
        >
          Adicionar
        </Button>
      </CardFooter>
    </Card>
  )
}

export default MenuItem

