import { PagoModel } from "../model/PagoModel.js";

export const createPago = async (req, res) => {
    try {
        const { monto_pagado,fecha_pago, saldo_restante, prestamo_id } = req.body;
        if (!(monto_pagado ||fecha_pago  || saldo_restante || prestamo_id)) {
            res.status(400).json({ message: "all input is required" });
        }
        const pago = await PagoModel.create({
            monto_pagado,
            fecha_pago,
            saldo_restante,
            prestamo_id
        });
        res.status(201).json({ pago });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPagos = async (req, res) => {
    try {
        const pagos = await PagoModel.findAll();
        res.status(200).json({ pagos });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPagoById = async (req, res) => {
    try {
        const pago = await PagoModel.findByPk(req.params.id);
        if (!pago) {
            res.status(404).json({ message: "pago not found" });
        }
        res.status(200).json({ pago });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updatePago = async (req, res) => {
    try {
        const pago = await PagoModel.findByPk(req.params.id);
        if (!pago) {
            res.status(404).json({ message: "pago not found" });
        }
        const { monto_pagado, fecha_pago, saldo_restante } = req.body;
        await pago.update({
            monto_pagado,
            fecha_pago,
            saldo_restante
        });
        res.status(200).json({ pago });
    } catch (error) {
        res.status(500).json({ message: error.message });
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


