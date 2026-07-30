/**
 * data.js — Preta Doces e Salgados
 * Catálogo completo de produtos com categorias e preços.
 * As imagens usam caminhos relativos ao index.html na raiz do projeto.
 */

const IMAGENS = {
  coxinha:    './src/assets/coxinha.png',
  risole:     './src/assets/risole.png',
  empada:     './src/assets/empada.png',
  esfirra:    './src/assets/esfirra.png',
  kibe:       './src/assets/kibe.png',
  brigadeiro: './src/assets/brigadeiro.png',
  beijinho:   './src/assets/beijinho.png',
  bolo1:      './src/assets/bolo_1.png',
  bolo2:      './src/assets/bolo_2.png',
  placeholder:'./src/assets/placeholder.jpg'
};

// Categorias de exibição para filtros e títulos de seção
const CATEGORIAS = [
  { id: 'salgados_folhados',   label: 'Salgados Folhados',   grupo: 'salgados' },
  { id: 'salgados_fritos',     label: 'Salgados Fritos',     grupo: 'salgados' },
  { id: 'salgados_assados',    label: 'Salgados Assados',    grupo: 'salgados' },
  { id: 'extras',              label: 'Extras',              grupo: 'salgados' },
  { id: 'doces_comuns',        label: 'Doces Comuns',        grupo: 'doces'    },
  { id: 'doces_caramelizados', label: 'Doces Caramelizados', grupo: 'doces'    },
  { id: 'doces_gourmet',       label: 'Doces Gourmet',       grupo: 'doces'    },
  { id: 'bombons',             label: 'Bombons',             grupo: 'bombons'  },
  { id: 'bolo_personalizado',  label: 'Bolo Personalizado',  grupo: 'bolos'    },
];

// Filtros aninhados
const SUBCATEGORIAS = {
  salgados: [
    { id: 'todos', label: 'Todos' },
    { id: 'folhados', label: 'Folhados' },
    { id: 'fritos', label: 'Fritos' },
    { id: 'assados', label: 'Assados' },
    { id: 'extras', label: 'Extras' }
  ],
  doces: [
    { id: 'todos', label: 'Todos' },
    { id: 'comuns', label: 'Comuns' },
    { id: 'caramelizados', label: 'Caramelizados' },
    { id: 'gourmet', label: 'Gourmet' }
  ]
};

