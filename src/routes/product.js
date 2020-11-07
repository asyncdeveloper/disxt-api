import { Router } from 'express'
import ProductController from '../controllers/ProductController';
import { validate } from '../middlewares/validate';
import { productShowRules } from '../validators/ProductValidator';

const router = Router();

router.get('/:id', productShowRules(), validate,  ProductController.show);
router.get('/',  ProductController.all);

export default router;