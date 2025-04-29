/// <reference types="cypress" />

describe('Fonctionnalité de mode sombre', () => {
  beforeEach(() => {
    // Avant chaque test, on visite la page d'accueil
    cy.visit('/');
  });

  it('devrait être possible de cliquer sur le bouton toggle', () => {
    // Vérifier que le bouton toggle existe
    cy.get('[data-cy="theme-toggle"]').should('exist');
    
    // Cliquer sur le bouton toggle
    cy.get('[data-cy="theme-toggle"]').click();
    
    // Vérifier que le bouton est toujours accessible après le clic
    cy.get('[data-cy="theme-toggle"]').should('exist');
    
    // Cliquer à nouveau pour revenir à l'état initial
    cy.get('[data-cy="theme-toggle"]').click();
  });

  it('devrait conserver le même état après avoir cliqué puis rafraîchi la page', () => {
    // Cliquer sur le bouton toggle pour changer le mode
    cy.get('[data-cy="theme-toggle"]').click();
    
    // Mémoriser l'apparence visuelle de la page (couleur de fond par exemple)
    // On pourrait utiliser un sélecteur spécifique à votre application
    cy.get('body').invoke('css', 'background-color').then((color1) => {
      
      // Rafraîchir la page
      cy.reload();
      
      // Vérifier que l'apparence est préservée après le rafraîchissement
      cy.get('body').invoke('css', 'background-color').should((color2) => {
        expect(color1).to.eq(color2);
      });
    });
  });
});