// Catálogo completo de produtos
const PRODUTOS = [
  // --- SALGADOS FOLHADOS ---
  { id: 1,  name: 'Alho Poró \u2013 Creme Cheese',             price: 84.00,  unit: 'cento', category: 'salgados', subcategory: 'folhados', rankVendido: 'top5', ranking: 3 },
  { id: 2,  name: 'Bacalhau',                               price: 90.00,  unit: 'cento', category: 'salgados', subcategory: 'folhados' },
  { id: 3,  name: 'Banana com Queijo',                      price: 84.00,  unit: 'cento', category: 'salgados', subcategory: 'folhados' },
  { id: 4,  name: 'Camarão',                                 price: 90.00,  unit: 'cento', category: 'salgados', subcategory: 'folhados' },
  { id: 5,  name: 'Carne de Sol',                           price: 84.00,  unit: 'cento', category: 'salgados', subcategory: 'folhados' },
  { id: 6,  name: 'Castanha do Par\u00e1',                       price: 84.00,  unit: 'cento', category: 'salgados', subcategory: 'folhados', rankVendido: 'top5', ranking: 1 },
  { id: 7,  name: 'Fil\u00e9',                                   price: 94.00,  unit: 'cento', category: 'salgados', subcategory: 'folhados', rankVendido: 'destaque' },
  { id: 8,  name: 'Fio de Ovos com Bacon',                  price: 90.00,  unit: 'cento', category: 'salgados', subcategory: 'folhados' },
  { id: 9,  name: 'Frango Catupir\u00ed',                        price: 84.00,  unit: 'cento', category: 'salgados', subcategory: 'folhados', rankVendido: 'destaque' },
  { id: 10, name: 'Ma\u00e7\u00e3',                                    price: 84.00,  unit: 'cento', category: 'salgados', subcategory: 'folhados' },
  { id: 11, name: 'Palmito \u2013 Catupir\u00ed',                     price: 84.00,  unit: 'cento', category: 'salgados', subcategory: 'folhados' },
  { id: 12, name: 'Peito de Peru com Abacaxi',              price: 94.00,  unit: 'cento', category: 'salgados', subcategory: 'folhados' },
  { id: 13, name: 'Ricota com Espinafre e Catupiry',        price: 84.00,  unit: 'cento', category: 'salgados', subcategory: 'folhados' },
  { id: 14, name: 'Romeu e Julieta',                        price: 84.00,  unit: 'cento', category: 'salgados', subcategory: 'folhados', rankVendido: 'destaque' },
  { id: 15, name: 'Tomate Seco \u2013 Queijo',                    price: 84.00,  unit: 'cento', category: 'salgados', subcategory: 'folhados' },

  // --- SALGADOS FRITOS ---
  { id: 16, name: 'Aipim com Carne de Sol',                 price: 84.00,  unit: 'cento', category: 'salgados', subcategory: 'fritos',   rankVendido: 'destaque' },
  { id: 17, name: 'Aipim com Queijo',                       price: 84.00,  unit: 'cento', category: 'salgados', subcategory: 'fritos' },
  { id: 18, name: 'B. de Azeitona com Queijo',              price: 84.00,  unit: 'cento', category: 'salgados', subcategory: 'fritos' },
  { id: 19, name: 'B. de Calabresa',                        price: 84.00,  unit: 'cento', category: 'salgados', subcategory: 'fritos' },
  { id: 20, name: 'Cox. com Catupiry',                      price: 84.00,  unit: 'cento', category: 'salgados', subcategory: 'fritos',   rankVendido: 'destaque' },
  { id: 21, name: 'Coxinha Comum',                          price: 70.00,  unit: 'cento', category: 'salgados', subcategory: 'fritos',   rankVendido: 'top5', ranking: 4 },
  { id: 22, name: 'Kibe',                                   price: 70.00,  unit: 'cento', category: 'salgados', subcategory: 'fritos',   rankVendido: 'destaque' },
  { id: 23, name: 'Kibe c/ Queijo',                         price: 84.00,  unit: 'cento', category: 'salgados', subcategory: 'fritos' },
  { id: 24, name: 'Mar. de Milho com Bacon',                price: 84.00,  unit: 'cento', category: 'salgados', subcategory: 'fritos',   rankVendido: 'destaque' },
  { id: 25, name: 'Maravilha de Queijo',                    price: 70.00,  unit: 'cento', category: 'salgados', subcategory: 'fritos',   rankVendido: 'destaque' },
  { id: 26, name: 'P\u00e9rola de Queijo',                        price: 84.00,  unit: 'cento', category: 'salgados', subcategory: 'fritos',   rankVendido: 'destaque' },
  { id: 27, name: 'Risole \u2013 Gorgonzola',                     price: 84.00,  unit: 'cento', category: 'salgados', subcategory: 'fritos',   rankVendido: 'destaque' },
  { id: 28, name: 'Risole \u2013 Presunto e Queijo',               price: 70.00,  unit: 'cento', category: 'salgados', subcategory: 'fritos' },
  { id: 29, name: 'Risole de Bacalhau',                     price: 90.00,  unit: 'cento', category: 'salgados', subcategory: 'fritos' },
  { id: 30, name: 'Risole de Camarão',                        price: 90.00,  unit: 'cento', category: 'salgados', subcategory: 'fritos' },
  { id: 31, name: 'Risole de Carne',                        price: 70.00,  unit: 'cento', category: 'salgados', subcategory: 'fritos' },
  { id: 32, name: 'Risole de Milho',                        price: 70.00,  unit: 'cento', category: 'salgados', subcategory: 'fritos',   rankVendido: 'destaque' },

  // --- SALGADOS ASSADOS ---
  { id: 33, name: 'Empadas de Bacalhau',                    price: 90.00,  unit: 'cento', category: 'salgados', subcategory: 'assados' },
  { id: 34, name: 'Empadas de Camarão',                       price: 90.00,  unit: 'cento', category: 'salgados', subcategory: 'assados' },
  { id: 35, name: 'Empadas de Frango',                      price: 76.00,  unit: 'cento', category: 'salgados', subcategory: 'assados',  rankVendido: 'top5', ranking: 2 },
  { id: 36, name: 'Empadas de Palmito',                     price: 76.00,  unit: 'cento', category: 'salgados', subcategory: 'assados' },
  { id: 37, name: 'Empadas de Queijo',                      price: 76.00,  unit: 'cento', category: 'salgados', subcategory: 'assados' },
  { id: 38,  name: 'Quiche de Alho Poró',                     price: 76.00,  unit: 'cento', category: 'salgados', subcategory: 'assados' },
  { id: 100, name: 'Quiche de Bacon',                          price: 76.00,  unit: 'cento', category: 'salgados', subcategory: 'assados' },
  { id: 101, name: 'Quiche de Tomate Seco',                    price: 76.00,  unit: 'cento', category: 'salgados', subcategory: 'assados' },
  { id: 102, name: 'Quiche de Ricota',                         price: 76.00,  unit: 'cento', category: 'salgados', subcategory: 'assados' },
  { id: 39, name: 'Enrol. de Queijo',                       price: 76.00,  unit: 'cento', category: 'salgados', subcategory: 'assados' },
  { id: 40, name: 'Enrol. de Salsicha',                     price: 76.00,  unit: 'cento', category: 'salgados', subcategory: 'assados' },
  { id: 41, name: 'Esfirra Carne',                          price: 76.00,  unit: 'cento', category: 'salgados', subcategory: 'assados',  rankVendido: 'destaque' },
  { id: 42, name: 'Esfirra de Ricota',                      price: 76.00,  unit: 'cento', category: 'salgados', subcategory: 'assados' },
  { id: 43, name: 'Esfirra Frango',                         price: 76.00,  unit: 'cento', category: 'salgados', subcategory: 'assados' },
  { id: 44, name: 'Pastel de Forno \u2013 Carne',                  price: 76.00,  unit: 'cento', category: 'salgados', subcategory: 'assados',  rankVendido: 'destaque' },
  { id: 45, name: 'Pastel de Forno \u2013 Frango',                 price: 76.00,  unit: 'cento', category: 'salgados', subcategory: 'assados' },
  { id: 46, name: 'Pastel de Forno - Ricota/Espinafre',     price: 76.00,  unit: 'cento', category: 'salgados', subcategory: 'assados' },

  // --- EXTRAS ---
  { id: 47, name: 'Barquetes (casquinhas)',                 price: 50.00,  unit: 'cento', category: 'salgados', subcategory: 'extras' },
  { id: 48, name: 'Cachorro Quente',                        price: 300.00, unit: 'cento', category: 'salgados', subcategory: 'extras' },
  { id: 49, name: 'Mini Hamburguer',                        price: 380.00, unit: 'cento', category: 'salgados', subcategory: 'extras' },
  { id: 50, name: 'Mini Pizza',                             price: 250.00, unit: 'cento', category: 'salgados', subcategory: 'extras' },

  // --- DOCES COMUNS ---
  { id: 51, name: 'Baianinho com Coco/Amendoim',            price: 150.00, unit: 'cento', category: 'doces', subcategory: 'comuns' },
  { id: 52, name: 'Beijinho de C\u00f4co (queimado)',              price: 150.00, unit: 'cento', category: 'doces', subcategory: 'comuns' },
  { id: 53, name: 'Bicho de P\u00e9',                             price: 150.00, unit: 'cento', category: 'doces', subcategory: 'comuns' },
  { id: 54, name: 'Brigadeiro Branco',                      price: 150.00, unit: 'cento', category: 'doces', subcategory: 'comuns' },
  { id: 55, name: 'Brigadeiro de Lim\u00e3o',                     price: 150.00, unit: 'cento', category: 'doces', subcategory: 'comuns' },
  { id: 56, name: 'Brigadeiro de Maracuj\u00e1',                  price: 150.00, unit: 'cento', category: 'doces', subcategory: 'comuns' },
  { id: 57, name: 'Brigadeiro Preto',                       price: 150.00,  unit: 'cento', category: 'doces', subcategory: 'comuns', rankVendido: 'top5', ranking: 5 },
  { id: 58, name: 'Cajuzinho',                              price: 150.00, unit: 'cento', category: 'doces', subcategory: 'comuns' },
  { id: 59, name: 'Casadinho',                              price: 150.00,  unit: 'cento', category: 'doces', subcategory: 'comuns', rankVendido: 'destaque' },
  { id: 60, name: 'Chocopower Branco ou Preto',             price: 180.00, unit: 'cento', category: 'doces', subcategory: 'comuns' },
  { id: 61, name: 'Churros',                                price: 150.00, unit: 'cento', category: 'doces', subcategory: 'comuns' },
  { id: 62, name: 'Leite Ninho',                            price: 150.00, unit: 'cento', category: 'doces', subcategory: 'comuns', rankVendido: 'destaque' },
  { id: 63, name: 'Olho de Sogra',                          price: 180.00, unit: 'cento', category: 'doces', subcategory: 'comuns' },
  { id: 64, name: 'Ouriço (brigadeiro branco na castanha de caju)', price: 150.00, unit: 'cento', category: 'doces', subcategory: 'comuns' },
  { id: 65, name: 'Surpresa de Uva',                        price: 180.00, unit: 'cento', category: 'doces', subcategory: 'comuns' },

  // --- DOCES CARAMELIZADOS ---
  { id: 66, name: 'Beijinho de C\u00f4co',                         price: 250.00, unit: 'cento', category: 'doces', subcategory: 'caramelizados' },
  { id: 67, name: 'Beijinho de C\u00f4co \u2013 Cober. de Sucrilhos',  price: 260.00, unit: 'cento', category: 'doces', subcategory: 'caramelizados' },
  { id: 68, name: 'Brigadeiro Branco',                      price: 250.00, unit: 'cento', category: 'doces', subcategory: 'caramelizados' },
  { id: 69, name: 'Brigadeiro Preto',                       price: 250.00, unit: 'cento', category: 'doces', subcategory: 'caramelizados' },
  { id: 70, name: 'Castanha do Par\u00e1',                         price: 260.00, unit: 'cento', category: 'doces', subcategory: 'caramelizados' },
  { id: 71, name: 'Frutinhas',                              price: 250.00, unit: 'cento', category: 'doces', subcategory: 'caramelizados' },
  { id: 72, name: 'Nozes',                                  price: 300.00, unit: 'cento', category: 'doces', subcategory: 'caramelizados' },
  { id: 73, name: 'Olho de Sogra',                          price: 260.00, unit: 'cento', category: 'doces', subcategory: 'caramelizados' },

  // --- DOCES GOURMET ---
  { id: 74, name: 'Beijinho Gourmet',                       price: 300.00, unit: 'cento', category: 'doces', subcategory: 'gourmet' },
  { id: 75, name: 'Brigadeiro Gourmet',                     price: 300.00, unit: 'cento', category: 'doces', subcategory: 'gourmet' },
  { id: 76, name: 'Camafeu de Nozes',                       price: 400.00, unit: 'cento', category: 'doces', subcategory: 'gourmet' },
  { id: 77, name: 'Casquinha de Chocolate com Cereja',      price: 400.00, unit: 'cento', category: 'doces', subcategory: 'gourmet' },
  { id: 78, name: 'Copinhos de Brigadeiro com Cereja',      price: 400.00, unit: 'cento', category: 'doces', subcategory: 'gourmet' },
  { id: 79, name: 'Docinho de Damasco',                     price: 400.00, unit: 'cento', category: 'doces', subcategory: 'gourmet' },
  { id: 80, name: 'Docinho de Leite Ninho Gourmet (Brigadeiro, Goiabada, Nutella)', price: 300.00, unit: 'cento', category: 'doces', subcategory: 'gourmet' },
  { id: 81, name: 'Tortinha de Limao Tradicional',          price: 300.00, unit: 'cento', category: 'doces', subcategory: 'gourmet' },
  { id: 82, name: 'Trufa de Chocolate Branco com Lim\u00e3o',      price: 400.00, unit: 'cento', category: 'doces', subcategory: 'gourmet' },
  { id: 83, name: 'Trufa Tradicional',                      price: 400.00, unit: 'cento', category: 'doces', subcategory: 'gourmet' },
  { id: 84, name: 'Trufas de Lim\u00e3o',                         price: 400.00, unit: 'cento', category: 'doces', subcategory: 'gourmet' },
  { id: 85, name: 'Trufas de Maracuj\u00e1',                       price: 400.00, unit: 'cento', category: 'doces', subcategory: 'gourmet' },

  // --- BOMBONS ---
  { id: 86, name: 'Ameixa',           price: 270.00, unit: 'cento', category: 'bombons', subcategory: '' },
  { id: 87, name: 'Brigadeiro Branco',price: 270.00, unit: 'cento', category: 'bombons', subcategory: '' },
  { id: 88, name: 'Brigadeiro de Lim\u00e3o', price: 270.00, unit: 'cento', category: 'bombons', subcategory: '' },
  { id: 89, name: 'Brigadeiro Preto', price: 270.00, unit: 'cento', category: 'bombons', subcategory: '' },
  { id: 90, name: 'Casadinho',        price: 270.00, unit: 'cento', category: 'bombons', subcategory: '' },
  { id: 91, name: 'Castanha do Par\u00e1', price: 270.00, unit: 'cento', category: 'bombons', subcategory: '' },
  { id: 92, name: 'Cereja',           price: 270.00, unit: 'cento', category: 'bombons', subcategory: '' },
  { id: 93, name: 'C\u00f4co',              price: 270.00, unit: 'cento', category: 'bombons', subcategory: '' },
  { id: 94, name: 'Damasco',          price: 310.00, unit: 'cento', category: 'bombons', subcategory: '' },
  { id: 95, name: 'Maracuj\u00e1',         price: 270.00, unit: 'cento', category: 'bombons', subcategory: '' },
  { id: 96, name: 'Morango',          price: 300.00, unit: 'cento', category: 'bombons', subcategory: '' },
  { id: 97, name: 'Nozes',            price: 310.00, unit: 'cento', category: 'bombons', subcategory: '' },
  { id: 98, name: 'Pistache',         price: 500.00, unit: 'cento', category: 'bombons', subcategory: '' },
  { id: 99, name: 'Uva',              price: 270.00, unit: 'cento', category: 'bombons', subcategory: '' },
];

