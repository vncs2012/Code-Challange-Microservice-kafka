import {connect as inibanco} from "mongoose";

import { initServer } from './initRouters'

export default (db: string) => {
  const connect = () => {
    inibanco(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      }).then(() => {
        initServer()
        return console.log(`Successfully connected to ${db}`);
      }).catch(error => {
        console.log("Error connecting to database: ", error);
        return process.exit(1);
      });
  };
  connect()
}
