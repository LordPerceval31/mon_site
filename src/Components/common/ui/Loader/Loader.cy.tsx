// src/components/ui/Loader/Loader.cy.tsx

import { Loader } from './Loader';


describe('Loader Component', () => {
  it('renders the loader with default props', () => {
    cy.mount(<Loader />);
    cy.get('[role="status"]').should('exist');
    cy.get('[role="status"]').should('have.class', 'animate-spin');
    cy.get('svg').should('have.class', 'h-5');
    cy.get('svg').should('have.class', 'w-5');
    cy.get('svg').should('have.class', 'text-primary');
  });

  it('renders the loader with small size', () => {
    cy.mount(<Loader size="sm" />);
    cy.get('svg').should('have.class', 'h-4');
    cy.get('svg').should('have.class', 'w-4');
  });

  it('renders the loader with large size', () => {
    cy.mount(<Loader size="lg" />);
    cy.get('svg').should('have.class', 'h-6');
    cy.get('svg').should('have.class', 'w-6');
  });

  it('renders the loader with white color', () => {
    cy.mount(<Loader color="white" />);
    cy.get('svg').should('have.class', 'text-white');
  });

  it('renders the loader with custom className', () => {
    cy.mount(<Loader className="test-class" />);
    cy.get('[role="status"]').should('have.class', 'test-class');
  });

  it('has the correct accessibility attributes', () => {
    cy.mount(<Loader />);
    cy.get('[role="status"]').should('have.attr', 'role', 'status');
    cy.get('[role="status"]').should('have.attr', 'aria-label', 'Chargement');
    cy.get('.sr-only').should('have.text', 'Chargement...');
  });
});