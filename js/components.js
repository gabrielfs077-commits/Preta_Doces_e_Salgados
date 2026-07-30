/**
 * components.js — Preta Doces e Salgados
 * Funções puras que retornam strings de HTML via Template Literals.
 * Nenhum framework necessário — injetadas no DOM via innerHTML.
 */

// =========================================================
// ÍCONES SVG INLINE (substitui lucide-react)
// =========================================================
const ICONES = {
  carrinho: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  mais:     `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  menos:    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  coração:  `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  telefone: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  local:    `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  lupa:     `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  relogio:  `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>`,
  estrela:  `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  sacola:   `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  bolo:     `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2 1 2 1"/><path d="M2 21h20"/><path d="M7 8v2"/><path d="M12 8v2"/><path d="M17 8v2"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/></svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
};

// =========================================================
// HEADER
// =========================================================
function renderHeader(paginaAtual, totalItensCarrinho) {
  const navLinks = [
    { id: 'home',    label: 'Início' },
    { id: 'menu',    label: 'Cardápio' },
    { id: 'contact', label: 'Contato' },
  ];

  const navHTML = navLinks.map(link => `
    <button
      class="nav-btn ${paginaAtual === link.id ? 'ativo' : ''}"
      data-nav="${link.id}"
      aria-label="Ir para ${link.label}"
    >
      ${link.label}
    </button>
  `).join('');

  const badgeHTML = totalItensCarrinho > 0
    ? `<span class="carrinho-badge" aria-label="${totalItensCarrinho} itens no carrinho">${totalItensCarrinho}</span>`
    : '';

  return `
    <header class="header" role="banner">
      <div class="container">
        <div class="header__inner">

          <div class="header-top">
            <!-- Logo + Nome -->
            <a class="header__logo-link" href="#" data-acao="ir-home" aria-label="Voltar para a página inicial">
              <div class="header__logo" role="heading" aria-level="1">
                <span class="header__logo-nome">Preta Doces e Salgados</span>
              </div>
            </a>

            <!-- Ícones (Instagram, Carrinho) -->
            <div class="header-icons">
              <!-- Instagram -->
              <a
                href="https://www.instagram.com/preta_doces_e_salgados?igsh=MTUyMTJ6Y2RtY3U5ag=="
                target="_blank"
                rel="noopener noreferrer"
                class="nav-btn nav-btn--instagram"
                aria-label="Ver Instagram da Preta Doces e Salgados"
                title="@preta_doces_e_salgados"
              >
                ${ICONES.instagram}
              </a>

              <!-- Carrinho -->
              <button
                class="nav-btn nav-btn--carrinho ${paginaAtual === 'cart' ? 'ativo' : ''}"
                data-nav="cart"
                aria-label="Carrinho de compras com ${totalItensCarrinho} itens"
              >
                ${ICONES.carrinho}
                <span class="nav-label">Carrinho</span>
                ${badgeHTML}
              </button>
            </div>
          </div>

          <!-- Navegação principal -->
          <div class="header-nav">
            <nav class="header__nav" role="navigation" aria-label="Navegação principal">
              ${navHTML}
            </nav>
          </div>

        </div>
      </div>
    </header>

    <!-- Contêiner Isolado da Barra de Busca (Irmão do header) -->
    <div class="header__search-container">
      <div class="container">
        <form class="header__search" data-search-form>
          <label class="sr-only" for="site-search">Pesquisar no site</label>
          <div class="header__search-wrapper">
            <span class="header__search-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
            <input
              id="site-search"
              name="search"
              type="search"
              class="header__search-input"
              placeholder="Buscar produtos..."
              autocomplete="off"
              value="${appState.searchQuery || ''}"
            />
          </div>
          <button type="submit" class="btn btn-search" aria-label="Pesquisar">
            Buscar
          </button>
        </form>
      </div>
    </div>
  `;
}

// =========================================================
// FOOTER
// =========================================================
function renderFooter() {
  return `
    <footer class="footer" role="contentinfo">
      <div class="container">
        <div class="footer__logo">Preta Doces e Salgados</div>
        <p class="footer__texto">
          © ${new Date().getFullYear()} Preta Doces e Salgados — Feito com ❤️ pela família<br>
          Brasília-DF · <a href="https://wa.me/${WHATSAPP_NUMERO}" target="_blank" rel="noopener">WhatsApp: (61) 99255-2565</a>
        </p>
      </div>
    </footer>
  `;
}

// =========================================================
// HOME PAGE
// =========================================================
function renderHomePage() {
  return `
    <main class="home-page" id="pagina-home">

      <!-- HERO -->
      <section class="hero" aria-label="Boas-vindas">
        <div class="container">
          <img src="./LOGO-removebg-preview.png" alt="Preta Doces e Salgados" class="home__logo-grande" />
          <div class="hero__badge">
            ${ICONES.estrela} Artesanal &amp; Feito com Carinho
          </div>
          <h2 class="hero__titulo">
            Sabores que<br><span>encantam</span> sua família
          </h2>
          <p class="hero__subtitulo">
            Salgados, doces artesanais e bolos sob encomenda.
          </p>
          <div class="hero__acoes">
            <button class="btn btn-hero" data-nav="menu" id="btn-ver-cardapio">
              ${ICONES.carrinho} Ver Cardápio Completo
            </button>
            <button class="btn btn-wpp" onclick="window.open('https://wa.me/${WHATSAPP_NUMERO}', '_blank')" id="btn-contato-hero">
              ${ICONES.whatsapp} Fale Conosco
            </button>
          </div>
        </div>
      </section>

      <!-- COMO PEDIR -->
      <section class="como-pedir-section" aria-label="Como Fazer seu Pedido" style="padding: 2rem 0; background: var(--cor-fundo);">
        <div class="container">
          <article class="contact-card" style="margin: 0 auto; max-width: 800px;">
            <h3 class="contact-card__titulo" style="margin-bottom:1rem; text-align: center;">📝 Como Fazer seu Pedido</h3>
            <ol class="passo-lista">
              <li class="passo-item">
                <span class="passo-numero">1</span>
                <span>Navegue pelo nosso cardápio e adicione os itens desejados ao carrinho</span>
              </li>
              <li class="passo-item">
                <span class="passo-numero">2</span>
                <span>Acesse o carrinho e preencha seu nome, data e horário de retirada</span>
              </li>
              <li class="passo-item">
                <span class="passo-numero">3</span>
                <span>Clique em "Enviar pelo WhatsApp" e confirme todos os detalhes</span>
              </li>
              <li class="passo-item">
                <span class="passo-numero">4</span>
                <span>Retire seu pedido fresquinho no horário combinado!</span>
              </li>
            </ol>
          </article>
        </div>
      </section>

      <!-- DESTAQUES -->
      <section class="destaques" aria-label="Nossos produtos">
        <div class="container">
          <h2 class="destaques__titulo">O que preparamos para você</h2>
          <div class="destaques__grid">

            <article class="destaque-card">
              <div class="destaque-card__icone destaque-card__icone--rosa">🥐</div>
              <h3 class="destaque-card__titulo">Salgados Frescos</h3>
              <p class="destaque-card__desc">
                Folhados, fritos e assados. Coxinha, risole, empada, esfirra e muito mais.
                Preparados diariamente com massa artesanal.
              </p>
            </article>

            <article class="destaque-card">
              <div class="destaque-card__icone destaque-card__icone--lilas">🍫</div>
              <h3 class="destaque-card__titulo">Doces Artesanais</h3>
              <p class="destaque-card__desc">
                Brigadeiros, beijinhos, bombons gourmet e caramelizados.
                Mais de 30 sabores únicos para adoçar qualquer momento.
              </p>
            </article>

            <article class="destaque-card">
              <div class="destaque-card__icone destaque-card__icone--azul">🎂</div>
              <h3 class="destaque-card__titulo">Bolos Especiais</h3>
              <p class="destaque-card__desc">
                Bolos personalizados para aniversários, casamentos e eventos.
                Escolha o sabor, cobertura e decoração dos seus sonhos.
              </p>
            </article>

          </div>
        </div>
      </section>

      <!-- POR QUÊ A PRETA -->
      <section class="por-que" aria-label="Sobre nós">
        <div class="container">
          <h2 class="por-que__titulo">Por que escolher a Preta?</h2>
          <p class="por-que__texto">
            Nossos produtos são feitos com ingredientes selecionados e muito amor.
            Cada item é preparado artesanalmente para garantir o melhor sabor e qualidade
            para você e sua família. Trabalhamos com encomendas para garantir frescor total.
          </p>
          <div class="por-que__stats">
            <div class="stat">
              <div class="stat__numero">80+</div>
              <div class="stat__label">Sabores disponíveis</div>
            </div>
            <div class="stat">
              <div class="stat__numero">100%</div>
              <div class="stat__label">Feito artesanalmente</div>
            </div>
            <div class="stat">
              <div class="stat__numero">⭐5.0</div>
              <div class="stat__label">Avaliação dos clientes</div>
            </div>
          </div>
        </div>
      </section>

    </main>
  `;
}

// =========================================================
// CARD DE PRODUTO (MenuItem)
// =========================================================
function renderProdutoCard(produto, quantidade) {
  const step = produto.unit === 'cento' ? 25 : 1;
  const min  = produto.unit === 'cento' ? 25 : 1;
  const unidadeLabel = produto.unit === 'cento' ? `/ cento (por 100un)` : `/ unidade`;

  const precoFormatado = formatarMoeda(produto.price);
  // Top 5: badge dinâmico (Top 1, Top 2, etc). Destaque: tag sutil "Popular"
  let badgeMaisVendido = '';
  if (produto.rankVendido === 'top5' && produto.ranking) {
    badgeMaisVendido = `<span class="badge-mais-vendido badge-mais-vendido--top5">Top ${produto.ranking}</span>`;
  } else if (produto.rankVendido === 'top5' || produto.rankVendido === 'destaque') {
    badgeMaisVendido = `<span class="badge-mais-vendido badge-mais-vendido--destaque">Popular</span>`;
  }

  return `
    <article class="produto-card" data-produto-id="${produto.id}">
      <div class="produto-card__left">
        ${badgeMaisVendido}
        <img
          class="produto-card__img"
          src="${produto.image}"
          alt="${produto.name}"
          width="70"
          height="70"
          loading="lazy"
          onerror="this.onerror=null; this.src='./img/placeholder.webp';"
        />
      </div>

      <div class="produto-card__center">
        <h3 class="produto-card__nome">${produto.name}</h3>
        <p class="produto-card__preco">${precoFormatado} <span>${unidadeLabel}</span></p>
      </div>

      <div class="produto-card__right">
        <div class="quantidade-controle">
          <button
            class="btn-quantidade"
            data-acao="diminuir"
            data-id="${produto.id}"
            data-step="${step}"
            data-min="${min}"
            aria-label="Diminuir quantidade"
            ${quantidade <= min ? 'disabled' : ''}
          >${ICONES.menos}</button>
          <span class="quantidade-display" id="qtd-${produto.id}">${quantidade}</span>
          <button
            class="btn-quantidade"
            data-acao="aumentar"
            data-id="${produto.id}"
            data-step="${step}"
            aria-label="Aumentar quantidade"
          >${ICONES.mais}</button>
        </div>
        <button
          class="btn-add-mini"
          data-acao="adicionar-carrinho"
          data-id="${produto.id}"
          aria-label="Adicionar ${produto.name} ao carrinho"
        >
          ${ICONES.carrinho}
        </button>
      </div>
    </article>
  `;
}

// =========================================================
// SIDEBAR DO CARRINHO
// =========================================================
function renderCartSidebar(carrinho) {
  if (carrinho.length === 0) {
    return `
      <aside class="cart-sidebar" aria-label="Resumo do carrinho">
        <div class="cart-sidebar__header">
          ${ICONES.carrinho}
          <h2 class="cart-sidebar__titulo">Seu Carrinho</h2>
        </div>
        <div class="cart-sidebar__vazio">
          ${ICONES.sacola}
          <p>Seu carrinho está vazio</p>
          <p style="font-size:0.78rem; margin-top:0.35rem; opacity:0.7;">Adicione produtos deliciosos!</p>
        </div>
      </aside>
    `;
  }

  const itensHTML = carrinho.map((item, index) => {
    const subtotal = calcularSubtotal(item);
    const unidade  = item.unit === 'cento' ? 'unidades' : item.unit;
    return `
      <div class="cart-item-sidebar">
        <div class="cart-item-sidebar__header">
          <div>
            <div class="cart-item-sidebar__nome">${item.name}</div>
            <div class="cart-item-sidebar__qtd">${item.quantidade} ${unidade}</div>
          </div>
          <div style="text-align:right;">
            <div class="cart-item-sidebar__preco">${formatarMoeda(subtotal)}</div>
            <button class="btn-remover" data-acao="remover-carrinho" data-index="${index}" aria-label="Remover ${item.name}">
              Remover
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <aside class="cart-sidebar" aria-label="Resumo do carrinho">
      <div class="cart-sidebar__header">
        ${ICONES.carrinho}
        <h2 class="cart-sidebar__titulo">Seu Carrinho</h2>
      </div>
      <div class="cart-sidebar__itens">${itensHTML}</div>
      <div class="cart-sidebar__rodape">
        <div class="cart-sidebar__total-linha">
          <span class="cart-sidebar__total-label">Total</span>
          <span class="cart-sidebar__total-valor">${formatarMoeda(calcularTotal(carrinho))}</span>
        </div>
        <button class="btn btn-primario btn-full" data-nav="cart" id="btn-sidebar-finalizar">
          Finalizar Pedido →
        </button>
      </div>
    </aside>
  `;
}

// =========================================================
// SEÇÃO DO BOLO PERSONALIZADO
// =========================================================
function renderBoloPersonalizado(bolo) {
  const peso = bolo.peso || OPCOES_BOLO.PESO_MINIMO;
  const caixa = !!bolo.caixaTransporte;
  const topo = !!bolo.topoPersonalizado;

  const precoTotal = (peso * PRECO_BOLO_POR_KG) + (caixa ? OPCOES_BOLO.PRECO_CAIXA : 0);

  const pesosDisponiveis = [1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 6.0];
  const pesoOptionsHTML = pesosDisponiveis.map(p => `
    <option value="${p}" ${Number(peso) === p ? 'selected' : ''}>${p.toString().replace('.', ',')} kg</option>
  `).join('');

  const massaOptionsHTML = OPCOES_BOLO.SABORES_MASSA.map(m => `
    <option value="${m}" ${bolo.sabor === m ? 'selected' : ''}>${m}</option>
  `).join('');

  const coberturaOptionsHTML = OPCOES_BOLO.COBERTURAS_RECHEIOS.map(c => `
    <option value="${c}" ${bolo.cobertura === c ? 'selected' : ''}>${c}</option>
  `).join('');

  return `
    <section class="secao-produto" id="secao-bolo_personalizado">
      <h2 class="secao-produto__titulo">${ICONES.bolo} Bolo Personalizado</h2>
      <div class="bolo-card">
        <p class="bolo-card__intro">
          Faça seu pedido personalizado! Escolha o peso (mínimo 1,5 kg), sabor da massa e recheio/cobertura do seu bolo especial.
        </p>
        <div class="bolo-card__grid">
          <div class="bolo-card__campo">
            <label class="bolo-card__label" for="bolo-peso">Peso (mínimo 1,5 kg):</label>
            <select id="bolo-peso" class="campo-input" data-bolo="peso">
              ${pesoOptionsHTML}
            </select>
          </div>
          <div class="bolo-card__campo">
            <label class="bolo-card__label" for="bolo-sabor">Massa / Sabor: *</label>
            <select id="bolo-sabor" class="campo-input" data-bolo="sabor">
              <option value="">Selecione o sabor da massa</option>
              ${massaOptionsHTML}
            </select>
          </div>
          <div class="bolo-card__campo">
            <label class="bolo-card__label" for="bolo-cobertura">Recheio / Cobertura: *</label>
            <select id="bolo-cobertura" class="campo-input" data-bolo="cobertura">
              <option value="">Selecione o recheio/cobertura</option>
              ${coberturaOptionsHTML}
            </select>
          </div>
          <div class="bolo-card__campo">
            <label class="bolo-card__label" for="bolo-observacoes">Observações:</label>
            <input
              id="bolo-observacoes"
              type="text"
              value="${bolo.observacoes || ''}"
              class="campo-input"
              placeholder="Cores, decorações especiais..."
              data-bolo="observacoes"
            />
          </div>
        </div>

        <div class="bolo-card__adicionais">
          <label class="checkbox-container">
            <input type="checkbox" id="bolo-caixa" data-bolo="caixaTransporte" ${caixa ? 'checked' : ''} />
            <span class="checkbox-label">Caixa de transporte para o bolo (R$ 20,00)</span>
          </label>
          <label class="checkbox-container">
            <input type="checkbox" id="bolo-topo" data-bolo="topoPersonalizado" ${topo ? 'checked' : ''} />
            <span class="checkbox-label">Adicionar Topo de Bolo Personalizado (A combinar)</span>
          </label>
        </div>

        <div class="bolo-card__preco-linha">
          <span class="bolo-card__preco-label">Preço estimado:</span>
          <span class="bolo-card__preco-valor" id="bolo-preco-display">${formatarMoeda(precoTotal)}</span>
        </div>
        <p class="bolo-card__nota">Preço base: ${formatarMoeda(PRECO_BOLO_POR_KG)} por kg · Mínimo 1,5 kg (${formatarMoeda(OPCOES_BOLO.PESO_MINIMO * PRECO_BOLO_POR_KG)})</p>
        <button class="btn btn-primario btn-full" id="btn-adicionar-bolo">
          ${ICONES.mais} Adicionar Bolo ao Carrinho
        </button>
      </div>
    </section>
  `;
}

// =========================================================
// MENU PAGE
// =========================================================
function renderMenuPage(abaAtiva, subAbaAtiva, carrinho, quantidades, boloPersonalizado) {
  // Garante sincronia entre os cards e os itens já presentes no carrinho
  const obterQuantidadeExibicao = (p) => {
    const itemCarrinho = carrinho.find(item => item.id === p.id);
    return itemCarrinho ? itemCarrinho.quantidade : (quantidades[p.id] || (p.unit === 'cento' ? 25 : 1));
  };

  let secoesHTML = '';

  // Array com todas as categorias a renderizar baseada na abaAtiva
  const gruposParaRenderizar = abaAtiva === 'todos' 
    ? ['salgados', 'doces', 'bombons', 'bolos'] 
    : [abaAtiva];

  for (const grupo of gruposParaRenderizar) {
    if (grupo === 'bolos') {
      secoesHTML += renderBoloPersonalizado(boloPersonalizado);
      continue;
    }

    // Se há subcategorias definidas para o grupo
    if (SUBCATEGORIAS[grupo]) {
      // Filtrar as subcategorias a exibir
      const subs = SUBCATEGORIAS[grupo].filter(s => s.id !== 'todos');

      for (const sub of subs) {
        // Se a aba não é "todos" e estamos numa subAba específica, ignora as outras
        if (abaAtiva !== 'todos' && subAbaAtiva !== 'todos' && sub.id !== subAbaAtiva) {
          continue;
        }

        const produtos = PRODUTOS.filter(p => p.category === grupo && p.subcategory === sub.id);
        if (produtos.length === 0) continue;

        const cardsHTML = produtos.map(p => {
          const qtd = obterQuantidadeExibicao(p);
          return renderProdutoCard(p, qtd);
        }).join('');

        secoesHTML += `
          <section class="secao-produto" id="secao-${grupo}-${sub.id}">
            <h2 class="secao-produto__titulo">${sub.label}</h2>
            <div class="produtos-grid">${cardsHTML}</div>
          </section>
        `;
      }
    } else {
      // Caso não tenha subcategorias (como bombons)
      const produtos = PRODUTOS.filter(p => p.category === grupo);
      if (produtos.length === 0) continue;

      const cardsHTML = produtos.map(p => {
        const qtd = obterQuantidadeExibicao(p);
        return renderProdutoCard(p, qtd);
      }).join('');

      secoesHTML += `
        <section class="secao-produto" id="secao-${grupo}">
          <h2 class="secao-produto__titulo">${grupo === 'bombons' ? 'Bombons' : grupo}</h2>
          <div class="produtos-grid">${cardsHTML}</div>
        </section>
      `;
    }
  }

  // Abas Primárias
  const abas = [
    { id: 'todos',    label: 'Todos' },
    { id: 'salgados', label: 'Salgados' },
    { id: 'doces',    label: 'Doces' },
    { id: 'bombons',  label: 'Bombons' },
    { id: 'bolos',    label: 'Bolos' },
  ];

  const abasHTML = abas.map(aba => `
    <button
      class="filtro-btn ${abaAtiva === aba.id ? 'ativo' : ''}"
      data-aba="${aba.id}"
    >
      ${aba.label}
    </button>
  `).join('');

  // Abas Secundárias (Subcategorias)
  let subAbasHTML = '';
  if (SUBCATEGORIAS[abaAtiva]) {
    const subAbasBtns = SUBCATEGORIAS[abaAtiva].map(sub => `
      <button
        class="filtro-sub-btn ${subAbaAtiva === sub.id ? 'ativo' : ''}"
        data-subaba="${sub.id}"
      >
        ${sub.label}
      </button>
    `).join('');

    subAbasHTML = `
      <div class="filtros-secundarios-wrapper">
        <div class="filtros-secundarios" role="tablist" aria-label="Subcategorias">
          ${subAbasBtns}
        </div>
      </div>
    `;
  }

  return `
    <main class="menu-page" id="pagina-menu">
      <div class="menu-page__header">
        <div class="container">
          <h2 class="menu-page__titulo">Nosso Cardápio</h2>
          <p class="menu-page__subtitulo">Salgados, doces artesanais e bolos sob encomenda.</p>
          <div class="filtros-container" role="tablist" aria-label="Categorias de produtos">
            ${abasHTML}
          </div>
          ${subAbasHTML}
        </div>
      </div>

      <div class="container">
        <div class="menu-layout">
          <div class="menu-conteudo">
            ${secoesHTML}
          </div>
          <div id="cart-sidebar-container">
            ${renderCartSidebar(carrinho)}
          </div>
        </div>
      </div>
    </main>
  `;
}

// =========================================================
// CART PAGE
// =========================================================
function renderCartPage(carrinho) {

  if (carrinho.length === 0) {
    return `
      <main class="cart-page" id="pagina-cart">
        <div class="cart-page__topo">
          <div class="container">
            <h2 class="cart-page__titulo">Seu Carrinho</h2>
          </div>
        </div>
        <div class="container">
          <div class="cart-vazio">
            <div class="cart-vazio__icone">${ICONES.sacola}</div>
            <h3 class="cart-vazio__titulo">Seu carrinho está vazio</h3>
            <p>Adicione produtos deliciosos do nosso cardápio!</p>
            <br>
            <button class="btn btn-primario" data-nav="menu" id="btn-ir-cardapio" style="margin-top:1rem;">
              Ver Cardápio
            </button>
          </div>
        </div>
      </main>
    `;
  }

  const itensHTML = carrinho.map((item, index) => {
    const subtotal = calcularSubtotal(item);
    const unidade  = item.unit === 'cento' ? 'unidades' : item.unit;
    return `
      <div class="cart-item-card">
        <img
          class="cart-item-card__img"
          src="${item.image}"
          alt="${item.name}"
          loading="lazy"
          onerror="this.onerror=null; this.src='./img/placeholder.webp';"
        />
        <div class="cart-item-card__info">
          <div class="cart-item-card__nome">${item.name}</div>
          ${item.description ? `<div class="cart-item-card__desc">${item.description}</div>` : ''}
          <div class="cart-item-card__qtd">Quantidade: ${item.quantidade} ${unidade}</div>
        </div>
        <div class="cart-item-card__preco-area">
          <div class="cart-item-card__preco">${formatarMoeda(subtotal)}</div>
          <button class="btn-remover" data-acao="remover-carrinho" data-index="${index}" aria-label="Remover ${item.name}" style="margin-top:0.5rem;">
            Remover
          </button>
        </div>
      </div>
    `;
  }).join('');

  return `
    <main class="cart-page" id="pagina-cart">
      <div class="cart-page__topo">
        <div class="container">
          <div class="cart-page__titulo-wrap">
            <h2 class="cart-page__titulo">Seu Carrinho</h2>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="cart-page__conteudo">

          <!-- Itens -->
          <section aria-label="Itens do carrinho">
            ${itensHTML}
          </section>

          <div class="cart-page__limpar-area">
            <button class="cart-page__limpar-btn" data-acao="limpar-carrinho" type="button">
              <span class="cart-page__limpar-icone">🗑️</span>
              Limpar Carrinho
            </button>
          </div>

          <!-- Total e finalização -->
          <div class="total-card">
            <div class="total-card__linha">
              <span class="total-card__label">Total do Pedido</span>
              <span class="total-card__valor">${formatarMoeda(calcularTotal(carrinho))}</span>
            </div>
            <button
              class="btn btn-wpp btn-full"
              data-acao="abrir-checkout"
              id="btn-finalizar-cart"
              style="font-size:1rem; padding:1rem;"
            >
              Avançar para Dados do Pedido →
            </button>
            <button
              class="btn btn-outline btn-full"
              data-nav="menu"
              id="btn-continuar-comprando"
              style="margin-top:0.75rem; font-size:0.9rem;"
            >
              ← Continuar Comprando
            </button>
          </div>

        </div>
      </div>
    </main>
  `;
}

// =========================================================
// CARRINHO FLUTUANTE (BOTTOM BAR MOBILE)
// =========================================================
function renderCarrinhoFlutuante(carrinho) {
  // Oculta a bottom bar se o carrinho estiver vazio ou se o usuário já estiver na aba do carrinho/checkout
  if (carrinho.length === 0 || (typeof appState !== 'undefined' && appState.paginaAtual === 'cart')) {
    return `<div id="carrinho-flutuante" class="carrinho-flutuante carrinho-flutuante--oculto" aria-hidden="true"></div>`;
  }

  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const totalValor = calcularTotal(carrinho);
  const qtdTexto = totalItens === 1 ? '1 item' : `${totalItens} itens`;

  return `
    <div id="carrinho-flutuante" class="carrinho-flutuante" role="complementary" aria-label="Resumo do carrinho">
      <div class="carrinho-flutuante__info">
        <span class="carrinho-flutuante__icone">${ICONES.carrinho}</span>
        <div class="carrinho-flutuante__detalhes">
          <span class="carrinho-flutuante__qtd">${qtdTexto} no carrinho</span>
          <span class="carrinho-flutuante__total">${formatarMoeda(totalValor)}</span>
        </div>
      </div>
      <button class="carrinho-flutuante__btn" data-nav="cart" id="btn-carrinho-flutuante">
        Revisar Pedido →
      </button>
    </div>
  `;
}

// =========================================================
// MODAL DE CHECKOUT
// =========================================================
function renderCheckoutModal(carrinho) {
  if (carrinho.length === 0) return '';

  // Gerar horários de 30 em 30 minutos (8h–18h inclusive)
  const horarios = [];
  for (let h = 8; h <= 18; h++) {
    horarios.push(`${String(h).padStart(2,'0')}:00`);
    if (h < 18) horarios.push(`${String(h).padStart(2,'0')}:30`);
  }
  const horariosHTML = horarios.map(t => `<option value="${t}">${t}</option>`).join('');

  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const totalValor = calcularTotal(carrinho);

  // Resumo compacto dos itens
  const resumoItens = carrinho.map(item => {
    const subtotal = calcularSubtotal(item);
    const unidade = item.unit === 'cento' ? 'un' : item.unit;
    return `
      <div class="checkout-item">
        <div class="checkout-item__info">
          <span class="checkout-item__nome">${item.name}</span>
          <span class="checkout-item__qtd">${item.quantidade} ${unidade}</span>
        </div>
        <span class="checkout-item__preco">${formatarMoeda(subtotal)}</span>
      </div>
    `;
  }).join('');

  const dataMinima = new Date().toISOString().split('T')[0];

  return `
    <div class="checkout-overlay" id="checkout-overlay" role="dialog" aria-modal="true" aria-label="Finalizar Pedido">
      <div class="checkout-modal">

        <!-- Cabeçalho do Modal -->
        <div class="checkout-modal__header">
          <h2 class="checkout-modal__titulo">Finalizar Pedido</h2>
          <button class="checkout-modal__fechar" data-acao="fechar-checkout" aria-label="Fechar" id="btn-fechar-checkout">✕</button>
        </div>

        <!-- Conteúdo scrollável -->
        <div class="checkout-modal__body">

          <!-- Resumo do Pedido -->
          <section class="checkout-secao" aria-label="Resumo do pedido">
            <h3 class="checkout-secao__titulo">Seu Pedido</h3>
            <div class="checkout-itens-lista">
              ${resumoItens}
            </div>
            <div class="checkout-total-linha">
              <span class="checkout-total-label">Total (${totalItens} ${totalItens === 1 ? 'item' : 'itens'})</span>
              <span class="checkout-total-valor">${formatarMoeda(totalValor)}</span>
            </div>
            <button class="checkout-editar-btn" data-nav="menu" id="btn-editar-pedido">
              Editar Pedido
            </button>
          </section>

          <!-- Formulário de Dados -->
          <section class="checkout-secao" aria-label="Dados de retirada">
            <h3 class="checkout-secao__titulo">Dados para Retirada</h3>

            <div class="checkout-campo">
              <label class="checkout-campo__label" for="checkout-nome">Nome completo *</label>
              <input
                id="checkout-nome"
                type="text"
                class="campo-input"
                placeholder="Seu nome completo"
                required
                autocomplete="name"
              />
              <span class="checkout-campo__erro" id="erro-nome" aria-live="polite"></span>
            </div>

            <div class="checkout-campo">
              <label class="checkout-campo__label" for="checkout-data">Data da Encomenda *</label>
              <input
                id="checkout-data"
                type="date"
                class="campo-input"
                required
                min="${dataMinima}"
              />
              <span class="checkout-campo__erro" id="erro-data" aria-live="polite"></span>
            </div>

            <div class="checkout-campo">
              <label class="checkout-campo__label" for="checkout-horario">Horário de Retirada *</label>
              <select id="checkout-horario" class="campo-input" required>
                <option value="">Selecione o horário</option>
                ${horariosHTML}
              </select>
              <span class="checkout-campo__erro" id="erro-horario" aria-live="polite"></span>
            <div class="checkout-campo">
              <label class="checkout-campo__label" for="checkout-contato">WhatsApp (Opcional)</label>
              <input
                id="checkout-contato"
                type="tel"
                class="campo-input"
                placeholder="(61) 90000-0000"
              />
            </div>
          </section>

        </div>

        <!-- Rodapé Fixo do Modal -->
        <div class="checkout-modal__footer">
          <button
            class="btn btn-wpp btn-full checkout-btn-enviar"
            id="btn-enviar-whatsapp"
            data-acao="enviar-checkout"
          >
            ${ICONES.whatsapp} Finalizar Pedido no WhatsApp
          </button>
        </div>

      </div>
    </div>
  `;
}

// =========================================================
// CONTACT PAGE
// =========================================================
const INSTAGRAM_URL = 'https://www.instagram.com/preta_doces_e_salgados?igsh=MTUyMTJ6Y2RtY3U5ag==';
const MAPS_URL = 'https://maps.app.goo.gl/44WVi8SPMbcJHErf7';

function renderContactPage() {
  return `
    <main class="contact-page" id="pagina-contact">
      <div class="contact-page__topo">
        <div class="container">
          <h2 class="contact-page__titulo">Entre em Contato</h2>
        </div>
      </div>
      <div class="container">
        <div class="contact-grid">

          <!-- Coluna Esquerda: WhatsApp → Instagram → Localização → Horários -->
          <div style="display:flex;flex-direction:column;gap:1.5rem;">

            <article class="contact-card">
              <div class="contact-card__header">
                <div class="contact-card__icone icone--azul">${ICONES.telefone}</div>
                <h3 class="contact-card__titulo">WhatsApp / Telefone</h3>
              </div>
              <p class="contact-card__texto">
                Entre em contato conosco pelo WhatsApp para fazer seu pedido, tirar dúvidas ou solicitar orçamento personalizado:
              </p>
              <button
                class="btn btn-wpp"
                onclick="window.open('https://wa.me/${WHATSAPP_NUMERO}', '_blank')"
                id="btn-wpp-contato"
              >
                ${ICONES.whatsapp} (61) 99255-2565
              </button>
            </article>

            <!-- Card do Instagram — logo abaixo do WhatsApp -->
            <article class="contact-card contact-card--instagram">
              <div class="contact-card__header">
                <div class="contact-card__icone icone--instagram">${ICONES.instagram}</div>
                <h3 class="contact-card__titulo">Instagram</h3>
              </div>
              <p class="contact-card__texto">
                Siga nosso trabalho e veja as últimas criações, novidades e promoções exclusivas!
              </p>
              <a
                href="${INSTAGRAM_URL}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-instagram"
                id="btn-instagram-contato"
              >
                ${ICONES.instagram} @preta_doces_e_salgados
              </a>
            </article>

            <article class="contact-card">
              <div class="contact-card__header">
                <div class="contact-card__icone icone--verde">${ICONES.local}</div>
                <h3 class="contact-card__titulo">Localização</h3>
              </div>
              <p class="contact-card__texto">
                Brasília – DF · Distrito Federal<br>
                <strong>Pedidos com retirada no local.</strong>
              </p>
              <a
                href="${MAPS_URL}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primario"
                style="display:inline-flex;align-items:center;gap:0.4rem;margin-top:0.5rem;"
              >
                ${ICONES.local} Ver no Mapa
              </a>
            </article>

            <article class="contact-card">
              <div class="contact-card__header">
                <div class="contact-card__icone icone--lilas">${ICONES.relogio}</div>
                <h3 class="contact-card__titulo">Horário de Funcionamento</h3>
              </div>
              <div class="horario-linha"><strong>Segunda a Sábado</strong><span>08h às 18h</span></div>
              <div class="horario-linha"><strong>Domingo</strong><span>08h às 16h</span></div>
            </article>

          </div>

          <!-- Coluna Direita: Sobre a Preta → Como Fazer Pedido -->
          <div style="display:flex;flex-direction:column;gap:1.5rem;">

            <article class="contact-card">
              <div class="contact-card__header">
                <div class="contact-card__icone icone--rosa">${ICONES.coração}</div>
                <h3 class="contact-card__titulo">Sobre a Preta</h3>
              </div>
              <p class="contact-card__texto">
                A Preta Doces e Salgados nasceu do amor pela culinária artesanal e do desejo
                de levar sabores únicos para sua mesa. Cada produto é feito com carinho,
                utilizando ingredientes selecionados e receitas tradicionais.
              </p>
              <p class="contact-card__texto">
                Nossos salgados são preparados frescos diariamente, e nossos doces são
                verdadeiras obras de arte comestíveis. Trabalhamos com <strong>encomendas</strong> para
                garantir a qualidade e frescor de cada item.
              </p>
            </article>



          </div>
        </div>
      </div>
    </main>
  `;
}

// =========================================================
// LIGHTBOX MODAL (VISUALIZADOR DE IMAGENS)
// =========================================================
function renderLightboxModal() {
  return `
    <div id="lightbox-overlay" class="lightbox-overlay" role="dialog" aria-modal="true" aria-label="Visualizador de imagem">
      <div class="lightbox-modal">
        <button class="lightbox-fechar" id="btn-fechar-lightbox" aria-label="Fechar visualização">✕</button>
        <img id="lightbox-img" class="lightbox-img" src="" alt="Imagem do produto ampliada" />
        <p id="lightbox-titulo" class="lightbox-titulo"></p>
      </div>
    </div>
  `;
}

// =========================================================
// BOTÃO FLUTUANTE (VOLTAR AO TOPO)
// =========================================================
function renderBotaoVoltarTopo() {
  return `
    <button id="btn-voltar-topo" class="btn-voltar-topo" aria-label="Voltar ao topo da página">
      ↑
    </button>
  `;
}
