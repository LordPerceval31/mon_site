import DarkModeThemeToggle from '../../src/components/common/ui/Button/DarkModThemeToggle';
import { ThemeProvider } from '../../src/contexts/themeContext';
import '../../src/index.css';

describe('Fonctionnalité de mode sombre', () => {
  beforeEach(() => {
    // Nettoyer localStorage avant chaque test
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  it('devrait être possible de cliquer sur le bouton toggle', () => {
    cy.mount(
      <ThemeProvider>
        <div className="p-4">
          <DarkModeThemeToggle />
        </div>
      </ThemeProvider>
    );

    // Vérifier que le bouton existe
    cy.get('[data-cy="theme-toggle"]').should('exist');
    
    // Récupérer l'état initial (peu importe lequel)
    cy.get('[data-cy="theme-toggle"]').invoke('attr', 'aria-pressed').then((initialState) => {
      // Cliquer sur le bouton
      cy.get('[data-cy="theme-toggle"]').click();
      
      // Vérifier que l'état a changé
      const expectedState = initialState === 'true' ? 'false' : 'true';
      cy.get('[data-cy="theme-toggle"]').should('have.attr', 'aria-pressed', expectedState);
      
      // Cliquer à nouveau
      cy.get('[data-cy="theme-toggle"]').click();
      
      // Vérifier retour à l'état initial
      cy.get('[data-cy="theme-toggle"]').should('have.attr', 'aria-pressed', initialState);
    });
  });

  it('devrait conserver le même état après remontage', () => {
    cy.mount(
      <ThemeProvider>
        <div className="p-4">
          <DarkModeThemeToggle />
        </div>
      </ThemeProvider>
    );

    // Cliquer sur le bouton
    cy.get('[data-cy="theme-toggle"]').click();
    
    // Récupérer le mode actuel
    cy.window().then((win) => {
      const currentMode = win.localStorage.getItem('themeMode');
      
      // Remonter le composant
      cy.mount(
        <ThemeProvider>
          <div className="p-4">
            <DarkModeThemeToggle />
          </div>
        </ThemeProvider>
      );
      
      // Vérifier que le mode est préservé
      cy.window().then((win) => {
        expect(win.localStorage.getItem('themeMode')).to.equal(currentMode);
      });
    });
  });
});