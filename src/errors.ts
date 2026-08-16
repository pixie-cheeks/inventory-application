import type { NextFunction, Request, Response } from 'express';

class CustomNotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 404;
    this.name = 'NotFoundError';
  }
}

const errorHandler = (
  err: CustomNotFoundError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.error(err);
  if (err instanceof CustomNotFoundError) {
    res
      .status(err.statusCode)
      .render('main', { error: err, componentName: 'error' });
  } else {
    const serverErrorCode = 500;
    res.status(serverErrorCode).render('main', {
      error: {
        statusCode: serverErrorCode,
        message: 'The server encountered an error.',
      },
      componentName: 'error',
    });
  }
};

export { CustomNotFoundError, errorHandler };
