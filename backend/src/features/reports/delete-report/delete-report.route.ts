import { Router } from 'express';
import { auth } from '../../../shared/middleware/auth.middleware'
import { validate } from '../../../shared/middleware/validate.middleware'
import { deleteReportController } from './delete-report.controller';

const router = Router();
router.delete('/:id', auth, deleteReportController);
export default router;