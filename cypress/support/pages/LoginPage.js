class LoginPage {
  elements = {
    form: () => cy.get('[data-cy="login-form"]'),
    email: () => cy.get('[data-cy="login-email"]'),
    senha: () => cy.get('[data-cy="login-senha"]'),
    submit: () => cy.get('[data-cy="login-submit"]'),
  };

  visitar() {
    cy.visit("/login");
  }

  preencher({ email, senha }) {
    this.elements.email().type(email);
    this.elements.senha().type(senha, { log: false });
  }

  entrar() {
    this.elements.submit().click();
  }

  logar(credenciais) {
    this.preencher(credenciais);
    this.entrar();
  }
}

export default new LoginPage();
