erDiagram
  EMENDA_PRINCIPAL ||--o{ EXECUCAO_PLANEJAMENTO : "id_emenda (FK)"
  EMENDA_PRINCIPAL ||--o{ FLUXO_FINANCEIRO_E_EVIDENCIAS : "id_emenda (FK)"

  EMENDA_PRINCIPAL {
    string  id_emenda PK
    string  id_plano_acao
    string  nome_parlamentar_autor
    string  codigo_unico_emenda
    decimal valor_total_alocado
    string  cnpj_orgao_beneficiario
    string  uf_aplicacao
    string  nome_programa_orcamentario
  }

  EXECUCAO_PLANEJAMENTO {
    string  id_executor PK
    string  id_emenda FK
    string  nome_executor
    text    objeto_detalhado
    text    finalidade_politica_publica
    text    descricao_metas
    date    data_inicio_prevista
    date    data_fim_prevista
    string  status_plano_trabalho
    text    dados_conta_especifica
  }

  FLUXO_FINANCEIRO_E_EVIDENCIAS {
    string   id_rastreabilidade PK
    string   id_emenda FK
    string   numero_empenho
    string   numero_documento_habil
    string   numero_ordem_pagamento_bancaria
    string   status_financeiro_atual
    decimal  valor_efetivamente_executado
    string   status_prestacao_contas
    string   processo_licitatorio_vinculado
    string   processo_administrativo
    datetime data_ultima_atualizacao
  }

%% --- COPIE APENAS UM DIAGRAMA POR VEZ NO https://mermaid.live ---

erDiagram
  PLANO_ACAO ||--|| EMENDA_PRINCIPAL : "id_plano_acao"
  EMENDA_PRINCIPAL ||--o{ EXECUCAO_PLANEJAMENTO : "id_emenda"
  EXECUCAO_PLANEJAMENTO ||--o{ CRONOGRAMA_ETAPA : "id_executor"
  EMENDA_PRINCIPAL ||--o{ FLUXO_FINANCEIRO_E_EVIDENCIAS : "id_emenda"
  FLUXO_FINANCEIRO_E_EVIDENCIAS ||--o{ TRILHA_FINANCEIRA_EVENTO : "id_rastreabilidade"
  FLUXO_FINANCEIRO_E_EVIDENCIAS ||--o{ EVIDENCIA : "id_rastreabilidade"

  PLANO_ACAO {
    string id_plano_acao PK
    string programa
    string situacao_plano_acao
    string cnpj_beneficiario
    string nome_beneficiario
    string uf_beneficiario
    string codigo_ibge
    string idh
  }

  EMENDA_PRINCIPAL {
    string  id_emenda PK
    string  id_plano_acao FK
    string  nome_parlamentar_autor
    string  codigo_unico_emenda
    decimal valor_total_alocado
    string  cnpj_orgao_beneficiario
    string  uf_aplicacao
    string  nome_programa_orcamentario
  }

  EXECUCAO_PLANEJAMENTO {
    string id_executor PK
    string id_emenda FK
    string nome_executor
    text   objeto_detalhado
    text   finalidade_politica_publica
    text   descricao_metas
    date   data_inicio_prevista
    date   data_fim_prevista
    string status_plano_trabalho
    text   dados_conta_especifica
  }

  CRONOGRAMA_ETAPA {
    string  id_etapa PK
    string  id_executor FK
    string  etapa
    date    inicio
    date    fim
    string  status
  }

  FLUXO_FINANCEIRO_E_EVIDENCIAS {
    string   id_rastreabilidade PK
    string   id_emenda FK
    string   numero_empenho
    string   numero_documento_habil
    string   numero_ordem_pagamento_bancaria
    string   status_financeiro_atual
    decimal  valor_efetivamente_executado
    string   status_prestacao_contas
    string   processo_licitatorio_vinculado
    string   processo_administrativo
    datetime data_ultima_atualizacao
  }

  TRILHA_FINANCEIRA_EVENTO {
    string  id_evento PK
    string  id_rastreabilidade FK
    date    data
    string  evento
    string  documento
    decimal valor
    string  situacao
  }

  EVIDENCIA {
    string id_evidencia PK
    string id_rastreabilidade FK
    string tipo
    string descricao
    string referencia
    date   data
  }
