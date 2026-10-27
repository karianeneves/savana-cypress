class CadastroFuncionarioPage {
  elements = {
    cpf: () => cy.get('[data-cy="cadastro-cpf"]'),
    nome: () => cy.get('[data-cy="cadastro-nome"]'),
    email: () => cy.get('[data-cy="cadastro-email"]'),
    senha: () => cy.get('[data-cy="cadastro-senha"]'),
    confirmarSenha: () => cy.get('[data-cy="cadastro-confirmar-senha"]'),
    submit: () => cy.get('[data-cy="cadastro-submit"]'),
    erroCpf: () => cy.get('[data-cy="cadastro-cpf-erro"]'),
    erroSenha: () => cy.get('[data-cy="cadastro-senha-erro"]'),
  };

  visitar() {
    cy.visit("/cadastro/funcionario");
  }

  preencher({ cpf, nome, email, senha, confirmarSenha }) {
    this.elements.cpf().type(cpf);
    this.elements.nome().type(nome);
    this.elements.email().type(email);
    this.elements.senha().type(senha);
    this.elements.confirmarSenha().type(confirmarSenha);
  }

  enviar() {
    this.elements.submit().click();
  }
}

export default new CadastroFuncionarioPage();
