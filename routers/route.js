import { Router } from 'express'
import { AuthController } from '../controller/AuthController.js';

const router = Router()

router.get('/register', AuthController.register);
router.get('/login', AuthController.login);

export default router;