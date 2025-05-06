import { ResponsiveSizeTestComponent } from "./responsiveSizeTestComponent";


describe("Tests de responsiveSize", () => {

    it('devrait retourner "mobile" pour un format mobile', () => {
        
        cy.viewport(390, 844);
        cy.mount(<ResponsiveSizeTestComponent />);
        cy.get('[data-testid="screen-size"]').should('have.text', 'mobile');
    })
    
    it('devrait retourner "tablette" pour un format tablette', () => {
        cy.viewport(600, 800);        
        cy.mount(<ResponsiveSizeTestComponent />);        
        cy.get('[data-testid="screen-size"]').should('have.text', 'tablet');        
    })

    it('devrait retourner "laptop" pour un format laptop', () => {
        cy.viewport(1024, 768);        
        cy.mount(<ResponsiveSizeTestComponent />);        
        cy.get('[data-testid="screen-size"]').should('have.text', 'laptop');        
    })

    it('devrait retourner "desktop" pour un format FHD', () => {
        cy.viewport(1600, 900);        
        cy.mount(<ResponsiveSizeTestComponent />);        
        cy.get('[data-testid="screen-size"]').should('have.text', 'desktop');
    })

    it('devrait retourner "2K" pour un format QHD', () => {
        cy.viewport(2240, 1260);        
        cy.mount(<ResponsiveSizeTestComponent />);        
        cy.get('[data-testid="screen-size"]').should('have.text', '2K');
    })

    it('devrait retourner "UltraWide" pour un format 21/9', () => {
        cy.viewport(3000, 1080);        
        cy.mount(<ResponsiveSizeTestComponent />);        
        cy.get('[data-testid="screen-size"]').should('have.text', 'ultrawide');
    })

    it('devrait retourner "4K" pour un format UHD', () => {
        cy.viewport(3840, 2160);        
        cy.mount(<ResponsiveSizeTestComponent />);        
        cy.get('[data-testid="screen-size"]').should('have.text', '4k');
    })

})