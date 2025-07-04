import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import router from '../interfaces/http/routes';

config();
export default class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.app.use(
      cors({
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
      })
    );

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(router);
  }
}
