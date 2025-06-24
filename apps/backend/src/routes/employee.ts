import { Router } from 'express';
import { add_test_user, get_all_employees } from '../controllers/employee';

const route = Router();
route.post('/add-test-user', add_test_user);
route.get('/all', get_all_employees);

export default route;
