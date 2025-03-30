import { UsuarioModel } from "../model/UsuarioModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { TOKEN_KEY } from "../config/config.js";
import { PersonsModel } from "../model/PersonsModel.js";


            //funcion para obtener los datos del usuario (TODOS)
export const getUser = async (req, res) => {
    try {
      const users = await UsuarioModel.findAll({
        attributes: ['id', 'nombreYapellido', 'passware', 'rol', 'telefono', 'activo']
      },{where: {state:true}});
    
      res.status(200).json({users});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

                //funcion para obtener a un usuario 
export const getOneUser = async (req, res) => {
  try {
    const user = await UsuarioModel.findOne({
      attributes: ['id', 'nombreYapellido', 'passware', 'rol', 'telefono', 'activo', 'person_id'],
      where: { id: req.params.id },
      include: [
        {
          model: PersonsModel,
        }
      ]
    });
    debugger
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};


//crear usuario funcion para aquello 

// Crear usuario con validaciones
export const createUsers = async (req, res) => {
  try {
    const { nombreYapellido, passware, rol, telefono, activo } = req.body;

    // Validaciones de campos requeridos
    if (!nombreYapellido || !passware || !rol || !telefono || !activo) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Verificar si el correo ya existe
    const oldUser = await UsuarioModel.findOne({ where: { telefono } });
    if (oldUser) {
      return res.status(409).json({ message: "telefono already exists" });
    }

    // Cifrar contraseña
    const encryptedPassword = await bcrypt.hash(passware.toString(), 10);

    // Crear persona asociada (si aplica)
    const person = await PersonsModel.create({
      telefono, // Solo como ejemplo, ajusta según tus necesidades
      passware
    });

    // Crear usuario
    const users = await UsuarioModel.create({
      nombreYapellido,
      passware: encryptedPassword,
      rol,
      telefono,
      activo, 
      person_id: person.id, // Asocia al usuario con la persona
    });

    // Crear token
    // const token = jwt.sign({ user_id: users.id, correo }, TOKEN_KEY, {
    //   expiresIn: "1h",
    // });
    const token = jwt.sign(
      { user_id: users.id, telefono: users.telefono, person_id: person.id },
      TOKEN_KEY,
      { expiresIn: "1h" }
    );

    
    res.status(201).json({ users, token });
  } catch (error) {
    console.error("Error in createUsers:", error.message);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};


                    //Metodo para actualizar 
export const updateUsers = async (req, res) => {
    const { nombreYapellido } = req.body;
    if (!(nombreYapellido)) {
      res.status(400).json({ message: "user is required" });
    }
    const userD = await UsuarioModel.findOne({where:{id:req.params.id}});
    if(userD){
      userD.set({...userD, nombreYapellido:nombreYapellido});
        await userD.save();
        res.status(200).json({ message: "update" });
    }else{
        res.status(404).json({message: "user not found"});
    }
};
                    //Actualiza el correro
// export const updateUsersEmail = async (req, res) => {
//     const { email } = req.body;
//     if (!(email)) {
//       res.status(400).json({ message: "email is required" });
//     }
//     const oldUser = await UsuarioModel.findOne({ where: { email: email } });
//     if (oldUser) {
//       return res.status(409).json("email already exist");
//     }
//     const userD = await UsuarioModel.findOne({where:{id:req.params.id}});
//     if(userD){
//       userD.set({...userD,email:email});
//         await userD.save();
//         res.status(200).json({ message: "update" });
//     }else{
//         res.status(404).json({message: "user not found"});
//     }
// };

export const updateUserTelefono = async (req, res) => {
  const { telefono } = req.body;
  if (!(telefono)) {
    res.status(400).json({ message: "telefono is required" });
  }
  const oldUser = await UsuarioModel.findOne({ where: { telefono: telefono } });
  if (oldUser) {
    return res.status(409).json("telefono already exist");
  }
  const userD = await UsuarioModel.findOne({where:{id:req.params.id}});
  if(userD){
    userD.set({...userD,telefono:telefono});
      await userD.save();
      res.status(200).json({ message: "update" });
  }else{
      res.status(404).json({message: "user not found"});
  }
};

                    //Actualizar la contraseña 

export const updateUsersPassword = async (req, res) => {
    const { passware } = req.body;
    if (!(passware)) {
      res.status(400).json({ message: "password is required" });
    }
    const userD = await UsuarioModel.findOne({where:{id:req.params.id}});
    if(userD){
      userD.set({...userD,passware:passware});
        await userD.save();
        res.status(200).json({ message: "update" });
    }else{
        res.status(404).json({message: "user not found"});
    }
};

                        //MEtodo para eliminar 

export const deleteUsers = async (req, res) => {
    const user = await UsuarioModel.findOne({ where: { id: req.params.id } });
    if (user) {
      user.set({ ...user, state: false });
      await user.save();
      res.status(200).json({ message: "delete" });
    } else {
      res.status(404).json({ message: "type not found" });
    }
};

                            //loguin 

export const login = async (req, res) => {
    try {
      const { telefono, passware } = req.body;
      if (!(telefono && passware)) {
        res.status(400).json({message:"All input is required"});
      }
      const user = await UsuarioModel.findOne({
        where: { telefono: telefono.toLowerCase() },
      });
       // Check if user exists
       if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      // Validate password
      const isPasswordValid = await bcrypt.compare(passware, user.passware);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
     // If everything is valid, generate a token
      const token = jwt.sign({ user_id: user.id, telefono }, TOKEN_KEY, {
        expiresIn: "1h",
      });
        let dataUser={
            id:user.id,
            user:user.user,
            telefono:user.telefono,
            person_id:user.person_id
        }
        res.status(200).json({ dataUser, token: token });
    } catch (err) {
      console.error("Login:", err.message );
      res.status(500).json({ error: err.message });
    }
};

                    //REfresca

// export const refresh = (req, res) => {
//     const token = req.headers["authorization"].split(" ")[1];
//       if (!token) {
//           return res.status(401).end()
//       }
//       var payload
//       try {
//           payload = jwt.verify(token, 'secret')
//       } catch (e) {
//           if (e instanceof jwt.JsonWebTokenError) {
//               return res.status(401).end()
//           }
//           return res.status(400).end()
//       }
//       const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
//       if (payload.exp - nowUnixSeconds > 30) {
//           return res.status(400).end()
//       }
//       const newToken = jwt.sign({ username: payload.username }, jwtKey, {
//           algorithm: "HS256",
//           expiresIn: jwtExpirySeconds,
//       })
//       res.cookie("token", newToken, { maxAge: jwtExpirySeconds * 1000 })
//       res.end()
// }

//erick villa