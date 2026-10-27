import LoginPage from "./pages/LoginPage";
import { apiUrl } from "./api";

// 1) Garante que o usuário de teste existe (se já existir, ignora o erro)
Cypress.Commands.add("garantirUsuario", () => {
  cy.fixture("usuarios").then(({ valido }) => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/users`,
      body: {
        name: valido.nome,
        cpf: valido.cpf,
        email: valido.email,
        password: valido.senha,
      },
      failOnStatusCode: false,
    });
  });
});

// 2) Login pela interface, guardado em sessão para não repetir em todo teste
Cypress.Commands.add("login", () => {
  cy.fixture("usuarios").then(({ valido }) => {
    cy.session(valido.email, () => {
      LoginPage.visitar();
      LoginPage.logar(valido);
      cy.url().should("include", "/gerenciamento");
    });
  });
});

// 3) Espia os window.alert da aplicação (alias @alerta)
Cypress.Commands.add("espiarAlerta", () => {
  const alerta = cy.stub().as("alerta");
  cy.on("window:alert", alerta);
});

// Nome único para não colidir com dados criados em execuções anteriores
Cypress.Commands.add("nomeUnico", (base) => `${base} ${Date.now()}`);
