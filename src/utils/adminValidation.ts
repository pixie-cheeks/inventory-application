import { body } from 'express-validator';

const { admin_password } = process.env;
if (!admin_password) throw new Error('admin_password has not been set!');

export const adminValidation = body()
  .custom(
    (theBody: Record<string, string>) =>
      theBody.admin_password === admin_password,
  )
  .withMessage('Incorrect admin password.');
