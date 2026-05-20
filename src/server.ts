import app from "./app.js";
import sequelize from "./config/database.js";
import env from "./config/env.js";

import "./models/user.model.js";

const PORT = env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log("Database connected");

    await sequelize.sync(); // đọc model, tạo table trong mysql

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
