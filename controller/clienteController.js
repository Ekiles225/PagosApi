import { ClienteModel } from "../model/ClienteModel.js";

export const createCliente = async (req, res) => {
    const { nombre, dni, telefono, direccion, activo } = req.body;
  
    // Validar que todos los campos estén presentes
    if (!nombre || !dni || !telefono || !direccion || !activo ) {
      return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }
  
    try {
      // Lógica para crear el cliente en la base de datos
      const nuevoCliente = await ClienteModel.create({
        nombre,
        dni,
        telefono,
        direccion,
        activo
      });
  
      // Enviar respuesta exitosa
      res.status(201).json({ message: 'Cliente registrado con éxito', cliente: nuevoCliente });
    } catch (error) {
      console.error("Error al crear cliente:", error);
      res.status(500).json({ message: 'Hubo un error al registrar el cliente.' });
    }
  };

export const getClientes = async (req, res) => {
    try {
        const clientes = await ClienteModel.findAll();
        res.status(200).json({ clientes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//desarrollame un metodo para filtrar por cedula y por nombre a lo que vaya buscano ir filtrando los clientes
export const filtrarClientes = async (req, res) => {
    try {
      const { dni, nombre } = req.query;
      let clientes = [];
      if (dni) {
        clientes = await ClienteModel.findAll({ where: { dni } });
      } else if (nombre) {
        clientes = await ClienteModel.findAll({ where: { nombre } });
      }
      res.status(200).json({ clientes });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const updateCliente = async (req, res) => {
    try {
        const cliente = await ClienteModel.findByPk(req.params.id);
        if (!cliente) {
            res.status(404).json({ message: "cliente not found" });
        }
        const { nombre, dni, telefono, direccion, activo } = req.body;
        await cliente.update({
            nombre,
            dni,
            telefono,
            direccion,
            activo
        });
        res.status(200).json({ cliente });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteCliente = async (req, res) => {
    try {
        const cliente = await ClienteModel.findByPk(req.params.id);
        if (!cliente) {
            res.status(404).json({ message: "cliente not found" });
        }
        await cliente.destroy();
        res.status(200).json({ message: "cliente deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}











