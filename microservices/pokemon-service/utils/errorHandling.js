const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Ocurrió un error interno" });
};

module.exports = errorHandler;
