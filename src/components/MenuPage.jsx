import React, { useState, useRef } from 'react'
import { Button } from './ui/button'
import MenuItem from './MenuItem'
import CartSidebar from './CartSidebar'

// Importar imagens
import coxinha from '../assets/coxinha.png'
import risole from '../assets/risole.png'
import empada from '../assets/empada.png'
import esfirra from '../assets/esfirra.png'
import kibe from '../assets/kibe.png'
import brigadeiro from '../assets/brigadeiro.png'
import beijinho from '../assets/beijinho.png'
import bolo1 from '../assets/bolo_1.png'
import bolo2 from '../assets/bolo_2.png'

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

  // Dados dos produtos (mantendo a estrutura original)
  const salgadosFolhados = [
    { id: 1, name: 'Alho Poró – Creme Cheese', description: 'Folhado de alho poró com creme cheese', price: 84.00, unit: 'cento', image: empada },
    { id: 2, name: 'Bacalhau', description: 'Folhado de bacalhau', price: 90.00, unit: 'cento', image: empada },
    { id: 3, name: 'Banana com Queijo', description: 'Folhado de banana com queijo', price: 84.00, unit: 'cento', image: empada },
    { id: 4, name: 'Camarão', description: 'Folhado de camarão', price: 90.00, unit: 'cento', image: empada },
    { id: 5, name: 'Carne', description: 'Folhado de carne', price: 84.00, unit: 'cento', image: empada },
    { id: 6, name: 'Carne com Azeitona', description: 'Folhado de carne com azeitona', price: 84.00, unit: 'cento', image: empada },
    { id: 7, name: 'Frango', description: 'Folhado de frango', price: 84.00, unit: 'cento', image: empada },
    { id: 8, name: 'Frango com Catupiry', description: 'Folhado de frango com catupiry', price: 84.00, unit: 'cento', image: empada },
    { id: 9, name: 'Palmito', description: 'Folhado de palmito', price: 84.00, unit: 'cento', image: empada },
    { id: 10, name: 'Palmito com Azeitona', description: 'Folhado de palmito com azeitona', price: 84.00, unit: 'cento', image: empada },
    { id: 11, name: 'Pizza', description: 'Folhado de pizza', price: 84.00, unit: 'cento', image: empada },
    { id: 12, name: 'Presunto e Queijo', description: 'Folhado de presunto e queijo', price: 84.00, unit: 'cento', image: empada },
    { id: 13, name: 'Queijo', description: 'Folhado de queijo', price: 84.00, unit: 'cento', image: empada }
  ]

  const salgadosFritos = [
    { id: 14, name: 'Bolinha de Queijo', description: 'Bolinha de queijo frita', price: 84.00, unit: 'cento', image: coxinha },
    { id: 15, name: 'Coxinha de Frango', description: 'Coxinha tradicional de frango', price: 84.00, unit: 'cento', image: coxinha },
    { id: 16, name: 'Coxinha de Frango com Catupiry', description: 'Coxinha de frango com catupiry', price: 84.00, unit: 'cento', image: coxinha },
    { id: 17, name: 'Enroladinho de Salsicha', description: 'Enroladinho de salsicha', price: 84.00, unit: 'cento', image: risole },
    { id: 18, name: 'Kibe', description: 'Kibe tradicional', price: 84.00, unit: 'cento', image: kibe },
    { id: 19, name: 'Pastel de Carne', description: 'Pastel de carne', price: 84.00, unit: 'cento', image: risole },
    { id: 20, name: 'Pastel de Frango', description: 'Pastel de frango', price: 84.00, unit: 'cento', image: risole },
    { id: 21, name: 'Pastel de Palmito', description: 'Pastel de palmito', price: 84.00, unit: 'cento', image: risole },
    { id: 22, name: 'Pastel de Pizza', description: 'Pastel de pizza', price: 84.00, unit: 'cento', image: risole },
    { id: 23, name: 'Pastel de Presunto e Queijo', description: 'Pastel de presunto e queijo', price: 84.00, unit: 'cento', image: risole },
    { id: 24, name: 'Pastel de Queijo', description: 'Pastel de queijo', price: 84.00, unit: 'cento', image: risole },
    { id: 25, name: 'Risole de Camarão', description: 'Risole de camarão', price: 90.00, unit: 'cento', image: risole },
    { id: 26, name: 'Risole de Frango', description: 'Risole de frango', price: 84.00, unit: 'cento', image: risole },
    { id: 27, name: 'Risole de Palmito', description: 'Risole de palmito', price: 84.00, unit: 'cento', image: risole },
    { id: 28, name: 'Risole de Presunto e Queijo', description: 'Risole de presunto e queijo', price: 84.00, unit: 'cento', image: risole }
  ]

  const salgadosAssados = [
    { id: 29, name: 'Esfirra de Carne', description: 'Esfirra assada de carne', price: 84.00, unit: 'cento', image: esfirra },
    { id: 30, name: 'Esfirra de Frango', description: 'Esfirra assada de frango', price: 84.00, unit: 'cento', image: esfirra },
    { id: 31, name: 'Esfirra de Queijo', description: 'Esfirra assada de queijo', price: 84.00, unit: 'cento', image: esfirra },
    { id: 32, name: 'Pão de Açúcar', description: 'Pão de açúcar assado', price: 84.00, unit: 'cento', image: esfirra },
    { id: 33, name: 'Pão de Batata com Carne', description: 'Pão de batata com carne', price: 84.00, unit: 'cento', image: esfirra },
    { id: 34, name: 'Pão de Batata com Frango', description: 'Pão de batata com frango', price: 84.00, unit: 'cento', image: esfirra },
    { id: 35, name: 'Pão de Batata com Queijo', description: 'Pão de batata com queijo', price: 84.00, unit: 'cento', image: esfirra }
  ]

  const docesComuns = [
    { id: 36, name: 'Beijinho', description: 'Beijinho tradicional', price: 84.00, unit: 'cento', image: beijinho },
    { id: 37, name: 'Brigadeiro', description: 'Brigadeiro tradicional', price: 84.00, unit: 'cento', image: brigadeiro },
    { id: 38, name: 'Brigadeiro Branco', description: 'Brigadeiro branco', price: 84.00, unit: 'cento', image: brigadeiro },
    { id: 39, name: 'Cajuzinho', description: 'Cajuzinho tradicional', price: 84.00, unit: 'cento', image: brigadeiro },
    { id: 40, name: 'Casadinho', description: 'Casadinho tradicional', price: 84.00, unit: 'cento', image: brigadeiro },
    { id: 41, name: 'Olho de Sogra', description: 'Olho de sogra', price: 84.00, unit: 'cento', image: brigadeiro },
    { id: 42, name: 'Quindim', description: 'Quindim tradicional', price: 84.00, unit: 'cento', image: brigadeiro }
  ]

  const docesCaramelizados = [
    { id: 43, name: 'Beijinho Caramelizado', description: 'Beijinho com cobertura caramelizada', price: 90.00, unit: 'cento', image: beijinho },
    { id: 44, name: 'Brigadeiro Caramelizado', description: 'Brigadeiro com cobertura caramelizada', price: 90.00, unit: 'cento', image: brigadeiro },
    { id: 45, name: 'Brigadeiro Branco Caramelizado', description: 'Brigadeiro branco com cobertura caramelizada', price: 90.00, unit: 'cento', image: brigadeiro },
    { id: 46, name: 'Cajuzinho Caramelizado', description: 'Cajuzinho com cobertura caramelizada', price: 90.00, unit: 'cento', image: brigadeiro },
    { id: 47, name: 'Casadinho Caramelizado', description: 'Casadinho com cobertura caramelizada', price: 90.00, unit: 'cento', image: brigadeiro }
  ]

  const docesGourmet = [
    { id: 48, name: 'Beijinho de Coco Queimado', description: 'Beijinho gourmet de coco queimado', price: 100.00, unit: 'cento', image: beijinho },
    { id: 49, name: 'Beijinho de Leite Ninho', description: 'Beijinho gourmet de leite ninho', price: 100.00, unit: 'cento', image: beijinho },
    { id: 50, name: 'Beijinho de Limão', description: 'Beijinho gourmet de limão', price: 100.00, unit: 'cento', image: beijinho },
    { id: 51, name: 'Beijinho de Maracujá', description: 'Beijinho gourmet de maracujá', price: 100.00, unit: 'cento', image: beijinho },
    { id: 52, name: 'Brigadeiro de Café', description: 'Brigadeiro gourmet de café', price: 100.00, unit: 'cento', image: brigadeiro },
    { id: 53, name: 'Brigadeiro de Chocolate Belga', description: 'Brigadeiro gourmet de chocolate belga', price: 100.00, unit: 'cento', image: brigadeiro },
    { id: 54, name: 'Brigadeiro de Chocolate Branco', description: 'Brigadeiro gourmet de chocolate branco', price: 100.00, unit: 'cento', image: brigadeiro },
    { id: 55, name: 'Brigadeiro de Doce de Leite', description: 'Brigadeiro gourmet de doce de leite', price: 100.00, unit: 'cento', image: brigadeiro },
    { id: 56, name: 'Brigadeiro de Leite Ninho', description: 'Brigadeiro gourmet de leite ninho', price: 100.00, unit: 'cento', image: brigadeiro },
    { id: 57, name: 'Brigadeiro de Limão', description: 'Brigadeiro gourmet de limão', price: 100.00, unit: 'cento', image: brigadeiro },
    { id: 58, name: 'Brigadeiro de Maracujá', description: 'Brigadeiro gourmet de maracujá', price: 100.00, unit: 'cento', image: brigadeiro },
    { id: 59, name: 'Brigadeiro de Morango', description: 'Brigadeiro gourmet de morango', price: 100.00, unit: 'cento', image: brigadeiro },
    { id: 60, name: 'Brigadeiro de Nutella', description: 'Brigadeiro gourmet de nutella', price: 100.00, unit: 'cento', image: brigadeiro },
    { id: 61, name: 'Brigadeiro de Oreo', description: 'Brigadeiro gourmet de oreo', price: 100.00, unit: 'cento', image: brigadeiro },
    { id: 62, name: 'Brigadeiro de Paçoca', description: 'Brigadeiro gourmet de paçoca', price: 100.00, unit: 'cento', image: brigadeiro },
    { id: 63, name: 'Brigadeiro de Pistache', description: 'Brigadeiro gourmet de pistache', price: 100.00, unit: 'cento', image: brigadeiro },
    { id: 64, name: 'Brigadeiro de Prestígio', description: 'Brigadeiro gourmet de prestígio', price: 100.00, unit: 'cento', image: brigadeiro },
    { id: 65, name: 'Brigadeiro de Sonho de Valsa', description: 'Brigadeiro gourmet de sonho de valsa', price: 100.00, unit: 'cento', image: brigadeiro },
    { id: 66, name: 'Brigadeiro de Uva', description: 'Brigadeiro gourmet de uva', price: 100.00, unit: 'cento', image: brigadeiro }
  ]

  const bombons = [
    { id: 67, name: 'Bombom de Chocolate ao Leite', description: 'Bombom de chocolate ao leite', price: 120.00, unit: 'cento', image: brigadeiro },
    { id: 68, name: 'Bombom de Chocolate Branco', description: 'Bombom de chocolate branco', price: 120.00, unit: 'cento', image: brigadeiro },
    { id: 69, name: 'Bombom de Chocolate Meio Amargo', description: 'Bombom de chocolate meio amargo', price: 120.00, unit: 'cento', image: brigadeiro },
    { id: 70, name: 'Bombom de Doce de Leite', description: 'Bombom de doce de leite', price: 120.00, unit: 'cento', image: brigadeiro },
    { id: 71, name: 'Bombom de Frutas Vermelhas', description: 'Bombom de frutas vermelhas', price: 120.00, unit: 'cento', image: brigadeiro },
    { id: 72, name: 'Bombom de Limão', description: 'Bombom de limão', price: 120.00, unit: 'cento', image: brigadeiro },
    { id: 73, name: 'Bombom de Maracujá', description: 'Bombom de maracujá', price: 120.00, unit: 'cento', image: brigadeiro },
    { id: 74, name: 'Bombom de Morango', description: 'Bombom de morango', price: 120.00, unit: 'cento', image: brigadeiro },
    { id: 75, name: 'Bombom de Nutella', description: 'Bombom de nutella', price: 120.00, unit: 'cento', image: brigadeiro },
    { id: 76, name: 'Bombom de Paçoca', description: 'Bombom de paçoca', price: 120.00, unit: 'cento', image: brigadeiro },
    { id: 77, name: 'Bombom de Pistache', description: 'Bombom de pistache', price: 120.00, unit: 'cento', image: brigadeiro },
    { id: 78, name: 'Bombom de Prestígio', description: 'Bombom de prestígio', price: 120.00, unit: 'cento', image: brigadeiro },
    { id: 79, name: 'Bombom de Sonho de Valsa', description: 'Bombom de sonho de valsa', price: 120.00, unit: 'cento', image: brigadeiro },
    { id: 80, name: 'Bombom de Uva', description: 'Bombom de uva', price: 120.00, unit: 'cento', image: brigadeiro }
  ]

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
                      image: bolo1
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

