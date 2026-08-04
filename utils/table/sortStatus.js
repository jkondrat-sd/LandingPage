import { neraca_status as status } from "@/utils/constant";

const statusStringToNumber = (statProps) => {
  const status = {
    rise: 1,
    rise_high: 1,
    stagnant: 2,
    fall: 3,
  };

  return status[statProps] || 4;
};

const sortStatus = (rowA, rowB) => {
  const a = statusStringToNumber(rowA.status);
  const b = statusStringToNumber(rowB.status);

  return { a, b };
};

export default sortStatus;
