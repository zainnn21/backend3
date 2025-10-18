import express from "express";
import courseRouter from "./routes/course";
import userRouter from "./routes/user";
import uploadRouter from "./routes/upload"
import { logRequest } from "./middleware/logs";

const app = express();
const PORT = process.env.PORT || 3000;

// middleware untuk parsing JSON body
app.use(express.json());
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

app.use(logRequest);

app.use("/course", courseRouter);
app.use("/user", userRouter);
app.use("/upload", uploadRouter)

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
