import express from 'express';

import { login } from '../controllers/login';

const route = express.Router();

route.post('/auth/login', login);

export default route;
