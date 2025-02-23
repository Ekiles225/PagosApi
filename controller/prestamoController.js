
import { PrestamoModel } from "../model/PrestamoModel.js";


export const createPrestamo = async (req, res) => {
    try {
        const { monto, tasa_interes, fecha_inicio, fecha_vencimiento, estado, descripcion } = req.body;
        if (!(monto || tasa_interes || fecha_inicio || fecha_vencimiento || estado || descripcion)) {
            res.status(400).json({ message: "all input is required" });
        }
        const prestamo = await PrestamoModel.create({
            monto,
            tasa_interes,
            fecha_inicio,
            fecha_vencimiento,
            estado,
            descripcion,
        });
        res.status(201).json({ prestamo });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPrestamos = async (req, res) => {
    try {
        const prestamos = await PrestamoModel.findAll();
        res.status(200).json({ prestamos });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPrestamoById = async (req, res) => {
    try {
        const prestamo = await PrestamoModel.findByPk(req.params.id);
        if (!prestamo) {
            res.status(404).json({ message: "prestamo not found" });
        }
        res.status(200).json({ prestamo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updatePrestamo = async (req, res) => {
    try {
        const prestamo = await PrestamoModel.findByPk(req.params.id);
        if (!prestamo) {
            res.status(404).json({ message: "prestamo not found" });
        }
        const { monto, tasa_interes, fecha_inicio, fecha_vencimiento, estado, descripcion } = req.body;
        await prestamo.update({
            monto,
            tasa_interes,
            fecha_inicio,
            fecha_vencimiento,
            estado,
            descripcion,
        });
        res.status(200).json({ prestamo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletePrestamo = async (req, res) => {
    try {
        const prestamo = await PrestamoModel.findByPk(req.params.id);
        if (!prestamo) {
            res.status(404).json({ message: "prestamo not found" });
        }
        await prestamo.destroy();
        res.status(200).json({ message: "prestamo deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//un metoto para eliminar pero que no No eliminar si hay pagos asociados
export const deletePrestamoNoAsociado = async (req, res) => {
    try {
        const prestamo = await PrestamoModel.findByPk(req.params.id);
        if (!prestamo) {
            res.status(404).json({ message: "prestamo not found" });
        }
        if (prestamo.estado === 'pagado') {
            res.status(400).json({ message: "prestamo pagado no se puede eliminar" });
        }
        await prestamo.destroy();
        res.status(200).json({ message: "prestamo deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

