const https = require('https');

const data = JSON.stringify({
  access_key: '1bab50be-b9e1-496b-97cc-7a6120d084ef',
  subject: 'Test Subject',
  message: 'Test Message from script',
  from_name: 'RGS Constructor System'
});

const req = https.request('https://api.web3forms.com/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('Response Body:', body);
  });
});

req.on('error', (e) => {
  console.error('Request Error:', e);
});

req.write(data);
req.end();
