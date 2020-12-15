require("dotenv").config();
import * as bodyParser from "body-parser";
import express from "express";
import session from "express-session";
import { Request, Response } from "express";

const path = require("path");
const cors = require("cors");
class App {
  public app: express.Application;
  public consentUrl: Promise<string>

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.app.set("views", path.join(__dirname, "../public/views"));
    this.app.set("view engine", "ejs");
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  private config(): void {
    var corsOptions = {
      origin: "http://localhost:8081" // or any other port?
    };
		
    this.app.use(cors(corsOptions));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true
    }));

    this.app.listen(process.env.PORT, () => {
      console.log(`Example app listening on port ${process.env.PORT}!`)
    });
  }
  
  private routes(): void {
    const router = express.Router();
    
    router.get("/", async (req: Request, res: Response) => {
      res.render("home", { 
        key: 'value'
      });
    });

    this.app.use(require('express-session')({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true
    }));

    this.app.use("/", router);

    const PORT = 8080;

    this.app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  }
}

export default new App().app;
