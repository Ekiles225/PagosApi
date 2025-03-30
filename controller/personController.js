import { PersonsModel } from "../model/PersonsModel.js";


                    //Metodo para actualizar 
export const updateUsers = async (req, res) => {
    const { nombreUsuario, descripcion } = req.body;
    if (!(nombreUsuario, descripcion)) {
        res.status(400).json({ message: "user is required" });
    }

    const personD = await PersonsModel.findOne({ where: { id: req.params.id } });

    if (personD) {
        //esos (...peronD) significa que me permite modificar los datos de la persona que yo quiera 
        personD.set({ ...personD, nombreUsuario: nombreUsuario, descripcion: descripcion });
        await personD.save();
        res.status(200).json({ message: "update" });
    } else {
        res.status(404).json({ message: "No encontrado" });
    }

};


export const changeImage = async (req, res) => {
    const { id } = req.params;
    const  file  = req.file; 
  
    if (!file) {
      return res.status(400).json({ message: "Image es requerida" });
    }
    try {

      const person = await PersonsModel.findOne({ where: { id } });

      if (person) {

        // const imageName = id + "-" + file.originalname;
        // upload(file);

        person.set({
          ...person, 
          foto: file.filename
        });
        
        await person.save()

        return res.status(200).json({ message: "Image actualizada con exito" });
      } else {
        return res.status(404).json({ message: "User no encontrado" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred while updating the image" });
    }
  };