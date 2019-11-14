const moment = require('moment');

const validate = {};

validate.content = (content) => {
  const result = content.trim();
  if (!result.length) {
    throw new Error('Content 내용 오류.');
  }
  return result;
};

validate.timestamp = (timestamp) => {
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  const result = moment(timestamp, dateFormat, true);
  if (!result.isValid()) {
    throw new Error('현재 시간 오류.');
  }
  return result;
};

validate.duration = (duration) => {
  const result = parseInt(duration, 10);
  if (Number.isNaN(result) || result < 25 || result > 60) {
    throw new Error('타이머 시간 설정 오류.');
  }
  return result;
};

module.exports = validate;
