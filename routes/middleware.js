const db = require('../models');

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ code: 401, message: 'Plz login.' });
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ code: 401, message: 'The logged in user is not available.' });
  }
};

exports.isExistTodo = async (req, res, next) => {
  try {
    const todo = await db.Todo.findOne({
      where: { id: req.body.todoId, userId: req.user.id },
    });
    if (todo) {
      next();
    } else {
      return res.status(400).json({ code: 400, message: 'todo not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, message: 'Server error.' });
  }
};

exports.isExistTimeline = async (req, res, next) => {
  try {
    const { todoId, timelineId } = req.body;
    const timeline = await db.Timeline.findOne({
      where: {
        id: timelineId,
        todoId,
      },
    });
    if (timeline) {
      next();
    } else {
      return res
        .status(400)
        .json({ code: 400, message: 'timeline not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, message: 'Server error.' });
  }
};
