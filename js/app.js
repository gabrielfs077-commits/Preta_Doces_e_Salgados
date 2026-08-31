/**
 * app.js — Preta Doces e Salgados
 * Lógica principal: estado global, roteamento SPA, eventos e inicialização.
 * Compatível com abertura direta via file:// — sem servidor ou build necessário.
 */

'use strict';

// =========================================================
// ESTADO GLOBAL DA APLICAÇÃO
// =========================================================
const appState = {
  paginaAtual: 'home',       // 'home' | 'menu' | 'contact'
  abaAtiva:    'todos',      // 'todos' | 'salgados' | 'doces' | 'bombons' | 'bolos'
  subAbaAtiva: 'todos',      // 'todos' | 'folhados' | 'fritos' | etc
  carrinho:    [],           // [{ ...produto, quantidade }]
  quantidades: {},           // { [produto.id]: numero } — persiste ao trocar aba
  boloPersonalizado: {
    peso:              1.5,
    sabor:             '',
    cobertura:         '',
    observacoes:       '',
    caixaTransporte:   false,
    topoPersonalizado: false,
  },
  searchQuery: '',
};

// =========================================================
// PERSISTÊNCIA NO LOCALSTORAGE
// =========================================================
const STORAGE_KEY = 'preta_doces_carrinho_v1';

function salvarEstado() {
  try {
    const dadosParaSalvar = {
      carrinho: appState.carrinho,
      quantidades: appState.quantidades,
      boloPersonalizado: appState.boloPersonalizado
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dadosParaSalvar));
  } catch (err) {
    console.warn('Não foi possível salvar no localStorage:', err);
  }
}

function carregarEstado() {
  try {
    const dadosSalvos = localStorage.getItem(STORAGE_KEY);
    if (dadosSalvos) {
      const parsed = JSON.parse(dadosSalvos);
      if (Array.isArray(parsed.carrinho)) {
        appState.carrinho = parsed.carrinho;
      }
      if (parsed.quantidades && typeof parsed.quantidades === 'object') {
        appState.quantidades = parsed.quantidades;
      }
      if (parsed.boloPersonalizado && typeof parsed.boloPersonalizado === 'object') {
        appState.boloPersonalizado = { ...appState.boloPersonalizado, ...parsed.boloPersonalizado };
      }
    }
  } catch (err) {
    console.warn('Não foi possível carregar do localStorage:', err);
  }
}

// =========================================================
// UTILITÁRIOS
// =========================================================

/** Formata um valor numérico para moeda BRL com separador de milhar */
function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style:    'currency',
    currency: 'BRL',
  }).format(valor);
}

/** Calcula o subtotal de um item do carrinho respeitando a lógica de "por cento" */
function calcularSubtotal(item) {
  if (item.unit === 'cento') {
    return (item.price * item.quantidade) / 100;
  }
  return item.price * item.quantidade;
}

/** Calcula o total geral do carrinho */
function calcularTotal(carrinho) {
  return carrinho.reduce((acc, item) => acc + calcularSubtotal(item), 0);
}

/** Retorna o total de unidades no carrinho (para o badge do header) */
function totalItensCarrinho() {
  return appState.carrinho.reduce((acc, item) => acc + item.quantidade, 0);
}

// =========================================================
// SISTEMA DE TOAST (Notificações)
// =========================================================
function mostrarToast(mensagem, tipo = 'sucesso') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast--${tipo}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');
  toast.textContent = mensagem;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2800);
}

// =========================================================
// RENDERIZAÇÃO PRINCIPAL
// =========================================================
function renderizar() {
  const app = document.getElementById('app');
  if (!app) return;

  const paginaAtual = appState.paginaAtual;
  const abaAtiva = appState.abaAtiva;
  const subAbaAtiva = appState.subAbaAtiva;
  const carrinho = appState.carrinho;
  const quantidades = appState.quantidades;
  const boloPersonalizado = appState.boloPersonalizado;
  const totalItens = totalItensCarrinho();

  let paginaHTML = '';
  switch (paginaAtual) {
    case 'home':
      paginaHTML = renderHomePage();
      break;
    case 'menu':
      paginaHTML = renderMenuPage(abaAtiva, subAbaAtiva, carrinho, quantidades, boloPersonalizado, appState.searchQuery);
      break;
    case 'contact':
      paginaHTML = renderContactPage();
      break;
    default:
      paginaHTML = renderHomePage();
  }

  app.innerHTML = `
    ${renderHeader(paginaAtual, totalItens)}
    ${paginaHTML}
    ${renderFooter()}
    ${renderCarrinhoFlutuante(carrinho)}
    ${renderCheckoutModal(carrinho)}
    ${renderLightboxModal()}
    ${renderBotaoVoltarTopo()}
    <div id="toast-container" class="toast-container" aria-live="polite"></div>
  `;

  // Adiciona/remove classe no body para padding inferior quando há itens
  document.body.classList.toggle('tem-carrinho', carrinho.length > 0);

  // Rebindar eventos após re-renderização
  bindEventos();

  // Rolar ao topo ao mudar de página
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Re-renderiza apenas o header e a sidebar do carrinho (sem recriar a página inteira).
 * Usado após operações no carrinho para evitar perda de foco em inputs do MenuPage.
 */
function atualizarCarrinhoUI() {
  // Salva no localStorage em tempo real sempre que a UI é atualizada
  salvarEstado();

  // Atualiza header
  const headerEl = document.querySelector('.header');
  if (headerEl) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = renderHeader(appState.paginaAtual, totalItensCarrinho());
    const novoHeader = tempDiv.firstElementChild;
    headerEl.replaceWith(novoHeader);
  }

  // Atualiza sidebar (apenas no menu)
  const sidebarContainer = document.getElementById('cart-sidebar-container');
  if (sidebarContainer) {
    sidebarContainer.innerHTML = renderCartSidebar(appState.carrinho);
  }

  // Atualiza carrinho flutuante (bottom bar mobile)
  const flutuanteEl = document.getElementById('carrinho-flutuante');
  if (flutuanteEl) {
    const tempDiv3 = document.createElement('div');
    tempDiv3.innerHTML = renderCarrinhoFlutuante(appState.carrinho);
    const novoFlutuante = tempDiv3.firstElementChild;
    flutuanteEl.replaceWith(novoFlutuante);
  }

  // Atualiza classe no body
  document.body.classList.toggle('tem-carrinho', appState.carrinho.length > 0);

  // Re-vincula eventos (o replaceWith pode remover referências do DOM)
  bindEventos();
}

