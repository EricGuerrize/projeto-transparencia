# Front-projeto — Protótipo de Transparência (RN nº 19/2025 e TAEP)

Este repositório contém um **frontend simples (HTML/CSS/JS)** que simula um leiaute inspirado no Transferegov para apresentar 3 “páginas” (abas), cada uma focada em uma tabela:

- **Tabela 1 — EMENDA_PRINCIPAL**: Origem e Alocação  
- **Tabela 2 — EXECUCAO_PLANEJAMENTO**: Objeto, Finalidade, Metas e Cronograma  
- **Tabela 3 — FLUXO_FINANCEIRO_E_EVIDENCIAS**: Rastreabilidade e Status

## Como abrir

Opção mais simples: abrir o arquivo `index.html` no navegador.

Se preferir servir localmente (evita problemas com alguns navegadores), use qualquer servidor estático, por exemplo:

```bash
python3 -m http.server 8080
```

Depois abra `http://localhost:8080`.

## Onde editar os dados simulados

Edite o arquivo `data.js` para trocar valores, adicionar evidências, etapas do cronograma, etc.

## DER / ERD

O diagrama entidade-relacionamento está em **DBML** (para colar no dbdiagram):

- `schema.dbml` (fonte principal)
- `ERD.md` (mesmo conteúdo, pronto para copiar)

## Navegação

As telas usam hash routing:

- `#/emenda`
- `#/execucao`
- `#/fluxo`



