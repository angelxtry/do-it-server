'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userData = [
      {
        email: 'aaa@gmail.com',
        nickname: 'aaa',
        password: await bcrypt.hash('aaa', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'bbb@gmail.com',
        nickname: 'bbb',
        password: await bcrypt.hash('bbb', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'ccc@gmail.com',
        nickname: 'ccc',
        password: await bcrypt.hash('ccc', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('users', userData, {});

    const todoData = [
      {
        todoContent: 'doit todo api 설계',
        doneContent: 'doit todo api 설계 완료',
        duration: 25,
        isComplete: true,
        createdAt: '2019-11-06 13:00:00',
        updatedAt: '2019-11-06 13:25:00',
        userId: 1,
      },
      {
        todoContent: 'doit todo api 작성',
        doneContent: 'doit todo api 작성 완료',
        duration: 25,
        isComplete: true,
        createdAt: '2019-11-07 14:00:02',
        updatedAt: '2019-11-07 14:55:02',
        userId: 2,
      },
      {
        todoContent: 'doit user api 작성',
        doneContent: 'doit user api 작성 완료',
        duration: 30,
        isComplete: true,
        createdAt: '2019-11-07 11:00:02',
        updatedAt: '2019-11-07 11:35:02',
        userId: 3,
      },
      {
        todoContent: 'doit api 문서 작성',
        duration: 45,
        isComplete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3,
      },
    ];
    await queryInterface.bulkInsert('todos', todoData, {});

    const timelineData = [
      {
        startedAt: '2019-11-06 13:00:00',
        endedAt: '2019-11-06 13:25:00',
        createdAt: new Date(),
        updatedAt: new Date(),
        todoId: 1,
      },
      {
        startedAt: '2019-11-07 14:00:02',
        endedAt: '2019-11-07 14:10:02',
        createdAt: new Date(),
        updatedAt: new Date(),
        todoId: 2,
      },
      {
        startedAt: '2019-11-07 14:30:02',
        endedAt: '2019-11-07 14:40:02',
        createdAt: new Date(),
        updatedAt: new Date(),
        todoId: 2,
      },
      {
        startedAt: '2019-11-07 14:50:02',
        endedAt: '2019-11-07 14:55:02',
        createdAt: new Date(),
        updatedAt: new Date(),
        todoId: 2,
      },
      {
        startedAt: '2019-11-07 11:00:02',
        endedAt: '2019-11-07 11:20:02',
        createdAt: new Date(),
        updatedAt: new Date(),
        todoId: 3,
      },
      {
        startedAt: '2019-11-07 11:25:02',
        endedAt: '2019-11-07 11:35:02',
        createdAt: new Date(),
        updatedAt: new Date(),
        todoId: 3,
      },
      {
        startedAt: '2019-11-07 10:25:02',
        createdAt: new Date(),
        updatedAt: new Date(),
        todoId: 4,
      },
    ];
    await queryInterface.bulkInsert('timelines', timelineData, {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
