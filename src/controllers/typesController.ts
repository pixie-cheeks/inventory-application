import expressAsyncHandler from 'express-async-handler';
import { getAllTypesDB } from '../db/query.js';

const getAllTypes = expressAsyncHandler(async (_req, res) => {
  const allTypes = await getAllTypesDB();
  res.render('types', {
    allTypes,
  });
});

export { getAllTypes };
