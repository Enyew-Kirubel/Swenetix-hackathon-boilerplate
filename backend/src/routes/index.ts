import { Router } from 'express';
import updateReportRoute from '../features/update-report/update-report.route';
import deleteReportRoute from '../features/delete-report/delete-report.route';

const router = Router();
router.use('/items', updateReportRoute);
router.use('/items', deleteReportRoute);
export default router;