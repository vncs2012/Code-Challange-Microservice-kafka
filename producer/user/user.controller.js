import { Request, Response } from "express";
import { User } from './user.model'
import { runKafka } from '../kafka/kafka.producer'

export const allUser = (req: Request, res: Response) => {
    const user = User.find((err: any, user: any) => {
        if (err) {
            console(err)
            res.send(err);
        } else {
            res.send(user);
        }
    });
};

export const addUser = (req: Request, res: Response) => {
    const user = new User(req.body);
    user.save((err: any) => {
        if (err) {
            res.send(err);
        } else {
            console.log(user)
            res.send(user);
            runKafka(user).catch(console.error)
        }
    });
};
