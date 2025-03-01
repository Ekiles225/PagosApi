import { Router } from 'express';
const router = Router();

import { createCliente, getClientes, filtrarClientes, updateCliente, deleteCliente } from '../controller/clienteController.js';

router.post('/cliente', createCliente);
router.get('/cliente', getClientes);
router.put('/cliente/:id', updateCliente);
router.delete('/cliente/:id', deleteCliente);
router.get('/cliente/filtrar', filtrarClientes);


export default router;