// =========================================================
// NAVEGAÇÃO SPA
// =========================================================
function navegarPara(pagina) {
  if (pagina === appState.paginaAtual) return;
  // Limpa busca ao sair do menu
  if (appState.paginaAtual === 'menu' && pagina !== 'menu') {
    appState.searchQuery = '';
  }
  appState.paginaAtual = pagina;
  history.pushState({ pagina }, '', `#${pagina}`);
  renderizar();
}

function voltarAoInicio() {
  appState.paginaAtual = 'home';
  appState.abaAtiva = 'todos';
  appState.subAbaAtiva = 'todos';
  appState.searchQuery = '';

  const searchInput = document.getElementById('site-search');
  if (searchInput) {
    searchInput.value = '';
  }

  history.pushState({ pagina: 'home' }, '', '#home');
  renderizar();
}

// Suporte ao botão Voltar do navegador
window.addEventListener('popstate', (e) => {
  const pagina = e.state?.pagina || 'home';
  appState.paginaAtual = pagina;
  renderizar();
});

// =========================================================
// CARRINHO — LÓGICA
// =========================================================
function adicionarAoCarrinho(produtoId, quantidade) {
  const produto = PRODUTOS.find(p => p.id === produtoId);
  if (!produto) return;

  const indexExistente = appState.carrinho.findIndex(item => item.id === produtoId);

  if (indexExistente !== -1) {
    appState.carrinho[indexExistente].quantidade += quantidade;
    appState.quantidades[produtoId] = appState.carrinho[indexExistente].quantidade;
    
    // Atualiza o contador exibido no card instantaneamente se ele estiver visível
    const display = document.getElementById(`qtd-${produtoId}`);
    if (display) display.textContent = appState.carrinho[indexExistente].quantidade;
    
    mostrarToast(`Mais ${quantidade} de ${produto.name} adicionado(s) ao carrinho (Total: ${appState.carrinho[indexExistente].quantidade})!`);
  } else {
    appState.carrinho.push({ ...produto, quantidade });
    appState.quantidades[produtoId] = quantidade;
    mostrarToast(`${produto.name} adicionado ao carrinho!`);
  }

  atualizarCarrinhoUI();
}

function removerDoCarrinho(index) {
  const itemRemovido = appState.carrinho[index];
  const nome = itemRemovido?.name || 'Item';

  // Reseta quantidade do produto removido no estado
  if (itemRemovido && itemRemovido.id && appState.quantidades[itemRemovido.id]) {
    delete appState.quantidades[itemRemovido.id];
  }

  appState.carrinho.splice(index, 1);
  mostrarToast(`🗑️ ${nome} removido.`, 'erro');

  salvarEstado();

  // Se o carrinho ficou vazio e o modal está aberto, fecha automaticamente
  if (appState.carrinho.length === 0) {
    fecharCheckout();
    // Re-renderiza para atualizar sidebar, header, etc.
    if (appState.paginaAtual === 'menu') {
      renderizar();
    } else {
      atualizarCarrinhoUI();
    }
    return;
  }

  // Se o modal de checkout está aberto, re-renderiza o modal com dados atualizados
  const overlay = document.getElementById('checkout-overlay');
  if (overlay && overlay.classList.contains('checkout-overlay--ativo')) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = renderCheckoutModal(appState.carrinho);
    const novoModal = tempDiv.firstElementChild;
    overlay.replaceWith(novoModal);
    // Reativa o modal imediatamente
    const novoOverlay = document.getElementById('checkout-overlay');
    if (novoOverlay) {
      requestAnimationFrame(() => {
        novoOverlay.classList.add('checkout-overlay--ativo');
      });
      document.body.style.overflow = 'hidden';
    }
  }

  // Atualiza sidebar, header, bottom bar
  if (appState.paginaAtual === 'menu') {
    atualizarCarrinhoUI();
  } else {
    atualizarCarrinhoUI();
  }
}

