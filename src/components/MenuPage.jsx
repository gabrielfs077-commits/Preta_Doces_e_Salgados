import React, { useState, useRef } from 'react'
import { Button } from './ui/button'
import MenuItem from './MenuItem'
import CartSidebar from './CartSidebar'
import { salgadosFolhados, salgadosFritos, salgadosAssados, docesComuns, docesCaramelizados, docesGourmet, bombons } from '../data/products'

const MenuPage = ({ cartItems, addToCart, removeFromCart, getTotalPrice, generateWhatsAppMessage }) => {
  const [activeTab, setActiveTab] = useState('todos')
  const [boloPersonalizado, setBoloPersonalizado] = useState({ peso: 1, sabor: '', cobertura: '', observacoes: '' })

  // Refs para rolagem suave
  const salgadosFolhadosRef = useRef(null)
  const salgadosFritosRef = useRef(null)
  const salgadosAssadosRef = useRef(null)
  const docesComunsRef = useRef(null)
  const docesCaramelizadosRef = useRef(null)
  const docesGourmetRef = useRef(null)
  const bombonsRef = useRef(null)
  const boloPersonalizadoRef = useRef(null)

  // Função para rolagem suave
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Função para determinar se uma seção deve ser visível
  const shouldShowSection = (category) => {
    if (activeTab === 'todos') return true
    if (activeTab === 'salgados') return ['salgados_folhados', 'salgados_fritos', 'salgados_assados'].includes(category)
    if (activeTab === 'doces') return ['doces_comuns', 'doces_caramelizados', 'doces_gourmet'].includes(category)
    if (activeTab === 'bombons') return category === 'bombons'
    if (activeTab === 'bolos') return category === 'bolo_personalizado'
    return false
  }

  // Função para lidar com mudança de aba e rolagem
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    
    // Rolar para a primeira seção relevante após um pequeno delay
    setTimeout(() => {
      if (tab === 'salgados') {
        scrollToSection(salgadosFolhadosRef)
      } else if (tab === 'doces') {
        scrollToSection(docesComunsRef)
      } else if (tab === 'bombons') {
        scrollToSection(bombonsRef)
      } else if (tab === 'bolos') {
        scrollToSection(boloPersonalizadoRef)
      }
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-montserrat font-bold text-center mb-8 text-gray-800">
          Nosso Cardápio
        </h1>

        {/* Abas de navegação */}
        <div className="flex justify-center mb-8 sticky top-20 z-40 bg-gray-50 py-4">
          <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-md">
            <Button
              variant={activeTab === 'todos' ? 'default' : 'ghost'}
              onClick={() => handleTabChange('todos')}
              className="font-open-sans"
            >
              Todos
            </Button>
            <Button
              variant={activeTab === 'salgados' ? 'default' : 'ghost'}
              onClick={() => handleTabChange('salgados')}
              className="font-open-sans"
            >
              Salgados
            </Button>
            <Button
              variant={activeTab === 'doces' ? 'default' : 'ghost'}
              onClick={() => handleTabChange('doces')}
              className="font-open-sans"
            >
              Doces
            </Button>
            <Button
              variant={activeTab === 'bombons' ? 'default' : 'ghost'}
              onClick={() => handleTabChange('bombons')}
              className="font-open-sans"
            >
              Bombons
            </Button>
            <Button
              variant={activeTab === 'bolos' ? 'default' : 'ghost'}
              onClick={() => handleTabChange('bolos')}
              className="font-open-sans"
            >
              Bolos
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Coluna de produtos */}
          <div className="flex-1">
            {/* Salgados Folhados */}
            {shouldShowSection('salgados_folhados') && (
              <section ref={salgadosFolhadosRef} className="mb-12">
                <h2 className="text-2xl font-montserrat font-bold mb-6 text-gray-800">
                  Salgados Folhados
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {salgadosFolhados.map(item => (
                    <MenuItem key={item.id} item={item} addToCart={addToCart} />
                  ))}
                </div>
              </section>
            )}

            {/* Salgados Fritos */}
            {shouldShowSection('salgados_fritos') && (
              <section ref={salgadosFritosRef} className="mb-12">
                <h2 className="text-2xl font-montserrat font-bold mb-6 text-gray-800">
                  Salgados Fritos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {salgadosFritos.map(item => (
                    <MenuItem key={item.id} item={item} addToCart={addToCart} />
                  ))}
                </div>
              </section>
            )}

            {/* Salgados Assados */}
            {shouldShowSection('salgados_assados') && (
              <section ref={salgadosAssadosRef} className="mb-12">
                <h2 className="text-2xl font-montserrat font-bold mb-6 text-gray-800">
                  Salgados Assados
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {salgadosAssados.map(item => (
                    <MenuItem key={item.id} item={item} addToCart={addToCart} />
                  ))}
                </div>
              </section>
            )}

            {/* Doces Comuns */}
            {shouldShowSection('doces_comuns') && (
              <section ref={docesComunsRef} className="mb-12">
                <h2 className="text-2xl font-montserrat font-bold mb-6 text-gray-800">
                  Doces Comuns
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {docesComuns.map(item => (
                    <MenuItem key={item.id} item={item} addToCart={addToCart} />
                  ))}
                </div>
              </section>
            )}

            {/* Doces Caramelizados */}
            {shouldShowSection('doces_caramelizados') && (
              <section ref={docesCaramelizadosRef} className="mb-12">
                <h2 className="text-2xl font-montserrat font-bold mb-6 text-gray-800">
                  Doces Caramelizados
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {docesCaramelizados.map(item => (
                    <MenuItem key={item.id} item={item} addToCart={addToCart} />
                  ))}
                </div>
              </section>
            )}

            {/* Doces Gourmet */}
            {shouldShowSection('doces_gourmet') && (
              <section ref={docesGourmetRef} className="mb-12">
                <h2 className="text-2xl font-montserrat font-bold mb-6 text-gray-800">
                  Doces Gourmet
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {docesGourmet.map(item => (
                    <MenuItem key={item.id} item={item} addToCart={addToCart} />
                  ))}
                </div>
              </section>
            )}

            {/* Bombons */}
            {shouldShowSection('bombons') && (
              <section ref={bombonsRef} className="mb-12">
                <h2 className="text-2xl font-montserrat font-bold mb-6 text-gray-800">
                  Bombons
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bombons.map(item => (
                    <MenuItem key={item.id} item={item} addToCart={addToCart} />
                  ))}
                </div>
              </section>
            )}

            {/* Bolo Personalizado */}
            {shouldShowSection('bolo_personalizado') && (
              <section ref={boloPersonalizadoRef} className="mb-12">
                <h2 className="text-2xl font-montserrat font-bold mb-6 text-gray-800">
                  Bolo Personalizado
                </h2>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-600 mb-4">
                    Faça seu pedido personalizado! Escolha o peso, sabor e cobertura do seu bolo.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Peso (kg):</label>
                      <input
                        type="number"
                        min="1"
                        value={boloPersonalizado.peso}
                        onChange={(e) => setBoloPersonalizado({...boloPersonalizado, peso: parseInt(e.target.value) || 1})}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Sabor:</label>
                      <input
                        type="text"
                        value={boloPersonalizado.sabor}
                        onChange={(e) => setBoloPersonalizado({...boloPersonalizado, sabor: e.target.value})}
                        className="w-full p-2 border rounded"
                        placeholder="Ex: Chocolate, Baunilha..."
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Cobertura:</label>
                    <input
                      type="text"
                      value={boloPersonalizado.cobertura}
                      onChange={(e) => setBoloPersonalizado({...boloPersonalizado, cobertura: e.target.value})}
                      className="w-full p-2 border rounded"
                      placeholder="Ex: Chantilly, Brigadeiro..."
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Observações:</label>
                    <textarea
                      value={boloPersonalizado.observacoes}
                      onChange={(e) => setBoloPersonalizado({...boloPersonalizado, observacoes: e.target.value})}
                      className="w-full p-2 border rounded"
                      rows="3"
                      placeholder="Decorações especiais, cores, etc..."
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-montserrat font-semibold text-lg">
                      Preço Total:
                    </span>
                    <span className="price-text text-2xl font-montserrat">
                      R$ {(boloPersonalizado.peso * 110).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground font-open-sans mt-1">
                    Preço base: R$ 110,00 por kg
                  </p>
                  <Button
                    className="btn-primary w-full mt-4 font-open-sans"
                    onClick={() => addToCart({
                      id: 'bolo_personalizado',
                      name: `Bolo Personalizado (${boloPersonalizado.peso}kg)`,
                      description: `Sabor: ${boloPersonalizado.sabor}, Cobertura: ${boloPersonalizado.cobertura}`,
                      price: boloPersonalizado.peso * 110,
                      unit: 'unidade',
                      image: 'bolo_1.png'
                    }, 1)}
                  >
                    Adicionar ao Carrinho
                  </Button>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar do carrinho */}
          <CartSidebar
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            getTotalPrice={getTotalPrice}
            generateWhatsAppMessage={generateWhatsAppMessage}
          />
        </div>
      </div>
    </div>
  )
}

export default MenuPage

