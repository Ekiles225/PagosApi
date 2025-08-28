
import { PrestamoModel } from "../model/PrestamoModel.js";
import { ClienteModel } from "../model/ClienteModel.js";


export const crearPrestamo = async (req, res) => {
    try {
        const { cliente_id, monto, tasa_interes, fecha_inicio, fecha_vencimiento, estado, descripcion } = req.body;

        console.log("Datos recibidos:", { cliente_id, monto, tasa_interes, fecha_inicio, fecha_vencimiento, estado, descripcion });

        if (!cliente_id || !monto || !tasa_interes || !fecha_inicio || !fecha_vencimiento) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        }

        const total_a_pagar = parseFloat(monto) + (parseFloat(monto) * parseFloat(tasa_interes) / 100);

        const nuevoPrestamo = await PrestamoModel.create({
            cliente_id,
            monto,
            tasa_interes,
            fecha_inicio,
            fecha_vencimiento,
            estado,
            descripcion,
            total_a_pagar
        });

        res.status(201).json({
            mensaje: "Préstamo registrado con éxito",
            prestamo: nuevoPrestamo
        });

    } catch (error) {
        console.error("Error al registrar el préstamo:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
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

//metodo para obtener los prestamos y los clientes 
export const getPrestamosYClientes = async (req, res) => {
    try {
        const prestamos = await PrestamoModel.findAll({ include: [{ model: ClienteModel }] });
        res.status(200).json({ prestamos });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPrestamosClientes = async (req, res) => {
    try {
        const prestamos = await PrestamoModel.findAll({ include: 'cliente' });
        res.status(200).json({ prestamos });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const updatePrestamo = async (req, res) => {
    try {
        const prestamo = await PrestamoModel.findByPk(req.params.id);
        if (!prestamo) {
            return res.status(404).json({ message: "Préstamo no encontrado" });
        }

        const { monto, tasa_interes, fecha_inicio, fecha_vencimiento, estado, descripcion } = req.body;

        // Recalcular total_a_pagar si se cambia el monto o la tasa de interés
        const total_a_pagar = parseFloat(monto) + (parseFloat(monto) * parseFloat(tasa_interes) / 100);

        await prestamo.update({
            monto,
            tasa_interes,
            fecha_inicio,
            fecha_vencimiento,
            estado,
            descripcion,
            total_a_pagar // Se actualiza el total
        });

        res.status(200).json({ mensaje: "Préstamo actualizado con éxito", prestamo });

    } catch (error) {
        console.error("Error al actualizar el préstamo:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

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

