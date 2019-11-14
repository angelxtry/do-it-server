const should = require('should');
const moment = require('moment');

const validate = require('./validate')

describe('controllers/todo.js의 validateContent 함수는 ', () => {
  it('입력 인자를 trim 한다.', () => {
    validate.content('abc       ').should.eql('abc');
  });

  it('빈 값이 인자로 전달되면 Error throw.', () => {
    (() => {
      validate.content('');
    }).should.throw('Content 내용 오류.');
  });
});

describe('controllers/todo.js의 validateTimestamp 함수는 ', () => {
  it('YYYY-MM-DD HH:mm:ss 형식이 입력되면 data 객체를 return 한다.', () => {
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    const result = validate.timestamp('2019-12-31 12:12:12');
    result.should.eql(moment('2019-12-31 12:12:12', dateFormat, true));
  });

  it('YYYY-MM-DD HH:mm:ss 이외의 형식이 입력되면 Error thwor.', () => {
    (() => {
      validate.timestamp('2019-12-31 12:12');
    }).should.throw('현재 시간 오류.');
  });

  it('YYYY-MM-DD HH:mm:ss 형식의 날짜에 오류가 있을 경우 Error throw.', () => {
    (() => {
      validate.timestamp('2019-12-32 12:12;12');
    }).should.throw('현재 시간 오류.');
  });
});

describe('controllers/todo.js의 validateDuration 함수는 ', () => {
  it('25이상 60이하의 숫자를 인자로 받으면 입력받은 숫자를 data 객체에 담아 리턴한다.', () => {
    const minValue = validate.duration(25);
    minValue.should.eql(25);

    const maxValue = validate.duration(60);
    maxValue.should.eql(60);

    const number = validate.duration('60');
    number.should.eql(60);
  });

  it('25 미만의 숫자를 인자로 받으면 Error throw.', () => {
    (() => {validate.duration(24)}).should.throw('타이머 시간 설정 오류.');
  });

  it('60 초과의 숫자를 인자로 받으면 Error throw.', () => {
    (() => {validate.duration(61)}).should.throw('타이머 시간 설정 오류.');
  });

  it('숫자가 아닌 값을 인자로 받으면 Error throw.', () => {
    (() => {validate.duration('a')}).should.throw('타이머 시간 설정 오류.');
  });
});
