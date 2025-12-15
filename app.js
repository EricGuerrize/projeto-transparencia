(() => {
  const data = window.__SIM_DATA__;
  const appEl = document.getElementById("app");
  const summaryGridEl = document.getElementById("summary-grid");
  const breadcrumbCurrentEl = document.getElementById("breadcrumb-current");
  const pageTitleEl = document.getElementById("page-title");
  const pageSubtitleEl = document.getElementById("page-subtitle");
  const btnCopyJson = document.getElementById("btn-copy-json");
  const btnDownloadJson = document.getElementById("btn-download-json");

  const fmtMoney = (value) => {
    const v = typeof value === "number" ? value : Number(value || 0);
    try {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(v);
    } catch {
      return `R$ ${v.toFixed(2)}`;
    }
  };

  const escapeHtml = (s) =>
    String(s ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const statusBadge = (status) => {
    const s = String(status || "").toLowerCase();
    if (s.includes("conclu")) return `<span class="badge badge--ok">Concluída</span>`;
    if (s.includes("execu")) return `<span class="badge badge--info">Em execução</span>`;
    if (s.includes("plane")) return `<span class="badge badge--warn">Planejada</span>`;
    if (s.includes("pago")) return `<span class="badge badge--ok">Pago</span>`;
    if (s.includes("liquid")) return `<span class="badge badge--info">Liquidado</span>`;
    return `<span class="badge">${escapeHtml(status)}</span>`;
  };

  const kv = ({ k, v, span = 3 }) => {
    const spanClass = `kv--span-${span}`;
    return `
      <div class="kv ${spanClass}">
        <div class="kv__k">${escapeHtml(k)}</div>
        <div class="kv__v" title="${escapeHtml(v)}">${escapeHtml(v)}</div>
      </div>
    `;
  };

  const field = ({ label, value, span = 6, badgeText }) => {
    const spanClass = `field--span-${span}`;
    const badge = badgeText ? `<span class="badge">${escapeHtml(badgeText)}</span>` : "";
    return `
      <div class="field ${spanClass}">
        <div class="label">
          <span>${escapeHtml(label)}</span>
          ${badge}
        </div>
        <input class="input" readonly value="${escapeHtml(value)}" />
      </div>
    `;
  };

  const textarea = ({ label, value, span = 12 }) => {
    const spanClass = `field--span-${span}`;
    return `
      <div class="field ${spanClass}">
        <div class="label"><span>${escapeHtml(label)}</span></div>
        <textarea class="textarea" readonly>${escapeHtml(value)}</textarea>
      </div>
    `;
  };

  const section = ({ title, hint, bodyHtml }) => `
    <div class="section">
      <div class="section__head">
        <h2 class="section__title">${escapeHtml(title)}</h2>
        <div class="section__hint">${escapeHtml(hint || "")}</div>
      </div>
      ${bodyHtml}
    </div>
  `;

  const renderSummary = () => {
    const p = data.planoAcao;
    summaryGridEl.innerHTML = [
      kv({ k: "Plano de Ação", v: p.id_plano_acao, span: 4 }),
      kv({ k: "Programa", v: p.programa, span: 3 }),
      kv({ k: "Situação do Plano de Ação", v: p.situacao_plano_acao, span: 3 }),
      kv({
        k: "Beneficiário",
        v: `${p.beneficiario.cnpj} — ${p.beneficiario.nome}`,
        span: 6,
      }),
      kv({
        k: "Emenda Parlamentar",
        v: `${p.emenda.codigo_unico_emenda} — ${p.emenda.nome_parlamentar_autor}`,
        span: 6,
      }),
    ].join("");
  };

  const setActiveTab = (routeKey) => {
    document.querySelectorAll(".tab").forEach((t) => {
      const isActive = t.getAttribute("data-route") === routeKey;
      if (isActive) t.setAttribute("aria-current", "page");
      else t.removeAttribute("aria-current");
    });
  };

  const renderTabela1 = () => {
    const t = data.tabela1_emenda_principal;
    breadcrumbCurrentEl.textContent = "Tabela 1 — Emenda Principal";
    pageTitleEl.textContent = "Emenda Principal (Origem e Alocação)";
    pageSubtitleEl.textContent =
      "Consolida identificação do parlamentar, emenda, valor alocado e rastreabilidade (RN nº 19/2025 e TAEP).";

    const body = [
      section({
        title: "Identificação e Rastreabilidade",
        hint: "RN Art. 3º, I, II | TAEP 2.1",
        bodyHtml: `
          <div class="grid">
            ${field({ label: "id_emenda (PK)", value: t.id_emenda, span: 4, badgeText: "Rastreabilidade" })}
            ${field({ label: "id_plano_acao", value: t.id_plano_acao, span: 4, badgeText: "Ligação" })}
            ${field({ label: "nome_parlamentar_autor", value: t.nome_parlamentar_autor, span: 4 })}
            ${field({ label: "codigo_unico_emenda", value: t.codigo_unico_emenda, span: 4 })}
            ${field({ label: "nome_programa_orcamentario", value: t.nome_programa_orcamentario, span: 8 })}
          </div>
        `,
      }),
      section({
        title: "Beneficiário e Localidade",
        hint: "RN Art. 3º, V, VI",
        bodyHtml: `
          <div class="grid">
            ${field({ label: "cnpj_orgao_beneficiario", value: t.cnpj_orgao_beneficiario, span: 4 })}
            ${field({ label: "uf_aplicacao", value: t.uf_aplicacao, span: 4 })}
            ${field({ label: "Localidade beneficiada", value: data.planoAcao.beneficiario.nome, span: 4 })}
          </div>
        `,
      }),
      section({
        title: "Valor Alocado (TAEP 2.2)",
        hint: "RN Art. 3º, IV | TAEP 2.2",
        bodyHtml: `
          <div class="grid">
            ${field({ label: "valor_total_alocado", value: fmtMoney(t.valor_total_alocado), span: 4, badgeText: "Valor total" })}
            ${field({ label: "valor_custeio", value: fmtMoney(data.planoAcao.emenda.valor_custeio), span: 4 })}
            ${field({ label: "valor_investimento", value: fmtMoney(data.planoAcao.emenda.valor_investimento), span: 4 })}
          </div>
        `,
      }),
      `<div class="note">
        <strong>Nota:</strong> esta tela é a “Tabela 1 — EMENDA_PRINCIPAL”, focada em <strong>Origem e Alocação</strong>.
        Os valores e códigos são fictícios e podem ser substituídos diretamente em <code>data.js</code>.
      </div>`,
    ].join("");

    appEl.innerHTML = body;
    setActiveTab("emenda");
  };

  const renderTabela2 = () => {
    const t = data.tabela2_execucao_planejamento;
    breadcrumbCurrentEl.textContent = "Tabela 2 — Execução e Planejamento";
    pageTitleEl.textContent = "Execução e Planejamento (Objeto, Finalidade, Metas e Cronograma)";
    pageSubtitleEl.textContent =
      "Detalha executor, objeto, finalidade, metas e cronograma (RN nº 19/2025 e TAEP 2.3/2.4).";

    const cronogramaRows = t.cronograma
      .map(
        (c) => `
        <tr>
          <td>${escapeHtml(c.etapa)}</td>
          <td>${escapeHtml(c.inicio)}</td>
          <td>${escapeHtml(c.fim)}</td>
          <td>${statusBadge(c.status)}</td>
        </tr>
      `
      )
      .join("");

    const body = [
      section({
        title: "Executor e Chaves",
        hint: "RN Art. 3º, V | Rastreabilidade",
        bodyHtml: `
          <div class="grid">
            ${field({ label: "id_executor (PK)", value: t.id_executor, span: 4, badgeText: "Rastreabilidade" })}
            ${field({ label: "id_emenda (FK)", value: t.id_emenda, span: 4, badgeText: "Ligação" })}
            ${field({ label: "nome_executor", value: t.nome_executor, span: 4 })}
            ${field({ label: "dados_conta_especifica", value: t.dados_conta_especifica, span: 12, badgeText: "Controle" })}
          </div>
        `,
      }),
      section({
        title: "Objeto e Finalidade (TAEP 2.3)",
        hint: "RN Art. 3º, III | TAEP 2.3",
        bodyHtml: `
          <div class="grid">
            ${field({ label: "objeto_detalhado", value: t.objeto_detalhado, span: 12 })}
            ${field({ label: "finalidade_politica_publica", value: t.finalidade_politica_publica, span: 12 })}
            ${textarea({ label: "descricao_metas", value: t.descricao_metas, span: 12 })}
          </div>
        `,
      }),
      section({
        title: "Cronograma (TAEP 2.4) e Status",
        hint: "RN Art. 3º, VII | TAEP 2.4/2.5",
        bodyHtml: `
          <div class="grid">
            ${field({ label: "data_inicio_prevista", value: t.data_inicio_prevista, span: 4 })}
            ${field({ label: "data_fim_prevista", value: t.data_fim_prevista, span: 4 })}
            ${field({ label: "status_plano_trabalho", value: t.status_plano_trabalho, span: 4 })}
          </div>
          <div style="height: 10px"></div>
          <div class="table-wrap" aria-label="Cronograma detalhado">
            <table>
              <thead>
                <tr>
                  <th>Etapa</th>
                  <th>Início</th>
                  <th>Término</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${cronogramaRows}
              </tbody>
            </table>
          </div>
        `,
      }),
      `<div class="note">
        <strong>Nota:</strong> esta tela é a “Tabela 2 — EXECUCAO_PLANEJAMENTO”, focada em
        <strong>Objeto, Finalidade, Metas e Cronograma</strong>.
      </div>`,
    ].join("");

    appEl.innerHTML = body;
    setActiveTab("execucao");
  };

  const renderTabela3 = () => {
    const t = data.tabela3_fluxo_financeiro_e_evidencias;
    breadcrumbCurrentEl.textContent = "Tabela 3 — Fluxo Financeiro e Evidências";
    pageTitleEl.textContent = "Fluxo Financeiro e Evidências (Rastreabilidade e Status)";
    pageSubtitleEl.textContent =
      "Rastreia o ciclo completo (empenho → liquidação → pagamento) e status de prestação de contas (RN nº 19/2025 e TAEP 2.5/4.2).";

    const evidRows = (t.evidencias || [])
      .map(
        (e) => `
        <tr>
          <td>${escapeHtml(e.tipo)}</td>
          <td>${escapeHtml(e.descricao)}</td>
          <td>${escapeHtml(e.referencia)}</td>
          <td>${escapeHtml(e.data)}</td>
        </tr>
      `
      )
      .join("");

    const trilhaRows = (t.trilha_financeira || [])
      .map(
        (e) => `
        <tr>
          <td>${escapeHtml(e.data)}</td>
          <td>${escapeHtml(e.evento)}</td>
          <td>${escapeHtml(e.documento)}</td>
          <td>${escapeHtml(fmtMoney(e.valor))}</td>
          <td>${statusBadge(e.situacao)}</td>
        </tr>
      `
      )
      .join("");

    const body = [
      section({
        title: "Chaves e Documentos (Rastreabilidade)",
        hint: "RN Art. 3º, VIII | Rastreabilidade",
        bodyHtml: `
          <div class="grid">
            ${field({ label: "id_rastreabilidade (PK)", value: t.id_rastreabilidade, span: 4, badgeText: "Rastreabilidade" })}
            ${field({ label: "id_emenda (FK)", value: t.id_emenda, span: 4, badgeText: "Ligação" })}
            ${field({ label: "data_ultima_atualizacao", value: t.data_ultima_atualizacao, span: 4, badgeText: "Tempestividade (TAEP 4.2)" })}
            ${field({ label: "numero_empenho", value: t.numero_empenho, span: 4 })}
            ${field({ label: "numero_documento_habil", value: t.numero_documento_habil, span: 4 })}
            ${field({ label: "numero_ordem_pagamento_bancaria", value: t.numero_ordem_pagamento_bancaria, span: 4 })}
          </div>
        `,
      }),
      section({
        title: "Status e Valores (TAEP 2.5)",
        hint: "RN Art. 3º, VIII | TAEP 2.5",
        bodyHtml: `
          <div class="grid">
            ${field({ label: "status_financeiro_atual", value: t.status_financeiro_atual, span: 4 })}
            ${field({ label: "valor_efetivamente_executado", value: fmtMoney(t.valor_efetivamente_executado), span: 4 })}
            ${field({ label: "status_prestacao_contas", value: t.status_prestacao_contas, span: 4 })}
            ${field({ label: "processo_licitatorio_vinculado", value: t.processo_licitatorio_vinculado, span: 6 })}
            ${field({ label: "processo_administrativo", value: t.processo_administrativo, span: 6 })}
          </div>
        `,
      }),
      section({
        title: "Trilha Financeira (Empenho → Liquidação → Pagamento)",
        hint: "Rastreabilidade da despesa",
        bodyHtml: `
          <div class="table-wrap" aria-label="Trilha financeira">
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Evento</th>
                  <th>Documento</th>
                  <th>Valor</th>
                  <th>Situação</th>
                </tr>
              </thead>
              <tbody>
                ${trilhaRows || `<tr><td colspan="5">Sem dados</td></tr>`}
              </tbody>
            </table>
          </div>
        `,
      }),
      section({
        title: "Evidências de Execução",
        hint: "Exemplos de evidências (fictícias)",
        bodyHtml: `
          <div class="table-wrap" aria-label="Evidências">
            <table>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Descrição</th>
                  <th>Referência</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                ${evidRows || `<tr><td colspan="4">Sem evidências</td></tr>`}
              </tbody>
            </table>
          </div>
        `,
      }),
      `<div class="note">
        <strong>Nota:</strong> esta tela é a “Tabela 3 — FLUXO_FINANCEIRO_E_EVIDENCIAS”, focada em
        <strong>Rastreabilidade e Status</strong> (inclui data de atualização para TAEP 4.2).
      </div>`,
    ].join("");

    appEl.innerHTML = body;
    setActiveTab("fluxo");
  };

  const getRoute = () => {
    const hash = String(window.location.hash || "").trim();
    const cleaned = hash.replace(/^#\/?/, "");
    const route = cleaned.split("?")[0].split("#")[0];
    if (route === "execucao") return "execucao";
    if (route === "fluxo") return "fluxo";
    return "emenda";
  };

  const render = () => {
    const route = getRoute();
    renderSummary();
    if (route === "execucao") return renderTabela2();
    if (route === "fluxo") return renderTabela3();
    return renderTabela1();
  };

  const downloadJson = (obj, filename) => {
    const blob = new Blob([JSON.stringify(obj, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const toClipboard = async (text) => {
    if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
    // Fallback
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  };

  btnDownloadJson?.addEventListener("click", () => {
    downloadJson(data, "transparencia-simplificada.json");
  });

  btnCopyJson?.addEventListener("click", async () => {
    try {
      await toClipboard(JSON.stringify(data, null, 2));
      btnCopyJson.textContent = "JSON copiado";
      window.setTimeout(() => (btnCopyJson.textContent = "Copiar JSON"), 1200);
    } catch {
      btnCopyJson.textContent = "Falhou ao copiar";
      window.setTimeout(() => (btnCopyJson.textContent = "Copiar JSON"), 1200);
    }
  });

  window.addEventListener("hashchange", render);
  render();
})();



