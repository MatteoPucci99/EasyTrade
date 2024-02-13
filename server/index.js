import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import strategiesRoutes from "./routes/strategies.js";
import singleTradeRoutes from "./routes/singletrade.js";
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/strategies", strategiesRoutes);
app.use("/singletrade", singleTradeRoutes);

const CONNECTION_URL =
  "mongodb+srv://matteopucci:matteopucci123@cluster0.it13zn0.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 3001;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log("Server is running on ", PORT))
  )
  .catch((err) => console.log(err));
// mongoose.set("useFindAndModify", false);
