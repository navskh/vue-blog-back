import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';
import { loginDocument } from './admin-login.js';

const router = Router();

router.use(
	'/docs/login',
	swaggerUi.serveFiles(loginDocument),
	swaggerUi.setup(loginDocument),
);

export default router;