function adicionarBoloAoCarrinho() {
  const { peso, sabor, cobertura, observacoes, caixaTransporte, topoPersonalizado } = appState.boloPersonalizado;

  if (!sabor || !sabor.trim()) {
    mostrarToast('Por favor, selecione o sabor da massa do bolo.', 'erro');
    document.getElementById('bolo-sabor')?.focus();
    return;
  }
  if (!cobertura || !cobertura.trim()) {
    mostrarToast('Por favor, selecione a cobertura/recheio do bolo.', 'erro');
    document.getElementById('bolo-cobertura')?.focus();
    return;
  }

  const pesoNum = Math.max(OPCOES_BOLO.PESO_MINIMO, parseFloat(peso) || OPCOES_BOLO.PESO_MINIMO);
  const precoTotal = (pesoNum * PRECO_BOLO_POR_KG) + (caixaTransporte ? OPCOES_BOLO.PRECO_CAIXA : 0);

  const detalhesArr = [
    `Massa: ${sabor}`,
    `Recheio: ${cobertura}`,
    caixaTransporte ? `Caixa de Transporte: Sim (+ ${formatarMoeda(OPCOES_BOLO.PRECO_CAIXA)})` : null,
    topoPersonalizado ? 'Topo Personalizado: A combinar' : null,
    observacoes ? `Obs: ${observacoes}` : null,
  ].filter(Boolean);

  const bolo = {
    id:                `bolo_${Date.now()}`,
    name:              `Bolo Personalizado (${pesoNum.toString().replace('.', ',')}kg)`,
    description:       detalhesArr.join(' · '),
    price:             precoTotal,
    unit:              'unidade',
    image:             './src/assets/bolo_1.png',
    quantidade:        1,
    isBolo:            true,
    caixaTransporte:   caixaTransporte,
    topoPersonalizado: topoPersonalizado,
  };

  appState.carrinho.push(bolo);
  mostrarToast('Bolo personalizado adicionado ao carrinho!');

  // Resetar campos
  appState.boloPersonalizado = {
    peso:              1.5,
    sabor:             '',
    cobertura:         '',
    observacoes:       '',
    caixaTransporte:   false,
    topoPersonalizado: false,
  };
  atualizarCarrinhoUI();

  // Re-renderiza só a seção do bolo para limpar campos
  const secaoBolo = document.getElementById('secao-bolo_personalizado');
  if (secaoBolo) {
    secaoBolo.outerHTML = renderBoloPersonalizado(appState.boloPersonalizado);
    bindBoloEventos();
  }
}

// =========================================================
// GERAÇÃO DA MENSAGEM WHATSAPP
// =========================================================
function gerarMensagemWhatsApp(nome, data, horario) {
  let msg = 'Encomenda';
  if (data) {
    const [ano, mes, dia] = data.split('-');
    msg += ` dia ${dia}/${mes}/${ano}`;
  }
  msg += '\n';

  if (horario) {
    msg += `horário da retirada: ${horario}\n`;
  }
  msg += `Cliente: ${nome}\n`;

  const contato = document.getElementById('checkout-contato')?.value?.trim();
  if (contato) {
    msg += `Contato: ${contato}\n`;
  }
  msg += '\n';

  // Agrupamento por Categoria / Subcategoria
  const grupos = {};

  appState.carrinho.forEach(item => {
    let grupoNome = 'Outros';

    if (item.isBolo || item.id.toString().startsWith('bolo')) {
      grupoNome = 'Bolos';
    } else {
      const produtoBase = PRODUTOS.find(p => p.id === item.id);
      const subcat = produtoBase?.subcategory || '';
      const cat = produtoBase?.category || '';

      if (subcat === 'folhados') grupoNome = 'Folhados';
      else if (subcat === 'fritos') grupoNome = 'Fritos';
      else if (subcat === 'assados') grupoNome = 'Assados';
      else if (subcat === 'extras') grupoNome = 'Extras';
      else if (subcat === 'comuns') grupoNome = 'Doces Comuns';
      else if (subcat === 'caramelizados') grupoNome = 'Doces Caramelizados';
      else if (subcat === 'gourmet') grupoNome = 'Doces Gourmet';
      else if (cat === 'bombons') grupoNome = 'Bombons';
      else if (cat === 'salgados') grupoNome = 'Salgados';
      else if (cat === 'doces') grupoNome = 'Doces';
    }

    if (!grupos[grupoNome]) {
      grupos[grupoNome] = [];
    }
    grupos[grupoNome].push(item);
  });

  Object.keys(grupos).forEach(grupoNome => {
    // Cabeçalho da categoria com linha em branco abaixo
    msg += `       ${grupoNome}\n\n`;

    // Itens da categoria em linhas consecutivas, sem linha em branco entre eles
    grupos[grupoNome].forEach(item => {
      msg += `${item.quantidade} ${item.name.toLowerCase()}\n`;
      if (item.description) {
        msg += `  ${item.description}\n`;
      }
      if (item.topoPersonalizado) {
        msg += `  [Topo de Bolo Personalizado: A combinar modelo/valor]\n`;
      }
    });

    // Linha em branco apenas após o último item da categoria (antes da próxima)
    msg += '\n';
  });

  const total = calcularTotal(appState.carrinho);
  const totalFormatado = total.toFixed(2).replace('.', ',');

  msg += `*Total: ${totalFormatado} reais*\n\n`;
  msg += 'Espero seu retorno para finalizar o pedido.';

  return encodeURIComponent(msg);
}

// =========================================================
// LIGHTBOX (VISUALIZAÇÃO DE IMAGENS)
// =========================================================
function abrirLightbox(src, titulo) {
  const overlay = document.getElementById('lightbox-overlay');
  const imgEl = document.getElementById('lightbox-img');
  const tituloEl = document.getElementById('lightbox-titulo');
  if (!overlay || !imgEl) return;

  imgEl.src = src;
  if (tituloEl) tituloEl.textContent = titulo || '';

  overlay.classList.add('lightbox-overlay--ativo');
  document.body.style.overflow = 'hidden';
}

function fecharLightbox() {
  const overlay = document.getElementById('lightbox-overlay');
  if (!overlay) return;

  overlay.classList.remove('lightbox-overlay--ativo');
  document.body.style.overflow = '';
}

