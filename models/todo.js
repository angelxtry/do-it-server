module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    'todo',
    {
      todoContent: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      doneContent: {
        type: DataTypes.TEXT,
        defaultValue: 'OK',
      },
      duration: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      isComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
  );

  Todo.associate = (db) => {
    db.Todo.belongsTo(db.User, {
      targetKey: 'id',
    });

    db.Todo.hasMany(db.Timeline, {
      sourceKey: 'id',
      onDelete: 'cascade',
    });
  };

  return Todo;
};
