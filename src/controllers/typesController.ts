import expressAsyncHandler from 'express-async-handler';
import { getAllTypesDB } from '../db/query.js';

const getTypesPage = expressAsyncHandler(async (_req, res) => {
  const allTypes = await getAllTypesDB();
  res.render('main', {
    componentName: 'types',
    allTypes,
  });
});

export { getTypesPage };
