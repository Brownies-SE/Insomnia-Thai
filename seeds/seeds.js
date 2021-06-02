const sequelize = require("../config/connection");
const { User, Order, Reservation } = require("../models");

const userData = require("./userData.json");
const resData = require("./resData.json");
const orderData = require("./orderData.json");

const seedDB = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const reservations = await Reservation.bulkCreate(resData, {
    individualHooks: true,
    returning: true,
  });

  const orders = await Order.bulkCreate(orderData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDB();
