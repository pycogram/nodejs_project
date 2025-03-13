import express from 'express';
import { postRoutes } from './routes/postRoutes.js';
import mongoose from 'mongoose';
import { userRoutes } from './routes/userRoutes.js';
import 'dotenv/config.js';

import path from 'path';
import { fileURLToPath } from 'url';

// resolving dirname for ES5 module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//console.log(__dirname, 4567);

const app = express(); // initiate express obj to create a server

// middleware that allow json
app.use(express.json());


// endpoint and route handlers
app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);

// use client app
app.use(express.static(path.join(__dirname, "/client/dist")));

// render client for any path
app.get("*", (req, res) => 
    res.sendFile(path.join(__dirname, "/client/dist/index.html"))
);

app.get("/post", (req, res) => {
    console.log("Sending Data:", posts); // Log before sending response
    res.json(posts);
  });


// connect to db
mongoose.connect(process.env.DB_URL, {dbName: "dbnodejstut"})
.then(() => {
    console.log(`connected to DB successfully`);
    //app.listen(process.env.PORT || 5000, 'localhost', () => console.log(`listening to the server`));
   app.listen(process.env.PORT || 5000, () => console.log(`listening to the server`));
})
.catch((err) => {
    console.log(`DB error - ${err}`)
})





/*

    import http from 'http';

    // Creating a server using plain nodejs

    http.createServer((req, res) => {
        res.writeHead(400, 'bad request', {
            'Content-Type': 'text/html'
        });

        res.write(req.url);

        if(req.method === "POST"){
            res.write(`POST Request`);
        }

        res.end();
        
    }).listen(3001, 'localhost', () => {
        console.log(`listening to the server`);
    });
*/