// =========================================================
// CHECKOUT — MODAL
// =========================================================
function abrirCheckout() {
  if (appState.carrinho.length === 0) {
    mostrarToast('⚠️ Seu carrinho está vazio.', 'erro');
    return;
  }

  // Re-renderiza o conteúdo do modal com dados atualizados
  const overlayExistente = document.getElementById('checkout-overlay');
  if (overlayExistente) {
    // Modal já existe — substitui com dados atualizados
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = renderCheckoutModal(appState.carrinho);
    const novoModal = tempDiv.firstElementChild;
    overlayExistente.replaceWith(novoModal);
  } else {
    // Modal NÃO existe no DOM (ex: primeira visita, carrinho inicialmente vazio)
    // Injeta o modal no contêiner principal da aplicação
    const app = document.getElementById('app');
    if (app) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = renderCheckoutModal(appState.carrinho);
      const novoModal = tempDiv.firstElementChild;
      if (novoModal) {
        app.appendChild(novoModal);
      }
    }
  }

  const overlay = document.getElementById('checkout-overlay');
  if (!overlay) return;

  // Ativa o modal com animação
  requestAnimationFrame(() => {
    overlay.classList.add('checkout-overlay--ativo');
  });

  // Bloqueia scroll do body
  document.body.style.overflow = 'hidden';

  // Foco no primeiro campo para acessibilidade
  setTimeout(() => {
    document.getElementById('checkout-nome')?.focus();
  }, 350);
}

function fecharCheckout() {
  const overlay = document.getElementById('checkout-overlay');
  if (!overlay) return;

  overlay.classList.remove('checkout-overlay--ativo');
  document.body.style.overflow = '';
}

function validarCheckout() {
  let valido = true;

  const nome = document.getElementById('checkout-nome');
  const data = document.getElementById('checkout-data');
  const horario = document.getElementById('checkout-horario');

  const erroNome = document.getElementById('erro-nome');
  const erroData = document.getElementById('erro-data');
  const erroHorario = document.getElementById('erro-horario');

  // Limpar erros
  [erroNome, erroData, erroHorario].forEach(el => { if (el) el.textContent = ''; });
  [nome, data, horario].forEach(el => { if (el) el.classList.remove('campo-input--erro'); });

  if (!nome?.value?.trim()) {
    if (erroNome) erroNome.textContent = 'Por favor, informe seu nome completo.';
    nome?.classList.add('campo-input--erro');
    nome?.focus();
    valido = false;
  }

  const dataHoje = new Date().toISOString().split('T')[0];
  if (!data?.value) {
    if (erroData) erroData.textContent = 'Por favor, selecione a data de retirada.';
    data?.classList.add('campo-input--erro');
    if (valido) data?.focus();
    valido = false;
  } else if (data.value < dataHoje) {
    if (erroData) erroData.textContent = 'A data de retirada não pode ser no passado.';
    data?.classList.add('campo-input--erro');
    if (valido) data?.focus();
    valido = false;
  }

  if (!horario?.value) {
    if (erroHorario) erroHorario.textContent = 'Por favor, selecione o horário de retirada.';
    horario?.classList.add('campo-input--erro');
    if (valido) horario?.focus();
    valido = false;
  }

  return valido;
}

