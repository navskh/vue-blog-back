const swaggerUi = require('swagger-ui-express');
const { Router } = require('express');
const { loginDocument } = require('./admin-login.js');

const router = Router();

router.use(
	'/docs/login',
	swaggerUi.serveFiles(loginDocument),
	swaggerUi.setup(loginDocument),
);

module.exports = router;