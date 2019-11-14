const db = require('../models');
const validate = require('../utils/validate');

const createTodo = async (req, res, next) => {
  let transaction;
  try {
    const { todoContent, startedAt, duration } = req.body;
    const validContent = validate.content(todoContent);
    const validStartedAt = validate.timestamp(startedAt);
    const validDuration = validate.duration(duration);

    transaction = await db.sequelize.transaction();
    const newTodo = await db.Todo.create(
      {
        todoContent: validContent,
        duration: validDuration,
        userId: req.user.id,
      },
      { transaction },
    );
    const newTimeline = await db.Timeline.create(
      {
        startedAt: validStartedAt,
        todoId: newTodo.id,
      },
      { transaction },
    );
    await transaction.commit();
    return res.status(200).json({
      code: 200,
      message: 'todo create success',
      data: { todoId: newTodo.id, timelineId: newTimeline.id },
    });
  } catch (error) {
    console.error(error);
    transaction && (await transaction.rollback());
    return res.status(500).json({
      code: 500,
      message: `todo create fail. ${error.message}`,
    });
  }
};

const pauseTodo = async (req, res) => {
  try {
    const { todoId, timelineId, endedAt } = req.body;
    const validEndedAt = validate.timestamp(endedAt);

    await db.Timeline.update(
      { endedAt: validEndedAt },
      { where: { id: timelineId, todoId } },
    );
    return res.status(200).json({
      code: 200,
      message: 'todo paused successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: `todo pause failed. ${error.message}`,
    });
  }
};

module.exports = {
  createTodo,
  pauseTodo,
};
