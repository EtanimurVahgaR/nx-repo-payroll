import { Router } from 'express';
import {
  add_new_employee,
  add_test_user,
  get_all_employees,
} from '../controllers/employee';
import { authenticateJWT } from '../middlewares/auth';

const route = Router();

route.post('/add-test-user', add_test_user);

route.use(authenticateJWT);
route.get('/all', authenticateJWT, get_all_employees);
route.post('/add-new', add_new_employee);

export default route;
