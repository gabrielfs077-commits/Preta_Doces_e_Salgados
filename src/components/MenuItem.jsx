import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Plus, Minus } from 'lucide-react'

// Função para formatação de moeda brasileira
const formatCurrency = (value) => {
  return value.toFixed(2).replace('.', ',')
}

const MenuItem = ({ item, addToCart }) => {
  const [quantity, setQuantity] = useState(item.unit === 'cento' ? 25 : 1)
  
  return (
    <Card key={item.id} className="card-hover">
      <CardHeader>
        <img src={item.image} alt={item.name} className="product-image w-full h-32" />
      </CardHeader>
      <CardContent>
        <CardTitle className="font-montserrat text-base">{item.name}</CardTitle>
        <CardDescription className="font-open-sans text-xs mb-2">
          {item.description}
        </CardDescription>
        <p className="price-text text-lg font-montserrat">
          R$ {formatCurrency(item.price)} / {item.unit}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <div className="flex items-center space-x-1 mb-2">
          <Button 
            size="sm" 
            className="quantity-btn"
            onClick={() => setQuantity(prev => Math.max(item.unit === 'cento' ? 25 : 1, prev - (item.unit === 'cento' ? 25 : 1)))}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="quantity-display font-montserrat text-sm w-8 text-center">
            {quantity}
          </span>
          <Button 
            size="sm" 
            className="quantity-btn"
            onClick={() => setQuantity(prev => prev + (item.unit === 'cento' ? 25 : 1))}
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

