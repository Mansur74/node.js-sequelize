const express = require("express");
const dotenv = require("dotenv");
const sequelize = require('./config');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
const PORT = process.env.PORT | 3000;

const start = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log("Listening port:", PORT);
    });

  }
  catch (error) {
    console(error.message)
  }
}

app.use("/api/student", require('./routes/StudentRoute'));

start()