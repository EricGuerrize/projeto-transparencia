-- Schema opcional (PostgreSQL) para persistir o leiaute do protótipo.
-- Ajuste tipos/constraints conforme regras oficiais (RN nº 19/2025 / TAEP).

-- =========================
-- Modelo mínimo (3 tabelas)
-- =========================

create table if not exists emenda_principal (
  id_emenda text primary key,
  id_plano_acao text not null,
  nome_parlamentar_autor text not null,
  codigo_unico_emenda text not null,
  valor_total_alocado numeric(14,2) not null,
  cnpj_orgao_beneficiario text not null,
  uf_aplicacao char(2) not null,
  nome_programa_orcamentario text not null
);

create table if not exists execucao_planejamento (
  id_executor text primary key,
  id_emenda text not null references emenda_principal(id_emenda) on delete cascade,
  nome_executor text not null,
  objeto_detalhado text not null,
  finalidade_politica_publica text not null,
  descricao_metas text,
  data_inicio_prevista date,
  data_fim_prevista date,
  status_plano_trabalho text,
  dados_conta_especifica text
);

create table if not exists fluxo_financeiro_e_evidencias (
  id_rastreabilidade text primary key,
  id_emenda text not null references emenda_principal(id_emenda) on delete cascade,
  numero_empenho text,
  numero_documento_habil text,
  numero_ordem_pagamento_bancaria text,
  status_financeiro_atual text,
  valor_efetivamente_executado numeric(14,2),
  status_prestacao_contas text,
  processo_licitatorio_vinculado text,
  processo_administrativo text,
  data_ultima_atualizacao timestamptz
);

-- ==========================================
-- Extensão normalizada (listas como tabelas)
-- ==========================================

create table if not exists cronograma_etapa (
  id_etapa text primary key,
  id_executor text not null references execucao_planejamento(id_executor) on delete cascade,
  etapa text not null,
  inicio date,
  fim date,
  status text
);

create table if not exists trilha_financeira_evento (
  id_evento text primary key,
  id_rastreabilidade text not null references fluxo_financeiro_e_evidencias(id_rastreabilidade) on delete cascade,
  data date,
  evento text,
  documento text,
  valor numeric(14,2),
  situacao text
);

create table if not exists evidencia (
  id_evidencia text primary key,
  id_rastreabilidade text not null references fluxo_financeiro_e_evidencias(id_rastreabilidade) on delete cascade,
  tipo text,
  descricao text,
  referencia text,
  data date
);


