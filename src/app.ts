import cors from "cors";
import express from "express";
import path from "path";
import routerAdmin from "./routerAdmin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";
import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
import cookieParser from "cookie-parser";
import { T } from "./libs/types/common";
import router from "./router";

const MongoDBStore = ConnectMongoDB(session);
const mongoUri =
    process.env.NODE_ENV === "production"
        ? process.env.MONGO_PROD
        : process.env.MONGO_URL;

if (!mongoUri) {
    throw new Error("MongoDB URI is not set for the current environment");
}

const store = new MongoDBStore({
    uri: mongoUri,
    collection: 'sessions',
});

/** 1-Entrance */
const app = express();
app.use(express.static(path.join(__dirname, "public"))); 
app.use(express.urlencoded({extended: true})); // Traditional API Support
app.use(express.json());                       // Rest API Support
app.use(
    cors({
        credentials: true,
        origin: true
    })
);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));

/** 2-Sessions */
app.use(
    session({
        secret: String(process.env.SESSION_SECRET),
        cookie: {
            maxAge: 1000 * 3600 * 6 //6h
        },
        store: store,
        resave: true,
        saveUninitialized: true
    })
);
app.use(function (req, res, next) {
    const sessionInstance = req.session as T;
    res.locals.user = sessionInstance.user;
    next();
});

/** 3-Views */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** 4-Routers */
app.use("/admin", routerAdmin); // SSR: EJS
app.use("/", router);           // SPA: REACT

export default app;