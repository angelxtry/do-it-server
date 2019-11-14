const router = require('express').Router();

const db = require('../../models');
const { isLoggedIn, isExistTodo, isExistTimeline } = require('../middleware');
const { createTodo, pauseTodo } = require('../../controllers/todo');

// POST api/todo -- todo 생성
router.post('/', isLoggedIn, createTodo);

// POST api/todo/pause -- todo 멈춤
router.post('/pause', isLoggedIn, isExistTodo, isExistTimeline, pauseTodo);

// POST api/todo/resume-- todo 다시 시작
router.post('/resume', isLoggedIn, isExistTodo, async (req, res) => {
  try {
    const { todoId, startedAt } = req.body;
    const newTimeline = await db.Timeline.create({ startedAt, todoId });
    return res.status(200).json({
      code: 200,
      message: 'Resume success.',
      data: { todoId, timelineId: newTimeline.id },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      message: 'Resume failed.',
    });
  }
});

// POST api/todo -- todo 종료
router.patch(
  '/',
  isLoggedIn,
  isExistTodo,
  isExistTimeline,
  async (req, res) => {
    let transaction;
    try {
      const { todoId, timelineId, doneContent, endedAt } = req.body;
      transaction = await db.sequelize.transaction();
      await db.Todo.update(
        { doneContent, isComplete: true },
        { where: { id: todoId, userId: req.user.id } },
        { transaction },
      );
      await db.Timeline.update(
        { endedAt },
        { where: { id: timelineId, todoId } },
        { transaction },
      );
      await transaction.commit();

      return res.status(200).json({
        code: 200,
        message: 'todo complete success',
      });
    } catch (error) {
      console.error(error);
      transaction && (await transaction.rollback());
      res.status(500).json({
        code: 500,
        message: 'todo complete failed',
      });
    }
  },
);

// GET api/todo/:todoId
router.get('/:todoId', isLoggedIn, async (req, res) => {
  try {
    const todo = await db.Todo.findOne({
      where: { id: req.params.todoId, userId: req.user.id },
      attributes: [
        'id',
        'todoContent',
        'doneContent',
        'duration',
        'isComplete',
      ],
      include: [
        { model: db.Timeline, attributes: ['id', 'startedAt', 'endedAt'] },
      ],
    });
    if (!todo) {
      return res.status(400).json({ code: 400, message: 'todo not found.' });
    }
    return res
      .status(200)
      .json({ code: 200, message: 'todo select success.', data: todo });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: 'todo select failed.' });
  }
});

// DELETE api/todo/:todoId
router.delete('/:todoId', isLoggedIn, async (req, res) => {
  try {
    const todo = await db.Todo.findOne({
      where: { id: req.params.todoId, userId: req.user.id },
    });
    if (!todo) {
      return res.status(400).json({ code: 400, message: 'todo not found.' });
    }

    await db.Todo.destroy({
      where: { id: req.params.todoId, userId: req.user.id },
    });
    res.status(200).json({ code: 200, message: 'todo delete success.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, message: 'todo delete failed.' });
  }
});

module.exports = router;
