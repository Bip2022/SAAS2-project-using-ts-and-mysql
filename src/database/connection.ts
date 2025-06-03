import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: "mysql",
  models: [__dirname + '/models'] //current location of models
});

sequelize.authenticate()
  .then(() => {
    console.log("Database connection has been established successfully");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });


  //migration garney process
  sequelize.sync({ alter: true }) 
  .then(() => {
    console.log("Database synchronized successfully");
  })
  .catch((error) => {
    console.error("Error synchronizing the database:", error);
  }) ;
export default sequelize;

