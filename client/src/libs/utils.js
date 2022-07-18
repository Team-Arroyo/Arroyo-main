import moment from 'moment';

const toOptions = (s3Keys) => s3Keys.map((key) => ({
  label: key,
}));

const toKeys = (options) => options
  .filter((option) => option.checked)
  .map((option) => option.label);

const convert = {
  toOptions,
  toKeys,
};

export const formatDate = (dateObj) => {
  if (!dateObj) return null;
  return moment(dateObj).format('MM-DD-YYYY');
};

export default convert;
