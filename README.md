# Preta Doces e Salgados 🍩🥐

Um web app Single Page Application (SPA) responsivo e *mobile-first*, criado sob medida para otimizar os pedidos e a exibição do catálogo de salgados, doces e bolos sob encomenda da **Preta Doces e Salgados**.

## 🚀 Visão Geral do Projeto

Este projeto foi reestruturado para ser uma aplicação **100% Vanilla** (HTML5, CSS3, e JavaScript ES6+ puros), sem depender de frameworks pesados (como React, Vue ou bibliotecas CSS como Tailwind). 

O foco foi atingir **performance máxima**, controle total de estilização para uma estética minimalista, e uma experiência de usuário (UX) comparável à de um aplicativo nativo no celular.

## ✨ Principais Funcionalidades

- **Catálogo Dinâmico e Responsivo**: Produtos renderizados dinamicamente a partir de um banco de dados local (`data.js`), categorizados em abas intuitivas (Salgados, Doces, Bolos, Destaques).
- **SPA (Single Page Application)**: Navegação super-rápida entre as páginas "Início", "Cardápio", "Contato" e "Carrinho" utilizando a History API do navegador e manipulação de estado, sem recarregamento da página.
- **Carrinho Inteligente e Persistente**: Utilização de `localStorage` para manter o carrinho ativo mesmo se o usuário fechar o site acidentalmente.
- **Checkout Integrado via WhatsApp**: Em vez de gateways complexos, o pedido é formatado estruturalmente em texto e despachado magicamente para a API do WhatsApp com apenas um clique.
- **Barra de Pesquisa Dinâmica**: Barra fluída (sticky) que desce com o usuário para fácil acesso, e que ilumina (highlight) o resultado exato na tela.
- **Lightbox Integrado**: Toque/clique nas imagens de produtos para visualizá-las em formato imersivo.
- **Event Delegation**: Toda a escuta de eventos do app (cliques, mudanças) foi centralizada no topo (`app.js`), mantendo a memória limpa e o código resistente a perdas de referência após a renderização (re-render) dos componentes.

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica focada em SEO e acessibilidade (aria-labels, roles).
- **CSS3 (Vanilla)**:
  - Uso massivo de **Variáveis (Custom Properties)** para um *Design System* centralizado (cores, fontes, espaçamentos).
  - Animações super leves (transições, fade-ins).
  - **Flexbox & Grid** para orquestrar os layouts.
  - Abordagem *BEM* (Block Element Modifier) adaptada para clareza estrutural.
- **JavaScript (Vanilla - ES6+)**:
  - Padrão estrutural leve de componentes baseados em *Template Literals*.
  - Gerenciamento de Estado (`appState`).

## 📁 Estrutura de Arquivos Principal

O repositório está focado nas pastas que impulsionam o site hoje:

```text
/
├── index.html         # Ponto de entrada estrutural único (SPA root node #app)
├── /css
│   └── styles.css     # Arquivo global de estilos e design tokens
├── /js
│   ├── app.js         # Lógica de Roteamento, Event Delegation e Estado Global
│   ├── components.js  # Funções de Template (Header, Footer, Cart, Modais)
│   └── data.js        # "Banco de dados" estático (PRODUTOS, Categorias, Configs)
├── /img               # Diretório das mídias otimizadas
└── README.md          # Esta documentação
```

## 🤝 Fluxo do Usuário (Onboarding -> Checkout)

1. **Chegada (Hero e Onboarding)**: O usuário abre a Home, que não possui distração com navegação confusa (o Header exibe a logo em formato textual elegante). O usuário é recepcionado pela introdução e os passos de *Como fazer o pedido*.
2. **Exploração**: Na aba de cardápio, a adição e remoção é rápida (botões + e -), com a *Bottom Bar* móvel aparecendo quando algo é inserido no carrinho.
3. **Revisão**: Um clique na *Bottom Bar* leva à revisão total.
4. **Checkout e Finalização**: No modal de checkout, os dados (Nome, Data e Hora) são capturados e um botão verde (WhatsApp) dispara o texto formatado para o aplicativo nativo de chat, concluindo a jornada sem atritos.
