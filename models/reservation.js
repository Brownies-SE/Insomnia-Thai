const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Reservation extends Model {}

Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date_of_res: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    people: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "reservation",
  }
);

module.exports = Reservation;
