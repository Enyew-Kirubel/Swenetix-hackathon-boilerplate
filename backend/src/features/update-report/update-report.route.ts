import { Router } from 'express';
import { auth } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { updateReportSchema } from './update-report.validator';
import { updateReportController } from './update-report.controller';

const router = Router();
router.patch('/:id', auth, validate(updateReportSchema), updateReportController);
export default router;
