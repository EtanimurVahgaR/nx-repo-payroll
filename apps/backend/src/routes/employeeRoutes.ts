import { Router } from 'express';
import {
  add_new_employee,
  add_test_user,
  get_all_employees,
  getAllAttendance,
  mark_attendance,
  initialize_dummy_attendance,
} from '../controllers/employee';
import { authenticateJWT, authorizeByDesignation } from '../middlewares/auth';

const route = Router();

// Public or admin-only endpoint for initializing dummy attendance
route.post('/initialize-dummy-attendance', initialize_dummy_attendance);

route.post('/add-test-user', add_test_user);

route.use(authenticateJWT);
route.use(authorizeByDesignation(['client']));

route.get('/all', get_all_employees);
route.post('/add-new', add_new_employee);
route.get('/getAttendance', getAllAttendance);
route.post('/:employeeCode/markAttendance', mark_attendance);

export default route;
