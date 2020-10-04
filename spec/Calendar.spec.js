describe('Calendar', function () {
  const Calendar = require('../src/Calendar');

  it('Calendar에 Element를 세팅하지 않으면 오류를 낸다.', () => {
    expect(() => {
      let cal = new Calendar();
    }).toThrowError();
  });

});
