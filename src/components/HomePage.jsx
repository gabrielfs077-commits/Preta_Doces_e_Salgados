import React from 'react'
import { Button } from './ui/button'
import { Heart } from 'lucide-react'

const HomePage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-montserrat font-bold text-gray-800 mb-4">
            Preta Doces e Salgados
          </h1>
          <p className="text-xl font-open-sans text-gray-600 mb-8">
            Sabores artesanais feitos com carinho para sua família
          </p>
          <Button 
            className="btn-primary text-lg px-8 py-3 font-open-sans"
            onClick={() => setCurrentPage('menu')}
          >
            Ver Cardápio
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="text-xl font-montserrat font-semibold mb-2">Salgados Frescos</h3>
            <p className="font-open-sans text-gray-600">
              Variedade de salgados assados e fritos, feitos diariamente
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-montserrat font-semibold mb-2">Doces Artesanais</h3>
            <p className="font-open-sans text-gray-600">
              Brigadeiros, beijinhos e muito mais, feitos com carinho
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-montserrat font-semibold mb-2">Bolos Especiais</h3>
            <p className="font-open-sans text-gray-600">
              Bolos personalizados para todas as ocasiões
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-montserrat font-bold text-gray-800 mb-4">
            Por que escolher a Preta?
          </h2>
          <p className="text-lg font-open-sans text-gray-600 max-w-2xl mx-auto">
            Nossos produtos são feitos com ingredientes selecionados e muito amor. 
            Cada item é preparado artesanalmente para garantir o melhor sabor e qualidade 
            para você e sua família.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage

