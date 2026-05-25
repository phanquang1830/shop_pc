import app from "./app.js";
import env from "./config/env.js";

const PORT = env.PORT || 3000;

const startServer = async () => {
  try {
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
