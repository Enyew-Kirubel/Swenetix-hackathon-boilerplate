import { Router } from 'express';
import { auth } from '../../middleware/auth.middleware';
import { deleteReportController } from './delete-report.controller';

const router = Router();
router.delete('/:id', auth, deleteReportController);
export default router;