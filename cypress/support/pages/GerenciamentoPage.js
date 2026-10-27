class GerenciamentoPage {
  elements = {
    painel: () => cy.get('[data-cy="gerenciamento"]'),
    logout: () => cy.get('[data-cy="btn-logout"]'),
  };
}

export default new GerenciamentoPage();
