export default (req: any, res: any, next: any) => {
  res.status(404).json({
    message: 'Not Found',
  });
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
};
