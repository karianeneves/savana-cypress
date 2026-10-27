import LoginPage from "../support/pages/LoginPage";
import GerenciamentoPage from "../support/pages/GerenciamentoPage";

describe("Autenticação", () => {
  before(() => cy.garantirUsuario());

  it("CT01 - login com credenciais válidas", () => {
    cy.fixture("usuarios").then(({ valido }) => {
      LoginPage.visitar();
      LoginPage.logar(valido);

      cy.url().should("include", "/gerenciamento");
      GerenciamentoPage.elements.painel().should("be.visible");
      GerenciamentoPage.elements.logout().should("be.visible");
    });
  });
});
