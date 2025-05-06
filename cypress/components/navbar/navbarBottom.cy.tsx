import NavbarBottom from "../../../src/Components/Navbar/NavbarBottom";
import { ThemeProvider } from "../../../src/contexts/themeContext";

describe("Tests de responsive pour NavbarBottom", () => {
  it("devrait s'adapter aux différentes tailles d'écran", () => {
    // Test en mode mobile
    cy.viewport(390, 844);
    cy.mount(
      <ThemeProvider>
        <NavbarBottom />
      </ThemeProvider>
    );
    cy.get('[data-cy="navbar-bottom"]')
      .should("be.visible")
      .should("have.class", "w-[20rem]");

    // Test en mode tablette
    cy.viewport(767, 1024);
    cy.mount(
      <ThemeProvider>
        <NavbarBottom />
      </ThemeProvider>
    );
    cy.get('[data-cy="navbar-bottom"]').should("have.class", "w-[32rem]");

    // Test en mode laptop
    cy.viewport(768, 1366);
    cy.mount(
      <ThemeProvider>
        <NavbarBottom />
      </ThemeProvider>
    );
    cy.get('[data-cy="navbar-bottom"]').should("have.class", "w-[40rem]");

    // Test en mode desktop
    cy.viewport(1080, 1920);
    cy.mount(
      <ThemeProvider>
        <NavbarBottom />
      </ThemeProvider>
    );
    cy.get('[data-cy="navbar-bottom"]').should("have.class", "w-[40rem]");

    // Test en mode 2K
    cy.viewport(2560, 1440);
    cy.mount(
      <ThemeProvider>
        <NavbarBottom />
      </ThemeProvider>
    );
    cy.get('[data-cy="navbar-bottom"]').should("have.class", "w-[40rem]");

    // Test en mode UltraWide
    cy.viewport(3440, 1440);
    cy.mount(
      <ThemeProvider>
        <NavbarBottom />
      </ThemeProvider>
    );
    cy.get('[data-cy="navbar-bottom"]').should("have.class", "w-[40rem]");

    // Test en mode 4K
    cy.viewport(3840, 2160);
    cy.mount(
      <ThemeProvider>
        <NavbarBottom />
      </ThemeProvider>
    );
    cy.get('[data-cy="navbar-bottom"]').should("have.class", "w-[40rem]");


  });
});
