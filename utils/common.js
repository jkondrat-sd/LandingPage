import moment from "moment"
import 'moment/locale/id'
import { monthLabels } from "./constant";
import _ from "lodash";
import dayjs from "dayjs";
const updateLocale = require('dayjs/plugin/updateLocale');

dayjs.extend(updateLocale);
dayjs.updateLocale('id', {
  months: monthLabels
})

export const formatDateId = ((date, format='DD MMMM YYYY') => {
  if (!date) return date;
  let formatDate = dayjs(date);
  formatDate.locale('id');
  return formatDate.format(format);
})

export const convertKeyToLabel = ((key) => {
  let converted = key?.replaceAll('_', ' ');
  return converted;
})

export const convertLabelToKey = ((label) => {
  let converted = label?.toLowerCase()?.replaceAll(' ', '_');
  return converted;
})

export const formatCurrency = (money) => {
  return new Intl.NumberFormat(
    'id-ID',
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }
  ).format(money);
}

export const formatCurrencyRp = (money) => {
  return new Intl.NumberFormat(
    'id-ID',
    {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }
  ).format(money);
}

export const convertValidDate = (date) => {
  const array_date = date?.split(' '); 
  const valid_month = monthLabels.indexOf(array_date[1]);
  const valid_date = valid_month !== -1 ? `${array_date[2]}-${valid_month+1}-${array_date[0]}` : date;
  return valid_date;
}

export const sortArrayObjectByDate = (data, field, type) => {
  return _.orderBy(data, function(o) {
    return new moment(convertValidDate(o[field]));
  }, [type]);
}