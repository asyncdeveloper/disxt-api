import { Router } from 'express'
import ProductController from '../controllers/ProductController';
import { validate } from '../middlewares/validate';
import { productShowRules } from '../validators/ProductValidator';
import { verifyToken } from '../middlewares/auth';

const router = Router();

router.get('/:id', [ verifyToken ] , productShowRules(), validate,  ProductController.show);
router.get('/', [ verifyToken ], ProductController.all);

export default router;