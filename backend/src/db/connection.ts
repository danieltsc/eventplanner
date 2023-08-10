import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'mydatabase'
})

export default sequelize