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
import folhadoCastanha from '../assets/FolhadodeCastanha.jpg'
import folhadoFile from '../assets/FolhadodeFilé.jpg'
import noImage from '../assets/No_image.png'

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
    { id: 1, name: 'Alho Poró – Creme Cheese', description: 'Folhado de alho poró com creme cheese', price: 84.00, unit: 'cento', image: noImage },
    { id: 2, name: 'Bacalhau', description: 'Folhado de bacalhau', price: 90.00, unit: 'cento', image: noImage },
    { id: 3, name: 'Banana com Queijo', description: 'Folhado de banana com queijo', price: 84.00, unit: 'cento', image: noImage },
    { id: 4, name: 'Camarão', description: 'Folhado de camarão', price: 90.00, unit: 'cento', image: noImage },
    { id: 5, name: 'Carne', description: 'Folhado de carne', price: 84.00, unit: 'cento', image: noImage },
    { id: 6, name: 'Carne com Azeitona', description: 'Folhado de carne com azeitona', price: 84.00, unit: 'cento', image: noImage },
    { id: 7, name: 'Frango', description: 'Folhado de frango', price: 84.00, unit: 'cento', image: noImage },
    { id: 8, name: 'Frango com Catupiry', description: 'Folhado de frango com catupiry', price: 84.00, unit: 'cento', image: noImage },
    { id: 9, name: 'Palmito', description: 'Folhado de palmito', price: 84.00, unit: 'cento', image: noImage },
    { id: 10, name: 'Palmito com Azeitona', description: 'Folhado de palmito com azeitona', price: 84.00, unit: 'cento', image: noImage },
    { id: 11, name: 'Pizza', description: 'Folhado de pizza', price: 84.00, unit: 'cento', image: noImage },
    { id: 12, name: 'Presunto e Queijo', description: 'Folhado de presunto e queijo', price: 84.00, unit: 'cento', image: noImage },
    { id: 13, name: 'Queijo', description: 'Folhado de queijo', price: 84.00, unit: 'cento', image: noImage },
    { id: 100, name: 'Folhado de Castanha', description: 'Folhado de castanha', price: 84.00, unit: 'cento', image: folhadoCastanha },
    { id: 101, name: 'Folhado de Filé', description: 'Folhado de filé', price: 94.00, unit: 'cento', image: folhadoFile }
  ]

  const salgadosFritos = [
    { id: 14, name: 'Bolinha de Queijo', description: 'Bolinha de queijo frita', price: 84.00, unit: 'cento', image: noImage },
    { id: 15, name: 'Coxinha de Frango', description: 'Coxinha tradicional de frango', price: 84.00, unit: 'cento', image: noImage },
    { id: 16, name: 'Coxinha de Frango com Catupiry', description: 'Coxinha de frango com catupiry', price: 84.00, unit: 'cento', image: noImage },
    { id: 17, name: 'Enroladinho de Salsicha', description: 'Enroladinho de salsicha', price: 84.00, unit: 'cento', image: noImage },
    { id: 18, name: 'Kibe', description: 'Kibe tradicional', price: 84.00, unit: 'cento', image: noImage },
    { id: 19, name: 'Pastel de Carne', description: 'Pastel de carne', price: 84.00, unit: 'cento', image: noImage },
    { id: 20, name: 'Pastel de Frango', description: 'Pastel de frango', price: 84.00, unit: 'cento', image: noImage },
    { id: 21, name: 'Pastel de Palmito', description: 'Pastel de palmito', price: 84.00, unit: 'cento', image: noImage },
    { id: 22, name: 'Pastel de Pizza', description: 'Pastel de pizza', price: 84.00, unit: 'cento', image: noImage },
    { id: 23, name: 'Pastel de Presunto e Queijo', description: 'Pastel de presunto e queijo', price: 84.00, unit: 'cento', image: noImage },
    { id: 24, name: 'Pastel de Queijo', description: 'Pastel de queijo', price: 84.00, unit: 'cento', image: noImage },
    { id: 25, name: 'Risole de Camarão', description: 'Risole de camarão', price: 90.00, unit: 'cento', image: noImage },
    { id: 26, name: 'Risole de Frango', description: 'Risole de frango', price: 84.00, unit: 'cento', image: noImage },
    { id: 27, name: 'Risole de Palmito', description: 'Risole de palmito', price: 84.00, unit: 'cento', image: noImage },
    { id: 28, name: 'Risole de Presunto e Queijo', description: 'Risole de presunto e queijo', price: 84.00, unit: 'cento', image: noImage }
  ]

  const salgadosAssados = [
    { id: 29, name: 'Esfirra de Carne', description: 'Esfirra assada de carne', price: 84.00, unit: 'cento', image: noImage },
    { id: 30, name: 'Esfirra de Frango', description: 'Esfirra assada de frango', price: 84.00, unit: 'cento', image: noImage },
    { id: 31, name: 'Esfirra de Queijo', description: 'Esfirra assada de queijo', price: 84.00, unit: 'cento', image: noImage },
    { id: 32, name: 'Pão de Açúcar', description: 'Pão de açúcar assado', price: 84.00, unit: 'cento', image: noImage },
    { id: 33, name: 'Pão de Batata com Carne', description: 'Pão de batata com carne', price: 84.00, unit: 'cento', image: noImage },
    { id: 34, name: 'Pão de Batata com Frango', description: 'Pão de batata com frango', price: 84.00, unit: 'cento', image: noImage },
    { id: 35, name: 'Pão de Batata com Queijo', description: 'Pão de batata com queijo', price: 84.00, unit: 'cento', image: noImage }
  ]

  const docesComuns = [
    { id: 36, name: 'Beijinho', description: 'Beijinho tradicional', price: 84.00, unit: 'cento', image: noImage },
    { id: 37, name: 'Brigadeiro', description: 'Brigadeiro tradicional', price: 84.00, unit: 'cento', image: noImage },
    { id: 38, name: 'Brigadeiro Branco', description: 'Brigadeiro branco', price: 84.00, unit: 'cento', image: noImage },
    { id: 39, name: 'Cajuzinho', description: 'Cajuzinho tradicional', price: 84.00, unit: 'cento', image: noImage },
    { id: 40, name: 'Casadinho', description: 'Casadinho tradicional', price: 84.00, unit: 'cento', image: noImage },
    { id: 41, name: 'Olho de Sogra', description: 'Olho de sogra', price: 84.00, unit: 'cento', image: noImage },
    { id: 42, name: 'Quindim', description: 'Quindim tradicional', price: 84.00, unit: 'cento', image: noImage }
  ]

  const docesCaramelizados = [
    { id: 43, name: 'Beijinho Caramelizado', description: 'Beijinho com cobertura caramelizada', price: 90.00, unit: 'cento', image: noImage },
    { id: 44, name: 'Brigadeiro Caramelizado', description: 'Brigadeiro com cobertura caramelizada', price: 90.00, unit: 'cento', image: noImage },
    { id: 45, name: 'Brigadeiro Branco Caramelizado', description: 'Brigadeiro branco com cobertura caramelizada', price: 90.00, unit: 'cento', image: noImage },
    { id: 46, name: 'Cajuzinho Caramelizado', description: 'Cajuzinho com cobertura caramelizada', price: 90.00, unit: 'cento', image: noImage },
    { id: 47, name: 'Casadinho Caramelizado', description: 'Casadinho com cobertura caramelizada', price: 90.00, unit: 'cento', image: noImage }
  ]

  const docesGourmet = [
    { id: 48, name: 'Beijinho de Coco Queimado', description: 'Beijinho gourmet de coco queimado', price: 100.00, unit: 'cento', image: noImage },
    { id: 49, name: 'Beijinho de Leite Ninho', description: 'Beijinho gourmet de leite ninho', price: 100.00, unit: 'cento', image: noImage },
    { id: 50, name: 'Beijinho de Limão', description: 'Beijinho gourmet de limão', price: 100.00, unit: 'cento', image: noImage },
    { id: 51, name: 'Beijinho de Maracujá', description: 'Beijinho gourmet de maracujá', price: 100.00, unit: 'cento', image: noImage },
    { id: 52, name: 'Brigadeiro de Café', description: 'Brigadeiro gourmet de café', price: 100.00, unit: 'cento', image: noImage },
    { id: 53, name: 'Brigadeiro de Chocolate Belga', description: 'Brigadeiro gourmet de chocolate belga', price: 100.00, unit: 'cento', image: noImage },
    { id: 54, name: 'Brigadeiro de Chocolate Branco', description: 'Brigadeiro gourmet de chocolate branco', price: 100.00, unit: 'cento', image: noImage },
    { id: 55, name: 'Brigadeiro de Doce de Leite', description: 'Brigadeiro gourmet de doce de leite', price: 100.00, unit: 'cento', image: noImage },
    { id: 56, name: 'Brigadeiro de Leite Ninho', description: 'Brigadeiro gourmet de leite ninho', price: 100.00, unit: 'cento', image: noImage },
    { id: 57, name: 'Brigadeiro de Limão', description: 'Brigadeiro gourmet de limão', price: 100.00, unit: 'cento', image: noImage },
    { id: 58, name: 'Brigadeiro de Maracujá', description: 'Brigadeiro gourmet de maracujá', price: 100.00, unit: 'cento', image: noImage },
    { id: 59, name: 'Brigadeiro de Morango', description: 'Brigadeiro gourmet de morango', price: 100.00, unit: 'cento', image: noImage },
    { id: 60, name: 'Brigadeiro de Nutella', description: 'Brigadeiro gourmet de nutella', price: 100.00, unit: 'cento', image: noImage },
    { id: 61, name: 'Brigadeiro de Oreo', description: 'Brigadeiro gourmet de oreo', price: 100.00, unit: 'cento', image: noImage },
    { id: 62, name: 'Brigadeiro de Paçoca', description: 'Brigadeiro gourmet de paçoca', price: 100.00, unit: 'cento', image: noImage },
    { id: 63, name: 'Brigadeiro de Pistache', description: 'Brigadeiro gourmet de pistache', price: 100.00, unit: 'cento', image: noImage },
    { id: 64, name: 'Brigadeiro de Prestígio', description: 'Brigadeiro gourmet de prestígio', price: 100.00, unit: 'cento', image: noImage },
    { id: 65, name: 'Brigadeiro de Sonho de Valsa', description: 'Brigadeiro gourmet de sonho de valsa', price: 100.00, unit: 'cento', image: noImage },
    { id: 66, name: 'Brigadeiro de Uva', description: 'Brigadeiro gourmet de uva', price: 100.00, unit: 'cento', image: noImage }
  ]

  const bombons = [
    { id: 67, name: 'Bombom de Chocolate ao Leite', description: 'Bombom de chocolate ao leite', price: 120.00, unit: 'cento', image: noImage },
    { id: 68, name: 'Bombom de Chocolate Branco', description: 'Bombom de chocolate branco', price: 120.00, unit: 'cento', image: noImage },
    { id: 69, name: 'Bombom de Chocolate Meio Amargo', description: 'Bombom de chocolate meio amargo', price: 120.00, unit: 'cento', image: noImage },
    { id: 70, name: 'Bombom de Doce de Leite', description: 'Bombom de doce de leite', price: 120.00, unit: 'cento', image: noImage },
    { id: 71, name: 'Bombom de Frutas Vermelhas', description: 'Bombom de frutas vermelhas', price: 120.00, unit: 'cento', image: noImage },
    { id: 72, name: 'Bombom de Limão', description: 'Bombom de limão', price: 120.00, unit: 'cento', image: noImage },
    { id: 73, name: 'Bombom de Maracujá', description: 'Bombom de maracujá', price: 120.00, unit: 'cento', image: noImage },
    { id: 74, name: 'Bombom de Morango', description: 'Bombom de morango', price: 120.00, unit: 'cento', image: noImage },
    { id: 75, name: 'Bombom de Nutella', description: 'Bombom de nutella', price: 120.00, unit: 'cento', image: noImage },
    { id: 76, name: 'Bombom de Paçoca', description: 'Bombom de paçoca', price: 120.00, unit: 'cento', image: noImage },
    { id: 77, name: 'Bombom de Pistache', description: 'Bombom de pistache', price: 120.00, unit: 'cento', image: noImage },
    { id: 78, name: 'Bombom de Prestígio', description: 'Bombom de prestígio', price: 120.00, unit: 'cento', image: noImage },
    { id: 79, name: 'Bombom de Sonho de Valsa', description: 'Bombom de sonho de valsa', price: 120.00, unit: 'cento', image: noImage },
    { id: 80, name: 'Bombom de Uva', description: 'Bombom de uva', price: 120.00, unit: 'cento', image: noImage }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-montserrat font-bold text-center mb-8 text-gray-800">
          Nosso Cardápio
        </h1>

        {/* Abas de Navegação */}
        <div className="flex justify-center mb-8 space-x-4">
          <Button
            onClick={() => handleTabChange('todos')}
            className={`font-open-sans ${activeTab === 'todos' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>
            Todos
          </Button>
          <Button
            onClick={() => handleTabChange('salgados')}
            className={`font-open-sans ${activeTab === 'salgados' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>
            Salgados
          </Button>
          <Button
            onClick={() => handleTabChange('doces')}
            className={`font-open-sans ${activeTab === 'doces' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>
            Doces
          </Button>
          <Button
            onClick={() => handleTabChange('bombons')}
            className={`font-open-sans ${activeTab === 'bombons' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>
            Bombons
          </Button>
          <Button
            onClick={() => handleTabChange('bolos')}
            className={`font-open-sans ${activeTab === 'bolos' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>
            Bolos
          </Button>
        </div>

        {/* Seção de Salgados Folhados */}
        {shouldShowSection('salgados_folhados') && (
          <div ref={salgadosFolhadosRef}>
            <h2 className="text-3xl font-montserrat font-bold mb-6 text-gray-800">Salgados Folhados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {salgadosFolhados.map(item => (
                <MenuItem key={item.id} item={item} addToCart={addToCart} />
              ))}
            </div>
          </div>
        )}

        {/* Seção de Salgados Fritos */}
        {shouldShowSection('salgados_fritos') && (
          <div ref={salgadosFritosRef} className="mt-12">
            <h2 className="text-3xl font-montserrat font-bold mb-6 text-gray-800">Salgados Fritos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {salgadosFritos.map(item => (
                <MenuItem key={item.id} item={item} addToCart={addToCart} />
              ))}
            </div>
          </div>
        )}

        {/* Seção de Salgados Assados */}
        {shouldShowSection('salgados_assados') && (
          <div ref={salgadosAssadosRef} className="mt-12">
            <h2 className="text-3xl font-montserrat font-bold mb-6 text-gray-800">Salgados Assados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {salgadosAssados.map(item => (
                <MenuItem key={item.id} item={item} addToCart={addToCart} />
              ))}
            </div>
          </div>
        )}

        {/* Seção de Doces Comuns */}
        {shouldShowSection('doces_comuns') && (
          <div ref={docesComunsRef} className="mt-12">
            <h2 className="text-3xl font-montserrat font-bold mb-6 text-gray-800">Doces Comuns</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {docesComuns.map(item => (
                <MenuItem key={item.id} item={item} addToCart={addToCart} />
              ))}
            </div>
          </div>
        )}

        {/* Seção de Doces Caramelizados */}
        {shouldShowSection('doces_caramelizados') && (
          <div ref={docesCaramelizadosRef} className="mt-12">
            <h2 className="text-3xl font-montserrat font-bold mb-6 text-gray-800">Doces Caramelizados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {docesCaramelizados.map(item => (
                <MenuItem key={item.id} item={item} addToCart={addToCart} />
              ))}
            </div>
          </div>
        )}

        {/* Seção de Doces Gourmet */}
        {shouldShowSection('doces_gourmet') && (
          <div ref={docesGourmetRef} className="mt-12">
            <h2 className="text-3xl font-montserrat font-bold mb-6 text-gray-800">Doces Gourmet</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {docesGourmet.map(item => (
                <MenuItem key={item.id} item={item} addToCart={addToCart} />
              ))}
            </div>
          </div>
        )}

        {/* Seção de Bombons */}
        {shouldShowSection('bombons') && (
          <div ref={bombonsRef} className="mt-12">
            <h2 className="text-3xl font-montserrat font-bold mb-6 text-gray-800">Bombons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bombons.map(item => (
                <MenuItem key={item.id} item={item} addToCart={addToCart} />
              ))}
            </div>
          </div>
        )}

        {/* Seção de Bolo Personalizado */}
        {shouldShowSection('bolo_personalizado') && (
          <div ref={boloPersonalizadoRef} className="mt-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-montserrat font-bold mb-6 text-gray-800">Bolo Personalizado</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img src={bolo1} alt="Bolo Personalizado" className="rounded-lg shadow-md" />
              </div>
              <div>
                <p className="text-lg font-open-sans mb-4">Monte o bolo dos seus sonhos! Escolha o peso, sabor e cobertura que mais lhe agradam.</p>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Peso (em kg):</label>
                  <input
                    type="number"
                    value={boloPersonalizado.peso}
                    onChange={(e) => setBoloPersonalizado({...boloPersonalizado, peso: e.target.value})}
                    className="w-full p-2 border rounded"
                    min="1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Sabor:</label>
                  <input
                    type="text"
                    value={boloPersonalizado.sabor}
                    onChange={(e) => setBoloPersonalizado({...boloPersonalizado, sabor: e.target.value})}
                    className="w-full p-2 border rounded"
                    placeholder="Ex: Ninho com morango, Chocolate..."
                  />
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

                <div className="flex justify-between items-center">
                  <span className="font-montserrat font-semibold text-lg">
                    Preço Total:
                  </span>
                  <span className="font-montserrat font-bold text-xl text-primary">
                    R$ {(boloPersonalizado.peso * 110).toFixed(2)}
                  </span>
                </div>

                <Button
                  className="btn-primary w-full mt-4 font-open-sans"
                  onClick={() => addToCart({
                    id: 'bolo_personalizado',
                    name: `Bolo Personalizado (${boloPersonalizado.peso}kg)`,
                    description: `Sabor: ${boloPersonalizado.sabor}, Cobertura: ${boloPersonalizado.cobertura}, Observações: A combinar via WhatsApp`,
                    price: boloPersonalizado.peso * 110,
                    unit: 'unidade',
                    image: bolo1
                  }, 1)}>
                  Adicionar ao Carrinho
                </Button>
                <p className="text-sm text-red-600 mt-4">
                  * Recheios que envolvem frutas secas e castanhas terão acréscimo de 30% no valor do bolo.
                </p>
                <p className="text-sm text-red-600 mb-4">
                  * Os topos (decorações do bolo) e a caixa de transporte (não obrigatório, porém recomendado) têm valores à parte.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <CartSidebar
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
        generateWhatsAppMessage={generateWhatsAppMessage}
      />
    </div>
  )
}

export default MenuPage

