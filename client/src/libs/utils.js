import moment from 'moment';
import { useSelector } from 'react-redux';

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

export const isValidDateRange = () => {
  const range = useSelector((state) => state.dateRange);
  const start = moment(range.start, 'MM-DD-YYYY');
  const end = moment(range.end, 'MM-DD-YYYY');
  return start.isSameOrBefore(end);
};

export const hasQueryTerms = () => {
  const terms = useSelector((state) => state.queries);
  return Object.keys(terms).length > 0;
};

export default convert;
