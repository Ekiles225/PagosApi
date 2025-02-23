import { Router } from 'express';
const router = Router();

import { createPago, getPagos, getPagoById, updatePago, deletePago, deletePagoNoAsociado} from '../controller/pagosController.js';

router.post('/pago', createPago);
router.get('/pago', getPagos);
router.get('/pago/:id', getPagoById);
router.put('/pago/:id', updatePago);
router.delete('/pago/:id', deletePago);
router.delete('/pago', deletePagoNoAsociado);


export default router;