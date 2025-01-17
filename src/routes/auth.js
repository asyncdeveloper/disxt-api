import { Router } from 'express'
import AuthController from '../controllers/AuthController';
import { userLoginRules, userRegistrationRules } from '../validators/UserValidator';
import { validate } from '../middlewares/validate';

const router = Router();

router.post('/register', userRegistrationRules(), validate, AuthController.register);
router.post('/login', userLoginRules(), validate, AuthController.login);

export default router;