class AdocaoPage {
  elements = {
    itens: () => cy.get('[data-cy="pet-item"]'),
    itemComNome: (nome) => cy.contains('[data-cy="pet-item"]', nome),
  };

  visitar() {
    cy.visit("/adocao");
  }
}

export default new AdocaoPage();
