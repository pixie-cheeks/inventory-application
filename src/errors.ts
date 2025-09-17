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
) => {
  console.error(err);
  if (err instanceof CustomNotFoundError) {
    res.status(err.statusCode).render('error', { error: err });
  } else {
    res.status(500).render('error', {
      error: { message: 'The server encountered an error.' },
    });
  }
};

export { CustomNotFoundError, errorHandler };
