const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const authController = require('../controllers/auth');

router.post('/login', asyncHandler(authController.login));

module.exports = router;



// client app (id, secret, platform) => authentication token => (header: authentication) login => (header: accessToken) request data endPoint 
// clientId = 1 , plaform: web, token = '11111' => web
// route: getAuthenticationToken => header: { token: '11111' }, body: { clinetId: 1 } => authenticationToken = 'jksfgkjsdfbsjkdfbjk'
// route: Login => header: { token: authenticationToken }, body: { username: 'a', password: '123456' } => accessToken = 'aaaaaaaaaaaa'
// route: Profile => header: { authorization: accessToken }, ....