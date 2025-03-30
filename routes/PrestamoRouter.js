import express from 'express';
import { crearPrestamo, getPrestamos, getPrestamosYClientes, updatePrestamo, deletePrestamo, deletePrestamoNoAsociado } from '../controller/prestamoController.js';
const rotuer = express.Router();

rotuer.post('/prestamo', crearPrestamo);
rotuer.get('/prestamo', getPrestamos);
rotuer.get('/prestamos', getPrestamosYClientes);
rotuer.put('/prestamo/:id', updatePrestamo);
rotuer.delete('/prestamo/:id', deletePrestamo);
rotuer.delete('/prestamo', deletePrestamoNoAsociado);



export default rotuer;