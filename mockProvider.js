const express = require('express');
const app = express();
app.use(express.json());

app.use((req, res, next) => {
    if (req.headers['X-Pact-State']) {
      switch(req.headers['X-Pact-State']) {
        case 'a payment can be processed':
          // Mocking database entry
          app.locals.db = {
            userAccount: {
              isActive: true,
              balance: 5000
            }
          };
          console.log("Database adjusted for payment processing");
          break;
        default:
          console.log("State not recognized");
          break;
      }
    }
    next();
});

// Payment processing endpoint
app.post('/api/payments', (req, res) => {
    res.status(200).send({
        status: 'SUCCESS'
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Mock provider running on http://localhost:3000');
});