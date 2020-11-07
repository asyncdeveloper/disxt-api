import { Router } from 'express'
import AuthController from '../controllers/AuthController';
import { userRegistrationRules } from '../validators/UserValidator';
import { validate } from '../middlewares/validate';

const router = Router();

router.post('/register', userRegistrationRules(), validate, AuthController.register);

export default router;