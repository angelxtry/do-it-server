const app = require('../../index');
const request = require('supertest');

describe('POST /api/user/signup', () => {
  it('회원가입을 성공하면 status 200을 리턴한다.', (done) => {
    request(app)
      .post('/api/user/signup')
      .send({
        email: 'zzz@gmail.com',
        nickname: 'zzz',
        password: 'zzz',
      })
      .expect(200)
      .end(done);
  });
});