// Preço base do bolo por kg e configurações de bolo personalizado
const PRECO_BOLO_POR_KG = 115.00;
const OPCOES_BOLO = {
  PESO_MINIMO: 1.5,
  PRECO_CAIXA: 20.00,
  SABORES_MASSA: [
    'Chocolate (Nega Maluca)',
    'Baunilha / Pão de Ló',
    'Red Velvet',
    'Cenoura',
    'Churros'
  ],
  COBERTURAS_RECHEIOS: [
    'Brigadeiro Gourmet',
    'Beijinho de Coco',
    'Leite Ninho com Nutella',
    'Doce de Leite com Nozes',
    'Prestígio',
    'Frutas Vermelhas',
    'Chantilly com Morango'
  ]
};

// Número de WhatsApp para contato
const WHATSAPP_NUMERO = '5561992552565';

// =========================================================
// SISTEMA DE NORMALIZAÇÃO DE IMAGENS E IMPORTAÇÃO DINÂMICA
// =========================================================

/**
 * Normaliza o nome do produto para gerar um nome de arquivo seguro e limpo.
 * Exemplo: 'Cajuzinho' -> 'cajuzinho'
 * Exemplo: 'Cox. com Catupiry' -> 'coxcomcatupiry'
 */
function normalizarNomeImagem(nome) {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9]/g, '');      // Remove espaços, traços e pontuações
}

