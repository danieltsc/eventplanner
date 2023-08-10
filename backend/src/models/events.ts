import { Model, DataTypes } from 'sequelize'
import sequelize from '../db/connection'
import User from './user_events';

class Event extends Model {
  public id!: number;
  public title!: string;
  public owner!: string;
  public category!: string;
  public startDate!: Date;

  public static associate(models: any) {
    Event.hasMany(models.UserEvent, {
      foreignKey: 'eventId',
      as: 'userEvents', // Define an alias for the association
    });
  }
}

Event.init(
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
    owner: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
  },
  {
    sequelize,
    tableName: 'events'
  }
)

export default Event