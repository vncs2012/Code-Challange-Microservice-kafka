import express, { Application } from "express";
import bodyParser from 'body-parser'
import connect from './db/connect'
import { addUser, allUser } from './user/user.controller'
import { rumKafkaConsumer } from './kafka/index'

// Configure acesse db
const db: string = "'mongodb://localhost/meat-api'"

connect(db);

const app: Application = express();
const port: number = 5000 || process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/user", allUser);
app.post("/user", addUser);

app.listen(port, () => {
    console.log(`Server running on ${port}`);
    rumKafkaConsumer()
});

// {
//     "name":"Vinicius Miranda",
//     "email":"vncs@email.com",
//     "password":"vncs123"
//     }