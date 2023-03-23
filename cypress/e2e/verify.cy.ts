describe('Verify', () => {
  const email = 'test@snapshot.org';
  const signature = '0x0000';
  const address = '0x1111';

  beforeEach(() => {
    cy.visit(`verify?address=${address}&signature=${signature}&email=${email}`);
  });

  it('shows the verify email button', () => {
    cy.get('button').contains('Verify email');
  });

  it('sends the correct request body to the backend API', () => {
    cy.intercept('POST', Cypress.env('VITE_API_URL'), { statusCode: 200 }).as('verify');
    cy.get('button').click();

    cy.get('@verify').its('request.body').should('deep.equal', {
      method: 'snapshot.verify',
      params: {
        email,
        address,
        signature
      }
    });
  });

  it('shows the success message when the email is verified', () => {
    cy.intercept('POST', Cypress.env('VITE_API_URL'), { statusCode: 200 });
    cy.get('button').click();
    cy.get('p').contains('verified');
    cy.get('button').contains('Go back to Snapshot');
  });

  it('shows an error message when the verify request is failing', () => {
    cy.intercept('POST', Cypress.env('VITE_API_URL'), { statusCode: 500 });
    cy.get('button').click();
    cy.get('p').contains('error');
    cy.get('button').contains('Verify email');
  });
});