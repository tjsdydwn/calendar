const df = require('../src/DateFunc');

describe('serialize 테스트 꾸러미', () => {
  let someday;
  beforeEach(() => {
    someday = df.make(2020, 10, 10);
  });

  it('serialize에 Date가 아닌 객체를 넣으면 에러를 터트린다.', () => {
    expect(() => {
      df.serialize();
    }).toThrowError();
  });

  it('serialize의 year는 Date 인스턴스의 년도를 반환한다', () => {
    expect(df.serialize(someday).year).toBe(2020);
  });

  it('serialize의 month는 Date 인스턴스의 월을 반환한다', () => {
    expect(df.serialize(someday).month).toBe(10);
  });

  it('serialize의 date는 Date 인스턴스의 일자를 반환한다', () => {
    expect(df.serialize(someday).month).toBe(10);
  });
});

describe('padL 테스트 꾸러미', () => {
  it('1을 2의 길이로 늘리면 01이 된다.', () => {
    expect(df.padL(1, 2)).toBe('01');
  });
});

describe('stringify', () => {
  it('올바른 데이트 객체를 넣으면 YYYY-MM-DD 형태의 문자열을 반환한다.', () => {
    let someday = df.make(2020, 10, 10);
    expect(df.stringify(someday)).toBe('2020-10-10');
  });
});

describe('parseFromString', () => {
  it('올바른 파라미터를 입력하면 Date 인스턴스를 반환한다.', () => {
    let someday = df.parseFromString('2020-10-10');
    expect(someday instanceof Date).toBe(true);
  });
});

describe('getLastDateOfMonth', () => {
  it('2020년 1월의 마지막 날은 31일이다.', () => {
    expect(df.getLastDateOfMonth(2020, 1)).toBe(31);
  });
});

describe('calc', () => {
  let someday;
  beforeEach(() => {
    someday = df.make(2020, 10, 10);
  });

  it('첫번째 파라미터가 Date의 인스턴스가 아닌 경우 에러', () => {
    expect(() => {
      df.stringify('asdf');
    }).toThrowError();
  });

  it('일자에 1을 더하면 그 다음날이 나온다', () => {
    const ret = df.calc(someday, { date: 1 });
    expect(df.stringify(ret)).toBe('2020-10-11');
  });

  it('일자에 1을 빼면 그 전날이 나온다', () => {
    const ret = df.calc(someday, { date: -1 });
    expect(df.stringify(ret)).toBe('2020-10-09');
  });

  it('월에 1을 더하면 그 다음월이 나온다', () => {
    const ret = df.calc(someday, { month: 1 });
    expect(df.stringify(ret)).toBe('2020-11-10');
  });

  it('월에 1을 빼면 그 전월이 나온다', () => {
    const ret = df.calc(someday, { month: -1 });
    expect(df.stringify(ret)).toBe('2020-09-10');
  });

  it('연에 1을 더하면 그 다음연도가 나온다', () => {
    const ret = df.calc(someday, { year: 1 });
    expect(df.stringify(ret)).toBe('2021-10-10');
  });

  it('연에 1을 빼면 그 전 연도가 나온다', () => {
    const ret = df.calc(someday, { year: -1 });
    expect(df.stringify(ret)).toBe('2019-10-10');
  });
});
