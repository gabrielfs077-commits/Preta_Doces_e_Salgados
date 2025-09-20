# 🍰 Preta Doces e Salgados

Site oficial da **Preta Doces e Salgados** - Salgados e doces artesanais feitos com carinho em Brasília-DF.

## 📋 Sobre o Projeto

Este é um site moderno e responsivo desenvolvido para a Preta Doces e Salgados, uma empresa especializada em salgados e doces artesanais. O site oferece uma experiência completa de navegação pelo cardápio, seleção de produtos e finalização de pedidos via WhatsApp.

### ✨ Funcionalidades

- **🏠 Página Inicial**: Apresentação da empresa e seus diferenciais
- **📱 Cardápio Interativo**: Navegação por categorias com abas (Salgados, Doces, Bombons, Bolos)
- **🛒 Carrinho de Compras**: Sistema completo de carrinho com cálculo automático
- **📞 Integração WhatsApp**: Finalização de pedidos diretamente pelo WhatsApp
- **📅 Agendamento**: Seleção de data e horário para retirada (intervalos de 30 minutos)
- **💰 Formatação Brasileira**: Valores em reais com vírgula como separador decimal
- **📱 Design Responsivo**: Otimizado para dispositivos móveis e desktop
- **🎨 Interface Moderna**: Design clean e intuitivo com Tailwind CSS

### 🍽️ Produtos Disponíveis

**Salgados Folhados** (13 variedades)
- Alho Poró com Creme Cheese, Bacalhau, Banana com Queijo, Camarão, Carne, etc.

**Salgados Fritos** (15 variedades)
- Coxinha, Risole, Pastel, Kibe, Bolinha de Queijo, etc.

**Salgados Assados** (7 variedades)
- Esfirra, Pão de Batata, Pão de Açúcar, etc.

**Doces Comuns** (7 variedades)
- Brigadeiro, Beijinho, Cajuzinho, Casadinho, Quindim, etc.

**Doces Caramelizados** (5 variedades)
- Versões caramelizadas dos doces tradicionais

**Doces Gourmet** (19 variedades)
- Brigadeiro de Nutella, Pistache, Café, Maracujá, Limão, etc.

**Bombons** (14 variedades)
- Chocolate ao Leite, Branco, Meio Amargo, Frutas Vermelhas, etc.

**Bolos Personalizados**
- Sistema de personalização com peso, sabor, cobertura e observações

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces de usuário
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Biblioteca de ícones
- **JavaScript ES6+** - Linguagem de programação moderna

## 📁 Estrutura do Projeto

```
preta-doces-salgados/
├── public/                 # Arquivos estáticos
├── src/
│   ├── assets/            # Imagens e recursos
│   │   ├── coxinha.png
│   │   ├── brigadeiro.png
│   │   ├── beijinho.png
│   │   └── ...
│   ├── components/        # Componentes React
│   │   ├── ui/           # Componentes de interface
│   │   │   ├── button.jsx
│   │   │   └── card.jsx
│   │   ├── Header.jsx
│   │   ├── HomePage.jsx
│   │   ├── MenuPage.jsx
│   │   ├── MenuItem.jsx
│   │   ├── CartSidebar.jsx
│   │   ├── CartPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── IsolatedInput.jsx
│   │   └── IsolatedTextarea.jsx
│   ├── styles/           # Arquivos de estilo
│   │   └── App.css
│   ├── App.jsx          # Componente principal
│   └── main.jsx         # Ponto de entrada
├── index.html           # Template HTML
├── package.json         # Dependências e scripts
├── vite.config.js       # Configuração do Vite
├── tailwind.config.js   # Configuração do Tailwind
├── postcss.config.js    # Configuração do PostCSS
└── README.md           # Este arquivo
```

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/preta-doces-salgados.git
   cd preta-doces-salgados
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o projeto em modo de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse o site**
   - Abra seu navegador e vá para `http://localhost:5173`

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a versão de produção
- `npm run preview` - Visualiza a versão de produção localmente
- `npm run lint` - Executa o linter para verificar o código

## 🎨 Personalização

### Cores e Tema

As cores principais podem ser alteradas no arquivo `tailwind.config.js`:

```javascript
colors: {
  primary: '#e91e63',    // Rosa principal
  secondary: '#9c27b0',  // Roxo secundário
}
```

### Fontes

O projeto utiliza as fontes Google Fonts:
- **Montserrat** - Para títulos e elementos de destaque
- **Open Sans** - Para textos corridos e descrições

### Imagens

As imagens dos produtos estão localizadas em `src/assets/` e podem ser substituídas mantendo os mesmos nomes de arquivo.

## 📱 Funcionalidades Especiais

### Sistema de Carrinho

- Adição/remoção de produtos
- Cálculo automático de totais
- Persistência durante a navegação
- Formatação de moeda brasileira (R$ 00,00)

### Integração WhatsApp

- Geração automática de mensagem formatada
- Inclusão de todos os detalhes do pedido
- Informações de cliente e agendamento

### Navegação por Abas

- Filtros por categoria de produtos
- Rolagem suave para seções específicas
- Interface sticky para fácil acesso

### Responsividade

- Layout adaptativo para mobile, tablet e desktop
- Cards organizados em grid responsivo
- Carrinho sidebar em desktop, página completa em mobile

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Contato

**Preta Doces e Salgados**
- WhatsApp: (61) 99255-2565
- Localização: Brasília - DF
- Horário: Segunda a Sexta (8h às 20h), Sábado (8h às 20h)

## 📄 Licença

Este projeto é propriedade da Preta Doces e Salgados. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para a Preta Doces e Salgados**

