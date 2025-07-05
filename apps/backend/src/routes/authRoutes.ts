import express from 'express';

import { clientLogin } from '../controllers/login';
import { clientSignup } from '../controllers/signup';
import {
  authenticateJWT,
  authorizeByDesignation,
  checkToken,
} from '../middlewares/auth';
// import { authenticateJWT } from '../middlewares/auth';

const route = express.Router();

// route.post('/login', authenticateJWT, login);
route.post('/client-login', clientLogin);
route.post('/client-signup', clientSignup);
route.post(
  '/test-token',
  authenticateJWT,
  authorizeByDesignation(['client']),
  checkToken
);
export default route;