function finalizarPedidoWhatsApp(e) {
  // Previne reload acidental caso a função seja chamada a partir de um form/submit
  if (e && e.preventDefault) e.preventDefault();

  if (!validarCheckout()) return;

  const nome    = document.getElementById('checkout-nome').value.trim();
  const data    = document.getElementById('checkout-data').value;
  const horario = document.getElementById('checkout-horario').value;

  const mensagem = gerarMensagemWhatsApp(nome, data, horario);
  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensagem}`;

  // Detecta iOS (iPhone, iPad, iPod) para contornar o bloqueio de pop-ups do Safari
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  if (isIOS) {
    // No iOS/Safari, window.open é bloqueado pelo bloqueador de pop-ups.
    // Navegação direta não é interceptada.
    window.location.href = url;
  } else {
    // No Android, Desktop, etc., window.open com _blank funciona perfeitamente.
    window.open(url, '_blank');
  }

  // Atrasa a limpeza do carrinho para garantir que o redirecionamento
  // (especialmente no iOS via location.href) aconteça ANTES da UI mostrar "carrinho vazio".
  setTimeout(() => {
    appState.carrinho = [];
    appState.quantidades = {};
    salvarEstado();

    fecharCheckout();
    mostrarToast('Pedido enviado com sucesso!', 'sucesso');

    // Navega para home após envio
    setTimeout(() => {
      navegarPara('home');
    }, 800);
  }, 1500);
}

// =========================================================
// DELEGAÇÃO DE EVENTOS (Event Delegation)
// Tudo vinculado ao documento — eficiente e sobrevive a re-renders parciais
// =========================================================
function bindEventos() {
  // Remove listeners antigos para evitar duplicação
  document.removeEventListener('click', onDocClick);
  document.addEventListener('click', onDocClick);

  document.removeEventListener('touchstart', onDocTouchStart);
  document.addEventListener('touchstart', onDocTouchStart, { passive: false });

  document.removeEventListener('change', onDocChange);
  document.addEventListener('change', onDocChange);

  document.removeEventListener('input', onDocInput);
  document.addEventListener('input', onDocInput);

  document.removeEventListener('submit', onDocSubmit);
  document.addEventListener('submit', onDocSubmit);
}

// =========================================================
// AUTOCOMPLETE SEARCH — Busca em Tempo Real com Dropdown
// =========================================================

/** Máximo de sugestões exibidas no dropdown */
const AUTOCOMPLETE_MAX_RESULTADOS = 8;

/**
 * Normaliza um texto para busca: remove acentos e converte para minúsculas.
 * Ex: "Catupirí" → "catupiri", "Maçã" → "maca"
 */
function normalizarParaBusca(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Busca produtos que correspondem ao termo digitado.
 * Retorna array de produtos (max AUTOCOMPLETE_MAX_RESULTADOS).
 * A busca é case insensitive e ignora acentos.
 */
function buscarSugestoes(termo) {
  if (!termo || termo.trim().length < 2) return [];

  const termoNorm = normalizarParaBusca(termo.trim());

  const resultados = PRODUTOS.filter(p => {
    const nomeNorm = normalizarParaBusca(p.name);
    const descNorm = p.description ? normalizarParaBusca(p.description) : '';
    return nomeNorm.includes(termoNorm) || descNorm.includes(termoNorm);
  });

  return resultados.slice(0, AUTOCOMPLETE_MAX_RESULTADOS);
}

/**
 * Destaca no texto as partes que correspondem ao termo de busca.
 * Retorna string HTML com <mark class="autocomplete-match"> envolvendo os trechos.
 */
function destacarTexto(texto, termo) {
  if (!termo) return texto;

  const termoNorm = normalizarParaBusca(termo);
  const textoNorm = normalizarParaBusca(texto);

  // Encontra a posição do match no texto normalizado
  const inicio = textoNorm.indexOf(termoNorm);
  if (inicio === -1) return texto;

  // Aplica highlight na posição correspondente do texto original
  const antes = texto.substring(0, inicio);
  const match = texto.substring(inicio, inicio + termo.length);
  const depois = texto.substring(inicio + termo.length);

  return `${antes}<mark class="autocomplete-match">${match}</mark>${depois}`;
}

/**
 * Retorna o label legível da categoria/subcategoria de um produto.
 */
function obterLabelCategoria(produto) {
  const labels = {
    salgados: '🥐 Salgado',
    doces: '🍫 Doce',
    bombons: '🍬 Bombom',
    bolos: '🎂 Bolo',
  };

  const subLabels = {
    folhados: 'Folhado',
    fritos: 'Frito',
    assados: 'Assado',
    extras: 'Extra',
    comuns: 'Comum',
    caramelizados: 'Caramelizado',
    gourmet: 'Gourmet',
  };

  let label = labels[produto.category] || produto.category;
  if (produto.subcategory && subLabels[produto.subcategory]) {
    label += ' · ' + subLabels[produto.subcategory];
  }
  return label;
}

/**
 * Renderiza as sugestões dentro do dropdown de autocomplete.
 * Se não há resultados, exibe mensagem "nenhum resultado".
 */
function renderizarSugestoesAutocomplete(resultados, termo) {
  const dropdown = document.getElementById('autocomplete-dropdown');
  if (!dropdown) return;

  if (resultados.length === 0) {
    dropdown.innerHTML = `
      <div class="autocomplete-vazio">
        Nenhum produto encontrado para "<strong>${termo}</strong>"
      </div>
    `;
    dropdown.classList.add('autocomplete-dropdown--visivel');
    return;
  }

  const itensHTML = resultados.map(produto => {
    const nomeDestacado = destacarTexto(produto.name, termo);
    const categoriaLabel = obterLabelCategoria(produto);
    const precoFormatado = formatarMoeda(produto.price);
    const unidade = produto.unit === 'cento' ? '/cento' : produto.unit === 'kg' ? '/kg' : '/un';
    const imgSrc = produto.image || './img/placeholder.webp';

    return `
      <div
        class="autocomplete-item"
        data-autocomplete-id="${produto.id}"
        role="option"
        tabindex="-1"
      >
        <img
          class="autocomplete-item__img"
          src="${imgSrc}"
          alt="${produto.name}"
          loading="lazy"
          onerror="this.onerror=null; this.src='./img/placeholder.webp';"
        />
        <div class="autocomplete-item__info">
          <span class="autocomplete-item__nome">${nomeDestacado}</span>
          <span class="autocomplete-item__categoria">${categoriaLabel}</span>
        </div>
        <span class="autocomplete-item__preco">${precoFormatado}${unidade}</span>
      </div>
    `;
  }).join('');

  dropdown.innerHTML = itensHTML;
  dropdown.classList.add('autocomplete-dropdown--visivel');
}

/**
 * Cria o elemento do dropdown de autocomplete no DOM (se não existir).
 * O dropdown é adicionado dentro do #autocomplete-container.
 */
function criarDropdownAutocomplete() {
  if (document.getElementById('autocomplete-dropdown')) return;

  const container = document.getElementById('autocomplete-container');
  if (!container) return;

  const dropdown = document.createElement('div');
  dropdown.id = 'autocomplete-dropdown';
  dropdown.className = 'autocomplete-dropdown';
  dropdown.setAttribute('role', 'listbox');
  dropdown.setAttribute('aria-label', 'Sugestões de busca');

  container.appendChild(dropdown);
}

/**
 * Fecha o dropdown de autocomplete (com animação de saída).
 */
function fecharAutocomplete() {
  const dropdown = document.getElementById('autocomplete-dropdown');
  if (dropdown) {
    dropdown.classList.remove('autocomplete-dropdown--visivel');
  }
}

/**
 * Manipula a seleção de uma sugestão do autocomplete:
 * 1. Fecha o dropdown
 * 2. Garante que a página é "menu" com aba "todos"
 * 3. Faz scroll suave até o card do produto
 * 4. Adiciona highlight temporário (2 segundos)
 */
function selecionarSugestaoAutocomplete(produtoId) {
  // 1. Fecha o dropdown
  fecharAutocomplete();

  // 2. Limpa o input e atualiza estado
  const searchInput = document.getElementById('site-search');
  if (searchInput) {
    searchInput.value = '';
  }
  appState.searchQuery = '';

  // 3. Garantir que estamos na página de menu com aba "todos"
  const precisaReRender = (
    appState.paginaAtual !== 'menu' ||
    appState.abaAtiva !== 'todos' ||
    appState.subAbaAtiva !== 'todos'
  );

  if (precisaReRender) {
    appState.paginaAtual = 'menu';
    appState.abaAtiva = 'todos';
    appState.subAbaAtiva = 'todos';
    history.pushState({ pagina: 'menu' }, '', '#menu');
    renderizar();
  }

  // 4. Scroll suave até o card e highlight temporário
  // Usa setTimeout para garantir que o DOM foi atualizado após possível re-render
  setTimeout(() => {
    const cardEl = document.querySelector(`[data-produto-id="${produtoId}"]`);
    if (!cardEl) return;

    // Scroll suave até o card (centralizado na tela)
    cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Remove classe anterior caso exista (permite repetir o efeito)
    cardEl.classList.remove('highlight-temporario');
    cardEl.classList.remove('highlight');
    void cardEl.offsetWidth; // Força reflow para reiniciar animação

    // Adiciona highlight temporário
    cardEl.classList.add('highlight-temporario');

    // Remove a classe após 2 segundos
    setTimeout(() => {
      cardEl.classList.remove('highlight-temporario');
    }, 2000);
  }, precisaReRender ? 200 : 50);
}

/**
 * Processa o evento de input no campo de busca para exibir sugestões.
 * Chamada a cada tecla digitada (evento 'input').
 */
function processarInputAutocomplete(valor) {
  const termo = valor.trim();

  // Se o campo está vazio ou muito curto, fecha o dropdown
  if (termo.length < 2) {
    fecharAutocomplete();
    return;
  }

  // Garante que o dropdown existe no DOM
  criarDropdownAutocomplete();

  // Busca sugestões e renderiza
  const resultados = buscarSugestoes(termo);
  renderizarSugestoesAutocomplete(resultados, termo);
}

// Função original refatorada para usar o novo sistema de highlight
function executarBuscaEHighlight(query) {
  if (!query) return;
  const termo = query.toLowerCase().trim();
  if (!termo) return;

  const produtoEncontrado = PRODUTOS.find(p =>
    p.name.toLowerCase().includes(termo) ||
    (p.description && p.description.toLowerCase().includes(termo))
  );

  if (produtoEncontrado) {
    // Fecha o autocomplete caso esteja aberto
    fecharAutocomplete();

    appState.searchQuery = query;
    appState.paginaAtual = 'menu';
    appState.abaAtiva = 'todos';
    appState.subAbaAtiva = 'todos';
    renderizar();

    setTimeout(() => {
      const el = document.querySelector(`[data-produto-id="${produtoEncontrado.id}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.remove('highlight');
        el.classList.remove('highlight-temporario');
        void el.offsetWidth; // Força reflow
        el.classList.add('highlight-temporario');
        setTimeout(() => {
          el.classList.remove('highlight-temporario');
        }, 2000);
      }
    }, 150);
  } else {
    mostrarToast(`Nenhum produto encontrado para "${query}".`, 'erro');
  }
}

