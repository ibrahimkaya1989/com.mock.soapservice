const express = require('express');
const soap = require('soap');

const app = express();
const port = 3000;

const service = {
  YourSoapService: {
    YourSoapPort: {
      YourSoapMethod: function (args, callback) {
        const result = {
          response: 'Mock SOAP service response',
          data: args
        };
        callback(null, result);
      }
    }
  }
};

// Define the WSDL content
const wsdl = `
<definitions xmlns="http://schemas.xmlsoap.org/wsdl/"
             xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
             targetNamespace="http://www.example.com/your-soap-service"
             xmlns:tns="http://www.example.com/your-soap-service">

  <!-- Your WSDL content goes here -->

</definitions>
`;

app.use(express.text({ type: 'text/xml' }));

// Specify the correct path in soap.listen
app.post('/YourSoapService', (req, res) => {
  soap.listen(req, res, service, wsdl);
});

app.listen(port, () => {
  console.log(`Mock SOAP service listening at http://localhost:${port}/YourSoapService?wsdl`);
});
