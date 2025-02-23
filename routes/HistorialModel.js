import { Router } from 'express';
const router = Router();

import { createHistorial, getHistoriales } from '../controller/historialController.js';

router.post('/historial', createHistorial);
router.get('/historial', getHistoriales);

export default router;