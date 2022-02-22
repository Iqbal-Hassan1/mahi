import express from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import "./config/db.config";
import routes from './routes';
import { errorHandler } from "./utils/error-handler";

const app = express();

app.use(
	cors({
		credentials: true,
		origin: "*",
	})
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/uploads", express.static("./uploads"));

app.use(function (req, res, next) {
	res.header("Content-Type", 'application/json');
	next();
});

app.get("/", (req, res) => {
	res.send("hello");
});

/* routes */


app.use('/api', routes);

/* Error Handler */

app.use(errorHandler);

/* create a server */
const server = http.createServer(app);

server.listen(process.env.PORT || 8080, () => {
	console.log(`Server is listening port ${process.env.PORT}`);
});

module.exports = server
