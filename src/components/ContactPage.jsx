import React from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Phone, MapPin, Clock, Heart } from 'lucide-react'

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-montserrat font-bold text-center mb-8 text-gray-800">
          Entre em Contato
        </h1>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Informações de contato */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Phone className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-montserrat font-semibold">Telefone</h3>
              </div>
              <p className="text-gray-600 font-open-sans mb-4">
                Entre em contato conosco pelo WhatsApp para fazer seu pedido:
              </p>
              <Button 
                className="btn-primary font-open-sans"
                onClick={() => window.open('https://wa.me/5561992552565', '_blank')}
              >
                (61) 99255-2565
              </Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-xl font-montserrat font-semibold">Localização</h3>
              </div>
              <p className="text-gray-600 font-open-sans">
                Brasília - DF<br />
                Atendemos toda a região do Distrito Federal
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-purple-600 mr-3" />
                <h3 className="text-xl font-montserrat font-semibold">Horário de Funcionamento</h3>
              </div>
              <div className="text-gray-600 font-open-sans">
                <p><strong>Segunda a Sexta:</strong> 8h às 18h</p>
                <p><strong>Sábado:</strong> 8h às 16h</p>
                <p><strong>Domingo:</strong> Fechado</p>
              </div>
            </Card>
          </div>

          {/* Sobre nós */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Heart className="w-6 h-6 text-red-600 mr-3" />
                <h3 className="text-xl font-montserrat font-semibold">Sobre a Preta</h3>
              </div>
              <p className="text-gray-600 font-open-sans mb-4">
                A Preta Doces e Salgados nasceu do amor pela culinária artesanal e do desejo 
                de levar sabores únicos para sua mesa. Cada produto é feito com carinho, 
                utilizando ingredientes selecionados e receitas tradicionais.
              </p>
              <p className="text-gray-600 font-open-sans">
                Nossos salgados são preparados frescos diariamente, e nossos doces são 
                verdadeiras obras de arte comestíveis. Trabalhamos com encomendas para 
                garantir a qualidade e frescor de cada item.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-montserrat font-semibold mb-4">Como Fazer seu Pedido</h3>
              <div className="space-y-3 text-gray-600 font-open-sans">
                <div className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                  <p>Navegue pelo nosso cardápio e adicione os itens desejados ao carrinho</p>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                  <p>Preencha suas informações e escolha data e horário de retirada</p>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                  <p>Finalize pelo WhatsApp e confirme todos os detalhes</p>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                  <p>Retire seu pedido no horário combinado</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 font-open-sans mb-4">
            Tem alguma dúvida ou sugestão? Entre em contato conosco!
          </p>
          <Button 
            className="btn-primary font-open-sans text-lg px-8 py-3"
            onClick={() => window.open('https://wa.me/5561992552565', '_blank')}
          >
            Falar no WhatsApp
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ContactPage

