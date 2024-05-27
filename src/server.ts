import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT as string;
const APP_URI = process.env.APP_URI as string;

app.listen(PORT, () => {
  console.log(`Server running on port ${APP_URI}`);
});
