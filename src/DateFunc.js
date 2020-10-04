function today() {
  return new Date();
}

/**
 *
 * @param {Date} d
 */
function serialize(d) {
  if (!d instanceof Date) {
    throw new Error('Date 객체가 필요합니다.');
  }
  return {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    date: d.getDate(),
    hour: d.getHours(),
    minute: d.getMinutes(),
    second: d.getSeconds(),
  };
}

function stringify(d) {
  const { year, month, date } = serialize(d);
  return `${padL(year, 4)}-${padL(month, 2)}-${padL(date, 2)}`;
}

function parseFromString(str) {
  const [year, month, date] = str.split('-');
  return make(year, month, date);
}

function padL(num, digit) {
  let str = '' + num;
  while (str.length < digit) {
    str = '0' + str;
  }
  return str;
}

function rangeDate(start, end) {}

function getDateArrayInMonth(year, month) {
  let ret = [];
  const start = make(year, month, 1);
  const end = make(year, month, getLastDateOfMonth(year, month));
  ret.push(stringify(start));
  let next = calc(start, { date: 1 });
  while (next <= end) {
    ret.push(stringify(next));
    next = calc(next, { date: 1 });
  }
  return ret;
}

function calc(d, { year = 0, month = 0, date = 0 }) {
  if (!d instanceof Date) {
    throw new Error('Date 객체가 필요합니다.');
  }
  const serialized = serialize(d);
  const y = year ? serialized.year + year : serialized.year;
  const m = month ? serialized.month + month : serialized.month;
  const dd = date ? serialized.date + date : serialized.date;
  return make(y, m, dd);
}

function getLastDateOfMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function make(year, month, date, hours = 0, minutes = 0, seconds = 0) {
  year = parseInt(year);
  month = parseInt(month);
  date = parseInt(date);
  if (isNaN(year) || isNaN(month) || isNaN(date)) {
    throw new Error('파라미터는 정수 또는 정수형 문자열만 가능합니다.');
  }
  return new Date(year, month - 1, date, hours, minutes, seconds);
}

const dateFunc = {
  today,
  serialize,
  make,
  padL,
  stringify,
  parseFromString,
  getLastDateOfMonth,
  calc,
  getDateArrayInMonth,
};

module.exports = dateFunc;
