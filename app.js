import express from 'express';
import router from './routers/route.js';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { PORT, HOSTNAME } from './config.js';

const app = express();


app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.use(cors());
app.use(router);

app.use(express.static(path.resolve("public")));
app.set("views", path.resolve("views"));
app.set("view engine", "ejs");

http.createServer(app).listen(PORT, HOSTNAME, () => {  
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});