function onDocTouchStart(e) {
  const alvo = e.target.closest('[data-acao="ir-home"], [data-nav], [data-acao="abrir-checkout"], [data-acao="limpar-carrinho"], [data-acao="enviar-checkout"], #btn-carrinho-flutuante');
  if (!alvo) return;

  e.preventDefault();
  onDocClick(e);
}

function onDocSubmit(e) {
  const form = e.target.closest('[data-search-form]');
  if (!form) return;

  e.preventDefault();

  const input = form.querySelector('input[name="search"]');
  const query = input?.value?.trim() || '';

  if (query) {
    executarBuscaEHighlight(query);
  }
}


function onDocClick(e) {
  // Clique numa sugestão do autocomplete
  const sugestao = e.target.closest('[data-autocomplete-id]');
  if (sugestao) {
    e.preventDefault();
    const produtoId = parseInt(sugestao.dataset.autocompleteId, 10);
    selecionarSugestaoAutocomplete(produtoId);
    return;
  }

  if (e.target.closest('[data-acao="ir-home"]')) {
    e.preventDefault();
    voltarAoInicio();
    return;
  }

  const alvo = e.target.closest('[data-nav]');
  if (alvo) {
    const pagina = alvo.dataset.nav;
    // Se o clique veio de dentro do modal de checkout, fecha o modal primeiro
    if (alvo.closest('.checkout-overlay')) {
      fecharCheckout();
    }
    // Intercepta navegação para 'cart' — abre checkout direto (Single Page Checkout)
    if (pagina === 'cart') {
      abrirCheckout();
      return;
    }
    navegarPara(pagina);
    return;
  }

  // Troca de aba no menu (primária)
  const abaBtn = e.target.closest('[data-aba]');
  if (abaBtn) {
    appState.abaAtiva = abaBtn.dataset.aba;
    appState.subAbaAtiva = 'todos'; // Reseta a sub-aba ao trocar a primária
    renderizar();
    return;
  }

  // Troca de sub-aba no menu (secundária)
  const subAbaBtn = e.target.closest('[data-subaba]');
  if (subAbaBtn) {
    appState.subAbaAtiva = subAbaBtn.dataset.subaba;
    renderizar();
    return;
  }

  // Botão de quantidade (+/-)
  const qtdBtn = e.target.closest('[data-acao="aumentar"], [data-acao="diminuir"]');
  if (qtdBtn) {
    const id   = parseInt(qtdBtn.dataset.id, 10);
    const produto = PRODUTOS.find(p => p.id === id);
    const step = parseInt(qtdBtn.dataset.step, 10) || (produto?.unit === 'cento' ? 25 : 1);
    const min  = parseInt(qtdBtn.dataset.min, 10) || (produto?.unit === 'cento' ? 25 : 1);
    const acao = qtdBtn.dataset.acao;

    const valSalvo = appState.quantidades[id];
    let atual = (typeof valSalvo !== 'undefined' && valSalvo !== null && !isNaN(valSalvo))
      ? Number(valSalvo)
      : 0;

    if (atual === 0) {
      const displayEl = document.getElementById(`qtd-${id}`);
      const valDOM = displayEl ? parseInt(displayEl.textContent, 10) : 0;
      atual = valDOM > 0 ? valDOM : min;
    }

    if (acao === 'aumentar') {
      if (typeof valSalvo === 'undefined' || valSalvo === null) {
        atual = min + step;
      } else {
        if (atual % step !== 0) {
          atual = Math.floor(atual / step) * step;
        }
        atual = atual + step;
      }
    } else {
      if (atual % step !== 0) {
        atual = Math.ceil(atual / step) * step;
      }
      atual = Math.max(min, atual - step);
    }

    appState.quantidades[id] = atual;

    // Atualiza display sem re-renderizar tudo
    const display = document.getElementById(`qtd-${id}`);
    if (display) display.textContent = appState.quantidades[id];

    // Atualiza estado do botão diminuir
    const btnDiminuir = document.querySelector(`[data-acao="diminuir"][data-id="${id}"]`);
    if (btnDiminuir) {
      btnDiminuir.disabled = appState.quantidades[id] <= min;
    }

    // Sincronização em tempo real: se o produto já está no carrinho, atualiza dinamicamente
    const indexNoCarrinho = appState.carrinho.findIndex(item => item.id === id);
    if (indexNoCarrinho !== -1) {
      appState.carrinho[indexNoCarrinho].quantidade = atual;
      atualizarCarrinhoUI();
    } else {
      salvarEstado();
    }
    return;
  }

  // Ajustar quantidade no modal de checkout (+/-)
  const checkoutQtdBtn = e.target.closest('[data-acao="checkout-aumentar"], [data-acao="checkout-diminuir"]');
  if (checkoutQtdBtn) {
    const index = parseInt(checkoutQtdBtn.dataset.index, 10);
    const step  = parseInt(checkoutQtdBtn.dataset.step, 10) || 1;
    const min   = parseInt(checkoutQtdBtn.dataset.min, 10) || 1;
    const acao  = checkoutQtdBtn.dataset.acao;
    const item  = appState.carrinho[index];
    if (!item) return;

    if (acao === 'checkout-aumentar') {
      item.quantidade += step;
    } else {
      const novaQtd = item.quantidade - step;
      if (novaQtd < min) {
        // Quantidade abaixo do mínimo → remove o item
        removerDoCarrinho(index);
        return;
      }
      item.quantidade = novaQtd;
    }

    // Sincroniza o estado de quantidades
    if (item.id) {
      appState.quantidades[item.id] = item.quantidade;
    }
    salvarEstado();

    // Re-renderiza o modal com dados atualizados
    const overlay = document.getElementById('checkout-overlay');
    if (overlay && overlay.classList.contains('checkout-overlay--ativo')) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = renderCheckoutModal(appState.carrinho);
      const novoModal = tempDiv.firstElementChild;
      overlay.replaceWith(novoModal);
      const novoOverlay = document.getElementById('checkout-overlay');
      if (novoOverlay) {
        requestAnimationFrame(() => {
          novoOverlay.classList.add('checkout-overlay--ativo');
        });
        document.body.style.overflow = 'hidden';
      }
    }

    // Atualiza sidebar, header, bottom bar
    atualizarCarrinhoUI();
    return;
  }

  // Adicionar ao carrinho
  const addBtn = e.target.closest('[data-acao="adicionar-carrinho"]');
  if (addBtn) {
    const id  = parseInt(addBtn.dataset.id, 10);
    const produto = PRODUTOS.find(p => p.id === id);
    const min = produto?.unit === 'cento' ? 25 : 1;
    const qtd = appState.quantidades[id] || min;
    adicionarAoCarrinho(id, qtd);
    return;
  }

  // Remover do carrinho
  const remBtn = e.target.closest('[data-acao="remover-carrinho"]');
  if (remBtn) {
    const index = parseInt(remBtn.dataset.index, 10);
    removerDoCarrinho(index);
    return;
  }

  // Finalizar pedido via WhatsApp (acionado diretamente da página de Cart)
  if (e.target.closest('#btn-enviar-whatsapp') || e.target.closest('#btn-finalizar-wpp')) {
    e.preventDefault();
    finalizarPedidoWhatsApp(e);
    return;
  }

  // Abrir modal de checkout (Bottom Bar e qualquer botão com data-acao)
  if (e.target.closest('#btn-carrinho-flutuante') || e.target.closest('[data-acao="abrir-checkout"]')) {
    e.preventDefault();
    abrirCheckout();
    return;
  }

  // Fechar modal de checkout
  if (e.target.closest('[data-acao="fechar-checkout"]')) {
    fecharCheckout();
    return;
  }

  // Fechar modal ao clicar no overlay (fora do modal)
  if (e.target.id === 'checkout-overlay') {
    fecharCheckout();
    return;
  }

  // Limpar Carrinho
  if (e.target.closest('[data-acao="limpar-carrinho"]')) {
    e.preventDefault();
    if (!confirm('Tem certeza que deseja esvaziar o carrinho?')) return;
    appState.carrinho = [];
    appState.quantidades = {};
    salvarEstado();
    fecharCheckout();
    atualizarCarrinhoUI();
    if (appState.paginaAtual === 'menu') {
      renderizar();
    }
    mostrarToast('Carrinho esvaziado.', 'sucesso');
    return;
  }

  // Enviar pedido pelo modal de checkout
  if (e.target.closest('[data-acao="enviar-checkout"]')) {
    e.preventDefault();
    finalizarPedidoWhatsApp(e);
    return;
  }

  // Clique na imagem do produto para abrir Lightbox
  const imgCard = e.target.closest('.produto-card__img');
  if (imgCard) {
    abrirLightbox(imgCard.src, imgCard.alt);
    return;
  }

  // Fechar lightbox
  if (e.target.closest('#btn-fechar-lightbox') || e.target.id === 'lightbox-overlay') {
    fecharLightbox();
    return;
  }

  // Voltar ao topo
  if (e.target.closest('#btn-voltar-topo')) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Adicionar bolo personalizado
  if (e.target.closest('#btn-adicionar-bolo')) {
    adicionarBoloAoCarrinho();
    return;
  }
}

