import express from 'express';

import { clientLogin } from '../controllers/login';
import { clientSignup } from '../controllers/signup';
// import { authenticateJWT } from '../middlewares/auth';

const route = express.Router();

// route.post('/login', authenticateJWT, login);
route.post('/client-login', clientLogin);
route.post('/client-signup', clientSignup);

export default route;
