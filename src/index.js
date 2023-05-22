import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fileUpload from 'express-fileupload';
import router from './routes/router';
import userRouter from './routes/user.routes';
import roleRoutes from './routes/role.routes';
import authRoutes from './routes/auth.routes';
import DB from "./database";
import cookieParser from 'cookie-parser'
import generateUserRoles from '../scripts/generateUserRoles'
import generateUsers from '../scripts/generateUsers'
import logHistoryRoutes from "./routes/logHistory.routes";
import TypeLicensesRoutes from "./routes/typeLicense.routes";
import condosRoutes from "./routes/condominium.routes";
import localsRoutes from "./routes/local.routes";
import localIncomesRoutes from "./routes/localIncomes.routes";
import licenseFeeBillRoutes from "./routes/licenseFeeBill.routes";

dotenv.config();

const app = express();
const port = process.env.API_PORT || 3000;

app.set("secretKey", "nodeRestApi");
app.use(fileUpload());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

generateUserRoles();
generateUsers();

app.use(router);
app.use(userRouter);
app.use(roleRoutes);
app.use(authRoutes);
app.use(logHistoryRoutes);
app.use(TypeLicensesRoutes);
app.use(condosRoutes);
app.use(localsRoutes);
app.use(localIncomesRoutes);
app.use(licenseFeeBillRoutes);

app.use(express.static("public"));
app.use("/static", express.static("static"));

/* eslint-disable no-unused-expressions */
DB.connection;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});