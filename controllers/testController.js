const test = (req, res) => {
  return res.status(200).json({ message: "Test is active" });
};

module.exports = {
  test,
};
