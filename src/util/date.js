import moment from 'moment';

export const formatToDisplayDate = (date) => {
  if (date === null) return '';

  return moment(date).format('dddd, MMMM Do YYYY, h:mm a');
};

export const oneHourAhead = (date) => {
  return new Date(date.getTime() + 3600 * 1000);
};
