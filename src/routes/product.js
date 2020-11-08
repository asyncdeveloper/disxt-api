import { Router } from 'express'
import ProductController from '../controllers/ProductController';
import { validate } from '../middlewares/validate';
import { productCreateRules, productShowRules } from '../validators/ProductValidator';
import { verifyToken } from '../middlewares/auth';
import { isAdmin } from '../middlewares/access';

const router = Router();

router.get('/:id', [ verifyToken ] , productShowRules(), validate,  ProductController.show);
router.get('/', [ verifyToken ], ProductController.all);
router.post('/', [ verifyToken, isAdmin ], productCreateRules(), validate, ProductController.create);
router.delete('/:id', [ verifyToken, isAdmin ], productShowRules(), validate, ProductController.delete);

export default router;