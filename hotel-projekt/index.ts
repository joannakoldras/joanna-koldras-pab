import express from "express";
require('express-async-errors');
import { APP_PORT, MONGO_HOST } from "./src/config/app.config";
import { mainRouter } from "./src/routes/main";
import mongoose = require('mongoose');



// Bootstrap express application.
const app = express();

app.use(express.json());

// Attach main router (entry point for all routes in application)
app.use(mainRouter);

mongoose.connect(MONGO_HOST).then(mongoose => {
    console.log('Connected to DB');

    // const Cat = mongoose.model('Cat', { name: String } as any);

    // const kitty = new Cat({ name: 'Zildjian' });

    // kitty.save().then(() => console.log('meow'));


    // Start listening on given port and print message when app is ready.
    app.listen(APP_PORT, () => console.log(`app listening on port ${APP_PORT}`));
});

