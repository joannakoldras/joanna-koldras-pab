import express from "express";
import { APP_PORT } from "./src/config/app.config";
import { mainRouter } from "./src/routes/main";

// Bootstrap express application.
const app = express();

// Attach main router (entry point for all routes in application)
app.use(mainRouter);

// Start listening on given port and print message when app is ready.
app.listen(APP_PORT, () => console.log(`app listening on port ${APP_PORT}`));
