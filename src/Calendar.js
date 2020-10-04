const Calendar = function (elem, { today }) {
  if (typeof elem === 'string') elem = document.querySelector(elem);
  if (!elem) throw new Error(`Could not search element : ${elem}`);
  this.el = elem;
};

Calendar.prototype.init = function () {};

Calendar.prototype.today = function () {};



module.exports = Calendar;
