import { Router } from 'express';
import {
  add_new_employee,
  add_test_user,
  get_all_employees,
  mark_attendance,
} from '../controllers/employee';
import { authenticateJWT } from '../middlewares/auth';

const route = Router();

route.post('/add-test-user', add_test_user);

route.use(authenticateJWT);
route.get('/all', authenticateJWT, get_all_employees);
route.post('/add-new', add_new_employee);

<<<<<<< HEAD:apps/backend/src/routes/employeeRoutes.ts
=======
route.post('/:employeeCode/markAttendance', mark_attendance); 


>>>>>>> authentication:apps/backend/src/routes/employee.ts
export default route;