function onDocChange(e) {
  const boloInput = e.target.closest('[data-bolo]');
  if (boloInput) {
    const campo = boloInput.dataset.bolo;
    let valor = boloInput.value;

    if (boloInput.type === 'checkbox') {
      valor = boloInput.checked;
    } else if (campo === 'peso') {
      valor = Math.max(OPCOES_BOLO.PESO_MINIMO, parseFloat(boloInput.value) || OPCOES_BOLO.PESO_MINIMO);
    }

    appState.boloPersonalizado[campo] = valor;
    salvarEstado();

    // Atualiza display do preço do bolo em tempo real
    const displayPreco = document.getElementById('bolo-preco-display');
    if (displayPreco) {
      const peso = Number(appState.boloPersonalizado.peso) || OPCOES_BOLO.PESO_MINIMO;
      const precoTotal = (peso * PRECO_BOLO_POR_KG) + (appState.boloPersonalizado.caixaTransporte ? OPCOES_BOLO.PRECO_CAIXA : 0);
      displayPreco.textContent = formatarMoeda(precoTotal);
    }
    return;
  }
}

function onDocInput(e) {
  // Autocomplete: captura digitação no campo de busca
  if (e.target.id === 'site-search') {
    processarInputAutocomplete(e.target.value);
    return;
  }

  const boloInput = e.target.closest('[data-bolo]');
  if (boloInput) {
    const campo = boloInput.dataset.bolo;
    let valor = boloInput.value;

    if (boloInput.type === 'checkbox') {
      valor = boloInput.checked;
    } else if (campo === 'peso') {
      valor = Math.max(OPCOES_BOLO.PESO_MINIMO, parseFloat(boloInput.value) || OPCOES_BOLO.PESO_MINIMO);
    }

    appState.boloPersonalizado[campo] = valor;
    salvarEstado();

    const displayPreco = document.getElementById('bolo-preco-display');
    if (displayPreco) {
      const peso = Number(appState.boloPersonalizado.peso) || OPCOES_BOLO.PESO_MINIMO;
      const precoTotal = (peso * PRECO_BOLO_POR_KG) + (appState.boloPersonalizado.caixaTransporte ? OPCOES_BOLO.PRECO_CAIXA : 0);
      displayPreco.textContent = formatarMoeda(precoTotal);
    }
  }
}

