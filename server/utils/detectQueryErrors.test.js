import detectQueryErrors from "./detectQueryErrors.mjs"

describe('testing detectQueryErrors', () => {
  const inputisNullorNotAnArray = {
    description: "Bad Request", 
    expectedFormat: 
      {
        endDate: "mm-dd-yyyy", 
        queries: [
          {
            logProperty: "logValue"
          }
        ], 
        startDate: "mm-dd-yyyy"}, 
        message: "Queries property is either missing or not an array", 
        status: 400
  };

  const inputHasNoQueriesErrorObj = {
    description: "Bad Request", 
    message: "queries array was provided, but is empty.",
    status: 400
  };

  const inputHasImproperKeValueStructure = {
    description: "Bad Request",
    exampleFormat: {"host_ip": "192.168.1.1"},
    message: "Improper key/value object structure ",
    status: 400
  };

  test('Returns error object if argument is null', () => {
    expect(detectQueryErrors(null)).toStrictEqual(inputisNullorNotAnArray);
  });

  test('Returns error object if argument is empty object', () => {
    expect(detectQueryErrors({})).toStrictEqual(inputisNullorNotAnArray);
  });

  test('Returns error object if argument is empty array', () => {
    expect(detectQueryErrors([])).toStrictEqual(inputHasNoQueriesErrorObj);
  })

  test('Returns error object if argument object value is invalid', () => {
    expect(detectQueryErrors([{key: "ip", value: []}])).toStrictEqual(inputHasImproperKeValueStructure);
  });

  test('Returns error object if argument object key is invalid', () => {
    expect(detectQueryErrors([{key: "", value: ""}])).toStrictEqual(inputHasImproperKeValueStructure);
  });
})