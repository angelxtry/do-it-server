const { sequelize } = require('../models');

const resetTables = async () => {
  await sequelize.drop();
  await sequelize.sync();
  await sequelize.close();
};

resetTables();
