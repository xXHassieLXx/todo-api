import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './database';
import todoRoutes from './routes/todoRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', todoRoutes);

// Sincronizar la base de datos y arrancar el servidor
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
