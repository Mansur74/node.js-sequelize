const express = require("express");
const dotenv = require("dotenv");
const sequelize = require('./config/db');
const app = express();
const EmployeeRoute =  require('./routes/EmployeeRoute');
const PassportRoute =  require('./routes/PassportRoute');
const {relate} = require('./models/index')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
const PORT = process.env.PORT | 3000;

const start = async () => {
  try {
    relate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log("Listening port:", PORT);
    });

  }
  catch (error) {
    console.log(error.message)
  }
}


app.use("/api/employee", EmployeeRoute); // employee route
app.use("/api/passport", PassportRoute); // passport route

start();