class CadastroAnimalPage {
  elements = {
    nome: () => cy.get('[data-cy="animal-nome"]'),
    especie: () => cy.get('[data-cy="animal-especie"]'),
    sexo: () => cy.get('[data-cy="animal-sexo"]'),
    idade: () => cy.get('[data-cy="animal-idade"]'),
    raca: () => cy.get('[data-cy="animal-raca"]'),
    historia: () => cy.get('[data-cy="animal-historia"]'),
    submit: () => cy.get('[data-cy="animal-submit"]'),
  };

  visitar() {
    cy.visit("/cadastro/animal");
  }

  preencher({ nome, especie, sexo, idade, raca, historia }) {
    this.elements.nome().type(nome);
    this.elements.especie().type(especie);
    this.elements.sexo().type(sexo);
    this.elements.idade().type(idade);
    this.elements.raca().type(raca);
    this.elements.historia().type(historia);
  }

  enviar() {
    this.elements.submit().click();
  }
}

export default new CadastroAnimalPage();
