import LoginPage from "../support/pages/LoginPage";
import AdocaoPage from "../support/pages/AdocaoPage";
import { apiUrl } from "../support/api";

const CORS = { "access-control-allow-origin": "http://localhost:3001" };

describe("Cenários com stub de API (sem depender do backend real)", () => {
  it("CT06 - [sucesso] adoção lista os pets devolvidos pela API stubada", () => {
    cy.intercept("GET", `${apiUrl}/pets`, {
      fixture: "pets-lista.json",
      headers: CORS,
    }).as("listarPets");

    AdocaoPage.visitar();
    cy.wait("@listarPets");

    AdocaoPage.elements.itens().should("have.length", 2);
    AdocaoPage.elements.itemComNome("Thor").should("be.visible");
    AdocaoPage.elements.itemComNome("Mia").should("be.visible");
  });

  it("CT07 - [falha] API de login responde 401 e a tela mostra o erro", () => {
    cy.fixture("usuarios").then(({ valido }) => {
      cy.fixture("mensagens").then((msg) => {
        cy.espiarAlerta();
        cy.intercept("POST", `${apiUrl}/auth/login`, {
          statusCode: 401,
          body: { message: "Unauthorized" },
          headers: CORS,
        }).as("loginFalha");

        LoginPage.visitar();
        LoginPage.logar(valido);
        cy.wait("@loginFalha");

        cy.get("@alerta").should("have.been.calledWith", msg.loginInvalido);
        cy.url().should("include", "/login");
        cy.window().its("localStorage.token").should("not.exist");
      });
    });
  });
});
