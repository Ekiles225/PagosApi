import express from 'express';
import { createPrestamo, getPrestamos, getPrestamoById, updatePrestamo, deletePrestamo, deletePrestamoNoAsociado } from '../controller/prestamoController.js';
const rotuer = express.Router();

rotuer.post('/prestamo', createPrestamo);
rotuer.get('/prestamo', getPrestamos);
rotuer.get('/prestamo/:id', getPrestamoById);
rotuer.put('/prestamo/:id', updatePrestamo);
rotuer.delete('/prestamo/:id', deletePrestamo);
rotuer.delete('/prestamo', deletePrestamoNoAsociado);

export default rotuer;