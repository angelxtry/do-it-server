module.exports = (sequelize, DataTypes) => {
  const Timeline = sequelize.define(
    'timeline',
    {
      startedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  );

  Timeline.associate = (db) => {
    db.Timeline.belongsTo(db.Todo, {
      sourceKey: 'id',
    });
  };

  return Timeline;
};
