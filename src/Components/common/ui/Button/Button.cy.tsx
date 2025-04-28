
import { Button } from './Button';


describe('Button Component', () => {
  it('renders the button with default props', () => {
    cy.mount(<Button>Click me</Button>);
    cy.get('button').should('have.text', 'Click me');
    cy.get('button').should('have.class', 'bg-primary');
    cy.get('button').should('have.class', 'h-10');
  });

  it('renders the button with different variants', () => {
    cy.mount(<Button variant="destructive">Destructive</Button>);
    cy.get('button').should('have.class', 'bg-destructive');

    cy.mount(<Button variant="outline">Outline</Button>);
    cy.get('button').should('have.class', 'border');
    cy.get('button').should('have.class', 'border-input');

    cy.mount(<Button variant="secondary">Secondary</Button>);
    cy.get('button').should('have.class', 'bg-secondary');

    cy.mount(<Button variant="ghost">Ghost</Button>);
    cy.get('button').should('have.class', 'hover:bg-accent');

    cy.mount(<Button variant="link">Link</Button>);
    cy.get('button').should('have.class', 'underline-offset-4');
  });

  it('renders the button with different sizes', () => {
    cy.mount(<Button size="sm">Small</Button>);
    cy.get('button').should('have.class', 'h-9');

    cy.mount(<Button size="lg">Large</Button>);
    cy.get('button').should('have.class', 'h-11');

    cy.mount(<Button size="icon">Icon</Button>);
    cy.get('button').should('have.class', 'h-10');
    cy.get('button').should('have.class', 'w-10');
  });

  it('renders the button with loading state', () => {
    cy.mount(<Button isLoading>Loading</Button>);
    cy.get('button').should('be.disabled');
    cy.get('button').find('[role="status"]').should('exist');
    cy.get('button').find('svg').should('exist');
    cy.get('button').contains('Loading');
  });

  it('renders the button with left icon', () => {
    const leftIcon = <span data-testid="left-icon">👈</span>;
    cy.mount(<Button leftIcon={leftIcon}>Left Icon</Button>);
    cy.get('button').find('[data-testid="left-icon"]').should('exist');
    cy.get('button').contains('Left Icon');
  });

  it('renders the button with right icon', () => {
    const rightIcon = <span data-testid="right-icon">👉</span>;
    cy.mount(<Button rightIcon={rightIcon}>Right Icon</Button>);
    cy.get('button').find('[data-testid="right-icon"]').should('exist');
    cy.get('button').contains('Right Icon');
  });

  it('renders the button with full width', () => {
    cy.mount(<Button fullWidth>Full Width</Button>);
    cy.get('button').should('have.class', 'w-full');
  });

  it('can be disabled', () => {
    cy.mount(<Button disabled>Disabled</Button>);
    cy.get('button').should('be.disabled');
  });

  it('handles click events', () => {
    const onClick = cy.stub().as('clickHandler');
    cy.mount(<Button onClick={onClick}>Click me</Button>);
    cy.get('button').click();
    cy.get('@clickHandler').should('have.been.calledOnce');
  });

  it('does not call click handler when disabled', () => {
    const onClick = cy.stub().as('clickHandler');
    cy.mount(<Button disabled onClick={onClick}>Click me</Button>);
    cy.get('button').click({ force: true });
    cy.get('@clickHandler').should('not.have.been.called');
  });

  it('does not call click handler when loading', () => {
    const onClick = cy.stub().as('clickHandler');
    cy.mount(<Button isLoading onClick={onClick}>Click me</Button>);
    cy.get('button').click({ force: true });
    cy.get('@clickHandler').should('not.have.been.called');
  });
});