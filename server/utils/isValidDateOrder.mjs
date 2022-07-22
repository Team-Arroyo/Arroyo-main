const isValidDateOrder = (startDate, endDate) => {
  return Date.parse(startDate) <= Date.parse(endDate);
};

export default isValidDateOrder;