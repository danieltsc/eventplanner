import { Model, DataTypes } from 'sequelize'
import sequelize from '../db/connection'

class Category extends Model {
  public id!: number;
  public title!: string;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    sequelize,
    tableName: 'categories'
  }
)

export default Category