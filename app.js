import express from 'express';
import cors from 'cors';
import { PORT } from './config/config.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from './db/conexion.js';

import RouterPrestamos from './routes/PrestamoRouter.js';
import RouterPago from './routes/PagoRouter.js';
import RouterHistorial from './routes/HistorialRoute.js';
import RouterCliente from './routes/ClienteRouter.js';
import routerUser from './routes/UsuarioRuter.js';
import routerPerson from './routes/PersonRouter.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const _PORT = PORT || 3306;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', RouterPrestamos); // Asegúrate de importar tu router);
app.use('/api', RouterPago); // Asegúrate de importar tu router);
app.use('/api', RouterHistorial); // Asegúrate de importar tu router);
app.use('/api', RouterCliente); // Asegúrate de importar tu router);
app.use('/api', routerUser); // Asegúrate de importar tu router);
app.use('/api', routerPerson); // Asegúrate de importar tu router);





const main = async () => {
  try {
      await sequelize.authenticate();
      console.log('Base de datos conectada.');
      await sequelize.sync({ alter: false  }) // cambiar a true para que actualice la base de datos y volver a poner en flase
      app.listen(_PORT, () => {
          console.log(`Servidor corriendo en el puerto => ${_PORT}`);
      });
  } catch (error) {
      console.log(`Error ${error}`);
  }
}
main();