// Mapeamento de exceções para as imagens que já existem fisicamente no disco
const MAPA_IMAGENS_EXISTENTES = {
  // Salgados Folhados
  'alho poró – creme cheese': 'Alho.webp',
  'castanha do pará': 'Folhadodecastanha.webp',
  'filé': 'Folhadodecarndesol.webp',
  'fio de ovos com bacon': 'Fiodeovos.webp',
  'frango catupirí': 'Folhadodefrango.webp',
  'peito de peru com abacaxi': 'Folhadodeperu.webp',
  'romeu e julieta': 'Banana.Romeu.webp',
  'banana com queijo': 'Banana.Romeu.webp',
  'camarão': 'Folhadodecamarao.webp',

  // Salgados Fritos
  'coxinha comum': 'Coxinha.webp',

  // Salgados Assados
  'empadas de frango': 'emp.frango.webp',
  'empadas de palmito': 'emp.frango.webp',
  'empadas de bacalhau': 'emp.frango.webp',
  'empadas de camarão': 'emp.frango.webp',
  'empadas de queijo': 'Quiche alho, bacon, tomate, queijo.jpeg',
  'quiche de alho poró': 'Quiche alho, bacon, tomate, queijo.jpeg',
  'quiche de bacon': 'Quiche alho, bacon, tomate, queijo.jpeg',
  'quiche de tomate seco': 'Quiche alho, bacon, tomate, queijo.jpeg',
  'quiche de ricota': 'Quiche alho, bacon, tomate, queijo.jpeg',
  'enrol. de queijo': 'enr.queijo.webp',
  'enrol. de salsicha': 'enr.salsicha.webp',
  'pastel de forno – carne': 'Pasteldecarne.ricota.frango.webp',
  'pastel de forno – frango': 'Pasteldecarne.ricota.frango.webp',
  'pastel de forno - ricota/espinafre': 'Pasteldecarne.ricota.frango.webp',

  // Doces Comuns
  'churros': 'Doce-comum-Churros.webp',
  'leite ninho': 'Doce-comum-Leite-Ninho.webp',
  'olho de sogra': 'Doce-comum-Olho-de-sogra.webp',
  'brigadeiro branco': 'Docecomum-BrigadeiroBranco.webp',
  'brigadeiro preto': 'Docecomum-BrigadeiroPreto.webp',
  'cajuzinho': 'Docecomum-Cajuzinhho.webp',
  'ouriço (brigadeiro branco na castanha de caju)': 'Docecomum-Ourico.webp',
  'surpresa de uva': 'Docecomum-Surpresadeuva.webp',

  // Bombons
  'morango': 'Bombons-BombomdeMorango.webp'
};

// Mapeamento de grupos de categoria para suas respectivas pastas no projeto
const GRUPO_PARA_PASTA = {
  salgados: './Salgados/',
  doces:    './Doces/',
  bombons:  './Doces/',
  bolos:    './Doces/'
};

// Aplica a normalização dinâmica em lote no array de produtos
PRODUTOS.forEach(produto => {
  const nomeChave = produto.name.toLowerCase().trim();
  const grupo = produto.category || 'salgados';
  const pasta = GRUPO_PARA_PASTA[grupo] || './Salgados/';

  // Verifica se o produto tem uma imagem existente mapeada
  if (MAPA_IMAGENS_EXISTENTES[nomeChave]) {
    produto.image = `${pasta}${MAPA_IMAGENS_EXISTENTES[nomeChave]}`;
  } else if ((grupo === 'doces' || grupo === 'bombons') && produto.subcategory === 'comuns') {
    // Fallback específico: só doces da subcategoria 'comuns' recebem a imagem genérica
    produto.image = './Doces/Doce-comum-Doces-diversos.webp';
  } else {
    // Para os demais (sem mapa e sem fallback), gera caminho normalizado
    produto.image = `${pasta}${normalizarNomeImagem(produto.name)}.webp`;
  }
});
