class CardapioPage {
  elements = {
    itens: () => cy.get('[data-cy="menu-item"]'),
    itemComNome: (nome) => cy.contains('[data-cy="menu-item"]', nome),
  };

  visitar() {
    cy.visit("/cardapio");
  }
}

export default new CardapioPage();
