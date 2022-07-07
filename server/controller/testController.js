
const basicResponse = (req, res, next) => {
  res.json({msg: 'endpoint is good'});
}

module.exports = {
  basicResponse
}