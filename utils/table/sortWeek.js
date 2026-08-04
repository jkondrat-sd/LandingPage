import { romanToNumber, months } from "../constant";

const stringToNumberDate = (dateWeekString) => {
  const splitted = dateWeekString.split(" ");

  let year = Number(splitted[3]);
  let month = months[splitted[2].toLowerCase().substring(0, 3)];
  let week = romanToNumber[splitted[1].toLowerCase()];

  return week + month + year;
};

const sortWeek = (rowA, rowB) => {
  const a = stringToNumberDate(rowA.current_time);
  const b = stringToNumberDate(rowB.current_time);

  return { a, b };
};

export default sortWeek;
