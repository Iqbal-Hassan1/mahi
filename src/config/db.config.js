require("dotenv").config();
import mongoose from "mongoose";
mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const dataBase = mongoose.connection;
dataBase.on("error", console.error.bind(console, "connectionError"));
dataBase.once("open", () => {
	console.log("DataBase connection.....");
});
