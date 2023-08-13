const routeNotFound = (req, res, next) => {
  const error = new Error(`Bu sayfa - ${req.originalUrl} maalesef bulunamadı.`);
  res.status(404);

  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message;

  //check for mongoose bad object id
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    res.status(400);
    message = 'Geçersiz ürün kimliği';
  }

  
  res.json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });

  res.status(statusCode);
};

export { routeNotFound, errorHandler };
