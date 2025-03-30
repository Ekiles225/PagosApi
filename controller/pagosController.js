import { ClienteModel } from "../model/ClienteModel.js";
import { PagoModel } from "../model/PagoModel.js";
import { PrestamoModel } from "../model/PrestamoModel.js";
import { Op } from 'sequelize';


export const createPago = async (req, res) => {
    try {
        const { prestamo_id, monto_pagado, fecha_pago } = req.body;

        // Verificar que el préstamo existe
        const prestamo = await PrestamoModel.findByPk(prestamo_id);
        if (!prestamo) {
            return res.status(404).json({ message: "Préstamo no encontrado" });
        }

        // Calcular el total de pagos anteriores
        const totalPagos = await PagoModel.sum('monto_pagado', { where: { prestamo_id } }) || 0;

        // Nuevo saldo restante
        const saldo_restante = parseFloat(prestamo.total_a_pagar) - (totalPagos + parseFloat(monto_pagado));

        if (saldo_restante < 0) {
            return res.status(400).json({ message: "El pago excede el monto total a pagar" });
        }

        // Crear el pago con el saldo restante actualizado
        const nuevoPago = await PagoModel.create({
            prestamo_id,
            monto_pagado,
            fecha_pago,
            saldo_restante
        });

        res.status(201).json({
            mensaje: "Pago registrado con éxito",
            pago: nuevoPago
        });

    } catch (error) {
        console.error("Error al registrar el pago:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getPagos = async (req, res) => {
    try {
        const pagos = await PagoModel.findAll();
        res.status(200).json({ pagos });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const consultarPagos = async (req, res) => {
    try {
        const pagos = await PagoModel.findAll({
            include: {
                model: PrestamoModel,
                include: {
                    model: ClienteModel,
                    attributes: ['nombre', 'dni'] // Solo traemos estos campos
                }
            }
        });

        res.json(pagos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al consultar los pagos' });
    }
};

export const updatePago = async (req, res) => {
    try {
        const pago = await PagoModel.findByPk(req.params.id);
        if (!pago) {
            return res.status(404).json({ message: "Pago no encontrado" });
        }

        const { monto_pagado, fecha_pago } = req.body;

        // Obtener el préstamo asociado al pago
        const prestamo = await PrestamoModel.findByPk(pago.prestamo_id);
        if (!prestamo) {
            return res.status(404).json({ message: "Préstamo no encontrado" });
        }

        // Obtener el total de pagos EXCLUYENDO este pago
        const totalPagosPrevios = await PagoModel.sum('monto_pagado', { 
            where: { 
                prestamo_id: prestamo.id, 
                id: { [Op.ne]: pago.id } // Excluir el pago actual
            }
        }) || 0;

        // Nuevo saldo restante
        const nuevoSaldoRestante = parseFloat(prestamo.total_a_pagar) - (totalPagosPrevios + parseFloat(monto_pagado));

        if (nuevoSaldoRestante < 0) {
            return res.status(400).json({ message: "El nuevo pago excede el total a pagar" });
        }

        // Actualizar el pago con el nuevo saldo restante
        await pago.update({
            monto_pagado,
            fecha_pago,
            saldo_restante: nuevoSaldoRestante
        });

        res.status(200).json({ 
            mensaje: "Pago actualizado con éxito", 
            pago 
        });

    } catch (error) {
        console.error("Error al actualizar el pago:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const deletePago = async (req, res) => {
    try {
        const pago = await PagoModel.findByPk(req.params.id);
        if (!pago) {
            res.status(404).json({ message: "pago not found" });
        }
        await pago.destroy();
        res.status(200).json({ message: "pago deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletePagoNoAsociado = async (req, res) => {
    try {
        const pagos = await PagoModel.findAll({
            where: {
                prestamo_id: null
            }
        });
        if (pagos.length === 0) {
            res.status(404).json({ message: "pagos not found" });
        }
        await PagoModel.destroy({
            where: {
                prestamo_id: null
            }
        });
        res.status(200).json({ message: "pagos deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


