# Calculadora de Pedidos — Cozinha (Arquivo de Referência para Migração GAS)

> ⚠️ Esta pasta é um **arquivo de referência** para migração ao Google Apps Script (GAS).
> O sistema-pedidos.html foi removido do site principal e NÃO deve ser reativado lá.

---

## Conteúdo desta pasta

| Arquivo | Descrição |
|---|---|
| `sistema-pedidos.html` | Interface completa da calculadora (HTML + CSS + JS inline) |
| `data.js` | Catálogo de produtos, preços e categorias (Única Fonte da Verdade) |
| `README.md` | Este arquivo |

---

## O que migrar para o Google Apps Script

### 1. Catálogo de Produtos (data.js)
O array PRODUTOS deve ser replicado como aba do Sheets.
Colunas: id | name | description | price | unit | category

### 2. Funções do Motor de Cálculo
- dicionarioDePara: ~200 abreviações mapeadas para nomes oficiais
- distanciaLevenshtein(): algoritmo Levenshtein
- similaridadeStrings(): retorna % similaridade (0.0-1.0)
- buscarMelhorMatch(): threshold >= 70%
- calcularValor(): unit=cento divide por 100; unit=unidade = preço fixo
- calcularPedido(): pipeline completo (extração metadados -> parse por linha -> fuzzy match -> comanda)

### 3. Regras de Negócio
- Taxa de Fritura: unit='unidade', R$ 300,00 fixo, quantidade default = 1
- Coxinha com Catupiry = bolinha de frango (mantido no cardápio com nome original)
- Levenshtein threshold: 70%
- Pedidos em texto corrido: usuario precisa separar por linha antes de calcular

### 4. Formato da Comanda de Saída
Dia: / Cliente: / Horário de retirada: / Contato:
Salgados > Fritos / Folhados / Assados
Doces > Comuns / Bombons / Caramelizados
Extras / Bolos
*Total: R$ XX,XX*
