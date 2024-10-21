describe('Card Payment Service Contract', () => {
    before(() => {
      cy.task('createPactProvider');
      cy.task('startPactProvider');
    });
  
    it('should process card payment', () => {
      cy.task('addInteraction', {
        state: 'a payment can be processed',
        uponReceiving: 'a request to process payment',
        withRequest: {
          method: 'POST',
          path: '/api/payments',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Connection': 'keep-alive',
          },
          body: {
            orderId: '1234567890',
            amount: '99.99',
            cardNumber: '4111111111111111',
            expiryDate: '12/25',
            cvv: '123'
          },
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: {
            status: 'SUCCESS'
          },
        },
      });
  
      cy.request({
        method: 'POST',
        url: 'http://localhost:8282/api/payments',
        headers: { 'Content-Type': 'application/json' },
        body: {
          orderId: '1234567890',
          amount: '99.99',
          cardNumber: '4111111111111111',
          expiryDate: '12/25',
          cvv: '123',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.eq('SUCCESS');
      });
    });
  
    afterEach(() => {
      cy.task('verifyPact');
    });
  
    after(() => {
      cy.task('finalizePact');
    });
  });