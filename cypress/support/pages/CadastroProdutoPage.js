class CadastroProdutoPage {
  elements = {
    nome: () => cy.get('[data-cy="produto-nome"]'),
    descricao: () => cy.get('[data-cy="produto-descricao"]'),
    preco: () => cy.get('[data-cy="produto-preco"]'),
    categoria: () => cy.get('[data-cy="produto-categoria"]'),
    submit: () => cy.get('[data-cy="produto-submit"]'),
  };

  visitar() {
    cy.visit("/cadastro/produto");
  }

  preencher({ nome, descricao, preco, categoria }) {
    this.elements.nome().type(nome);
    this.elements.descricao().type(descricao);
    this.elements.preco().type(preco);
    this.elements.categoria().type(categoria);
  }

  enviar() {
    this.elements.submit().click();
  }
}

export default new CadastroProdutoPage();
