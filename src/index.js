import express from "express";
import sequelize from "./models/db.js";
import authRouter from "./routes/authRouter.js";
import taskRouter from "./routes/taskRouter.js";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();
app.use(express.json());

const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


sequelize.testConnection();

app.use('/api', authRouter);
app.use('/api', taskRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})