import { Router } from 'express';
import { searchReportsController } from './search-reports.controller';

const router = Router();
router.get('/search', searchReportsController); // public, no auth
export default router;