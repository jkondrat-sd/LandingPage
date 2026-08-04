import sortStatus from "./sortStatus";
import sortWeek from "./sortWeek";
import sortCurrTime from "./sortCurrTime";

const targetFunc = {
  status: (a, b) => sortStatus(a, b),
  weekNow: (a, b) => sortWeek(a, b),
  current_time_day: (a, b) => sortCurrTime(a, b),
};

export const main = (rowA, rowB, target) => {
  const { a, b } = targetFunc[target](rowA, rowB);

  if (a > b) {
    return 1;
  }

  if (b > a) {
    return -1;
  }

  return 0;
};
