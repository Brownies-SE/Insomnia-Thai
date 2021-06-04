const User = require("./user");
const Order = require("./order");
const Reservation = require("./reservation");

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
