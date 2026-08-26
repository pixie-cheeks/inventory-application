import { body } from 'express-validator';

const environmentAdminPassword = process.env.admin_password;
if (!environmentAdminPassword)
  throw new Error('admin_password has not been set!');

export const adminValidation = body().custom(
  (theBody: Record<string, string> | undefined) => {
    if (theBody?.admin_password === environmentAdminPassword) return true;
    throw new Error('Incorrect admin password.');
  },
);
