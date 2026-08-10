import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import fileRoutes from "@/modules/file/file.routes";
import { errorMiddleware } from "@/middlewares/error.middleware";

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())


app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "File Storage API працює",
  });
});

app.use('/files',fileRoutes)
app.use(errorMiddleware)

export default app;