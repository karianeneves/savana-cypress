import CadastroAnimalPage from "../support/pages/CadastroAnimalPage";
import AdocaoPage from "../support/pages/AdocaoPage";
import { apiUrl } from "../support/api";

describe("Animais", () => {
  beforeEach(() => {
    cy.garantirUsuario();
    cy.login();
  });

  it("CT04 - cadastrar um animal e vê-lo na adoção", () => {
    cy.fixture("animal").then((animal) => {
      cy.fixture("mensagens").then((msg) => {
        cy.nomeUnico(animal.nome).then((nome) => {
          cy.espiarAlerta();
          // Espia (sem stub) a chamada real: espera pela requisição, não por tempo
          cy.intercept("POST", `${apiUrl}/pets`).as("criarPet");

          CadastroAnimalPage.visitar();
          CadastroAnimalPage.preencher({ ...animal, nome });
          CadastroAnimalPage.enviar();

          cy.wait("@criarPet").its("response.statusCode").should("be.oneOf", [200, 201]);
          cy.get("@alerta").should("have.been.calledWith", msg.animalCadastrado);
          cy.url().should("include", "/adocao");
          AdocaoPage.elements.itemComNome(nome).should("be.visible");
        });
      });
    });
  });
});
