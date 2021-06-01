const User = require("./User");
const Order = require("./Order");
const Reservation = require("./Reservation");

User.hasMany(Order, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Order.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Reservation, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Reservation.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Order, Reservation };
