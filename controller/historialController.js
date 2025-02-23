import { HistorialModel } from "../model/HistorialModel.js";


export const createHistorial = async (req, res) => {
    try {
        const { accion, detalle} = req.body;
        if (!(accion || detalle)) {
            res.status(400).json({ message: "all input is required" });
        }
        const historial = await HistorialModel.create({
            accion,
            detalle
        });
        res.status(201).json({ historial });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getHistoriales = async (req, res) => {
    try {
        const historiales = await HistorialModel.findAll();
        res.status(200).json({ historiales });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}