function bindBoloEventos() {
  // Chamado após substituição da seção do bolo — os eventos globais já cobrem via delegação
  // Esta função existe como ponto de extensão futura
}

// =========================================================
// INICIALIZAÇÃO
// =========================================================
function inicializar() {
  // Carrega o carrinho, quantidades e opções salvas do localStorage antes da renderização inicial
  carregarEstado();

  // Detecta página pela URL hash (ex: #menu ao recarregar)
  const hash = window.location.hash.replace('#', '');
  const paginasValidas = ['home', 'menu', 'contact'];
  if (paginasValidas.includes(hash)) {
    appState.paginaAtual = hash;
  }

  renderizar();

  // Fechar modal, lightbox ou autocomplete com tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      fecharAutocomplete();
      fecharCheckout();
      fecharLightbox();
    }
  });

  // Fechar autocomplete ao clicar fora do dropdown
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('autocomplete-dropdown');
    const container = document.getElementById('autocomplete-container');
    if (dropdown && container && !container.contains(e.target)) {
      fecharAutocomplete();
    }
  });

  // Mostrar/ocultar botão Voltar ao Topo ao rolar a página
  window.addEventListener('scroll', () => {
    const btnTopo = document.getElementById('btn-voltar-topo');
    if (btnTopo) {
      if (window.scrollY > 300) {
        btnTopo.classList.add('btn-voltar-topo--visivel');
      } else {
        btnTopo.classList.remove('btn-voltar-topo--visivel');
      }
    }
  });

  console.info('✅ Preta Doces e Salgados — Vanilla JS carregado com sucesso!');
}

// Aguarda o DOM estar pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializar);
} else {
  inicializar();
}

