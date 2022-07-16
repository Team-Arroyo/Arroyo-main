const toOptions = (s3Keys) => s3Keys.map((key) => ({
  label: key,
}));

const toKeys = (options) => options.map((option) => option.label);

const convert = {
  toOptions,
  toKeys,
};

export default convert;
