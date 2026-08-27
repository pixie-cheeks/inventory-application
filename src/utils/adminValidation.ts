import { body } from 'express-validator';

const environmentAdminPassword = process.env.admin_password;
if (!environmentAdminPassword)
  throw new Error('admin_password has not been set!');

export const adminValidation = body('admin_password')
  .trim()
  .notEmpty()
  .withMessage('Admin password is required.')
  .custom(
    (admin_password: string) => admin_password === environmentAdminPassword,
  )
  .withMessage('Incorrect admin password.');
