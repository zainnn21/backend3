import express from "express";
import courseRouter from "./routes/course";
import userRouter from "./routes/user";
import { logRequest } from "./middleware/logs";

const app = express();
const PORT = process.env.PORT || 3000;

// middleware untuk parsing JSON body
app.use(express.json());

app.use(logRequest);
app.use("/course", courseRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
