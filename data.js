/* Dados fictícios para simulação — ajuste livremente */
window.__SIM_DATA__ = {
  planoAcao: {
    id_plano_acao: "09032025-2-087618/2025",
    programa: "09032025-2",
    situacao_plano_acao: "Ciente",
    beneficiario: {
      nome: "ALTO GARÇAS (MT)",
      cnpj: "03.133.097/0001-07",
      uf: "MT",
      codigo_ibge: "5100409",
      idh: "0,701",
    },
    emenda: {
      id_emenda: "EMD-2025-00087618",
      nome_parlamentar_autor: "JAYME CAMPOS",
      codigo_unico_emenda: "202523760005",
      nome_programa_orcamentario: "Ação Orçamentária — Transferência Especial",
      valor_custeio: 0,
      valor_investimento: 1485043.56,
      moeda: "BRL",
    },
    conta: {
      banco: "001 - Banco do Brasil",
      agencia: "2927-0",
      conta: "21970-3",
      situacao_conta: "Conta Ativa",
      observacao:
        "Conforme legislação vigente, esta conta é exclusiva para execução do Plano de Trabalho; é vedada a transferência para outra conta bancária.",
    },
  },

  tabela1_emenda_principal: {
    // Campos (Novo)
    id_emenda: "EMD-2025-00087618",
    id_plano_acao: "09032025-2-087618/2025",
    nome_parlamentar_autor: "JAYME CAMPOS",
    codigo_unico_emenda: "202523760005",
    valor_total_alocado: 1485043.56,
    cnpj_orgao_beneficiario: "03.133.097/0001-07",
    uf_aplicacao: "MT",
    nome_programa_orcamentario: "Ação Orçamentária — Transferência Especial",
  },

  tabela2_execucao_planejamento: {
    id_executor: "EXEC-000219",
    id_emenda: "EMD-2025-00087618",
    nome_executor: "Prefeitura Municipal de Alto Garças",
    objeto_detalhado: "222 — Construção de Centro-Dia",
    finalidade_politica_publica: "Assistência Social — Serviços socioassistenciais",
    descricao_metas:
      "Meta 1: Construir 01 unidade de Centro-Dia.\nMeta 2: Equipar o espaço com mobiliário e itens essenciais.\nMeta 3: Iniciar atendimento de 60 pessoas/mês no primeiro trimestre pós-entrega.",
    data_inicio_prevista: "2025-02-10",
    data_fim_prevista: "2025-12-20",
    status_plano_trabalho: "Em execução",
    dados_conta_especifica:
      "Banco: 001 - Banco do Brasil | Agência: 2927-0 | Conta: 21970-3 | Situação: Conta Ativa",
    cronograma: [
      {
        etapa: "Planejamento e projetos",
        inicio: "2025-02-10",
        fim: "2025-03-15",
        status: "Concluída",
      },
      {
        etapa: "Contratação/Procedimento de contratação",
        inicio: "2025-03-16",
        fim: "2025-05-05",
        status: "Concluída",
      },
      {
        etapa: "Execução da obra",
        inicio: "2025-05-06",
        fim: "2025-11-30",
        status: "Em execução",
      },
      {
        etapa: "Entrega, aceite e início de operação",
        inicio: "2025-12-01",
        fim: "2025-12-20",
        status: "Planejada",
      },
    ],
  },

  tabela3_fluxo_financeiro_e_evidencias: {
    id_rastreabilidade: "RST-87618-2025-001",
    id_emenda: "EMD-2025-00087618",
    numero_empenho: "2025NE000123",
    numero_documento_habil: "HAB-2025-000045",
    numero_ordem_pagamento_bancaria: "OBP-2025-000077",
    status_financeiro_atual: "Liquidação parcial",
    valor_efetivamente_executado: 642310.19,
    status_prestacao_contas: "Em elaboração",
    processo_licitatorio_vinculado: "Pregão Eletrônico nº 12/2025",
    processo_administrativo: "PA-2025-001234",
    data_ultima_atualizacao: "2025-12-15T09:30:00-04:00",
    evidencias: [
      {
        tipo: "Foto",
        descricao: "Registro fotográfico da execução da fundação",
        referencia: "EVID-IMG-0001",
        data: "2025-08-12",
      },
      {
        tipo: "Relatório",
        descricao: "Relatório de medição (parcial) — mês 09/2025",
        referencia: "EVID-REL-0007",
        data: "2025-09-30",
      },
      {
        tipo: "Documento",
        descricao: "Ata de julgamento do procedimento de contratação",
        referencia: "EVID-DOC-0003",
        data: "2025-04-22",
      },
    ],
    trilha_financeira: [
      {
        data: "2025-03-20",
        evento: "Empenho",
        documento: "2025NE000123",
        valor: 300000.0,
        situacao: "Empenhado",
      },
      {
        data: "2025-06-18",
        evento: "Liquidação",
        documento: "HAB-2025-000045",
        valor: 220000.0,
        situacao: "Liquidado",
      },
      {
        data: "2025-06-25",
        evento: "Pagamento",
        documento: "OBP-2025-000077",
        valor: 210000.0,
        situacao: "Pago",
      },
      {
        data: "2025-10-10",
        evento: "Liquidação",
        documento: "HAB-2025-000062",
        valor: 222310.19,
        situacao: "Liquidado",
      },
      {
        data: "2025-10-17",
        evento: "Pagamento",
        documento: "OBP-2025-000103",
        valor: 212310.19,
        situacao: "Pago",
      },
    ],
  },
};



