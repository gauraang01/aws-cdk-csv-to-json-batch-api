const auth = require('basic-auth');
function checkCredentials(req, res, next) {
    const credentials = auth(req);
    if (!credentials) {
      res.status(401).send('Credentials are required');
      return;
    }
  
    const users = {
      'gauraang': 'sharma',
      'USERNAME2': 'PASSWORD2',
      // Add more users here
    };
  
    const user = users[credentials.name];
    if (!user || user !== credentials.pass) {
      res.status(401).send('Invalid credentials');
      return;
    }
  
    next();
}

module.exports = checkCredentials;