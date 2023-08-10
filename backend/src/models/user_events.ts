import { Model, DataTypes } from 'sequelize'
import sequelize from '../db/connection'

class UserEvent extends Model {
  public id!: number;
  public userId!: string;
  public eventId!: string;

  public static associate(models: any) {
    UserEvent.belongsTo(models.Event, {
      foreignKey: 'eventId',
      as: 'event', // Define an alias for the association
    });
  }
}

UserEvent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  {
    sequelize,
    tableName: 'user_events'
  }
)

export default UserEvent