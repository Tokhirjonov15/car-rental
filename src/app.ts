import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./routerAdmin";

/** 1-Entrance */
const app = express();
app.use(express.static(path.join(__dirname, "public"))); 
app.use(express.urlencoded({extended: true})); // Traditional API Support
app.use(express.json());                       // Rest API Support

/** 2-Sessions */

/** 3-Views */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** 4-Routers */
app.use("/admin", routerAdmin); // SSR: EJS
app.use("/", router);           // SPA: REACT

export default app;