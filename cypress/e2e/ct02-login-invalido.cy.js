import LoginPage from "../support/pages/LoginPage";
import GerenciamentoPage from "../support/pages/GerenciamentoPage";

describe("Autenticação", () => {
  before(() => cy.garantirUsuario());

  it("CT02 - login com senha incorreta", () => {
    cy.fixture("usuarios").then(({ valido, senhaIncorreta }) => {
      cy.espiarAlerta();

      LoginPage.visitar();
      LoginPage.logar({ email: valido.email, senha: senhaIncorreta });

      cy.get("@alerta").should("have.been.called");
      cy.url().should("include", "/login");
      LoginPage.elements.form().should("be.visible");
      GerenciamentoPage.elements.logout().should("not.exist");
    });
  });
});
